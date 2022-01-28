const express = require("express");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

const app = express();

const transporter = nodemailer.createTransport({
   host: "smtp.live.com", //email provider
   port: 587,
   auth: {
     // user: process.env.EMAIL,
     // pass: process.env.PASS
     user: "bassey.rhema@hotmail.com",
     pass: "E8ftsc69vK@c]6! "
   },
})

transporter.verify(function(error, success){
   if (error){
      console.log(error);
   }else {
      console.log("Server is ready to take our messages")
   }
})

app.post("/send", (req,res) => {
   let form = new multiparty.Form();
   let data = {};
   form.parse(req, function (err, fields){
      console.log(fields);
      Object.keys(fields).forEach(function (property){
         data[property] = fields[property].toString();
      })

   
      const mail = {
      from: `${data.name} <bassey.rhema@hotmail.com>`, //Essentially outlook/hotmail doesn't let you send email from a account you don't own. 
      //So take the original user's email and put it in the body of the text then make the FROM to be your email TO your email.
      to: "bassey.rhema@hotmail.com",
      // to: process.env.EMAIL,
      subject: data.subject,
      // text: `${data.firstName} <${data.email}> \n${data.message}`,
      html: `
      <p><b>Name:</b> ${data.name}<p>
      <p><b>Email:</b> ${data.email}<p>
      <p style="margin-top: 50px">${data.message}</p>`,
    };

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
         res.sendFile(path.join(path.join(__dirname, ".", "public"), "message-sent.html"))
      //   res.status(200).send("Email successfully sent to recipient! You can close the tab, or go back.");
        // res.status(200).json({status: 'success'})
      }
    });
   })
})

const path = require("path")
const publicPath = path.join(__dirname, ".", "public");

const port = process.env.PORT || 5000;
app.use(express.static(publicPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
app.listen(5000, () => {
  console.log("Server is up! Go to: http://localhost:5000/");
});
