import Image from 'next/image';

export default function Loading() {
  return (
    <div className="bg-background text-title-light fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden">
      <div className="loader-overlay pointer-events-none absolute inset-0" />

      <div className="relative flex flex-col items-center gap-5">
        <Image
          src="/brand-logo.webp"
          alt="TOYZ"
          width={112}
          height={112}
          priority
          className="animate-toyz-bob h-auto w-28 object-contain motion-reduce:animate-none"
        />
        <div className="font-heading text-title-light loader-wordmark text-5xl font-black tracking-tight italic">TOYZ*</div>
      </div>

      <div className="absolute bottom-15 left-1/2 h-0.5 w-70 -translate-x-1/2 overflow-hidden bg-zinc-800">
        <div className="bg-acid animate-toyz-bar h-full motion-reduce:animate-none" />
      </div>
    </div>
  );
}
