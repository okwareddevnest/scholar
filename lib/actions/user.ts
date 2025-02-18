'use server';

import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import User from "@/models/User";
import connectDB from "../mongodb";

export async function syncUser(kindeUser: KindeUser) {
  if (!kindeUser?.id) return null;

  try {
    await connectDB();

    // Try to find existing user
    let user = await User.findOne({ kindeId: kindeUser.id });

    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({
        kindeId: kindeUser.id,
        email: kindeUser.email,
        firstName: kindeUser.given_name,
        lastName: kindeUser.family_name,
        picture: kindeUser.picture,
        role: 'student', // Default role
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      // Update existing user with latest Kinde data
      user = await User.findOneAndUpdate(
        { kindeId: kindeUser.id },
        {
          email: kindeUser.email,
          firstName: kindeUser.given_name,
          lastName: kindeUser.family_name,
          picture: kindeUser.picture,
          updatedAt: new Date(),
        },
        { new: true }
      );
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error('Error syncing user with database:', error);
    return null;
  }
}

export async function getUserData(kindeId: string) {
  try {
    await connectDB();
    const user = await User.findOne({ kindeId }).lean();
    return user ? JSON.parse(JSON.stringify(user)) : null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

export async function updateUserData(kindeId: string, data: any) {
  try {
    await connectDB();
    const user = await User.findOneAndUpdate(
      { kindeId },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
      { new: true }
    ).lean();
    return user ? JSON.parse(JSON.stringify(user)) : null;
  } catch (error) {
    console.error('Error updating user data:', error);
    return null;
  }
} 