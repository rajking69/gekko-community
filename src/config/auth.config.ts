/**
 * Authentication & Authorization Configuration
 * 
 * SECURITY NOTICE:
 * - Passwords are NEVER stored in plain text or hardcoded in source code.
 * - Admin credentials must be initialized via environment variables or secure DB seed scripts with bcrypt hashing.
 * - Admin role allocation is strictly limited to whitelisted admin emails.
 */

// Whitelisted Admin emails loaded securely from environment variables, with fallback defaults
export const ADMIN_WHITELIST_EMAILS = (
  process.env.ADMIN_WHITELIST_EMAILS ||
  'president@gekko.community,gs@gekko.community'
)
  .split(',')
  .map((email) => email.trim().toLowerCase());

/**
 * Checks if a given email is allowed to have Admin access.
 * ONLY president@gekko.community and gs@gekko.community (or env configured admin emails) return true.
 */
export function isWhitelistedAdmin(email: string): boolean {
  if (!email) return false;
  return ADMIN_WHITELIST_EMAILS.includes(email.trim().toLowerCase());
}

/**
 * Determines the default role for newly registered users or Google OAuth sign-ins.
 * - Whitelisted admin emails -> 'admin'
 * - All other users -> 'member'
 */
export function getDefaultRoleForUser(email: string): 'admin' | 'member' {
  return isWhitelistedAdmin(email) ? 'admin' : 'member';
}

/**
 * Roles that an Admin is permitted to assign to other members.
 * Admins can grant 'moderator' or 'member' roles to users.
 */
export const ASSIGNABLE_ROLES_BY_ADMIN = ['member', 'verified_member', 'moderator'] as const;
