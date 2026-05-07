'use client';

import { motion } from 'motion/react';

import SimiliarContentCard from './SimiliarContentCard';

export interface SimilarArticleData {
  id: string;
  title: string;
  image: string;
  categoryName: string;
  categoryId: string | number;
  date: string;
  author: string;
  slug: string;
}

interface AnimatedSimilarGridProps {
  articles: SimilarArticleData[];
}

function AnimatedSimilarGrid({ articles }: AnimatedSimilarGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, idx) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            delay: idx * 0.15,
          }}
        >
          <SimiliarContentCard
            title={article.title}
            image={article.image}
            categoryName={article.categoryName}
            categoryId={article.categoryId}
            date={article.date}
            author={article.author}
            slug={article.slug}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default AnimatedSimilarGrid;
