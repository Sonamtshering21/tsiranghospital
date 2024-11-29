import { NextResponse } from 'next/server';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');

  // Check if a file was provided
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  // Prepare to upload the file to Cloudinary
  const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`;

  const uploadData = new FormData();
  uploadData.append('file', file);
  uploadData.append('upload_preset', 'tsiranghospitalannoucement_preset'); // Correct preset name
  uploadData.append('folder', 'tsiranghospitalannoucement'); // Explicitly specify the folder here

  try {
    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      body: uploadData,
    });

    // Check if the upload was successful
    if (!uploadResponse.ok) {
      const errorJson = await uploadResponse.json();
      throw new Error(errorJson.error.message || 'Failed to upload image to Cloudinary');
    }

    const jsonResponse = await uploadResponse.json();
    return NextResponse.json({ url: jsonResponse.secure_url }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
