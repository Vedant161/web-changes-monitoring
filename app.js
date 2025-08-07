const axios = require("axios");
const mailer = require("nodemailer");

var urlRazerMouse =
  "https://www.amazon.in/dp/B07F2GC4S9?ref_=cm_sw_r_cso_wa_apan_dp_9VKAQ7W7K1KS054HFY0E&starsLeft=1&language=en-IN&th=1";

var urlpixel7a = "https://www.amazon.in/Alvioni-Pixel-7a-Storage-Smartphone/dp/B0CHMTMNS1/ref=sr_1_6?keywords=google+pixel+7&sr=8-6";

function configureMail() {
  return mailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "noreplyotpverify@gmail.com",
      pass: "fcqorwhafgujmxdn",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

function sendMail(to, subject, text) {
  const transport = configureMail();

  const email = {
    from: "cybergeek630@gmail.com",
    to,
    subject,
    text,
  };

  transport.sendMail(email, (error, info) => {
    if (error) {
      console.log("Sending mail failed!");
      console.log(error);
    } else {
      console.log("Notification mail sent");
      transport.close();
    }
  });
}

function monitorChange() {
  axios
    .get(urlpixel7a)
    .then((res) => {
      if (res.data.includes("NOTIFY ME")) {
        console.log("Item is not available");
      } else if (res.data.includes("Only 1 left in stock.")) {
        console.log("Item is available");
        sendMail(
          "vedantghadge16@gmail.com",
          "Product availability details",
          "The item you were looking for only has 1 unit left in stock. Hurry up!"
        );
      } else if(res.data.includes("Add to Cart")) {
        console.log("Item is available");
        sendMail(
          "vedantghadge16@gmail.com",
          "Product is now available for purchase",
          "The item is now available for purchase"
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

setInterval(monitorChange, 10000);
console.log("Starting page monitoring...");
