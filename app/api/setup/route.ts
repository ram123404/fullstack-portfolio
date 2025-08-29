import { NextResponse } from 'next/server';
import { createAdminUser } from '@/lib/seed';

export async function GET() {
  try {
    await createAdminUser();
    return NextResponse.json({ message: 'Setup completed successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Setup failed' }, { status: 500 });
  }
}