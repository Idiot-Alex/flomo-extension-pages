import instance from '@/lib/axios'
import { ApiRes } from '@/lib/type'

export async function sendEmailCode(data: any): Promise<ApiRes> {
  return await instance.post('/api/email/code', data, {
    timeout: 1000 * 5,
  })
}

export async function register(data: any): Promise<ApiRes> {
  return await instance.post('/api/user/register', data)
}

export async function login(data: any): Promise<ApiRes> {
  return await instance.post('/api/user/login', data)
}

export async function resetPwd(data: any): Promise<ApiRes> {
  return await instance.post('/api/user/reset-pwd', data)
}

export async function reloadUser(data: any): Promise<ApiRes> {
  return await instance.post('/api/user/reload', data)
}

export async function createAfdianOrder(data: any): Promise<ApiRes> {
  return await instance.post('/api/afdian/order/create', data)
}

export async function createWxOrder(data: any): Promise<ApiRes> {
  return await instance.post('/api/ltzf/wx/order/create', data, {
    timeout: 0,
  })
}

export async function createAliOrder(data: any): Promise<ApiRes> {
  return await instance.post('/api/zpay/ali/order/create', data, {
    timeout: 0,
  })
}

/**
 * 查询订单状态
 * @param data { orderId: xxx }
 * @returns 
 */
export async function queryOrderStatus(data: any): Promise<ApiRes> {
  return await instance.post('/api/order/query', data, {
    timeout: 1000 * 5,
  })
}

// oauth google login
export async function oauthGoogleLogin(): Promise<ApiRes> { 
  return await instance.post('/api/oauth/google/login', {}, {
    timeout: 1000 * 5,
  })
}

// oauth google register
export async function oauthGoogleRegister(): Promise<ApiRes> { 
  return await instance.post('/api/oauth/google/register', {}, {
    timeout: 1000 * 5,
  })
}