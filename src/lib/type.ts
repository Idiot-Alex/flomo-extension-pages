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
  /** 仅用于展示的参考价，不作为订单金额 */
  price: number
  /** 实际提交给订单接口的金额 */
  payPrice: number
}

export const FLOMO_EXTENSION_FILE_URL = 'https://flomo-extension-r2.hotstrips.org/flomo-extension-1.30.1-chrome.zip'
export const FLOMO_EXTENSION_WEB_STORE_URL = 'https://chromewebstore.google.com/detail/flomo-extension/oepgmpdaajlphmdkepgcgchlmnbpmddf'
export const FLOMO_EXTENSION_WEB_URL = 'https://hotstrips.org'
// Keep payment callbacks on the legacy origin until its provider allowlists and account-return flow are migrated and verified.
export const FLOMO_EXTENSION_PAYMENT_RETURN_URL = 'https://flomo-extension-pages.hotstrips.org'
