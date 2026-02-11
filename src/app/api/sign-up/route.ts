import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();
  } catch (error) {
    console.error("Error during sign-up:", error);
    return Response.json({
      success: false,
      message: "An error occurred during sign-up. Please try again later.",
    },{ status: 500 });
  }
}
