import { Feed } from "feed";

import { Article, Category, Media } from "@/payload-types";
import getArticles from "@/services/articles";
import toyzConfig from "@/toyzConfig";

function lexicalToHtml(content: any, siteUrl: string): string {
  if (!content || !content.root || !content.root.children) return "";

  const renderNodes = (nodes: any[]): string => {
    return nodes
      .map((node: any) => {
        if (node.type === "text") {
          let text = node.text || "";

          if (node.format & 1) text = `<strong>${text}</strong>`;
          if (node.format & 2) text = `<em>${text}</em>`;
          if (node.format & 4) text = `<strike>${text}</strike>`;
          if (node.format & 8) text = `<u>${text}</u>`;
          if (node.format & 16) text = `<code>${text}</code>`;

          return text;
        }

        if (node.type === "link" || node.type === "autolink") {
          const url = node.fields?.url || node.url || "";
          const absoluteUrl = url.startsWith("http")
            ? url
            : `${siteUrl}${url.startsWith("/") ? "" : "/"}${url}`;
          return `<a href="${absoluteUrl}">${
            renderNodes(node.children || [])
          }</a>`;
        }

        if (node.type === "linebreak") {
          return "<br />";
        }

        return "";
      })
      .join("");
  };

  return content.root.children
    .map((node: any) => {
      const childrenHtml = renderNodes(node.children || []);
      if (
        !childrenHtml && node.type !== "horizontalrule" &&
        node.type !== "upload"
      ) return "";

      switch (node.type) {
        case "paragraph":
          return `<p>${childrenHtml}</p>`;
        case "heading": {
          const Tag = node.tag || "h2";
          return `<${Tag}>${childrenHtml}</${Tag}>`;
        }
        case "list": {
          const ListTag = node.listType === "number" ? "ol" : "ul";
          const items = (node.children || [])
            .map((li: any) => {
              const liContent = renderNodes(li.children || []);
              return liContent ? `<li>${liContent}</li>` : "";
            })
            .filter(Boolean)
            .join("");
          return items ? `<${ListTag}>${items}</${ListTag}>` : "";
        }
        case "quote":
          return `<blockquote>${childrenHtml}</blockquote>`;
        case "upload": {
          const media = node.value as Media;
          if (media && media.url) {
            const imageUrl = media.url.startsWith("http")
              ? media.url
              : `${siteUrl}${media.url}`;
            return `<figure><img src="${imageUrl}" alt="${media.alt || ""}" />${
              media.credits ? `<figcaption>${media.credits}</figcaption>` : ""
            }</figure>`;
          }
          return "";
        }
        case "horizontalrule":
          return "<hr />";
        default:
          return "";
      }
    })
    .filter(Boolean)
    .join("");
}

export async function generateFeed(locale: "en" | "tr") {
  const result = await getArticles(locale);
  const articles = result.docs;
  const siteUrl = toyzConfig.baseUrl || "https://toyzwebzine.com";

  const feed = new Feed({
    title: toyzConfig.title || "TOYZ Webzine",
    description:
      "Counter-culture webzine about graffiti, street art, underground music, skateboarding, and more.",
    id: siteUrl,
    link: siteUrl,
    language: locale,
    favicon: `${siteUrl}/favicon.ico`,
    generator: "TOYZ Feed Generator",
    feedLinks: {
      rss2: `${siteUrl}/${locale}/feed.xml`,
      atom: `${siteUrl}/${locale}/feed.atom`,
      json: `${siteUrl}/${locale}/feed.json`,
    },
    author: {
      name: "TOYZ Webzine",
      email: toyzConfig.contactEmail,
      link: siteUrl,
    },
  });

  articles.forEach((article: Article) => {
    const media = article.images as Media;
    const category = article.details.category as Category;
    const url = `${siteUrl}/${locale}/content/${article.slug}`;
    const imageUrl = media?.url
      ? (media.url.startsWith("http") ? media.url : `${siteUrl}${media.url}`)
      : undefined;

    feed.addItem({
      title: article.title,
      id: url,
      link: url,
      description: article.description,
      content: lexicalToHtml(article.content, siteUrl),
      author: [
        {
          name: article.details.author,
        },
      ],
      date: new Date(article.details.date),
      published: new Date(article.createdAt),
      image: imageUrl,
      category: category ? [{ name: category.name }] : [],
    });
  });

  return feed;
}
