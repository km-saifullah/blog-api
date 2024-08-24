require("dotenv").config();
const path = require("path");
const express = require("express");
const multer = require("multer");
const { connectDb } = require("./db/db.config");
const { secureApi } = require("./middleware/secureApi");
const checkValidation = require("./middleware/checkValidation");
const registerUser = require("./controller/registration");
const loginUser = require("./controller/loginController");
const loginValidation = require("./middleware/loginValidation");
const emailVerification = require("./controller/emailVerification");
const createBlog = require("./controller/createBlog");
const getAllBlogs = require("./controller/getAllBlogs");
const blogPostValidation = require("./middleware/blogPostValidation");
const getAllUsers = require("./controller/getAllUsers");
const createCategory = require("./controller/createCategory");
const deleteCategory = require("./controller/deleteCategory");
const editCategory = require("./controller/editCategory");
const deleteAllCategory = require("./controller/deleteAllCategory");
const showAllCategory = require("./controller/showAllCategory");
const editBlogController = require("./controller/editBlogController");
const deleteBlogController = require("./controller/deleteBlogController");

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
let upload = multer({ storage: storage });

// database connection
connectDb();

// user routes
app.post("/registration", checkValidation, registerUser);
app.get("/getallusers", getAllUsers);
app.post("/login", loginValidation, loginUser);

// blog routes
app.post(
  "/blogpost",
  secureApi,
  upload.single("avatar"),
  blogPostValidation,
  createBlog
);
app.get("/getblogs", secureApi, getAllBlogs);
app.post("/edit-blog", upload.single("avatar"), editBlogController);
app.post("/delete-blog", deleteBlogController);

// category routes
app.get("/getallcategory", showAllCategory);
app.post("/createcategory", secureApi, createCategory);
app.delete("/deletecategory/:id", secureApi, deleteCategory);
app.post("/editcategory", secureApi, editCategory);
app.post("/deleteallcategory", secureApi, deleteAllCategory);

// email verification
app.get("/:email", emailVerification);

// start the server
app.listen(port, () => console.log(`Server is running on port:${port}`));
