export const AUTH_SERVICE_BASE = import.meta.env.VITE_AUTH_SERVICE_BASE
  export const AUTH_SERVICE_LOGIN = `${AUTH_SERVICE_BASE}/auth-service/login`
  export const AUTH_SERVICE_LOGOUT = `${AUTH_SERVICE_BASE}/auth-service/logOut`
  export const AUTH_SERVICE_ROLE = `${AUTH_SERVICE_BASE}/auth-service/roles`
  export const AUTH_SERVICE_USER = `${AUTH_SERVICE_BASE}/auth-service/user`
  export const AUTH_SERVICE_REGIST = `${AUTH_SERVICE_BASE}/auth-service/regist`
  export const REFRESH_TOKEN = `${AUTH_SERVICE_BASE}/auth-service/refresh-token`
  export const GENERATE_REFRESH_TOKEN = `${AUTH_SERVICE_BASE}/auth-service/generate-refresh-token`

export const MENU_SERVICE_BASE = import.meta.env.VITE_MENU_SERVICE_BASE
  export const MENU_SERVICE_MODULE = `${MENU_SERVICE_BASE}/menu-service/module`
  export const MENU_SERVICE_MENU = `${MENU_SERVICE_BASE}/menu-service/menu`
  export const MENU_SERVICE_MODULE_WITH_MENU = `${MENU_SERVICE_BASE}/menu-service/module-with-menu`
  export const MENU_SERVICE_ALL_MODULE_MENU = `${MENU_SERVICE_BASE}/menu-service/all-module-menu`
  export const MENU_SERVICE_PERMISSON = `${MENU_SERVICE_BASE}/menu-service/permission`

export const MEMBER_SERVICE_BASE = import.meta.env.VITE_MEMBER_SERVICE_BASE
  export const MEMBER_SERVICE_API = `${MEMBER_SERVICE_BASE}/member-service/member`