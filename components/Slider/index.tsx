import { useLocale } from 'next-intl';

import { getEntriesByType } from '@/contentful/client';
import { Locale } from '@/i18n';

import Slider from './Slider';

async function getData(locale: Locale): Promise<SliderImageProps[]> {
  const response = await getEntriesByType('slider', locale);

  return response[0].fields.images as SliderImageProps[];
}

/**
 * Fetching the data from the server on the data container component and passing it to the client component.
 */
async function SliderDataContainer() {
  const locale = useLocale();
  const data = await getData(locale as Locale);

  return <Slider images={data ?? []} />;
}

export default SliderDataContainer;
