const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const { StatusCodes } = require('http-status-codes');
const multer = require('multer');

const { BadRequestError, NotFoundError } = require('../errors/');

// LOCAL Storage

// const multerStorage = multer.diskStorage({
//     destination: function (_req, file, cb) {
//         cb(null, 'public/imgs');
//     },
//     filename: function (req, file, cb) {
//         const fileExt = path.extname(file.originalname); // get the file extention
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + `${fileExt}`);
//     },
// });

const multerStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'file-upload', // Cloudinary folder
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], // restrict file types
        use_filename: true,
        unique_filename: true,
        overwrite: false,
    },
});

function multerFileFilter(req, file, cb) {
    // check if the file is an image or not
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new BadRequestError('File is not an image'), false);
    }
}

// set max size to be 5 MB
const multerLimits = {
    fileSize: 5 * 1024 * 1024,
};

const upload = multer({ storage: multerStorage, fileFilter: multerFileFilter, limits: multerLimits });

exports.uploadProductImage = upload.single('image');

exports.uploadProductLocal = async (req, res) => {
    // Guard against missing file
    if (!req.file) {
        throw new BadRequestError('No file uploaded');
    }

    // Guard against empty file
    if (req.file.size === 0) {
        throw new BadRequestError('Uploaded file is empty');
    }
    res.status(StatusCodes.OK).json({
        image: { src: `/imgs/${req.file.filename}` },
    });
};

exports.uploadProduct = async (req, res) => {
    // Guard against missing file
    if (!req.file) {
        throw new BadRequestError('No file uploaded');
    }

    // Guard against empty file
    if (req.file.size && req.file.size === 0) {
        throw new BadRequestError('Uploaded file is empty');
    }

    res.status(StatusCodes.OK).json({
        image: {
            src: req.file.path, // secure Cloudinary URL
            public_id: req.file.filename, // store this!
        },
    });
};

/* DELETING  */
// exports.deleteProductImage = async (req, res, next) => {
//     const { public_id } = req.body; // or from req.params or query

//     if (!public_id) {
//         throw new BadRequestError('Missing public_id');
//     }

//     const result = await cloudinary.uploader.destroy(public_id);
//     if (result.result !== 'ok') {
//         throw new NotFoundError('Image not found or already deleted');
//     }

//     res.status(StatusCodes.OK).json({ message: 'Image deleted successfully' });
// };

// OR
// exports.deleteUser = async (req, res, next) => {
//     try {
//         const userId = req.params.id;

//         // Find the user
//         const user = await User.findById(userId);
//         if (!user) {
//             throw new NotFoundError('User not found');
//         }

//         // Delete Cloudinary image if it exists
//         if (user.photo?.public_id) {
//             await cloudinary.uploader.destroy(user.photo.public_id);
//         }

//         // Delete user from DB
//         await user.deleteOne();

//         res.status(200).json({ message: 'User and profile photo deleted successfully' });
//     } catch (err) {
//         next(err);
//     }
// };
