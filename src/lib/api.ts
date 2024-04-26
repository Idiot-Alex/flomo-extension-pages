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