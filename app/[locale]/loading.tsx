import Image from "next/image";

export default function Loading() {
  return (
    <div className="bg-background fixed inset-0 z-50 flex items-center justify-center">
      <Image
        src="/toyz-big-logo.webp"
        alt="Toyz"
        width={200}
        height={200}
        className="animate-logo-scale size-32 sm:size-40 md:size-48 object-contain"
        priority
      />
    </div>
  );
}
