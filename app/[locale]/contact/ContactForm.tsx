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
    mailAction(name, email, subject);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-[40rem] flex-col gap-6 lg:mt-6 lg:gap-7"
    >
      <h2 className="font-grotesque text-title-light text-2xl font-medium first-letter:capitalize lg:text-6xl">{t('message')}</h2>

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
          className="font-grotesque text-title-light text-xl font-medium capitalize lg:text-3xl"
        >
          {t('subject')}
        </label>
        <textarea
          id="subject"
          {...register('subject')}
          rows={10}
          className="focus-visible:ring-primary-blue-100 bg-background-light text-title-light focus-visible:ring-title-light w-full border p-4 text-sm placeholder:text-sm placeholder:font-normal focus-visible:ring-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-40"
        />
      </div>

      <Button disabled={!name || !email || !subject}>{t('send')}</Button>
    </form>
  );
}

export default ContactForm;
