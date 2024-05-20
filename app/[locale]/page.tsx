import { Slider, Content } from '@/components';

function Home({
  searchParams,
}: {
  searchParams?: {
    query: string;
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
