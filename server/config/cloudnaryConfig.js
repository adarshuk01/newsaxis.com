const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dubzzfngy',
  api_key: process.env.CLOUDINARY_API_KEY || '995155496645999',
  api_secret: process.env.CLOUDINARY_API_SECRET || '6WbJBaXEtixQL1UVfYH3VVXK-aY',
});

// Validate Cloudinary configuration
if (!cloudinary.config().cloud_name || !cloudinary.config().api_key || !cloudinary.config().api_secret) {
  console.error('Cloudinary configuration is missing. Please set the environment variables.');
  process.exit(1);
}

console.log('Cloudinary configuration loaded successfully.');

/**
 * Upload a single image to Cloudinary.
 * @param {string} filePath - Path of the image to upload.
 * @returns {Promise<string>} - The secure URL of the uploaded image.
 */
async function uploadImageToCloudinary(filePath) {
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: 'newsaxis',
      use_filename: true,
    });
    console.log(`Uploaded: ${filePath} -> URL: ${uploadResult.secure_url}`);
    return uploadResult.secure_url;
  } catch (error) {
    console.error(`Failed to upload ${filePath}:`, error.message);
    throw error; // Re-throw the error for upstream handling
  }
}

/**
 * Upload all valid image files in a folder to Cloudinary.
 * @param {string} folderPath - Path of the folder containing images.
 * @returns {Promise<string[]>} - An array of secure URLs for the uploaded images.
 */
async function uploadAllImages(folderPath) {
  try {
    const files = fs.readdirSync(folderPath);
    const uploadedUrls = [];

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      if (fs.statSync(filePath).isFile() && /\.(png|jpe?g|webp)$/i.test(file)) {
        console.log(`Uploading: ${filePath}`);
        const url = await uploadImageToCloudinary(filePath);
        uploadedUrls.push(url); // Collect the URL
      } else {
        console.log(`Skipping: ${filePath} (not a valid image file)`);
      }
    }

    console.log('All images uploaded successfully.');
    return uploadedUrls; // Return the array of URLs
  } catch (error) {
    console.error('Error uploading images:', error.message);
    throw error; // Re-throw the error for upstream handling
  }
}

module.exports = { uploadAllImages }; // Export the function
