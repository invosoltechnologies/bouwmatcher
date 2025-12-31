import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

/**
 * ONE-TIME SETUP ENDPOINT
 * Creates the admin user in Supabase Auth
 *
 * Usage: POST /api/admin/setup
 *
 * IMPORTANT: This endpoint should be disabled or protected in production!
 */
export async function POST() {
  try {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@bouwmatcher.be';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@2026Secure!';

    // Check if admin user already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const adminExists = existingUsers?.users.some(user => user.email === ADMIN_EMAIL);

    if (adminExists) {
      return NextResponse.json({
        success: false,
        message: 'Admin user already exists',
        email: ADMIN_EMAIL,
      }, { status: 400 });
    }

    // Create admin user
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        role: 'admin',
        first_name: 'Admin',
        last_name: 'User',
      },
    });

    if (error) {
      console.error('Error creating admin user:', error);
      return NextResponse.json({
        success: false,
        error: error.message,
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
    }, { status: 500 });
  }
}

/**
 * DELETE endpoint - Removes admin user (for testing)
 */
export async function DELETE() {
  try {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@bouwmatcher.be';

    // Find admin user
    const { data: users } = await supabaseAdmin.auth.admin.listUsers();
    const adminUser = users?.users.find(user => user.email === ADMIN_EMAIL);

    if (!adminUser) {
      return NextResponse.json({
        success: false,
        message: 'Admin user not found',
      }, { status: 404 });
    }

    // Delete admin user
    const { error } = await supabaseAdmin.auth.admin.deleteUser(adminUser.id);

    if (error) {
      console.error('Error deleting admin user:', error);
      return NextResponse.json({
        success: false,
        error: error.message,
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Admin user deleted successfully',
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
    }, { status: 500 });
  }
}
