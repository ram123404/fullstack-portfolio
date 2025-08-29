import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { name, email, subject, message } = await request.json();

    // In a real application, you would send an email here
    // For now, we'll just log it and return success
    console.log('Contact form submission:', { name, email, subject, message });

    // You can integrate with email services like:
    // - Nodemailer with SMTP
    // - SendGrid
    // - Mailgun
    // - Amazon SES

    return NextResponse.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}