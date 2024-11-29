import supabase from '../../../lib/subabase';  // Adjust this import according to your actual Supabase setup
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { announcement, fileUrl } = await request.json();

    // Validate required fields
    if (!announcement || !fileUrl) {
      return NextResponse.json(
        { error: 'Announcement text and file URL are required' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('announcementsth')
      .insert([{ announcement_text: announcement, file_url: fileUrl }]);

    // Log the response data from Supabase
    console.log('Supabase insert response:', { data, error });

    // Handle insertion error
    if (error) {
      console.error('Supabase insertion error:', error); // Log error for debugging
      return NextResponse.json(
        { error: error.message || 'Failed to insert announcement into database' },
        { status: 500 }
      );
    }

    // Ensure data is valid and contains an ID
    if (!data || !data[0] || !data[0].id) {
      console.error('No data returned or missing ID', { data }); // Log the response to help debug
      return NextResponse.json(
        { error: 'Failed to retrieve announcement ID from database' },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json({
      message: 'Announcement uploaded successfully',
      announcementId: data[0].id,  // Assuming 'id' is the column storing the announcement ID
    });

  } catch (error) {
    // Handle unexpected errors
    console.error('Unexpected error:', error); // Log unexpected errors for debugging
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}