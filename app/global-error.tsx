'use client';

import Button from '@/components/Button';

interface GlobalErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html>
      <body>
        <div className="flex h-screen flex-col items-center justify-center gap-4 px-12 md:gap-8 lg:p-40">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 360 145"
          >
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              font-family="Arial, sans-serif"
              fontWeight="bold"
              fontSize="150"
              fill="#373737"
            >
              500
            </text>
          </svg>
          <h1 className="font-grotesque text-title-light text-4xl md:text-6xl lg:text-7xl">{error?.message ?? '500'}</h1>
          <Button onClick={reset}>Reset</Button>
        </div>
      </body>
    </html>
  );
}

export default GlobalError;
