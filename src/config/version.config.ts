// Imported during build so the version follows package.json automatically.
// Keep this file importable from server components (no 'use client' on the
// importing component). For client-side use, pass the resolved values down
// as props.
import pkg from '../../package.json';

const useMock = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

/** Production commit SHA exposed by Vercel; falls back to "dev" locally. */
const commitSha = process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.NEXT_PUBLIC_COMMIT_SHA ?? null;

/** Active deployment environment from Vercel: "production" | "preview" | "development" */
const vercelEnv = process.env.VERCEL_ENV ?? 'development';

export const versionConfig = {
  /** Semver from package.json. Bump on each meaningful release. */
  version: pkg.version,

  /** Human-readable phase label shown to users. Update as we cross phase boundaries. */
  phase: 'Phase 2 · Auth (UI + scaffold)',

  /** Data mode — "mock" until the API is fully wired. */
  mode: useMock ? 'mock' : 'live',

  /** Short commit SHA when running on Vercel; null in pure local dev. */
  commit: commitSha ? commitSha.slice(0, 7) : null,

  /** Vercel env: production / preview / development. */
  env: vercelEnv,
} as const;

export type VersionInfo = typeof versionConfig;
