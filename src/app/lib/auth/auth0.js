const ROLE_CLAIM = 'https://lindico.app/role';
const ROLES_CLAIM = 'https://lindico.app/roles';

export function getAuth0Domain() {
  return import.meta.env.VITE_AUTH0_DOMAIN || '';
}

export function getAuth0ClientId() {
  return import.meta.env.VITE_AUTH0_CLIENT_ID || '';
}

export function getAuth0Audience() {
  return import.meta.env.VITE_AUTH0_AUDIENCE || '';
}

export function getAuth0Roles(user) {
  const roles = user?.[ROLES_CLAIM];

  if (Array.isArray(roles)) {
    return roles;
  }

  if (typeof user?.[ROLE_CLAIM] === 'string') {
    return [user[ROLE_CLAIM]];
  }

  return [];
}
