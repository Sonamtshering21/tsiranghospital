import supabase from '../../../lib/subabase';  // Adjust this import according to your actual Supabase setup
import { NextResponse } from 'next/server';


export async function POST(request) {
  try {
    const { announcement, fileUrl } = await request.json();

    // Validate input: ensure at least one field is provided
    if (!announcement && !fileUrl) {
      return NextResponse.json(
        { error: 'Either announcement text or file URL must be provided.' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('announcementsth') // Ensure the table name matches your schema
      .insert([{
        announcement_text: announcement || null, // Set to null if not provided
        file_url: fileUrl || null, // Set to null if not provided
      }])
      .select();

    // Log the response data from Supabase

    // Handle insertion error
    if (error) {
      return NextResponse.json(
        { error: error.message || 'Failed to insert announcement into the database' },
        { status: 500 }
      );
    }

    // Ensure data is valid and contains an ID
    if (!data || !data[0] || !data[0].id) {
      return NextResponse.json(
        { error: 'Failed to retrieve announcement ID from the database' },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json({
      message: 'Announcement uploaded successfully',
      announcementId: data[0].id, // Assuming 'id' is the column storing the announcement ID
    });

  } catch (error) {
    // Handle unexpected errors
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}



export async function GET() {
  try {
    // Fetch all rows from the 'announcementsth' table
    const { data, error } = await supabase
      .from('announcementsth') // Ensure the table name matches your schema
      .select('*'); // Select all columns

    // Handle potential errors
    if (error) {
      return NextResponse.json(
        { error: error.message || 'Failed to fetch announcements from the database' },
        { status: 500 }
      );
    }

    // Return fetched data as a response
    return NextResponse.json({
      message: 'Announcements retrieved successfully',
      announcements: data || [], // Return an empty array if no data
    });
  } catch (error) {
    // Handle unexpected errors
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}