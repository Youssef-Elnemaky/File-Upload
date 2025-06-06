const path = require('path');
const { StatusCodes } = require('http-status-codes');
const multer = require('multer');

const { BadRequestError } = require('../errors/');

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/imgs');
    },
    filename: function (req, file, cb) {
        const fileExt = path.extname(file.originalname); // get the file extention
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + `${fileExt}`);
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

exports.uploadProduct = async (req, res) => {
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
