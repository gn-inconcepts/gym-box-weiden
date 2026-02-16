import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Simple rate limiting (in-memory, resets on restart)
const rateLimit = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 3; // Max 3 submissions per hour per IP

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const requests = rateLimit.get(ip) || [];

    // Filter out old requests
    const recentRequests = requests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);

    if (recentRequests.length >= MAX_REQUESTS) {
        return false;
    }

    recentRequests.push(now);
    rateLimit.set(ip, recentRequests);
    return true;
}

// Escape HTML special characters to prevent HTML injection
function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
}

// Input length limits
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 5000;

export async function POST(request: NextRequest) {
    try {
        // Check Content-Type
        const contentType = request.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return NextResponse.json(
                { error: 'Content-Type must be application/json' },
                { status: 415 }
            );
        }

        // Check if Resend is configured
        if (!resend) {
            return NextResponse.json(
                { error: 'Email service not configured. Please contact us directly.' },
                { status: 503 }
            );
        }

        const body = await request.json();
        const { interest, honeypot } = body;

        // Trim whitespace from all inputs before validation
        const name = typeof body.name === 'string' ? body.name.trim() : '';
        const email = typeof body.email === 'string' ? body.email.trim() : '';
        const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
        const message = typeof body.message === 'string' ? body.message.trim() : '';

        // Honeypot spam protection (hidden field)
        if (honeypot) {
            return NextResponse.json(
                { error: 'Spam detected' },
                { status: 400 }
            );
        }

        // Rate limiting
        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
                { status: 429 }
            );
        }

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, E-Mail und Nachricht sind Pflichtfelder.' },
                { status: 400 }
            );
        }

        // Input length validation
        if (name.length > MAX_NAME_LENGTH) {
            return NextResponse.json(
                { error: `Name darf maximal ${MAX_NAME_LENGTH} Zeichen lang sein.` },
                { status: 400 }
            );
        }
        if (email.length > MAX_EMAIL_LENGTH) {
            return NextResponse.json(
                { error: `E-Mail darf maximal ${MAX_EMAIL_LENGTH} Zeichen lang sein.` },
                { status: 400 }
            );
        }
        if (phone && phone.length > MAX_PHONE_LENGTH) {
            return NextResponse.json(
                { error: `Telefonnummer darf maximal ${MAX_PHONE_LENGTH} Zeichen lang sein.` },
                { status: 400 }
            );
        }
        if (message.length > MAX_MESSAGE_LENGTH) {
            return NextResponse.json(
                { error: `Nachricht darf maximal ${MAX_MESSAGE_LENGTH} Zeichen lang sein.` },
                { status: 400 }
            );
        }

        // Email validation (improved regex)
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' },
                { status: 400 }
            );
        }

        // Phone number validation (allow digits, spaces, +, -, parentheses only)
        if (phone) {
            const phoneRegex = /^[0-9\s+\-()]+$/;
            if (!phoneRegex.test(phone)) {
                return NextResponse.json(
                    { error: 'Telefonnummer darf nur Ziffern, Leerzeichen, +, -, und Klammern enthalten.' },
                    { status: 400 }
                );
            }
        }

        // Escape all user inputs for HTML email templates
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safePhone = escapeHtml(phone);
        const safeMessage = escapeHtml(message);

        // Interest label mapping
        const interestLabels: Record<string, string> = {
            erstberatung: 'Kostenlose Erstberatung',
            gym: 'Das Gym — Mitgliedschaft',
            box: 'The Box — CrossFit',
            personal: 'Personal Training',
            analyse: 'Körperanalyse / Gesundheitscheck',
            ernaehrung: 'Ernährungscoaching',
            physio: 'Physiotherapie',
            firmen: 'Firmen-Fitness',
            kinder: 'Kindertraining',
            sonstiges: 'Sonstiges',
        };

        const interestLabel = interest ? interestLabels[interest] || escapeHtml(String(interest)) : 'Nicht angegeben';

        // Send email to gym owner
        const ownerEmailHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #10b981; color: white; padding: 20px; text-align: center; }
                    .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
                    .field { margin-bottom: 15px; }
                    .label { font-weight: bold; color: #555; }
                    .value { color: #000; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Neue Kontaktanfrage von GYM & BOX Website</h1>
                    </div>
                    <div class="content">
                        <div class="field">
                            <span class="label">Name:</span>
                            <span class="value">${safeName}</span>
                        </div>
                        <div class="field">
                            <span class="label">E-Mail:</span>
                            <span class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></span>
                        </div>
                        ${phone ? `
                        <div class="field">
                            <span class="label">Telefon:</span>
                            <span class="value"><a href="tel:${safePhone}">${safePhone}</a></span>
                        </div>
                        ` : ''}
                        <div class="field">
                            <span class="label">Interesse an:</span>
                            <span class="value">${interestLabel}</span>
                        </div>
                        <div class="field">
                            <span class="label">Nachricht:</span>
                            <div style="background: white; padding: 15px; border-left: 3px solid #10b981; margin-top: 10px;">
                                ${safeMessage.replace(/\n/g, '<br>')}
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        await resend.emails.send({
            from: 'GYM & BOX <noreply@gymandbox.at>',
            to: 'bernhard@personal-fitnesstrainer.at',
            subject: `Neue Kontaktanfrage: ${interestLabel}`,
            html: ownerEmailHTML,
            replyTo: email,
        });

        // Send auto-reply to customer
        const autoReplyHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #10b981; color: white; padding: 20px; text-align: center; }
                    .content { padding: 20px; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>GYM & BOX</h1>
                        <p>Weiden am See</p>
                    </div>
                    <div class="content">
                        <p>Hallo ${safeName},</p>

                        <p>Vielen Dank für deine Anfrage! Wir haben deine Nachricht erhalten und werden uns so schnell wie möglich bei dir melden.</p>

                        <p><strong>Deine Anfrage:</strong><br>
                        ${interestLabel}</p>

                        <p>Falls du sofort Kontakt aufnehmen möchtest:</p>
                        <ul>
                            <li>📞 <a href="tel:+4369911095336">+43 699 1109 5336</a></li>
                            <li>📧 <a href="mailto:bernhard@personal-fitnesstrainer.at">bernhard@personal-fitnesstrainer.at</a></li>
                            <li>📍 Friedhofgasse 45, 7121 Weiden am See</li>
                        </ul>

                        <p>Wir freuen uns darauf, dich kennenzulernen!</p>

                        <p>Sportliche Grüße,<br>
                        Dein GYM & BOX Team</p>
                    </div>
                    <div class="footer">
                        <p>GYM & BOX | Friedhofgasse 45, 7121 Weiden am See<br>
                        <a href="https://www.instagram.com/bernhardtrainiert/">Instagram</a> |
                        <a href="https://www.facebook.com/Bernhardtrainiert/">Facebook</a></p>
                    </div>
                </div>
            </body>
            </html>
        `;

        await resend.emails.send({
            from: 'GYM & BOX <noreply@gymandbox.at>',
            to: email,
            subject: 'Deine Anfrage bei GYM & BOX — Wir melden uns!',
            html: autoReplyHTML,
        });

        return NextResponse.json(
            { message: 'Nachricht erfolgreich gesendet!' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' },
            { status: 500 }
        );
    }
}
