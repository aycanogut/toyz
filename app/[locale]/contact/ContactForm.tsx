'use client';

import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Input, Button } from '@/components';

import { mailAction } from './mailAction';

interface FormInputProps {
  name: string;
  email: string;
  subject: string;
}

function ContactForm() {
  const t = useTranslations('Contact');

  const { register, watch, reset, handleSubmit } = useForm<FormInputProps>();

  const name = watch('name');
  const email = watch('email');
  const subject = watch('subject');

  const onSubmit: SubmitHandler<FormInputProps> = async inputValues => {
    mailAction();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-[40rem] flex-col gap-6 lg:mt-6 lg:gap-7"
    >
      <h2 className="font-grotesque text-2xl font-medium text-title-light first-letter:capitalize lg:text-6xl">{t('message')}</h2>

      <Input
        aria-label={t('name')}
        {...register('name')}
      />
      <Input
        aria-label={t('email')}
        {...register('email')}
      />

      <div className="flex flex-col gap-4">
        <label
          htmlFor="subject"
          className="font-grotesque text-xl font-medium capitalize text-title-light lg:text-3.5"
        >
          {t('subject')}
        </label>
        <textarea
          id="subject"
          {...register('subject')}
          rows={10}
          className="focus-visible:ring-primary-blue-100 w-full border bg-background-light p-4 text-sm text-title-light placeholder:text-sm placeholder:font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-title-light disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-40"
        />
      </div>

      <Button disabled={!name || !email || !subject}>{t('send')}</Button>
    </form>
  );
}

export default ContactForm;
