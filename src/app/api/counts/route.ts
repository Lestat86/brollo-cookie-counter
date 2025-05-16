import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redisUrl = process.env.UPSTASH_REDIS_REST_URL!
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN!
if (!redisUrl || !redisToken) throw new Error('Missing Upstash env vars')

const redis = new Redis({ url: redisUrl, token: redisToken })

export async function GET(): Promise<NextResponse> {
  const [azz, gial, ros] = await Promise.all([
    redis.get('cookies:Azzurri'),
    redis.get('cookies:Gialli'),
    redis.get('cookies:Rossi'),
  ])
  return NextResponse.json({
    Azzurri: Number(azz) || 0,
    Gialli:   Number(gial) || 0,
    Rossi:    Number(ros) || 0,
  })
}
