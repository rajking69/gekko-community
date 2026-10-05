'use client';

import { type NavItem, primaryNav, secondaryNav } from '@/config/nav.config';
import { siteConfig } from '@/config/site.config';
import { mockEvents } from '@/data/events.mock';
import { cn } from '@/lib/utils';
import { type UserSession, authService } from '@/services/auth.service';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const communityItems = [
  { label: '🏆 Hall of Fame', href: '/hall-of-fame' },
  { label: '☠️ Hall of Shame', href: '/hall-of-shame' },
] as const;

const liveHrefs = new Set(
  mockEvents
    .filter((event) => event.status === 'live' && event.resultsUrl)
    .map((event) => event.resultsUrl),
);

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function canAccessAdmin(user: UserSession | null) {
  return user?.role === 'admin' || user?.role === 'super_admin' || user?.role === 'moderator';
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [user, setUser] = useState<UserSession | null>(null);
  const communityTriggerRef = useRef<HTMLButtonElement>(null);
  const communityMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileWasOpen = useRef(false);

  // Re-read the existing client session after navigation because login can
  // happen without remounting the marketing layout.
  // biome-ignore lint/correctness/useExhaustiveDependencies: auth state is refreshed after route changes
  useEffect(() => {
    const refreshUser = () => {
      setUser(authService.getCurrentUser());
    };

    refreshUser();
    window.addEventListener('gekko-auth-changed', refreshUser);
    return () => window.removeEventListener('gekko-auth-changed', refreshUser);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close menus on navigation
  useEffect(() => {
    setMobileOpen(false);
    setCommunityOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!communityOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (
        !communityMenuRef.current?.contains(event.target as Node) &&
        !communityTriggerRef.current?.contains(event.target as Node)
      ) {
        setCommunityOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCommunityOpen(false);
        communityTriggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [communityOpen]);

  useEffect(() => {
    if (mobileOpen) {
      mobileMenuRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    } else if (mobileWasOpen.current) {
      mobileTriggerRef.current?.focus();
    }
    mobileWasOpen.current = mobileOpen;
  }, [mobileOpen]);

  const communityActive = communityItems.some((item) => isActive(pathname, item.href));

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out',
        scrolled ? 'py-2' : 'py-4',
      )}
    >
      <div
        aria-hidden
        className={cn(
          'nav-scrim pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 transition-opacity duration-300',
          scrolled ? 'opacity-0' : 'opacity-100',
        )}
      />
      <div className="relative mx-auto max-w-[1440px] px-4 md:px-6">
        <div
          className={cn(
            'flex items-center justify-between gap-5 px-1 py-2 transition-all duration-300',
            scrolled ? 'nav-glass rounded-2xl px-4' : 'border-b border-transparent',
          )}
        >
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={siteConfig.name}
          >
            <Image
              src="/brand/gekko-logo-128.png"
              alt=""
              width={193}
              height={128}
              priority
              className="h-7 w-auto transition-transform duration-300 group-hover:scale-105 sm:h-8"
            />
            <span className="font-(family-name:--font-heading) text-lg font-bold tracking-tight">
              {siteConfig.shortName}
            </span>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex"
          >
            {primaryNav.map((item) => (
              <DesktopNavLink
                key={item.href}
                item={item}
                active={!item.external && isActive(pathname, item.href)}
                live={liveHrefs.has(item.href)}
              />
            ))}
            <div className="relative">
              <button
                ref={communityTriggerRef}
                type="button"
                aria-haspopup="menu"
                aria-expanded={communityOpen}
                aria-current={communityActive ? 'page' : undefined}
                onClick={() => setCommunityOpen((open) => !open)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setCommunityOpen(true);
                    requestAnimationFrame(() =>
                      communityMenuRef.current?.querySelector<HTMLElement>('a')?.focus(),
                    );
                  }
                }}
                className={cn(
                  'group relative inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition-colors',
                  communityActive || communityOpen
                    ? 'text-(--color-text-primary)'
                    : 'text-(--color-text-secondary) hover:text-(--color-text-primary)',
                )}
              >
                Community
                <ChevronDown
                  className={cn('size-3.5 transition-transform', communityOpen && 'rotate-180')}
                />
                <ActiveUnderline active={communityActive} />
              </button>
              <CommunityMenu
                open={communityOpen}
                menuRef={communityMenuRef}
                pathname={pathname}
                onClose={() => setCommunityOpen(false)}
              />
            </div>
            {secondaryNav.map((item) => (
              <DesktopNavLink
                key={item.href}
                item={item}
                active={!item.external && isActive(pathname, item.href)}
                live={liveHrefs.has(item.href)}
              />
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            {canAccessAdmin(user) && (
              <Link
                href="/admin"
                className="rounded-lg border border-(--color-gekko-500)/35 px-3.5 py-2 text-sm font-medium text-(--color-text-primary) transition hover:border-(--color-gekko-500)/70 hover:bg-(--color-gekko-500)/10"
              >
                Admin Console
              </Link>
            )}
            {user ? (
              <Link
                href="/dashboard"
                className="rounded-lg border border-(--glass-border) px-3.5 py-2 text-sm font-medium text-(--color-text-primary) transition hover:border-(--color-gekko-500)/50 hover:bg-(--glass-tint)"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="rounded-lg border border-(--glass-border) px-3.5 py-2 text-sm font-medium text-(--color-text-primary) transition hover:border-(--color-gekko-500)/50 hover:bg-(--glass-tint)"
              >
                Login
              </Link>
            )}
            <DiscordLink className="rounded-lg bg-(--color-gekko-500) px-3.5 py-2 text-sm font-semibold text-(--color-bg-void) transition hover:bg-(--color-gekko-400)" />
          </div>

          <button
            ref={mobileTriggerRef}
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="rounded-lg p-2 text-(--color-text-primary) transition hover:bg-(--glass-tint) lg:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 top-0 cursor-default bg-(--color-bg-void)/70 backdrop-blur-sm lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                ref={mobileMenuRef}
                id="mobile-navigation"
                className="nav-glass relative z-10 mt-2 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl p-4 lg:hidden"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <nav aria-label="Mobile navigation" className="space-y-1">
                  {primaryNav.map((item) => (
                    <MobileNavLink
                      key={item.href}
                      item={item}
                      active={!item.external && isActive(pathname, item.href)}
                      onNavigate={() => setMobileOpen(false)}
                    />
                  ))}
                  <MobileCommunityLinks
                    pathname={pathname}
                    onNavigate={() => setMobileOpen(false)}
                  />
                  {secondaryNav.map((item) => (
                    <MobileNavLink
                      key={item.href}
                      item={item}
                      active={!item.external && isActive(pathname, item.href)}
                      onNavigate={() => setMobileOpen(false)}
                    />
                  ))}
                </nav>
                <div className="mt-3 space-y-2 border-t border-(--glass-border) pt-3">
                  {canAccessAdmin(user) && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg border border-(--color-gekko-500)/35 px-3 py-2.5 text-center text-sm font-medium text-(--color-text-primary) transition hover:bg-(--color-gekko-500)/10"
                    >
                      Admin Console
                    </Link>
                  )}
                  {user ? (
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg border border-(--glass-border) px-3 py-2.5 text-center text-sm font-medium text-(--color-text-primary) transition hover:border-(--color-gekko-500)/50 hover:bg-(--glass-tint)"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg border border-(--glass-border) px-3 py-2.5 text-center text-sm font-medium text-(--color-text-primary) transition hover:border-(--color-gekko-500)/50 hover:bg-(--glass-tint)"
                    >
                      Login
                    </Link>
                  )}
                  <DiscordLink className="block rounded-lg bg-(--color-gekko-500) px-3 py-2.5 text-center text-sm font-semibold text-(--color-bg-void) transition hover:bg-(--color-gekko-400)" />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function CommunityMenu({
  open,
  menuRef,
  pathname,
  onClose,
}: {
  open: boolean;
  menuRef: React.RefObject<HTMLDivElement | null>;
  pathname: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          role="menu"
          aria-label="Community navigation"
          className="nav-glass absolute right-0 top-full mt-2 w-56 rounded-xl p-1.5"
          initial={{ opacity: 0, y: -5, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -5, scale: 0.98 }}
          transition={{ duration: 0.16 }}
          onKeyDown={(event) => {
            const items = Array.from(
              menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [],
            );
            const index = items.indexOf(document.activeElement as HTMLElement);
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault();
              items[
                (index + (event.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length
              ]?.focus();
            } else if (event.key === 'Home' || event.key === 'End') {
              event.preventDefault();
              items[event.key === 'Home' ? 0 : items.length - 1]?.focus();
            }
          }}
        >
          {communityItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              aria-current={isActive(pathname, item.href) ? 'page' : undefined}
              onClick={onClose}
              className={cn(
                'block rounded-lg px-3 py-2.5 text-sm transition-colors',
                isActive(pathname, item.href)
                  ? 'bg-(--color-gekko-500)/10 text-(--color-gekko-300)'
                  : 'text-(--color-text-secondary) hover:bg-(--glass-tint) hover:text-(--color-text-primary)',
              )}
            >
              {item.label}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MobileCommunityLinks({
  pathname,
  onNavigate,
}: { pathname: string; onNavigate: () => void }) {
  const active = communityItems.some((item) => isActive(pathname, item.href));
  return (
    <div className="mt-1 border-t border-(--glass-border) pt-1">
      <span
        className={cn(
          'block px-3 py-2.5 text-sm font-medium',
          active ? 'text-(--color-gekko-300)' : 'text-(--color-text-secondary)',
        )}
      >
        Community
      </span>
      <div className="ml-3 space-y-1 border-l border-(--glass-border) pl-2">
        {communityItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive(pathname, item.href) ? 'page' : undefined}
            className={cn(
              'block rounded-lg px-3 py-2.5 text-sm transition-colors',
              isActive(pathname, item.href)
                ? 'bg-(--color-gekko-500)/10 text-(--color-gekko-300)'
                : 'text-(--color-text-secondary) hover:bg-(--glass-tint) hover:text-(--color-text-primary)',
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function DesktopNavLink({ item, active, live }: { item: NavItem; active: boolean; live: boolean }) {
  const className = cn(
    'group relative rounded-lg px-3 py-2 text-sm transition-colors',
    active
      ? 'text-(--color-text-primary)'
      : 'text-(--color-text-secondary) hover:text-(--color-text-primary)',
  );
  const content = (
    <>
      <span className="inline-flex items-center gap-1.5">
        {item.label}
        {live && (
          <span aria-label="Live now" className="size-1.5 rounded-full bg-(--color-gekko-400)" />
        )}
        {item.external && (
          <ArrowUpRight
            aria-hidden
            className="size-3 opacity-50 transition-opacity group-hover:opacity-90"
          />
        )}
      </span>
      <ActiveUnderline active={active} />
    </>
  );

  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link href={item.href} aria-current={active ? 'page' : undefined} className={className}>
      {content}
    </Link>
  );
}

function MobileNavLink({
  item,
  active,
  onNavigate,
}: { item: NavItem; active: boolean; onNavigate: () => void }) {
  const className = cn(
    'flex min-h-11 items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm transition',
    active
      ? 'bg-(--color-gekko-500)/10 font-medium text-(--color-gekko-300)'
      : 'text-(--color-text-secondary) hover:bg-(--glass-tint) hover:text-(--color-text-primary)',
  );
  return item.external ? (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onNavigate}
      className={className}
    >
      {item.label}
      <ArrowUpRight aria-hidden className="size-3.5 opacity-50" />
    </a>
  ) : (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={className}
    >
      {item.label}
    </Link>
  );
}

function ActiveUnderline({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'absolute inset-x-3 bottom-1 h-0.5 origin-center rounded-full bg-(--color-gekko-500) transition-transform duration-300 ease-out',
        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
      )}
    />
  );
}

function DiscordLink({ className }: { className: string }) {
  return (
    <a
      href={siteConfig.links.discord}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      Join Discord
    </a>
  );
}
