export interface ApiRes {
  success: boolean,
  msg: string,
  data?: any,
}

export interface UserInfo {
  email: string
  plan: string
  expiredTime: string
  [key: string]: unknown
}

export interface PayOption {
  title: string
  month: number
  price: number
  payPrice: number
}

export const FLOMO_EXTENSION_FILE_URL = 'https://flomo-extension-r2.hotstrips.org/flomo-extension-1.20.0-chrome.zip'
export const FLOMO_EXTENSION_WEB_STORE_URL = 'https://chromewebstore.google.com/detail/flomo-extension/oepgmpdaajlphmdkepgcgchlmnbpmddf'
export const FLOMO_EXTENSION_WEB_URL = 'https://flomo-extension-pages.hotstrips.org'
