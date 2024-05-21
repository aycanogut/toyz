import { Slider, Content } from '@/components';

function Home({
  searchParams,
}: {
  searchParams?: {
    query: string;
    category: string;
  };
}) {
  return (
    <>
      <Slider />
      <Content searchParams={searchParams} />
    </>
  );
}

export default Home;
