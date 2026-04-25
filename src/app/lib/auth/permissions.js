export function canAccessAdmin(role) {
  return role === 'admin';
}

export function isAdminUser(user) {
  const role =
    user?.['https://lindico.app/role'] ||
    user?.role ||
    user?.roles?.[0] ||
    user?.['https://lindico.app/roles']?.[0];

  return canAccessAdmin(role || '');
}
