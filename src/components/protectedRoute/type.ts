import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  onlyOnAuth?: boolean;
}

export type { ProtectedRouteProps };
