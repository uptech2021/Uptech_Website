// Firebase configuration
const cloudinaryConfig = async () => {
    try {
      console.log("Fetching key...");
      const response = await fetch("http://localhost:3000/api/cloudinary-config");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response.ok);
      const data = await response.json();
      console.log(data.config);
      return data.config;
    } catch (error) {
      console.error("Error catching config:", error);
      throw error;
    }
  };

// Configure upload settings for different file types
const uploadConfig = {
    pdf: {
        resource_type: 'raw',
        format: 'pdf',
        type: 'upload',
        allowed_formats: ['pdf'],
        folder: 'resumes'
    },
    image: {
        resource_type: 'image',
        allowed_formats: ['jpg', 'png', 'gif', 'webp'],
        folder: 'images'
    }
};

module.exports = { cloudinaryConfig, uploadConfig };
