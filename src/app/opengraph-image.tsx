import { readFileSync } from 'node:fs';
import path from 'node:path';
import { siteConfig } from '@/config/site.config';
import { ImageResponse } from 'next/og';

// Route metadata.
// Node runtime so this can be statically generated at build time and so we
// can read the logo from disk instead of fetching it over HTTP (which is
// fragile during build — there's no dev server to serve /brand/* yet).
export const runtime = 'nodejs';
export const alt = `${siteConfig.name} — gaming community platform`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Read the logo at module load and inline as a data URI so Satori has it.
const logoBuffer = readFileSync(path.join(process.cwd(), 'public', 'brand', 'gekko-logo-256.png'));
const logoDataUri = `data:image/png;base64,${logoBuffer.toString('base64')}`;

// Image generation — Satori-rendered. No Tailwind: only inline styles and flexbox.
export default async function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        color: '#f4f7fb',
        // Satori does not accept a fallback colour in the `background` shorthand
        // — split into `backgroundColor` + gradient-only `backgroundImage`.
        backgroundColor: '#03050a',
        backgroundImage:
          'radial-gradient(at 20% 20%, rgba(0, 255, 140, 0.35) 0%, transparent 60%),' +
          ' radial-gradient(at 80% 10%, rgba(139, 92, 246, 0.30) 0%, transparent 55%),' +
          ' radial-gradient(at 50% 110%, rgba(34, 211, 238, 0.22) 0%, transparent 50%),' +
          ' radial-gradient(at 100% 100%, rgba(0, 255, 140, 0.1) 0%, transparent 50%)',
      }}
    >
      {/* top row: brand + live badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <img
            src={logoDataUri}
            width={80}
            height={64}
            alt=""
            style={{ filter: 'drop-shadow(0 0 24px rgba(244,67,82,0.55))' }}
          />
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: -0.5,
              display: 'flex',
            }}
          >
            {siteConfig.name}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 22px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            fontSize: 18,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#4dffb0',
          }}
        >
          <span
            style={{
              display: 'flex',
              width: 8,
              height: 8,
              borderRadius: 999,
              background: '#00ff88',
            }}
          />
          Community v3
        </div>
      </div>

      {/* headline */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 950,
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <span>Where the squad plays, competes, and grows together.</span>
        </div>
        <div
          style={{
            fontSize: 28,
            color: 'rgba(244,247,251,0.7)',
            maxWidth: 820,
            display: 'flex',
          }}
        >
          Games, tournaments, real-time presence. Built for people who love to play.
        </div>
      </div>

      {/* footer row: stats */}
      <div
        style={{
          display: 'flex',
          gap: 56,
          alignItems: 'center',
          fontSize: 22,
        }}
      >
        <Stat label="MEMBERS" value="12,408" />
        <Stat label="MATCHES / DAY" value="142" />
        <Stat label="EVENTS / MO" value="24" />
        <Stat label="XP EARNED" value="1.2M" />
      </div>
    </div>,
    size,
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 38, fontWeight: 700, letterSpacing: -0.5, display: 'flex' }}>
        {value}
      </div>
      <div
        style={{
          fontSize: 16,
          letterSpacing: 4,
          color: 'rgba(244,247,251,0.55)',
          display: 'flex',
        }}
      >
        {label}
      </div>
    </div>
  );
}
