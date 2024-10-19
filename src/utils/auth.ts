import { jwtVerify, SignJWT } from 'jose'
import { env } from '../env'

const key = new TextEncoder().encode(env.JWT_SECRET)

export async function decrypt(token: string) {
  try {
    const payload = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    })

    return payload
  } catch (_) {
    throw new Error('Invalid or Expired  JWT token!')
  }
}

export async function getRoleFromToken(token: string) {
  try {
    const { payload } = (await jwtVerify(token, key, {
      algorithms: ['HS256'],
    })) as { payload: { role: string } }

    return payload?.role
  } catch (_) {
    throw new Error('Invalid or Expired  JWT token!')
  }
}

export async function getUsernameFromToken(token: string) {
  try {
    const { payload } = (await jwtVerify(token, key, {
      algorithms: ['HS256'],
    })) as { payload: { username: string } }

    return payload?.username
  } catch (_) {
    throw new Error('Invalid or Expired  JWT token!')
  }
}

export async function encrypt({ username, password, role }) {
  const token = await new SignJWT({ username, password, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2 hours')
    .sign(key)

  return { token }
}
