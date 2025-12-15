'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import Button from '@/components/Button';
import Input from '@/components/Input';

import useReCaptcha from '../hooks/useReCaptcha';

import { mailAction } from './mailAction';

const ContactSchema = z.object({
  name: z.string().min(2, { message: 'validation-name-error' }),
  email: z.email({ message: 'validation-email-error' }),
  subject: z.string().min(3, { message: 'validation-subject-error' }),
  message: z.string().min(10, { message: 'validation-message-error' }),
});

export type ContactFormSchema = z.infer<typeof ContactSchema>;

function ContactForm() {
  const { getRecapthcaToken } = useReCaptcha();

  const t = useTranslations('Contact');

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(ContactSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<ContactFormSchema> = async inputValues => {
    const token = await getRecapthcaToken();

    if (!token) {
      toast.error(t('error'));
      return;
    }

    try {
      const response = await mailAction({
        ...inputValues,
        token,
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
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-160 flex-col gap-6"
    >
      <h2 className="font-grotesque text-title-light text-2xl font-medium first-letter:capitalize lg:text-6xl">{t('message')}</h2>

      <Input
        aria-label={t('name')}
        {...register('name')}
        error={errors.name?.message && t(errors.name.message)}
      />
      <Input
        aria-label={t('email')}
        type="email"
        {...register('email')}
        error={errors.email?.message && t(errors.email.message)}
      />

      <Input
        aria-label={t('subject')}
        {...register('subject')}
        error={errors.subject?.message && t(errors.subject.message)}
      />

      <div className="flex flex-col gap-4">
        <label
          htmlFor="message"
          className="font-grotesque text-title-light text-xl font-medium capitalize lg:text-3xl"
        >
          {t('message-label')}
        </label>
        <div className="flex flex-col gap-1">
          <textarea
            id="message"
            {...register('message')}
            rows={10}
            className="focus-visible:ring-primary-blue-100 bg-background-light text-title-light focus-visible:ring-title-light w-full border p-4 text-sm placeholder:text-sm placeholder:font-normal focus-visible:ring-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-40"
          />
          {errors.message?.message && <span className="font-inter text-md text-red-500">{t(errors.message.message)}</span>}
        </div>
      </div>

      <Button
        disabled={isSubmitting}
        loading={isSubmitting}
        className="h-12 cursor-pointer"
      >
        {t('send')}
      </Button>
    </form>
  );
}

export default ContactForm;
