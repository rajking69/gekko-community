import { RegisterForm } from '@/components/auth/register-form';
import { siteConfig } from '@/config/site.config';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Register',
  description: `Create your ${siteConfig.name} account.`,
  alternates: { canonical: '/register' },
};

export default function RegisterPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12 md:px-10">
      <div className="mesh-bg" />
      <div className="grid-floor" />

      <div className="relative z-10 grid w-full max-w-5xl items-center gap-12 lg:grid-cols-[1fr_0.82fr] lg:gap-20">
        <section className="hidden lg:block">
          <Link href="/" className="flex w-fit items-center gap-2.5" aria-label="Back to home">
            <Image
              src="/brand/gekko-logo-128.png"
              alt=""
              width={193}
              height={128}
              priority
              className="h-10 w-auto"
            />
            <span className="font-(family-name:--font-heading) text-2xl font-bold tracking-tight">
              {siteConfig.shortName}
            </span>
          </Link>
          <p className="mt-12 font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
            Join Team Gekko
          </p>
          <h2 className="mt-4 max-w-lg font-(family-name:--font-heading) text-5xl font-bold leading-[1.05] tracking-tight">
            Create your account. Play with the best.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-(--color-text-secondary)">
            Sign up to join events, track your matches, interact with members, and take part in Gekko Cup.
          </p>
          <div className="mt-10 flex items-center gap-8 border-t border-(--glass-border) pt-6">
            <div>
              <p className="font-(family-name:--font-heading) text-2xl font-bold">100%</p>
              <p className="mt-1 text-xs text-(--color-text-muted)">Gamer community</p>
            </div>
            <div>
              <p className="font-(family-name:--font-heading) text-2xl font-bold">Free</p>
              <p className="mt-1 text-xs text-(--color-text-muted)">Member account</p>
            </div>
          </div>
        </section>

        <section className="w-full max-w-md justify-self-center">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Back to home">
              <Image
                src="/brand/gekko-logo-128.png"
                alt=""
                width={193}
                height={128}
                priority
                className="h-8 w-auto"
              />
              <span className="font-(family-name:--font-heading) text-xl font-bold tracking-tight">
                {siteConfig.shortName}
              </span>
            </Link>
            <Link
              href="/"
              className="text-sm text-(--color-text-secondary) hover:text-(--color-text-primary)"
            >
              Home
            </Link>
          </div>

          <div className="glass rounded-3xl p-6 sm:p-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
                Get Started
              </p>
              <h1 className="mt-3 font-(family-name:--font-heading) text-3xl font-bold tracking-tight">
                Create Your Account
              </h1>
              <p className="mt-3 text-sm text-(--color-text-secondary)">
                Start your journey with Team Gekko.
              </p>
            </div>

            <RegisterForm />
          </div>

          <p className="mt-6 text-center text-xs text-(--color-text-muted)">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="hover:text-(--color-text-primary)">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="hover:text-(--color-text-primary)">
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
