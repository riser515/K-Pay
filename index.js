const express = require('express');
const qrcode = require('qrcode');
const path = require('path');
let app = express();

let pStr = path.join(__dirname);

app.get('/', (req, res) => {
  res.sendFile(pStr + '/test2.html');
});

app.get('/api/qrcode', (req, res) => {
    let amt = req.query.amt;
    qrcode.toDataURL(`upi://pay?pa=makhechakhushi@oksbi&pn=Khushi Makhecha&pn=Test UPI&am=${amt}`, function (err, url) {
        res.send(`<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Payout K Pay</title>
            <style>
            *,
            *::before,
            *::after {
              box-sizing: border-box;
            }
            body {
              font-size: 1em;
              font-family: Verdana, Geneva, Tahoma, sans-serif;
              text-align: center;
            }
            .container {
              margin: 0;
              padding: 0;
              height: 90vh;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
            }
            button {
              width: 200px;
              height: 35px;
              border-radius: 50px;
              background-color: rgb(7, 123, 231);
              font-size: 15px;
              color: white;
            }
            button:hover {
              background-color: rgb(26, 137, 241);
            }
            h1 {
              margin-top: 0;
            }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Scan and Pay</h1>
              <div>
                <img src="${url}" alt="QR code" />
              </div>
              <div>
                <h2>
                  Amount :
                  <h1>₹${amt}</h1>
                </h2>
              </div>
              <button type="submit" onclick="history.go(-1)">Make new payment</button>
              </div>
              <script>
              function fetchAmt() {
              window.location.href = "#";
              return false;
              }
            </script>
          </body>
        </html>
        `);
    })
})

let portNumber = process.env.PORT || 3000;
app.listen(portNumber, () => {
    console.log("Connected");
})