export function formatDisplayName(user: { displayName?: string | null; email?: string | null } | null): string {
  if (!user) return 'User';
  
  // If display name is available, use it
  if (user.displayName) {
    return user.displayName;
  }
  
  // Otherwise, use the part before @ in email
  if (user.email) {
    const [name] = user.email.split('@');
    // Capitalize first letter
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  
  // Fallback
  return 'User';
}
