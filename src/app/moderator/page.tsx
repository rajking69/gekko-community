import { AdminShell } from '@/components/admin/admin-shell';
import { ModeratorDashboard } from '@/components/moderator/moderator-dashboard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Moderator Console | Team Gekko',
  description: 'Team Gekko Community Moderation & Safety Dashboard',
  robots: { index: false, follow: false },
};

export default function ModeratorPage() {
  return (
    <AdminShell>
      <ModeratorDashboard />
    </AdminShell>
  );
}
