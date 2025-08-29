import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Profile from '@/models/Profile';

export async function GET() {
  try {
    await dbConnect();
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
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
    
    // Check if profile exists
    const existingProfile = await Profile.findOne();
    
    if (existingProfile) {
      const updatedProfile = await Profile.findByIdAndUpdate(
        existingProfile._id,
        data,
        { new: true }
      );
      return NextResponse.json(updatedProfile);
    } else {
      const profile = new Profile(data);
      await profile.save();
      return NextResponse.json(profile);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 });
  }
}