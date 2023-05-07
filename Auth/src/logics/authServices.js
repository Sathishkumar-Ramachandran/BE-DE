const Auth = require("../models/schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

let otpverifyArray = [];

const AuthService = {
  findUserByMail: async (email) => {
    const user = await Auth.findOne({ email: email });
    
    return user;
  },
  findUserByCompany: async (companyName) => {
    const user = await Auth.findOne({ company: companyName });
    return user;
  },
  registerNewAuthUser: async (params) => {
    try {
      const authUser = await Auth.create({
        name: params.name,
        email: params.email,
        password: await encrypt_salt_hash(10,params.password),
        company: params.companyName,
        user_id: params.user_id,
        user_type: params.user_type,
        deleted: false,
        verified: true,
      });
      console.log(authUser);
      return authUser;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  },
};

const UserVerification = {
  sendOtpToUser: async (email) => {
    console.log(email);
    let checkinArray = otpverifyArray.filter((x) => x.Email == email);
    if (checkinArray.length > 0) {
      let index = otpverifyArray.findIndex((item) => item.Email == email);
      if (index !== -1) {
        otpverifyArray.splice(index, 1);
      }
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const mailOptions = {
      from: "testmp123568@gmail.com",
      to: email,
      subject: "Verification",
      html: `  <div style="background-color: #f2f2f2; padding: 20px;">
        <div style="background-color: #fff; padding: 20px; border-radius: 5px;">
          <h1 style="color: #0051a0; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Double Engine</h1>
          <p style="font-size: 18px; margin-bottom: 20px;">Your verification code is:</p>
          <h2 style="font-size: 48px; margin-bottom: 20px;">${otp}</h2>
          <p style="font-size: 16px;">This code will expire in one minutes.</p>
        </div>
      </div>`,
    };
    try {
      const response = await MailToSend(mailOptions);
      if (response) {
        otpverifyArray.push({
          Email: email,
          otp: otp,
          time: new Date().getTime(),
        });

        return 1;
      } else {
        return undefined;
      }
    } catch (error) {
      return undefined;
    }
  },
  verifyOTP: async (email, otp) => {
    try {
      const info = otpverifyArray.filter((x) => x.Email == email);
      if (info.length > 0) {
        if (otp == info[0].otp) {
          if (new Date().getTime() - info[0].time <= 60000) {
            let index = otpverifyArray.findIndex((item) => item.Email == email);
            if (index !== -1) {
              otpverifyArray.splice(index, 1);
            }
            return 1;
          } else {
            let index = otpverifyArray.findIndex((item) => item.Email == email);
            if (index !== -1) {
              otpverifyArray.splice(index, 1);
            }
            return 0;
          }
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    } catch (e) {
      return undefined;
    }
  },
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "testmp123568@gmail.com", // your Gmail email address
    pass: "efonmcelrgemaqqu", // your Gmail password
  },
  tls: {
    rejectUnauthorized: false,
  },
});
const MailToSend = (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(info);
        return true;
      }
    });
  });
};

const encrypt_salt_hash = (saltRounds, plainTextPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(plainTextPassword, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};
module.exports = { AuthService, UserVerification };
