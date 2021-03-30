export const isProd = process.env.NODE_ENV === 'production'
export const isRelease = process.env.SLS_ENV === 'release'
export const isDev = process.env.NODE_ENV === 'development'
