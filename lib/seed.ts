import bcrypt from 'bcryptjs';
import dbConnect from './mongodb';
import User from '../models/User';

export async function createAdminUser() {
  try {
    await dbConnect();
    
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Check if admin user already exists
    const existingUser = await User.findOne({ email: adminEmail });
    
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      
      const adminUser = new User({
        email: adminEmail,
        password: hashedPassword,
      });
      
      await adminUser.save();
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}