import type { ReactNode } from 'react';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'primary';

interface BadgeProps {
  tone: BadgeTone;
  children: ReactNode;
}

export const Badge = ({ tone, children }: BadgeProps) => <span className={`badge badge-${tone}`}>{children}</span>;
