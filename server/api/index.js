const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const dotenv = require("dotenv");
const studentModel = require("./models/student.model");
const fs = require("fs");
const classModel = mongoose.model(
  "class",
  new Schema({ ind: Number, val: Number }),
  "classes"
);
const saturdayModel = mongoose.model(
  "saturday",
  new Schema({ id: String, name: String, surname: String }),
  "saturday"
);
const { ObjectId } = mongoose.Types;
const app = express();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const puppeteer = require("puppeteer");
const saturdayScores = mongoose.model(
  "satscores",
  new Schema({
    name: String,
    surname: String,
    score: Number,
    class: Number,
    code: String,
    math: String,
    physics: String,
  }),
  "satscores"
);

const MAX_CONCURRENT = 1;
const INTERVAL = 1000 * 24;

const nodemailer = require("nodemailer");
let ind;

let transporter = nodemailer.createTransport({
  host: "mail.vekua42.edu.ge",
  port: 465,
  secure: true,
  auth: {
    user: "no-reply@vekua42.edu.ge",
    pass: "Lololer123!",
  },
});

const mail = async (name, surname, mail, id) => {
  try {
    const info = await transporter.sendMail({
      from: '"Do not reply" <no-reply@vekua42.edu.ge>',
      to: mail,
      subject: `${name} ${surname}, რეგისტრაციის ბარათი`,
      html: `მოგესალმებით, გიგზავნით სარეგისტრაციო ბარათს რომელიც უნდა ამობეჭდოთ და მოიტანოთ გამოცდის დღეს <br><br><br> სსიპ აკადემიკოს ილია ვეკუას სახელობის ფიზიკა-მათემატიკის ქალაქ თბილისის N 42 საჯარო სკოლა.`,
      attachments: [
        {
          filename: "studentcard.pdf",
          path: `./generated_${id}.pdf`,
          contentType: "application/pdf",
        },
      ],
    });
    console.log(`Email sent to ${mail}: ${info.response}`);
  } catch (error) {
    console.error(`Failed to send email to ${mail}: ${error}`);
  }
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.listen(8080);

const uri = `mongodb+srv://${process.env.key}@vekuacluster.suzebxd.mongodb.net/?retryWrites=true&w=majority&appName=vekuacluster`;

mongoose.connect(uri).then(() => {
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send("Server up and running!");
});

app.post("/addstudent", async (req, res) => {
  try {
    if (!req.body) throw err;

    console.log(req.body);

    let found = await saturdayModel.findOne({ id: req.body.id });

    if (found) {
      res.status(401).send({
        msg: "student already in saturday school list",
        code: "42000",
      });
      return;
    }

    let classval = await classModel.findOneAndUpdate(
      { val: +req.body.class },
      {
        $inc: { ind: 1 },
      }
    );

    var str = "" + classval.ind;
    var pad = "000";
    var ans = pad.substring(0, pad.length - str.length) + str;
    let final = req.body.class + "-" + ans;

    let student = new studentModel({
      name: req.body.name,
      surname: req.body.surname,
      pname: req.body.pname,
      psurname: req.body.psurname,
      img: req.body.img,
      file: req.body.file,
      oldschool: req.body.oldschool,
      id: req.body.id,
      code: final,
      class: req.body.class,
      phone: req.body.phone,
      email: req.body.email,
      language: req.body.language,
    });

    await student.save();

    res.send(student);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get("/findstudent/:id", async (req, res) => {
  try {
    let student = await studentModel.findOne({ id: req.params.id });
    if (!student) {
      student = await saturdayModel.findOne({ id: req.params.id });
      if (!student) {
        return res.status(400).json({ err: "err" });
      }
    }
    res.json(student);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get("/check/:id", async (req, res) => {
  try {
    let found = await saturdayModel.findOne({ id: req.params.id });
    console.log(found);
    if (found) {
      res.status(401).json({
        msg: "student already in saturday school list",
        code: "42000",
      });
      return;
    } else {
      res.status(200).json({ valid: true });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.post("/loadimages", async (req, res) => {
  try {
    const imageurl = req.body.image;
    const response = await fetch(imageurl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const contentType = response.headers.get("content-type");
    const arrayBuffer = await response.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);
    const base64Image = imageBuffer.toString("base64");
    const image = `data:${contentType};base64,${base64Image}`;

    res.json({ image });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching images" });
  }
});

app.post("/score", async (req, res) => {
  try {
    const student = await saturdayScores.findOne({ code: req.body.code });

    if (!student) {
      res.json({ err: true });
    }

    console.log(student);

    if (student.class === 7) {
      res.json({
        name: student.name,
        surname: student.surname,
        code: student.code,
        class: student.class,
        score: student.score,
        err: false,
      });
    } else {
      console.log(student);
      res.json({
        name: student.name,
        surname: student.surname,
        code: student.code,
        class: student.class,
        math: student.math,
        physics: student.physics,
        err: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// app.get("/start", async (req, res) => {
//   try {
//     let list = await studentModel.find({ class: 7 });

//     list.forEach(async (entry, index) => {
//       ind = index;
//       fs.readFile("./template.html", "utf8", async (err, html) => {
//         if (err) {
//           console.log(err);
//           throw err;
//         }
//         const replaced = {
//           "{{student.id}}": entry.id,
//           "{{student.code}}": entry.code,
//           "{{student.name}}": entry.name,
//           "{{student.surname}}": entry.surname,
//           "{{student.img}}": entry.img,
//         };
//         html = html.replace(
//           /{{student.id}}|{{student.code}}|{{student.name}}|{{student.surname}}|{{student.img}}/gi,
//           (matched) => {
//             return replaced[matched];
//           }
//         );

//         const browser = await puppeteer.launch({
//           headless: "new",
//           args: ["--no-sandbox"],
//         });
//         const page = await browser.newPage();
//         await page.setContent(html, {
//           waitUntil: ["load", "networkidle0", "domcontentloaded"],
//         });
//         await page.emulateMediaType("screen");

//         const pdf = await page.pdf({
//           path: `generated.pdf`,
//           margin: { top: "30px", left: "30px", right: "30px" }, // Adjusted file naming
//           printBackground: true,
//           format: "Letter",
//           outline: true,
//           scale: 0.52,
//           displayHeaderFooter: false,
//           printBackground: true,
//         });

//         // await mail(entry.name, entry.surname, entry.email);

//         await browser.close();
//         console.log(entry.id + " was finished");
//         return;
//       });
//     });
//   } catch (error) {
//     console.log(error);
//     res.redirect("/notfound");
//   }
// });

// app.get("/start", async (req, res) => {
//   try {
//     let list = await studentModel.find();
//     const template = await fs.promises.readFile("./template.html", "utf8");

//     const queue = [];
//     let running = 0;

//     async function processEntry(entry) {
//       const replaced = {
//         "{{student.id}}": entry.id,
//         "{{student.code}}": entry.code,
//         "{{student.name}}": entry.name,
//         "{{student.surname}}": entry.surname,
//         "{{student.img}}": entry.img,
//       };

//       let html = template.replace(
//         /{{student.id}}|{{student.code}}|{{student.name}}|{{student.surname}}|{{student.img}}/gi,
//         (matched) => replaced[matched]
//       );

//       const browser = await puppeteer.launch({
//         headless: "new",
//         args: ["--no-sandbox"],
//       });

//       const page = await browser.newPage();
//       await page.setContent(html, {
//         waitUntil: ["load", "networkidle0", "domcontentloaded"],
//       });
//       await page.emulateMediaType("screen");

//       const pdf = await page.pdf({
//         path: `./generated_${entry.id}.pdf`,
//         margin: { top: "30px", left: "30px", right: "30px" },
//         printBackground: true,
//         format: "Letter",
//         outline: true,
//         scale: 0.52,
//         displayHeaderFooter: false,
//       });
//       try {
//         await mail(entry.name, entry.surname, entry.email, entry.id);

//         await delay(INTERVAL);
//       } catch (mailError) {
//         console.error(`Failed to send email to ${entry.email}: ${mailError}`);
//       }
//       await browser.close();
//       console.log(entry.id + " was finished");
//     }

//     async function runQueue() {
//       while (queue.length > 0 && running < MAX_CONCURRENT) {
//         const entry = queue.shift();
//         running++;
//         processEntry(entry).finally(() => {
//           running--;
//           runQueue();
//         });
//       }
//     }

//     list.slice(431).forEach((entry, index) => {
//       queue.push(entry);
//       console.log(index);
//     });
//     runQueue();

//     res.send("PDF generation started");
//   } catch (error) {
//     console.log(error);
//     res.redirect("/notfound");
//   }
// });

module.exports = app;
