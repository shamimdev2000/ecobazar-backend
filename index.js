require('dotenv').config()
const express = require("express")
const app = express()
const cors = require("cors")
const dbConfig = require("./config/dbConfig")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")


// midddleware
app.use(express.json())
app.use(cors())

// database config
dbConfig()

app.get('/registration', (req,res)=>{
   const {email,password,confirmPassword,terms} = req.body
   let existingUser = await User.findOne({email:email})

   if(existingUser){
    return res.send({message:"User Already Exist"})
   }
   if(!terms){
    return res.send({message:"Please Accept Our Terms & Conditions"})
   }
   if(!email || !password || !confirmPassword){
    return res.send({message:"Please Fill All The Field"})
   }
   if(password !== confirmPassword){
     return res.send({message:"Password No Match"})
   }

   let user = new User({
    email:email,
    password:password,
    terms:terms
   })

    user.save()
    
     let token = jwt.sign({
        id:user.id,
        email:user.email

     },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"1d"
     })

     const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
        user: "mdshamim.en@gmail.com",
        pass: "fzzlnnmvumluknvr",
  },
});

try {
  const info = await transporter.sendMail({
    from: '"mdshamim.en@gmail.com',
    to: "email",
    subject: "Please Verify Your Email",
    html: `<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#fff;margin:20px auto;border-radius:8px;overflow:hidden"><tr><td align="center" style="background:#2ecc71;padding:20px"><h1 style="color:#fff;margin:0">Eco Bazar 🌱</h1></td></tr><tr><td style="padding:30px;color:#333"><h2 style="margin-top:0">Verify Your Email Address</h2><p>Hi user,</p><p>Thank you for signing up with<strong>Eco Bazar</strong>. Please confirm your email address to activate your account.</p><table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:30px auto"><tr><td align="center" bgcolor="#2ecc71" style="border-radius:5px"><a href="http://localhost:5173/verifyemail/${token}" target="_blank" style="display:inline-block;padding:12px 25px;font-size:16px;color:#fff;text-decoration:none;font-weight:700">Verify Email</a></td></tr></table><p>If the button above doesn't work, copy and paste this link into your browser:</p><p style="word-break:break-all;color:#2ecc71">http://localhost:5173/verifyemail/${token}</p><p>This link will expire in {{expiry_time}}.</p><p>If you didn’t create an account, you can safely ignore this email.</p><p>Thanks,<br><strong>Eco Bazar Team</strong></p></td></tr><tr><td align="center" style="background:#f4f4f4;padding:20px;font-size:12px;color:#777"><p style="margin:0">© 2026 Eco Bazar. All rights reserved.</p><p style="margin:5px 0"><a href="{{website_url}}" style="color:#2ecc71;text-decoration:none">Visit Website</a></p></td></tr></table></td></tr></table></body>`,
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}

   res.send({message: "Registration Successfully Done"})

   
})

port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log(`Server Running on port ${port}`);
    
})