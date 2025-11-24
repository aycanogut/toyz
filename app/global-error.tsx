'use client';

import { useEffect } from 'react';

import * as Sentry from '@sentry/nextjs';

import Button from '@/components/Button';
import { grotesque, nabla } from '@/theme/fonts';
import '@/theme/globals.css';
import cn from '@/utils/cn';

interface GlobalErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html
      className={cn(grotesque.variable, nabla.variable)}
      lang="tr"
    >
      <body className="bg-background flex h-screen flex-col items-center justify-center gap-8 px-4 text-center">
        <div className="relative flex items-center justify-center">
          <h1 className="font-nabla text-9xl leading-none md:text-[12rem]">500</h1>
        </div>

        <div className="flex max-w-md flex-col items-center gap-4">
          <h2 className="font-grotesque text-title-light text-2xl font-bold uppercase md:text-3xl">Something went wrong!</h2>
          <p className="font-grotesque text-title-dark text-lg">{error?.message || 'An unexpected error occurred. Please try again.'}</p>

          <Button
            onClick={reset}
            variant="primary"
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </body>
    </html>
  );
}

export default GlobalError;
