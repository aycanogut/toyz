import z from 'zod';

// Shared by the form and mailAction so client and server enforce the same limits.
// Messages are translation keys under `Contact`.
export const ContactSchema = z.object({
  name: z.string().min(2, { message: 'validation-name-error' }).max(50, { message: 'validation-name-max-error' }),
  email: z.email({ message: 'validation-email-error' }),
  subject: z.string().min(3, { message: 'validation-subject-error' }).max(100, { message: 'validation-subject-max-error' }),
  message: z.string().min(10, { message: 'validation-message-error' }).max(5000, { message: 'validation-message-max-error' }),
});

export type ContactFormSchema = z.infer<typeof ContactSchema>;
