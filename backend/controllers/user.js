import path from 'path';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import User from '../models/UserModel.js';
import UserDetails from '../models/UserModel.js';
import BusinessInfo from '../models/business_info_model.js';
// import { BusinessInfo } from '../models/business_info_model.js';
// import BusinessInfo from '../models/business_info_model.js';

export const signup = async (req, res) => {
  const { username, password, email, role } = req.body;
  try {
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, password: hashPassword, email, role });
    await newUser.save();

    res.json({
      success: "true",
      message: "User created successfully!"
    });
  } catch (err) {
    res.json({
      success: "false",
      message: `${err.message}`
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.json({ success: "false", message: "No existing user with such email" });
    }
    const validPass = bcryptjs.compareSync(password, validUser.password);
    if (!validPass) {
      return res.json({ success: "false", message: "Password incorrect" });
    }

    const token = jwt.sign({ id: validUser._id }, "secret#token");
    const { password: pass, ...user } = validUser._doc;
    return res.json({ success: "true", token, user });

  } catch (err) {
    res.json({
      success: "false",
      message: `${err.message}`
    });
  }
};

export const ping = (req, res) => {
  res.send("Namaste! Welcome to the products API.");
  console.log("Request at /ping");
};

export const getUserProfile = async (req, res) => {
  console.log("Request at /get-user-profile");
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret#token");
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ msg: "User not found", status: "error" });
    }

    const user_details = await UserDetails.findOne({
      personal_contact_number: user.personal_contact_number,
    });
    const business_info = await BusinessInfo.findOne({
      personal_contact_number: user.personal_contact_number,
    });

    if (user_details) {
      return res.status(200).json({
        user_details: user_details,
        business_info: business_info,
        status: "ok",
      });
    } else {
      return res.status(400).json({ msg: "User details not found", status: "error" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const profileImage = async (req, res) => {
  console.log("Request at /profile-image");

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret#token");
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const user_details = await UserDetails.findOne({
      personal_contact_number: user.personal_contact_number,
    });

    if (!user_details) {
      return res.status(404).json({ message: "User details not found" });
    }

    const imagePath = path.join(
      process.cwd(),
      "uploads/profile_images/",
      user_details.profile_image_id,
    );
    res.sendFile(imagePath);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const updateUserProfile = async (req, res) => {
  console.log("Request at /update-user-profile");

  const {
    first_name,
    last_name,
    personal_email,
    personal_contact_number,
    personal_address,
    business_name,
    business_email,
    business_contact_number,
    business_address,
    business_about,
    business_account_number,
    business_gstin,
  } = req.body;

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret#token");
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ msg: "User not found", status: "error" });
    }

    const user_details = await UserDetails.findOne({
      personal_contact_number: user.personal_contact_number,
    });
    const business_info = await BusinessInfo.findOne({
      personal_contact_number: user.personal_contact_number,
    });

    if (user_details) {
      // Update User Details
      user_details.first_name = first_name;
      user_details.last_name = last_name;
      user_details.personal_email = personal_email;
      user_details.personal_contact_number = personal_contact_number;
      user_details.personal_address = personal_address;
      await user_details.save();

      // Update Business Info
      business_info.business_name = business_name;
      business_info.business_email = business_email;
      business_info.business_contact_number = business_contact_number;
      business_info.business_address = business_address;
      business_info.business_about = business_about;
      business_info.business_account_number = business_account_number;
      business_info.business_gstin = business_gstin;
      await business_info.save();

      return res.status(200).json({ status: "ok" });
    } else {
      return res.status(400).json({ msg: "User details not found", status: "error" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
