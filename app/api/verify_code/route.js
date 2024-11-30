

import supabase from '../../../lib/subabase'
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
      const { verificationCode } = await req.json(); // Get the verification code from the request
  
      // Fetch the verification code stored in the database
      const { data, error } = await supabase
        .from('email_verification') // Table name
        .select('verification_code') // Select the stored verification code
        .eq('id', 1) // Adjust filter as needed
        .single(); // Expect a single record
  
      if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json({ success: false, message: "No verification code found." }, { status: 400 });
      }
  
  
      // Compare the database verification code with the user input
      if (data.verification_code === verificationCode) {
        // If the codes match, return success
        return NextResponse.json({ success: true, message: "Verification successful." }, { status: 200 });
      } else {
        // If the codes don't match, return an error
        return NextResponse.json({ success: false, message: "Invalid verification code." }, { status: 400 });
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
    }
  }