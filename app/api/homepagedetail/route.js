

import supabase from '../../../lib/subabase'
import { NextResponse } from 'next/server';

export async function PATCH(request) {
  try {
    // Parse the incoming JSON data
    const { headerText, totalWorkers, clinicalWorkers, nonClinicalWorkers, footerYear } = await request.json();
   
    // Initialize an object to store fields that need to be updated
    const updateFields = {};

    // Add the provided fields to the updateFields object only if they are not null or undefined
    if (headerText !== null && headerText !== undefined) updateFields.headertext = headerText;
    if (totalWorkers !== null && totalWorkers !== undefined) updateFields.total_staff = totalWorkers;
    if (clinicalWorkers !== null && clinicalWorkers !== undefined) updateFields.no_clinical = clinicalWorkers;
    if (nonClinicalWorkers !== null && nonClinicalWorkers !== undefined) updateFields.no_non_clinical = nonClinicalWorkers;
    if (footerYear !== null && footerYear !== undefined) updateFields.footer_year = footerYear;

    // If no data is provided to update, return an error response
    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { error: 'No data provided for update' },
        { status: 400 }
      );
    }

    // Wait for the update to complete in the database
    const { data, error } = await supabase
      .from('homepagedetails')
      .update(updateFields)  // Use the fields that need updating
      .eq('id', 1)  // Use the 'id' from the request
      .select('*');  // Select all columns after the update

    // If an error occurs during the update
    if (error) {
      console.error('Error updating home page details:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to update home page details' },
        { status: 500 }
      );
    }

    // Return a success response with the updated data
    return NextResponse.json({
      message: 'Home page details updated successfully',
      details: data || [],
    });

  } catch (error) {
    console.error('Unexpected server error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}


export async function GET() {
    try {
      // Fetch all rows from the 'announcementsth' table
      const { data } = await supabase
        .from('homepagedetails') // Ensure the table name matches your schema
        .select('*') // Select all columns
        .eq('id', 1); // Filter by id = 1
  
      // Return fetched data as a responses
     
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
