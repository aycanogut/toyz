import { getEntriesByType } from '@/contentful/client';

import Slider from './Slider';

async function getData(): Promise<SliderImageProps[]> {
  const response = await getEntriesByType('slider');

  return response[0].fields.images as SliderImageProps[];
}

async function SliderContainer() {
  const data = await getData();

  return <Slider images={data ?? []} />;
}

export default SliderContainer;
