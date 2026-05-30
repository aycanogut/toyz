import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

function useReCaptcha() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const getReCaptchaToken = async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    return await executeRecaptcha();
  };

  return {
    executeRecaptcha,
    getReCaptchaToken,
  };
}

export default useReCaptcha;
