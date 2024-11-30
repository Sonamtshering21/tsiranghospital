

import supabase from '../../../lib/subabase'
import { NextResponse } from 'next/server';
export async function GET() {
    try {
      // Fetch all rows from the 'announcementsth' table
      const { data } = await supabase
        .from('homepagedetails') // Ensure the table name matches your schema
        .select('*'); // Select all columns
  
      // Return fetched data as a response
      console.log(data)
      return NextResponse.json({
        message: 'homedetails retrieved successfully',
        details: data || [], // Return an empty array if no data
      });
    } catch (error) {
      console.error('Unexpected server error:', error);
      // Handle unexpected errors
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }


export async function PUT(request) {
  try {
    // Log the incoming request headers for debugging purposes
   

    // Parse the incoming JSON data
    const { headerText, totalWorkers, clinicalWorkers, nonClinicalWorkers, footerYear } = await request.json();

    
    // Initialize an object to store fields that need to be updated
    const updateFields = {};

    // Add the provided fields to the updateFields object
    if (headerText) updateFields.headertext = headerText;
    if (totalWorkers) updateFields.total_staff = totalWorkers;
    if (clinicalWorkers) updateFields.no_clinical = clinicalWorkers;
    if (nonClinicalWorkers) updateFields.no_non_clinical = nonClinicalWorkers;
    if (footerYear) updateFields.footer_year = footerYear;

    // If no data is provided to update, return an error response
    if (Object.keys(updateFields).length === 0) {
      return new Response(
        JSON.stringify({ error: 'No data provided for update' }),
        { status: 400 }
      );
    }

    // Update the row in the 'homepagedetails' table where the id matches
    const { data, error } = await supabase
      .from('homepagedetails')
      .update(updateFields)  // Use the fields that need updating
      .eq('id', 1)  // Use the 'id' from the request, assuming you want to update the row with id=1
      .select('*');  // Select all columns after the update

    // If an error occurs during the update, log and return an error response
    if (error) {
      console.error('Error updating home page details:', error);
      return new Response(
        JSON.stringify({ error: error.message || 'Failed to update home page details' }),
        { status: 500 }
      );
    }

    // Return a success response with the updated data
    return new Response(
      JSON.stringify({
        message: 'Home page details updated successfully',
        details: data || [],  // Return the updated data or an empty array if no data
      }),
      { status: 200 }
    );

  } catch (error) {
    // Handle any unexpected errors
    console.error('Unexpected server error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
