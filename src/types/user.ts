import type { Permission, Role } from '@/config/roles.config';

export type UserStatus = 'active' | 'pending' | 'suspended' | 'banned';
export type Privacy = 'public' | 'members' | 'private';

export type PublicUser = {
  id: string;
  username: string;
  displayName: string | null;
  avatar: string | null;
  bio: string | null;
  pronouns: string | null;
  location: string | null;
  role: Role;
  xp: number;
  level: number;
  createdAt: string;
};

export type CurrentUser = PublicUser & {
  email: string;
  emailVerified: boolean;
  status: UserStatus;
  privacy: Privacy;
  permissions: Permission[];
  twoFaEnabled: boolean;
};
