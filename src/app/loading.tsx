export default function Loading() {
  return (
    <output className="flex min-h-screen items-center justify-center" aria-label="Loading">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-ping rounded-full bg-(--color-gekko-500) opacity-30" />
        <div className="absolute inset-2 animate-pulse rounded-full bg-(--color-gekko-500)" />
      </div>
    </output>
  );
}
