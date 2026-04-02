export function canAccessAdmin(role) {
  return role === 'admin';
}

export function isAdminUser(user) {
  const role =
    user?.publicMetadata?.role ||
    user?.unsafeMetadata?.role ||
    user?.organizationMemberships?.[0]?.role;

  return canAccessAdmin(role);
}
