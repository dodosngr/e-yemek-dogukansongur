import express from "express";
import bodyParser from "body-parser";
import mailer from "nodemailer";
import cors from "cors";

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.post("/send-mail", (req, res) => {
  var response = {};
  const transporter = mailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    auth: {
      user: "y.sepeti@yahoo.com",
      pass: "mbuwlzalfzzzmauf",
    },
  });

  const { email, name, addr, number, total, cartList } = req.body;
  

  var mailBody = `
    <p>Name: ${name}</p>
    <p>Address: ${addr}</p>
    <p>Phone Number: ${number}</p>
    <p>Cart Total: ${total} '$' </p>
    
  `;
  var orderInfo = "";
  for (var i = 0; i < cartList.length; i++) {
    const item = cartList[i];

    if (i + 1 === cartList.length) {
      orderInfo += item.name;
    } else {
      orderInfo += `${item.name}, `;
    }
  }

  mailBody += `<p>Order Info: ${orderInfo}</p>`;

  const mailOptions = {
    from: "y.sepeti@yahoo.com",
    to: email,
    subject: "E-Yemek",
    html: mailBody,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      response = {
        success: false,
        message: err.message,
      };
      res.status(500).json(response);
    } else {
      response = {
        success: true,
        message: "mail sent",
      };
      res.status(200).json(response);
    }
  });
});

app.listen(5002, () => {
  console.log("Server is running on port 5002");
});