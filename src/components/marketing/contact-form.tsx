'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { useState } from 'react';

type Topic = 'general' | 'partnership' | 'events' | 'press' | 'other';

const TOPICS: { value: Topic; label: string }[] = [
  { value: 'general', label: 'General' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'events', label: 'Event collaboration' },
  { value: 'press', label: 'Press / media' },
  { value: 'other', label: 'Other' },
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<Topic>('general');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const validate = (): string | null => {
    if (name.trim().length < 2) return 'Name needs at least 2 characters.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'That email does not look right.';
    if (message.trim().length < 10) return 'Message needs at least 10 characters.';
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const validationError = validate();
    if (validationError) {
      setStatus('error');
      setError(validationError);
      return;
    }
    setStatus('submitting');
    // Mock submit — replace with a server action that hits Resend or a webhook
    // when the backend lands.
    await new Promise((r) => setTimeout(r, 700));
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="glass flex flex-col items-center rounded-3xl p-8 text-center">
        <div className="grid size-14 place-items-center rounded-2xl border border-(--color-gekko-500)/50 bg-(--color-gekko-500)/10 text-(--color-gekko-300)">
          <CheckCircle2 className="size-6" />
        </div>
        <h3 className="mt-5 font-(family-name:--font-heading) text-xl font-bold tracking-tight">
          Thanks — we'll get back to you
        </h3>
        <p className="mt-2 max-w-md text-sm text-(--color-text-secondary)">
          Your message reached the team inbox. Most replies go out within 48 hours. If it's urgent,
          drop us a ping in Discord.
        </p>
        <Button
          variant="glass"
          onClick={() => {
            setName('');
            setEmail('');
            setMessage('');
            setTopic('general');
            setStatus('idle');
          }}
          className="mt-6"
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="glass flex flex-col gap-5 rounded-3xl p-6 md:p-8"
      noValidate
    >
      <Field label="Your name" htmlFor="contact-name" required>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Sky Tanaka"
          required
        />
      </Field>

      <Field label="Email" htmlFor="contact-email" required>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="sky@example.com"
          required
        />
      </Field>

      <Field label="Topic" htmlFor="contact-topic">
        <select
          id="contact-topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value as Topic)}
          className={inputClass}
        >
          {TOPICS.map((t) => (
            <option key={t.value} value={t.value} className="bg-(--color-bg-deep)">
              {t.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" htmlFor="contact-message" required>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(inputClass, 'min-h-[140px] resize-y py-3 leading-relaxed')}
          placeholder="Tell us a bit about why you're reaching out…"
          required
        />
      </Field>

      {status === 'error' && error && (
        <p className="flex items-center gap-2 rounded-xl border border-(--color-danger)/40 bg-(--color-danger)/5 px-3 py-2 text-sm text-(--color-danger)">
          <AlertCircle className="size-4" />
          {error}
        </p>
      )}

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
          Mock submit · no email is actually sent yet
        </p>
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send message <Send className="size-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

const inputClass =
  'block w-full rounded-xl border border-(--glass-border) bg-(--color-bg-deep)/40 px-3 py-2.5 text-sm text-(--color-text-primary) outline-none transition placeholder:text-(--color-text-muted) focus:border-(--color-gekko-500) focus:bg-(--color-bg-deep)/70';

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block" htmlFor={htmlFor}>
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-text-muted)">
        {label}
        {required && <span className="ml-1 text-(--color-gekko-400)">*</span>}
      </span>
      {children}
    </label>
  );
}
