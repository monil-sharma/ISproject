// const nodemailer = require("nodemailer");
// var smtpTransport = require("nodemailer-smtp-transport");
// require("dotenv").config();

// var transporter = nodemailer.createTransport(
//   smtpTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     auth: {
//       user: "solomonsalfie73@gmail.com",
//       pass: "AlfieSolomons@123",
//     },
//   })
// );

// const sendNotificationMail = function (email, name, startTime, endTime) {
//   var mailOptions = {
//     from: "solomonsalfie73@gmail.com",
//     to: email,
//     subject: "Notification of the scheduled interview",
//     text:
//       "Hello " +
//       name +
//       "! This is to inform you that an interview is scheduled from the SCALAR ACADEMY at " +
//       new Date(parseInt(startTime)).toLocaleTimeString("en-IN") +
//       "-" +
//       new Date(parseInt(endTime)).toLocaleTimeString("en-IN") +
//       " on " +
//       new Date(parseInt(startTime)).toDateString("en-IN") +
//       ".",
//   };
//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// };

// const sendUpdateMail = function (email, name, startTime, endTime) {
//   var mailOptions = {
//     from: "solomonsalfie73@gmail.com",
//     to: email,
//     subject: "Notification of the update in scheduled interview",
//     text:
//       "Hello " +
//       name +
//       "! This is to inform you that the interview which was scheduled before from the SCALAR ACADEMY has been updated with time of " +
//       new Date(parseInt(startTime)).toLocaleTimeString("en-IN") +
//       "-" +
//       new Date(parseInt(endTime)).toLocaleTimeString("en-IN") +
//       " on " +
//       new Date(parseInt(startTime)).toDateString("en-IN") +
//       ".",
//   };
//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// };

// module.exports = {
//   sendNotificationMail,
//   sendUpdateMail,
// };
