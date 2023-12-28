export const host = import.meta.env.VITE_DB_URL as string

export const registerRoute = `${host}/api/auth/register`
export const loginRoute = `${host}/api/auth/login`
export const setAvatarRoute = `${host}/api/auth/setavatar`
export const allUsersRoute = `${host}/api/auth/allUsers`
export const sendMessageRoute = `${host}/api/msg/addmsg`
export const getMessagesRoute = `${host}/api/msg/getmsg`
