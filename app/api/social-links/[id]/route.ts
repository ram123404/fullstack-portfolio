import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import SocialLink from '@/models/SocialLink';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const data = await request.json();
    const socialLink = await SocialLink.findByIdAndUpdate(params.id, data, { new: true });
    if (!socialLink) {
      return NextResponse.json({ error: 'Social link not found' }, { status: 404 });
    }
    return NextResponse.json(socialLink);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update social link' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const socialLink = await SocialLink.findByIdAndDelete(params.id);
    if (!socialLink) {
      return NextResponse.json({ error: 'Social link not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Social link deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete social link' }, { status: 500 });
  }
}