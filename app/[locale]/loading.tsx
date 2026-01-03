export default function Loading() {
  return (
    <div className="bg-background/80 fixed inset-0 z-100 flex items-center justify-center">
      <div className="relative size-16">
        <div className="border-title-light absolute inset-0 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    </div>
  );
}
