// types to describe all types used in the entire project (only for the beginning of the name 'root' - type name)

export type rootAuthState = {
  token: null | string,
  role: null | EnumUsersRoles
}

export enum EnumUsersRoles {
  admin = 'admin',
  user = 'user',
}
