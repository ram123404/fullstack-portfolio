import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import SocialLink from '@/models/SocialLink';

export async function GET() {
  try {
    await dbConnect();
    const socialLinks = await SocialLink.find().sort({ order: 1 });
    return NextResponse.json(socialLinks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch social links' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const data = await request.json();
    const socialLink = new SocialLink(data);
    await socialLink.save();
    return NextResponse.json(socialLink);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create social link' }, { status: 500 });
  }
}