import { getEntriesByType } from '@/contentful/client';

import Slider from './Slider';

async function getData(): Promise<SliderImageProps[]> {
  const response = await getEntriesByType('slider');

  return response[0].fields.images as SliderImageProps[];
}

/**
 * Fetching the data from the server on the data container component and passing it to the client component.
 */
async function SliderDataContainer() {
  const data = await getData();

  return <Slider images={data ?? []} />;
}

export default SliderDataContainer;
