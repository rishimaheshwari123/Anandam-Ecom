const fs = require("fs");
const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  const options = { 
    folder: folder, 
    resource_type: "auto" 
  };

  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }

  try {
    console.log("Uploading file to Cloudinary:", file); // Log the file info
    const uploadResult = await cloudinary.uploader.upload(file.path, options);

    console.log("File uploaded to Cloudinary:", uploadResult.secure_url);
    
    // After successful upload, delete the local file
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error("Error deleting the local file:", err);
      } else {
        console.log(`Local file ${file.path} deleted successfully.`);
      }
    });

    return uploadResult;
  } catch (error) {
    console.log("Cloudinary upload error:", error);
    throw new Error("Cloudinary upload failed");
  }
};
