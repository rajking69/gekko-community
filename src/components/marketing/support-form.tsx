'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, LifeBuoy, Loader2 } from 'lucide-react';
import { useState } from 'react';

type Priority = 'low' | 'medium' | 'high' | 'urgent';
type Category = 'account' | 'event' | 'bug' | 'abuse' | 'other';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'account', label: 'Account / login' },
  { value: 'event', label: 'Event / tournament' },
  { value: 'bug', label: 'Bug or glitch' },
  { value: 'abuse', label: 'Report abuse' },
  { value: 'other', label: 'Something else' },
];

const PRIORITIES: { value: Priority; label: string; description: string }[] = [
  { value: 'low', label: 'Low', description: 'Has a workaround' },
  { value: 'medium', label: 'Medium', description: 'Inconvenient' },
  { value: 'high', label: 'High', description: 'Blocked for now' },
  { value: 'urgent', label: 'Urgent', description: 'Affecting an event live' },
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function SupportForm() {
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<Category>('account');
  const [priority, setPriority] = useState<Priority>('medium');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string | null>(null);

  const validate = (): string | null => {
    if (subject.trim().length < 4) return 'Subject needs at least 4 characters.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'That email does not look right.';
    if (details.trim().length < 20)
      return 'Add a bit more detail — at least 20 characters so we can actually help.';
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
    await new Promise((r) => setTimeout(r, 800));
    const id = `GK-${Math.floor(Math.random() * 90000 + 10000)}`;
    setTicketId(id);
    setStatus('success');
  };

  if (status === 'success' && ticketId) {
    return (
      <div className="glass flex flex-col items-center rounded-3xl p-8 text-center">
        <div className="grid size-14 place-items-center rounded-2xl border border-(--color-gekko-500)/50 bg-(--color-gekko-500)/10 text-(--color-gekko-300)">
          <CheckCircle2 className="size-6" />
        </div>
        <h3 className="mt-5 font-(family-name:--font-heading) text-xl font-bold tracking-tight">
          Ticket {ticketId} opened
        </h3>
        <p className="mt-2 max-w-md text-sm text-(--color-text-secondary)">
          We'll reply to <strong className="text-(--color-text-primary)">{email}</strong> within the
          SLA for {priority} priority. Save the ticket ID for follow-ups.
        </p>
        <Button
          variant="glass"
          onClick={() => {
            setSubject('');
            setEmail('');
            setDetails('');
            setCategory('account');
            setPriority('medium');
            setStatus('idle');
            setTicketId(null);
          }}
          className="mt-6"
        >
          Open another ticket
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
      <Field label="Subject" htmlFor="support-subject" required>
        <input
          id="support-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={inputClass}
          placeholder="Cannot register for FIFA Cup"
          required
        />
      </Field>

      <Field label="Reply-to email" htmlFor="support-email" required>
        <input
          id="support-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="you@example.com"
          required
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Category" htmlFor="support-category">
          <select
            id="support-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value} className="bg-(--color-bg-deep)">
                {c.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Priority" htmlFor="support-priority">
          <select
            id="support-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className={inputClass}
          >
            {PRIORITIES.map((p) => (
              <option key={p.value} value={p.value} className="bg-(--color-bg-deep)">
                {p.label} — {p.description}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="What's going on?" htmlFor="support-details" required>
        <textarea
          id="support-details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className={cn(inputClass, 'min-h-[160px] resize-y py-3 leading-relaxed')}
          placeholder="Steps you took, what you expected, what happened instead, any error messages…"
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
          Mock ticket · backend wires up in Phase 2
        </p>
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Opening ticket…
            </>
          ) : (
            <>
              Open ticket <LifeBuoy className="size-4" />
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
