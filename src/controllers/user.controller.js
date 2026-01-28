import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
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

    // if (fullName === "") {
    //     throw new ApiError(400, "Full name is  required")
    // }
    if (
        [fullName, email, username, password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = User.findOne({
        $or: [{ email }, { username }]
    })
    if (existedUser) {
        throw new ApiError(409, "User already exists with this email or username")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar image is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if (!avatar) {
        throw new ApiError(500, "Error in uploading avatar image")
    }
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500, "User creation failed")
    }

})
export { registerUser }