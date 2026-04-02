export function getClerkClient() {
  return null;
}

export function getClerkPublishableKey() {
  return import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';
}
