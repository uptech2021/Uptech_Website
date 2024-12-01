const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

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

module.exports = { cloudinary, uploadConfig };
