export const AUTH_SERVICE_BASE = import.meta.env.VITE_AUTH_SERVICE_BASE
  export const AUTH_SERVICE_LOGIN = `${AUTH_SERVICE_BASE}/auth-service/login`
  export const AUTH_SERVICE_LOGOUT = `${AUTH_SERVICE_BASE}/auth-service/logOut`
  export const AUTH_SERVICE_ROLE = `${AUTH_SERVICE_BASE}/auth-service/roles`
  export const AUTH_SERVICE_USER = `${AUTH_SERVICE_BASE}/auth-service/user`
  export const AUTH_SERVICE_REGIST = `${AUTH_SERVICE_BASE}/auth-service/regist`

export const MENU_SERVICE_BASE = import.meta.env.VITE_MENU_SERVICE_BASE
  export const MENU_SERVICE_MODULE = `${MENU_SERVICE_BASE}/menu-service/module`
  export const MENU_SERVICE_MENU = `${MENU_SERVICE_BASE}/menu-service/menu`
  export const MENU_SERVICE_MODULE_WITH_MENU = `${MENU_SERVICE_BASE}/menu-service/module-with-menu`