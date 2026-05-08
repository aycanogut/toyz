'use client';

import { AnimatePresence, motion } from 'motion/react';

import ContentCard from './ContentCard';

export interface ArticleCardData {
  id: string;
  title: string;
  description?: string;
  image: string;
  imageAlt?: string;
  date: string;
  author: string;
  category?: string;
  categorySlug?: string;
  readTimeMinutes?: number;
  slug: string;
}

interface AnimatedArticleListProps {
  articles: ArticleCardData[];
}

function AnimatedArticleList({ articles }: AnimatedArticleListProps) {
  return (
    <div className="px-6 py-6 md:px-8 md:py-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={articles.map(a => a.id).join(',')}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {articles.map((article, idx) => (
            <ContentCard
              key={article.id}
              index={idx}
              title={article.title}
              description={article.description}
              image={article.image}
              imageAlt={article.imageAlt}
              date={article.date}
              author={article.author}
              category={article.category}
              categorySlug={article.categorySlug}
              readTimeMinutes={article.readTimeMinutes}
              slug={article.slug}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default AnimatedArticleList;
