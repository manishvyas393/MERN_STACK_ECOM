const nodemailer = require("nodemailer")


const sendEmail = async(options) => {
      const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                  user: process.env.email,
                  pass: process.env.pass
            },
      })
      const mailoptions = {
            from: process.env.email,
            to: options.email,
            subject: options.subject,
            text:options.message,
      }
      await transporter.sendMail(mailoptions)
}
module.exports=sendEmail