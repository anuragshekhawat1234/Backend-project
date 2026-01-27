import { asynchandler } from "../utils/asynchandler.js";
const registerUser = asynchandler(async (req, res) => {
    // get user details from frontend 
    // validation - not empty
    // check if user already exists
    // check for images, check for avatar
    // upload them to cloudinary
    // create user object - create entry in db
    // remove password and refresh token from response
    // check for user creation
    // return response 

    const { fullName, email, username, password } = req.body
    console.log("email:", email);
})
export { registerUser }