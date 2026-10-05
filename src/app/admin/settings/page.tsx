'use client';

import React, { useState } from 'react';
import { Settings, Shield, Globe, Lock, Save, CheckCircle } from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [siteName, setSiteName] = useState('Team Gekko');
  const [allowPublicRegister, setAllowPublicRegister] = useState(true);
  const [allowGoogleAuth, setAllowGoogleAuth] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-4xl">
      <div>
        <h1 className="font-(family-name:--font-heading) text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Settings className="size-6 text-(--color-gekko-400)" /> Platform Settings & Controls
        </h1>
        <p className="text-xs text-(--color-text-secondary)">
          Global authentication policies, system security, and site metadata.
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          <CheckCircle className="size-4 text-emerald-400" />
          <span>Platform settings updated successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="glass rounded-3xl border border-(--glass-border) p-8 space-y-6">
        <div className="space-y-4">
          <h2 className="font-(family-name:--font-heading) text-lg font-bold text-white border-b border-(--glass-border) pb-2">
            General Configuration
          </h2>

          <label className="block space-y-2">
            <span className="text-xs font-semibold uppercase font-mono text-(--color-text-muted)">
              Platform Name
            </span>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="h-10 w-full rounded-xl border border-(--glass-border) bg-black/40 px-3 text-xs text-white outline-none focus:border-(--color-gekko-500)"
            />
          </label>
        </div>

        <div className="space-y-4 pt-4 border-t border-(--glass-border)">
          <h2 className="font-(family-name:--font-heading) text-lg font-bold text-white border-b border-(--glass-border) pb-2">
            Security & Authentication Policies
          </h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-xs text-white">Public Account Registration</p>
              <p className="text-[10px] text-(--color-text-muted)">Allow new users to sign up at /register (Default role: MEMBER)</p>
            </div>
            <input
              type="checkbox"
              checked={allowPublicRegister}
              onChange={(e) => setAllowPublicRegister(e.target.checked)}
              className="size-4 accent-(--color-gekko-500)"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-xs text-white">Google OAuth Authentication</p>
              <p className="text-[10px] text-(--color-text-muted)">Enable Google Sign-in provider via Better Auth</p>
            </div>
            <input
              type="checkbox"
              checked={allowGoogleAuth}
              onChange={(e) => setAllowGoogleAuth(e.target.checked)}
              className="size-4 accent-(--color-gekko-500)"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-(--color-gekko-500) px-5 py-2.5 font-semibold text-xs text-black transition hover:bg-(--color-gekko-400)"
          >
            <Save className="size-4" /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
