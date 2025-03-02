export const USER_ROLE_ENUM = {
  USER: 0,
  ADMIN: 1,
}

export const USER_ROLE_MAP = {
  0: '用户',
  1: '管理员',
}

export const USER_ROLE_OPTIONS = Object.keys(USER_ROLE_MAP).map((key) => {
  return {
    label: USER_ROLE_MAP[key],
    value: key,
  }
})
