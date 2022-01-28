const { response } = require("express");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");

var PORT = process.env.PORT || 5000

const form = document.getElementById("contact-form");

const formEvent = form.addEventListener("submit", (event) => {
    event.preventDefault();
    let mail = new FormData(form)
    sendMail(mail)
})

const sendMail= (mail) =>{
    fetch("https://www.coderbass.com",{
        method: "post",
        body: mail,
    }).then((response) => {
        return response.json();
    })
}