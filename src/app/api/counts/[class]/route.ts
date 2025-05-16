import { NextResponse, NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'

const redisUrl = process.env.UPSTASH_REDIS_REST_URL!
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN!
if (!redisUrl || !redisToken) throw new Error('Missing Upstash env vars')

const redis = new Redis({ url: redisUrl, token: redisToken })

export async function POST(request: NextRequest): Promise<NextResponse> {
  const url = new URL(request.url)
  const parts = url.pathname.split('/')
  const cls = parts[parts.length - 1]   // “Azzurri” | “Gialli” | “Rossi”

  const { action } = (await request.json()) as { action: 'inc' | 'dec' }
  const key = `cookies:${cls}`

  const val = action === 'inc'
    ? await redis.incr(key)
    : await redis.decr(key)

  return NextResponse.json({ [cls]: val })
}
