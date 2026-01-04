import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import UserProfile from '@/models/UserProfile';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    await dbConnect();
    const userProfile = await UserProfile.findOne({ username: params.username });
    
    if (!userProfile) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }
    
    return NextResponse.json(userProfile);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}