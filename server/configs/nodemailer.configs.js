const nodemailer = require("nodemailer");
const app = require("../app");
//const { getMaxListeners } = require("../models/usermodel");

app.post('/api/forma', (req, res) => {

  let data = req.body;

  let smtpTransport = nodemailer.createTransport({
    service: getMaxListeners,
    port: 465,
    auth:{
      user: 'mayafinalproject@gmail.com',
      pass: ' /Se6>,GhE)2drCCN',
    }
  });


  let mailOptions = {
    from: data.email,
    to: 'mayafinalproject@gmail.com',
    subject: `Message from ${data.name}`,
    html: `

    <h3>Here is a Recipe that you might like ! </h3>
    <p>From ${data.name} ${data.lastname}</p>
    <p> ${data.email}</p>

    <h3>Message : </h3>
    <p> ${data.message}</p>

    `
  };

  smtpTransport.sendMail(mailOptions, (error, res) => {

    if (error) {
      res.send(error)
    } else {
      res.send(`Email sent with success !`)
    }
  })

  smtpTransport.close()

});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`erver starting at port ${PORT}`)
})

/* const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport(options[, defaults])

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "http://localhost:3000",
    port: 465,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
 */