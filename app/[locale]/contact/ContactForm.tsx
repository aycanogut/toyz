'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import Button from '@/components/Button';

import useReCaptcha from '../hooks/useReCaptcha';

import { mailAction } from './mailAction';

export const ContactSchema = z.object({
  name: z.string().min(2, { message: 'validation-name-error' }),
  email: z.email({ message: 'validation-email-error' }),
  subject: z.string().min(3, { message: 'validation-subject-error' }),
  message: z.string().min(10, { message: 'validation-message-error' }),
});

export type ContactFormSchema = z.infer<typeof ContactSchema>;

function ContactForm() {
  const { getRecapthcaToken } = useReCaptcha();

  const t = useTranslations('Contact');
  const tFooter = useTranslations('Footer');

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
    <div className="border-title-light bg-background-light relative border-2 p-4 md:p-8">
      <span className="bg-acid text-background font-heading tracking-eyebrow absolute -top-6 -right-2 rotate-3 px-3 py-1.5 text-sm font-black uppercase sm:-top-4 sm:right-2 sm:text-base">
        {t('message')}
      </span>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <h2 className="font-heading text-title-light mb-1 text-3xl leading-none font-black uppercase">{t('contact-form')}</h2>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="font-heading text-acid tracking-eyebrow mb-1.5 block text-base font-bold uppercase"
          >
            {t('name')}
          </label>
          <input
            id="name"
            {...register('name')}
            disabled={isSubmitting}
            className="bg-background border-border-dark text-title-light font-fira focus-visible:border-acid w-full border-2 p-3 text-base focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-40"
          />
          {errors.name?.message && <span className="font-fira text-blood text-base">{t(errors.name.message)}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="font-heading text-acid tracking-eyebrow mb-1.5 block text-base font-bold uppercase"
          >
            {t('email')}
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            disabled={isSubmitting}
            className="bg-background border-border-dark text-title-light font-fira focus-visible:border-acid w-full border-2 p-3 text-base focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-40"
          />
          {errors.email?.message && <span className="font-fira text-blood text-base">{t(errors.email.message)}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="subject"
            className="font-heading text-acid tracking-eyebrow mb-1.5 block text-base font-bold uppercase"
          >
            {t('subject')}
          </label>
          <input
            id="subject"
            {...register('subject')}
            disabled={isSubmitting}
            className="bg-background border-border-dark text-title-light font-fira focus-visible:border-acid w-full border-2 p-3 text-base focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-40"
          />
          {errors.subject?.message && <span className="font-fira text-blood text-base">{t(errors.subject.message)}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="message"
            className="font-heading text-acid tracking-eyebrow mb-1.5 block text-base font-bold uppercase"
          >
            {t('message-label')}
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={6}
            disabled={isSubmitting}
            className="bg-background border-border-dark text-title-light resize-vertical font-fira focus-visible:border-acid w-full border-2 p-3 text-base focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-40"
          />
          {errors.message?.message && <span className="font-fira text-blood text-base">{t(errors.message.message)}</span>}
        </div>

        <Button
          variant="acid"
          size="fullWidth"
          disabled={isSubmitting}
          loading={isSubmitting}
          className="shadow-[4px_4px_0_#f0eee6]"
        >
          {t('send')} →
        </Button>

        <div className="flex flex-col gap-2 pt-1">
          <p className="font-fira text-paper-muted text-xs leading-relaxed">{t('privacy-notice')}</p>
          <p className="font-fira text-paper-muted text-xs leading-relaxed">{tFooter('recaptcha-notice')}</p>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
