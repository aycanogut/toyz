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
      <AnimatePresence mode="popLayout">
        {articles.map((article, idx) => (
          <motion.div
            key={article.id}
            layout
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              delay: idx * 0.05,
            }}
          >
            <ContentCard
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
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default AnimatedArticleList;
