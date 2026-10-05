import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <div className="mesh-bg" />
      <div className="grid-floor" />
      {children}
    </SmoothScrollProvider>
  );
}
