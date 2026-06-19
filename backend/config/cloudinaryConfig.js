import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
    folder: 'University_Housing_Documents',
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
    }
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'application/pdf'
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
        const error = new Error('Only jpg, png, jpeg, and pdf files are allowed');
        error.statusCode = 400;
        return cb(error);
    }

    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 4
    }
});

export default upload;
