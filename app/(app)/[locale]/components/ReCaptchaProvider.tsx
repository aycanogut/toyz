'use client';

import { PropsWithChildren } from 'react';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import toyzConfig from '@/toyzConfig';

function ReCaptchaProvider({ children }: PropsWithChildren) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={toyzConfig.reCaptchaSiteKey}
      language="tr"
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}

export default ReCaptchaProvider;
