'use server';

import * as sgMail from '@sendgrid/mail';

import toyzConfig from '@/toyzConfig';

/**
 * TODO: Update mail information with the correct fields and sendgrid sender with production url
 */
export async function mailAction(name: string, email: string, subject: string) {
  // sgMail.setApiKey(toyzConfig.sendGridApiKey);

  const msg = {
    to: 'toyzcontent@gmail.com',
    from: 'toyzcontent@gmail.com',
    subject: 'This is a simple message',
    text: 'which contains some text',
    html: '<strong>and some html</strong>',
  };

  sgMail.send(msg);
}
