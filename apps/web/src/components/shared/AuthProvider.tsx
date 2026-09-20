'use client';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Mock token injection removed for Phase 8D
  // Real authentication is now handled via JWT cookies
  return <>{children}</>;
}
