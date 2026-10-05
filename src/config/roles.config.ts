export const ROLES = [
  'guest',
  'member',
  'verified_member',
  'contributor',
  'moderator',
  'developer',
  'admin',
  'super_admin',
  'owner',
] as const;

export type Role = (typeof ROLES)[number];

/** Roles permitted to access the admin console + (currently) to sign in at all. */
export const ADMIN_ROLE_NAMES = ['admin', 'super_admin', 'owner'] as const;

export const PERMISSIONS = [
  'view_admin',
  'manage_users',
  'manage_roles',
  'manage_posts',
  'publish_posts',
  'manage_gallery',
  'moderate_gallery',
  'manage_events',
  'manage_event_participants',
  'manage_games',
  'moderate_games',
  'manage_announcements',
  'broadcast_announcements',
  'manage_tickets',
  'assign_tickets',
  'view_analytics',
  'view_audit_logs',
  'manage_settings',
  'manage_feature_flags',
  'manage_system',
  'impersonate_users',
] as const;

export type Permission = (typeof PERMISSIONS)[number];
