## Installing Packages
- npm init -y
- npm i express
- npm i ejs
- npm i mongoose
- npm i method-override
- npm i ejs-mate
- npm i express-joi-validation joi --save (For Schema Validation)
- npm i joi
- npm install cookie-parser
- npm install express-session
- npm i connect-flash (for generating flash msg)
- npm i passport (For authentication whole library)
- npm i passport-local (for basic username and password auth)
- npm i passport-local-mongoose (for features if you are using MONGODB during auth)
- npm i multer (Help to uplaod file bcz urlencoded will not understand the uploded file data)
- npm i dotenv (helps to integrate our `.env` file to our Backend)
- npm i cloudinary multer-storage-cloudinary
- npm i connect-mongo


## Note
- In this case, the "id" variable is the ID of the listing to be updated, which is extracted from the request parameters. The "req.body.listing" is an object containing the updated data for the listing, which is obtained from the request body.
- By using the `spread operator ({...})`, the code is creating a new object that includes all the properties of "req.body.listing". This allows for selectively updating only the properties that are provided in the request body, while leaving the rest of the document unchanged.

- `starability` repo for rating

- `Cloudinary` is cloud service for storing the files
 
- Here, we use `render` for deploying our project.  There are other alternatives are also present like `netify`, `cyclic` etc.

- Before rending you website add this line to your `package.json` file so that it will not show error
- "engines": {
    "node": "22.0.0"
  },