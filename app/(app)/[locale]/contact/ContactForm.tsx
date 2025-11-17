'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Button from '@/components/Button';
import Input from '@/components/Input';

import useReCaptcha from '../hooks/useReCaptcha';

import { mailAction } from './mailAction';

interface FormInputProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);

  const { getRecapthcaToken } = useReCaptcha();

  const t = useTranslations('Contact');

  const { register, watch, reset, handleSubmit } = useForm<FormInputProps>();

  const name = watch('name');
  const email = watch('email');
  const subject = watch('subject');
  const message = watch('message');

  const onSubmit: SubmitHandler<FormInputProps> = async inputValues => {
    const token = await getRecapthcaToken();

    if (!token) {
      toast.error(t('error'));
      return;
    }

    try {
      setIsLoading(true);

      const response = await mailAction({
        name: inputValues.name,
        email: inputValues.email,
        subject: inputValues.subject,
        message: inputValues.message,
        token: token ?? '',
      });

      if (response?.success) {
        reset();
        toast.success(t('success'));
      } else {
        toast.error(t('error'));
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(t('error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-160 flex-col gap-6 lg:mt-6 lg:gap-7"
    >
      <h2 className="font-grotesque text-title-light text-2xl font-medium first-letter:capitalize lg:text-6xl">{t('message')}</h2>

      <Input
        aria-label={t('name')}
        {...register('name')}
      />
      <Input
        aria-label={t('email')}
        type="email"
        {...register('email')}
      />

      <Input
        aria-label={t('subject')}
        {...register('subject')}
      />

      <div className="flex flex-col gap-4">
        <label
          htmlFor="message"
          className="font-grotesque text-title-light text-xl font-medium capitalize lg:text-3xl"
        >
          {t('message-label')}
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={10}
          className="focus-visible:ring-primary-blue-100 bg-background-light text-title-light focus-visible:ring-title-light w-full border p-4 text-sm placeholder:text-sm placeholder:font-normal focus-visible:ring-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-40"
        />
      </div>

      <Button
        disabled={!name || !email || !subject || !message}
        loading={isLoading}
        className="h-12 cursor-pointer"
      >
        {t('send')}
      </Button>
    </form>
  );
}

export default ContactForm;
