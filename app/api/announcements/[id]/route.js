
import supabase from '../../../../lib/subabase';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
    console.log('Params received:', params); // Check if params contain the correct id
    const { id } = params;

    // Convert the ID to an integer
    const idInt = parseInt(id, 10);
    if (isNaN(idInt)) {
        console.error('Invalid ID:', id);
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    try {
        // Attempt to delete the record in Supabase
        const { data, error } = await supabase
            .from('announcementsth')
            .delete()
            .eq('id', idInt)
            .select();

        console.log('Supabase response for delete:', { data, error });

        if (error) {
            console.error('Error from Supabase during delete:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!data || data.length === 0) {
            console.warn('No announcement found with ID:', idInt);
            return NextResponse.json({ error: 'Announcement not found' }, { status: 404 });
        }

        console.log('Deleted announcement:', data);
        return NextResponse.json({ message: 'Announcement deleted successfully', deleted: data });
    } catch (err) {
        console.error('Unexpected server error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
