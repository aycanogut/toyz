'use server';

import * as sgMail from '@sendgrid/mail';

import toyzConfig from '@/toyzConfig';

export async function mailAction() {
  sgMail.setApiKey(toyzConfig.sendGridApiKey);

  const msg = {
    to: 'toyzcontent@gmail.com', // Change to your recipient
    from: 'toyzcontent@gmail.com', // Change to your verified sender
    subject: 'This is a simple message',
    text: 'which contains some text',
    html: '<strong>and some html</strong>',
  };

  sgMail.send(msg);
}
