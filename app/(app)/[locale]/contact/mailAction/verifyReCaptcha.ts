import toyzConfig from '@/toyzConfig';

interface ReCaptchaVerificationResponse {
  success: boolean;
  score: number;
}

async function verifyReCaptcha(token: string): Promise<{ isValid: boolean; score: number }> {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${toyzConfig.reCaptchaSecretKey}&response=${token}`,
    });

    const data: ReCaptchaVerificationResponse = await response.json();

    const isValid = data.success === true && (data.score ?? 0) >= 0.5;

    return {
      isValid,
      score: data.score ?? 0,
    };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return {
      isValid: false,
      score: 0,
    };
  }
}

export default verifyReCaptcha;
