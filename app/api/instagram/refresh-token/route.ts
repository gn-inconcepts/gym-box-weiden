import { NextRequest, NextResponse } from 'next/server';

/**
 * Refresh a long-lived Instagram Graph API access token.
 * Long-lived tokens are valid for 60 days. Call this endpoint before expiry
 * to get a new token, then update the env var in Vercel.
 *
 * Usage: GET /api/instagram/refresh-token?token=YOUR_CURRENT_TOKEN
 * Or: GET /api/instagram/refresh-token (uses INSTAGRAM_ACCESS_TOKEN from env)
 *
 * The refreshed token must be manually updated in Vercel environment variables.
 */
export async function GET(request: NextRequest) {
    try {
        // Verify cron secret for security
        const CRON_SECRET = process.env.CRON_SECRET;
        if (!CRON_SECRET) {
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }
        const authHeader = request.headers.get('authorization');
        if (authHeader !== `Bearer ${CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const token = request.nextUrl.searchParams.get('token') || process.env.INSTAGRAM_ACCESS_TOKEN;

        if (!token) {
            return NextResponse.json(
                { error: 'No token provided. Pass ?token=YOUR_TOKEN or set INSTAGRAM_ACCESS_TOKEN env var.' },
                { status: 400 }
            );
        }

        const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`;
        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json(
                { error: 'Token refresh failed', details: errorText },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json({
            message: 'Token refreshed successfully. Update INSTAGRAM_ACCESS_TOKEN in Vercel with the new token below.',
            access_token: data.access_token,
            token_type: data.token_type,
            expires_in_seconds: data.expires_in,
            expires_in_days: Math.round(data.expires_in / 86400),
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Token refresh failed', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
