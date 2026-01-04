import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import UserProfile from '@/models/UserProfile';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const userProfile = await UserProfile.findOne({ userId: session.user.id });
    
    if (!userProfile) {
      // Create default profile if none exists
      const defaultProfile = new UserProfile({
        userId: session.user.id,
        selectedTemplate: 'developer',
        username: session.user.email?.split('@')[0] || 'user',
        customizations: {
          colorScheme: {
            primary: '#3B82F6',
            secondary: '#1E293B',
            accent: '#10B981',
          },
          layout: {
            showBlog: false,
            showTestimonials: false,
            showCertifications: false,
          },
        },
        seoSettings: {
          title: 'Professional Portfolio',
          description: 'Welcome to my professional portfolio',
          keywords: [],
        },
      });
      
      await defaultProfile.save();
      return NextResponse.json(defaultProfile);
    }
    
    return NextResponse.json(userProfile);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user profile' }, { status: 500 });
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
    
    const userProfile = await UserProfile.findOneAndUpdate(
      { userId: session.user.id },
      {
        userId: session.user.id,
        ...data,
      },
      { 
        new: true, 
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );
    
    return NextResponse.json(userProfile);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save user profile' }, { status: 500 });
  }
}