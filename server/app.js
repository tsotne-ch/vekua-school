const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const dotenv = require("dotenv");
const studentModel = require("./models/student.model");
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
const axios = require("axios");

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
    let imageurl = req.body.image;
    const response = await axios.get(imageurl, {
      responseType: "arraybuffer",
    });
    const imageBuffer = Buffer.from(response.data, "binary");
    const base64Image = imageBuffer.toString("base64");
    const image = `data:${response.headers["content-type"]};base64,${base64Image}`;

    res.json({ image });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching images" });
  }
});
