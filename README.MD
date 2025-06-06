# Product API

## 🚀 Features
- **Retrieve all products**: Easily fetch a list of all products stored in the database.
- **Create a new product**: Add new products by submitting relevant product information (name, price, description).
- **Upload product images**:  
  - Utilizes **Multer** middleware to handle `multipart/form-data` for image uploads.  
  - Configured to enforce a **file size limit** (e.g., maximum 5MB per file) to prevent oversized uploads.  
  - Supports filtering file types to accept only image formats (JPEG, PNG, etc.) for security and consistency.  
  - Upon upload, images are stored on **Cloudinary**, providing reliable CDN delivery, automatic optimization, and easy management.  
  - Cloudinary configuration allows setting transformation parameters (e.g., resizing, compression) so that images meet specific size requirements before saving.

---

## 🛠️ Technologies Used
- **Node.js**: JavaScript runtime environment for scalable server-side development.
- **Express.js**: Fast, minimalistic web framework for building RESTful APIs.
- **Multer**: Middleware for parsing `multipart/form-data` and handling file uploads in Express.
- **Cloudinary SDK**: Node.js library to interact with Cloudinary’s API for storing and managing images.
- **MongoDB** & **Mongoose**: NoSQL database and ODM to store product details and image metadata.
- **dotenv**: Module for loading environment variables from a `.env` file into `process.env`.
- **npm**: Node.js package manager to install and manage dependencies.

---

## 📬 Routes

### 1. Get All Products
- **Endpoint**: `GET /products`
- **Description**: Retrieves a list of all products.

### 2. Upload Product Image
- **Endpoint**: `POST /products/upload`
- **Description**: Uploads an image for a product.
- **Headers**:  
  - `Content-Type: multipart/form-data`
- **Form Data**:  
  - `image` (type = file) — the image of the product.

### 3. Create a New Product
- **Endpoint**: `POST /products`
- **Description**: Creates a new product.
- **Request Body** (JSON):  
  ```json
  {
    "name": "Product Name",
    "price": 100,
    "src": "should include the src retruned from upload product image"
  }
  ```
