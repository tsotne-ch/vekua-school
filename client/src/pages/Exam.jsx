import React, { useEffect } from "react";
import { saveAs } from "file-saver";
import { FcLock } from "react-icons/fc";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { FcGraduationCap } from "react-icons/fc";
import { Button, Label, TextInput, Select, FileInput } from "flowbite-react";
import {
  PDFDownloadLink,
  Document,
  Page,
  PDFViewer,
  pdf,
} from "@react-pdf/renderer";
import Card from "./Card";
import axios from "axios";
import { firestore, storage, auth } from "../firebase/firebase.config";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const Exam = () => {
  let [open, setOpen] = useState(false);
  let [exam, setExam] = useState(true);
  let [phase, setPhase] = useState(0);
  let [data, setData] = useState({
    code: "7-001",
    name: "NAME",
    surname: "SURNAME",
    id: "ID",
  });
  let [openS, setOpenS] = useState(false);
  let [openE, setOpenE] = useState(false);
  let [error, setErr] = useState(false);
  let [errormsg, seterrormsg] = useState("");
  let [errval, seterrval] = useState(0);
  let [found, setFound] = useState(false);
  let [student, setStudent] = useState({
    name: "NAME",
    surname: "SURNAME",
    code: "0-000",
  });
  let [img, setImg] = useState(null);
  let [file, setFile] = useState(null);

  let [imgerr, setImgerr] = useState(null);
  let [fileval, setFileval] = useState(null);
  let [pdfloading, setPDF] = useState(false);
  let [pdflink, setPDFLink] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setPDFLink("");
    setPDF(true);
    const obj = {
      name: e.target.fname.value,
      surname: e.target.fsurname.value,
      pname: e.target.pname.value,
      psurname: e.target.psurname.value,
      id: e.target.id.value,
      class: e.target.class.value,
      oldschool: e.target.oldschool.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      language: e.target.language.value,
    };

    Swal.fire({
      title: "<p class='font-glaho'>იტვირთება</p>",
      html: "<p class='font-glaho'>გთხოვთ დაიცადოთ, მოსწავლე რეგისტრირდება</p>",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    axios
      .get(process.env.REACT_APP_SERVERURL + "/check/" + e.target.id.value)
      .then(async (resp) => {
        const storageRef = storage.ref();
        const fileRef = storageRef.child(`FILE_${e.target.id.value}`);
        await fileRef.put(e.target.file.files[0]);

        const imageRef = storageRef.child(`IMAGE_${e.target.id.value}`);
        await imageRef.put(e.target.img.files[0]);

        const imgUrl = await imageRef.getDownloadURL();
        const fileUrl = await fileRef.getDownloadURL();

        obj.img = imgUrl;
        obj.file = fileUrl;
        axios
          .post(process.env.REACT_APP_SERVERURL + "/addstudent", obj)
          .then((res) => {
            Swal.close();
            setData(res.data);
            setOpenS(true);
            axios
              .post(process.env.REACT_APP_SERVERURL + "/loadimages/", {
                image: res.data.img,
              })
              .then((resp) => {
                const pdfBlob = pdf(
                  <Card student={res.data} image={resp.data.image} />
                )
                  .toBlob()
                  .then((result) => {
                    console.log(result);
                    saveAs(result, "studentcard.pdf");
                    const fileURL = URL.createObjectURL(result);
                    window.open(fileURL, "studentcard");
                    setPDFLink(fileURL);
                    setPDF(false);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
            Swal.close();
            setErr(true);
            if (!err.response || err.response.status == "500") {
              Swal.fire({
                icon: "error",
                title: "შეცდომა",
                text: "მოსწავლის რეგისტრაციის დროს მოულოდნელი შეცდომა დაფიქსირდა.",
                footer:
                  "ყველა ველი შეავსეთ? გთხოვთ სცადოთ მოგვიანებით ან თუ თვლით რომ ტექნიკური ხარვეზია დაგვიკავშირდით. <br> საიტის Admin: (995) 599-88-69-84 სკოლა: (995) 032-2-99-00-73",
              });
              return;
            }
            if (err.response.data.code == "11000") {
              seterrormsg("მოსწავლე ამ პირადი ნომრით უკვე რეგისტრირებულია");
              seterrval(11000);
            } else if (err.response.data.code == "42000") {
              seterrormsg(
                "მოსწავლე არის საშაბათო სკოლის სიაში (უკვე რეგისტრირებულია)"
              );
              seterrval(42000);
              setOpenE(true);
            }
          });
      })
      .catch((err) => {
        Swal.close();
        console.log(err);
        setErr(true);

        if (!err.response && err.response.status == "500") {
          Swal.fire({
            icon: "error",
            title: "შეცდომა",
            text: "მოსწავლის რეგისტრაციის დროს მოულოდნელი შეცდომა დაფიქსირდა.",
            footer:
              "ყველა ველი შეავსეთ? გთხოვთ სცადოთ მოგვიანებით ან თუ თვლით რომ ტექნიკური ხარვეზია დაგვიკავშირდით. <br> საიტის Admin: (995) 599-88-69-84 სკოლა: (995) 032-2-99-00-73",
          });
          return;
        }

        if (err.response.data.code == "11000") {
          seterrormsg("მოსწავლე ამ პირადი ნომრით უკვე რეგისტრირებულია");
          seterrval(11000);
        } else if (err.response.data.code == "42000") {
          seterrormsg(
            "მოსწავლე არის საშაბათო სკოლის სიაში (უკვე რეგისტრირებულია)"
          );
          seterrval(42000);
          setOpenE(true);
        }
      });
  };

  const seecode = (e) => {
    e.preventDefault();
    const obj = {
      query: e.target.query.value,
    };

    axios
      .get(process.env.REACT_APP_SERVERURL + "/findstudent/" + obj.query)
      .then((res) => {
        console.log(res);
        setStudent(res.data);
        setFound(true);
        setPDF(true);
        axios
          .post(process.env.REACT_APP_SERVERURL + "/loadimages/", {
            image: res.data.img,
          })
          .then((resp) => {
            const pdfBlob = pdf(
              <Card student={res.data} image={resp.data.image} />
            )
              .toBlob()
              .then((result) => {
                console.log(result);
                saveAs(result, "studentcard.pdf");
                const fileURL = URL.createObjectURL(result);
                window.open(fileURL, "studentcard");
                setPDF(false);
                setPDFLink(fileURL);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        setOpen(true);
        setFound(false);
      });
  };

  const onImgUpload = (e) => {
    const file = e.target.files[0];

    if (file.size > 3145728) {
      e.target.value = "";
      setImgerr("მოსწავლის ფოტო არ უნდა აჭარბებდეს 3 MB-ს");
      console.log("LIMIT");
    }
  };

  const onFileUpload = (e) => {
    const file = e.target.files[0];

    if (file.size > 5242880) {
      e.target.value = "";
      setFileval("სკოლის ცნობა არ უნდა აჭარბებდეს 5 MB-ს");
      console.log("LIMIT");
    }
  };

  const Testdiv = () => {
    // switch (phase) {
    //   case 0:
    //     return (
    //       <>
    //         <h1 className="mb-10 font-glaho text-3xl text-center">
    //           ონლაინ რეგისტრაცია სარეკომენდაციო წერისთვის
    //         </h1>
    //         <p className="mb-10 font-glaho text-xl text-center">
    //           მოსწავლის რეგისტრაციისას ეკრანზე გამოჩნდება რეგისტრირებული
    //           მოსწავლის კოდი და გადმოიწერება სარეგისტრაციო ბარათი PDF სახით
    //           რომელიც დაგჭირდებათ გამოცდის დღეს.<br></br> რეგისტრაციის კოდი დაგჭირდებათ
    //           ქულის სანახავად<br></br>ტექნიკური ხარვეზების შემთხვევაში დარეკეთ +995 599 88 69 84<br></br>
    //           <b>ონლაინ რეგისტრაცია არ ეხებათ საშაბათო სკოლის მოსწავლეებს!</b>
    //         </p>
    //         <form
    //           className="flex max-w-xl m-auto font-glaho flex-col gap-4"
    //           onSubmit={submit}
    //         >
    //           <div className="grid md:grid-cols-2 gap-6">
    //             <div>
    //               <div className="mb-2 block">
    //                 <Label htmlFor="name" value="სახელი" />
    //               </div>
    //               <TextInput
    //                 id="name"
    //                 type="text"
    //                 placeholder=""
    //                 name="fname"
    //                 required
    //               />
    //             </div>
    //             <div>
    //               <div className="mb-2 block">
    //                 <Label htmlFor="surname" value="გვარი" />
    //               </div>
    //               <TextInput
    //                 id="surname"
    //                 type="text"
    //                 placeholder=""
    //                 name="fsurname"
    //                 required
    //               />
    //             </div>
    //           </div>
    //           <div className="grid md:grid-cols-2 gap-6">
    //             <div>
    //               <div className="mb-2 block">
    //                 <Label htmlFor="name" value="მშობლის სახელი" />
    //               </div>
    //               <TextInput
    //                 id="name"
    //                 type="text"
    //                 placeholder=""
    //                 name="pname"
    //                 required
    //               />
    //             </div>
    //             <div>
    //               <div className="mb-2 block">
    //                 <Label htmlFor="surname" value="მშობლის გვარი" />
    //               </div>
    //               <TextInput
    //                 id="surname"
    //                 type="text"
    //                 placeholder=""
    //                 name="psurname"
    //                 required
    //               />
    //             </div>
    //           </div>
    //           <div>
    //             <div className="mb-2 block">
    //               <Label htmlFor="id1" value="მოსწავლის პირადი ნომერი" />
    //             </div>
    //             <TextInput
    //               color={errval == 11000 ? "failure" : "gray"}
    //               helperText={errval == 11000 ? errormsg : ""}
    //               id="id1"
    //               type="text"
    //               name="id"
    //               minLength={11}
    //               maxLength={11}
    //               required
    //             />
    //           </div>
    //           <div>
    //             <div className="mb-2 block">
    //               <Label
    //                 htmlFor="file"
    //                 value="სკოლის ცნობა მოსწავლის შესახებ"
    //               />
    //             </div>
    //             <FileInput
    //               id="file"
    //               name="file"
    //               color={fileval ? "failure" : "gray"}
    //               onChange={onFileUpload}
    //               required
    //               helperText={
    //                 fileval
    //                   ? fileval
    //                   : "სკოლის მიერ დამოწმებული ფოტოსურათიანი ცნობა PDF ფორმატში"
    //               }
    //               accept="application/pdf"
    //             />
    //           </div>
    //           <div>
    //             <div className="mb-2 block">
    //               <Label htmlFor="file2" value="მოსწავლის ფოტო" />
    //             </div>
    //             <FileInput
    //               color={imgerr ? "failure" : "gray"}
    //               id="file2"
    //               name="img"
    //               helperText={
    //                 imgerr ? imgerr : "მოსწავლის ფოტო 3X2. PNG, JPG, JPEG "
    //               }
    //               onChange={onImgUpload}
    //               required
    //               accept="image/png, image/jpg, image/jpeg"
    //             />
    //           </div>
    //           <div>
    //             <div className="mb-2 block">
    //               <Label htmlFor="id2" value="მშობლის ელ-ფოსტა" />
    //             </div>
    //             <TextInput
    //               id="id2"
    //               type="email"
    //               name="email"
    //               placeholder="mymail@vekua42.edu.ge"
    //               required
    //             />
    //           </div>
    //           <div>
    //             <div className="mb-2 block">
    //               <Label htmlFor="id3" value="სკოლა საიდანაც მოდიხართ" />
    //             </div>
    //             <TextInput
    //               id="id3"
    //               type="text"
    //               name="oldschool"
    //               placeholder=""
    //               required
    //             />
    //           </div>
    //           <div>
    //             <div className="mb-2 block">
    //               <Label htmlFor="id4" value="მშობლის ტელ-ნომერი" />
    //             </div>
    //             <TextInput
    //               id="id4"
    //               maxLength={9}
    //               minLength={9}
    //               type="text"
    //               placeholder="599000000"
    //               name="phone"
    //               required
    //             />
    //           </div>
    //           <div>
    //             <div className="mb-2 block">
    //               <Label htmlFor="select" value="სკოლის მეორე უცხოური ენა" />
    //             </div>
    //             <Select name="language" id="select" required>
    //               <option value="russian">რუსული</option>
    //               <option value="german">გერმანული</option>
    //             </Select>
    //           </div>
    //           <div>
    //             <div className="mb-2 block">
    //               <Label
    //                 htmlFor="countries"
    //                 value="მოსწავლის კლასი (კლასი რომელშიც მოსწავლე აბარებს)"
    //               />
    //             </div>
    //             <Select name="class" id="countries" required>
    //               <option value="7">მე-7</option>
    //               <option value="8">მე-8</option>
    //               <option value="9">მე-9</option>
    //               <option value="10">მე-10</option>
    //               <option value="11">მე-11</option>
    //             </Select>
    //           </div>
    //           <Button type="submit">რეგისტრაცია</Button>
    //         </form>
    //         <h1 className="mb-10 mt-16 font-glaho text-3xl text-center">
    //           მოსწავლის კოდის ნახვა
    //         </h1>
    //         <div className="flex justify-center">
    //           <FcLock size={"6.4rem"} />
    //         </div>
    //         <form
    //           className="flex mb-16 max-w-xl m-auto font-glaho flex-col gap-4"
    //           onSubmit={seecode}
    //         >
    //           <div>
    //             <div className="mb-2 block">
    //               <Label htmlFor="code" value="მოსწავლის პირადი ნომერი" />
    //             </div>
    //             <TextInput
    //               id="code"
    //               type="text"
    //               placeholder="პ/ნ"
    //               name="query"
    //               required
    //             />
    //           </div>
    //           <Button type="submit">მოსწავლის ძიება</Button>
    //         </form>
    //         {found ? (
    //           <>
    //             <h1 className="mb-2 mt-16 font-glaho text-xl text-center">
    //               {student.name} {student.surname}
    //             </h1>
    //             <h1 className="mb-16 font-alk text-5xl text-center">
    //               {student.code}
    //             </h1>
    //           </>
    //         ) : (
    //           <></>
    //         )}
    //       </>
    //     );
    //   case 1:
    //     return (
    //       <>
    //         <h1 className="mb-10 font-alk text-3xl text-center">
    //           3, 4 და 5 ივლისს ჩატარებული სარეკომენდაციო წერების შედეგები
    //           მათემატიკასა და ფიზიკაში შეგიძლიათ იხილოთ ინდივიდუალურად პირადი
    //           ნომრით.
    //         </h1>
    //         <div className="max-w-lg mx-auto flex flex-col">
    //           <div className="flex justify-center">
    //             <FcLock size={"6.4rem"} />
    //           </div>
    //           <div className="mb-2 block">
    //             <Label htmlFor="email3" value="მოსწავლის პირადი ნომერი" />
    //           </div>
    //           <TextInput
    //             id="email3"
    //             type="text"
    //             placeholder="პ/ნ"
    //             required
    //             // helperText={
    //             //     <>
    //             //         We’ll never share your details. Read our
    //             //         <a href="#" className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
    //             //             Privacy Policy
    //             //         </a>
    //             //         .
    //             //     </>
    //             // }
    //           />
    //           <Button color="blue" onClick={setOpen} className="mt-6" pill>
    //             მოსწავლის ქულის ნახვა
    //           </Button>
    //         </div>
    //       </>
    //     );
    // }
    return (
      <>
        <h1 className="mb-10 font-glaho text-3xl text-center">
          ონლაინ რეგისტრაცია სარეკომენდაციო წერისთვის
        </h1>
        <p className="mb-10 font-glaho text-xl text-center">
          მოსწავლის რეგისტრაციისას ეკრანზე გამოჩნდება რეგისტრირებული მოსწავლის
          კოდი და გადმოიწერება სარეგისტრაციო ბარათი PDF სახით რომელიც
          დაგჭირდებათ გამოცდის დღეს.<br></br> რეგისტრაციის კოდი დაგჭირდებათ
          ქულის სანახავად<br></br>ტექნიკური ხარვეზების შემთხვევაში დარეკეთ +995
          599 88 69 84<br></br>
          <b>
            ონლაინ რეგისტრაცია არ ეხებათ მოსწავლეებს რომლებიც ესწრებოდნენ
            საშაბათო სკოლას არანაკლებ ბოლო 6 თვის განმავლობაში
          </b>
          <br></br>
          <a
            href="https://vekua42.edu.ge/news/YV7WGjYKdQgeB9kt0vlL"
            className=" text-blue-500 underline mt-7 inline-block"
          >
            დეტალური ინფორმაცია სარეკომენდაციო წერის შესახებ იხილეთ აქ
          </a>
        </p>
        <form
          className="flex max-w-xl m-auto font-glaho flex-col gap-4"
          onSubmit={submit}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="სახელი" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder=""
                name="fname"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="surname" value="გვარი" />
              </div>
              <TextInput
                id="surname"
                type="text"
                placeholder=""
                name="fsurname"
                required
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="მშობლის სახელი" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder=""
                name="pname"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="surname" value="მშობლის გვარი" />
              </div>
              <TextInput
                id="surname"
                type="text"
                placeholder=""
                name="psurname"
                required
              />
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="id1" value="მოსწავლის პირადი ნომერი" />
            </div>
            <TextInput
              color={errval == 11000 ? "failure" : "gray"}
              helperText={errval == 11000 ? errormsg : ""}
              id="id1"
              type="text"
              name="id"
              minLength={11}
              maxLength={11}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="file" value="სკოლის ცნობა მოსწავლის შესახებ" />
            </div>
            <FileInput
              id="file"
              name="file"
              color={fileval ? "failure" : "gray"}
              onChange={onFileUpload}
              required
              helperText={
                fileval
                  ? fileval
                  : "ბეჭდით დამოწმებული,  ფოტოსურათიანი  ცნობა სკოლიდან,   შესაბამისი კლასის დასრულების შესახებ (სადაც ამჟამად სწავლობს მოსწავლე). ცნობა  რეგისტრაციის დროს იტვირთება  PDF ფორმატში (სკოლის ბეჭედი ნაწილობრივ უნდა ფარავდეს ფოტოსურათს);"
              }
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="file2" value="მოსწავლის ფოტო" />
            </div>
            <FileInput
              color={imgerr ? "failure" : "gray"}
              id="file2"
              name="img"
              helperText={
                imgerr ? imgerr : "მოსწავლის ფოტო 3X2. PNG, JPG, JPEG "
              }
              onChange={onImgUpload}
              required
              accept="image/png, image/jpg, image/jpeg"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="id2" value="მშობლის ელ-ფოსტა" />
            </div>
            <TextInput
              id="id2"
              type="email"
              name="email"
              placeholder="mymail@vekua42.edu.ge"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="id3" value="სკოლა საიდანაც მოდიხართ" />
            </div>
            <TextInput
              id="id3"
              type="text"
              name="oldschool"
              placeholder=""
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="id4" value="მშობლის ტელ-ნომერი" />
            </div>
            <TextInput
              id="id4"
              maxLength={9}
              minLength={9}
              type="text"
              placeholder="599000000"
              name="phone"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="select" value="სკოლის მეორე უცხოური ენა" />
            </div>
            <Select name="language" id="select" required>
              <option value="russian">რუსული</option>
              <option value="german">გერმანული</option>
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="countries"
                value="მოსწავლის კლასი (კლასი რომელშიც მოსწავლე აბარებს)"
              />
            </div>
            <Select name="class" id="countries" required>
              <option value="7">მე-7</option>
              <option value="8">მე-8</option>
              <option value="9">მე-9</option>
              <option value="10">მე-10</option>
              <option value="11">მე-11</option>
            </Select>
          </div>
          <Button type="submit">რეგისტრაცია</Button>
        </form>
        <h1 className="mb-10 mt-16 font-glaho text-3xl text-center">
          სარეგისტრაციო ბარათის გადმოწერა
        </h1>
        <div className="flex justify-center">
          <FcLock size={"6.4rem"} />
        </div>
        <form
          className="flex mb-16 max-w-xl m-auto font-glaho flex-col gap-4"
          onSubmit={seecode}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="code" value="მოსწავლის პირადი ნომერი" />
            </div>
            <TextInput
              id="code"
              type="text"
              placeholder="პ/ნ"
              name="query"
              required
            />
          </div>
          <Button type="submit">მოსწავლის ძიება</Button>
        </form>
        {found ? (
          <>
            <h1 className="mb-2 mt-16 font-glaho text-xl text-center">
              {student.name} {student.surname}
            </h1>
            <h1 className="mb-16 font-alk text-5xl text-center">
              {student.code}
            </h1>
            {pdfloading ? (
              <p className="text-center text-xl">
                სარეგისტრაციო ბარათი იტვირთება
              </p>
            ) : (
              <a href={pdflink} className="block underline text-center text-xl">
                სარეგისტრაციო ბარათის გადმოწერა (PDF)
              </a>
            )}
          </>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <div className="items-center container dark:text-white py-20">
      <Helmet>
        <title>სარეკომენდაციო წერა</title>
      </Helmet>
      <div className="flex flex-col items-center">
        <h4 className="mb-3 mt-10 font-glaho text-2xl text-center">
          ონლაინ რეგისტრაცია სარეკომენდაციო წერისთვის დასრულებულია
        </h4>
        <p className="font-glaho text-center">
          დეტალური ინფორმაცია სარეკომენდაციო წერებზე შეგიძლიათ იხილოთ სიახლეების
          ველში
        </p>
        <FcGraduationCap size={"8.5rem"} />
        <p className="font-glaho text-center mt-5">
          VII კლასი (მათემატიკა) - 4 ივლისი <br />
          VIII-XI კლასი (მათემატიკა) - 5 ივლისი
          <br />
          VIII-XI კლასი (ფიზიკა) - 6 ივლისი
          <br />
        </p>
      </div>

      {/* <Testdiv /> */}

      <h2 className="mt-32 text-center text-3xl font-glaho">
        პროგრამები კლასების მიხედვით
      </h2>
      <div className="grid mt-10 md:grid-cols-2 gap-5">
        <div className="p-3 flex flex-col items-center gap-4">
          <Button
            color="gray"
            className="lg:w-1/3 md:w-1/2 w-full"
            href="/mathprogram.pdf"
          >
            მათემატიკა
          </Button>
          <h3 className="text-center text-lg font-glaho">
            VII, VIII, IX, X და XI კლასებისთვის
          </h3>
        </div>
        <div className="p-3 flex flex-col items-center gap-4">
          <Button
            color="gray"
            className="lg:w-1/3 md:w-1/2 w-full"
            href="/physicsprogram.pdf"
          >
            ფიზიკა
          </Button>
          <h3 className="text-center text-lg font-glaho">
            VIII, IX, X და XI კლასებისთვის
          </h3>
        </div>
      </div>

      <h2 className="mt-16 text-center text-3xl font-glaho">
        სარეკომენდაციო წერის ნიმუშები
      </h2>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="p-3 flex flex-col items-center gap-4">
          <h3 className="text-center text-2xl font-glaho">მათემატიკა</h3>
          <Button
            color="gray"
            className="lg:w-1/3 md:w-1/2 w-full"
            href="/math_sample_7.pdf"
          >
            VII კლასი
          </Button>
          <Button
            color="gray"
            className="lg:w-1/3 md:w-1/2 w-full"
            href="/math_sample_8.pdf"
          >
            VIII კლასი
          </Button>
          <Button
            color="gray"
            className="lg:w-1/3 md:w-1/2 w-full"
            href="/math_sample_9.pdf"
          >
            IX კლასი
          </Button>
          <Button
            color="gray"
            className="lg:w-1/3 md:w-1/2 w-full"
            href="/math_sample_10.pdf"
          >
            X კლასი
          </Button>
          <Button
            color="gray"
            className="lg:w-1/3 md:w-1/2 w-full"
            href="/math_sample_11.pdf"
          >
            XI კლასი
          </Button>
        </div>
        <div className="p-3 flex flex-col items-center gap-4">
          <h3 className="text-center text-2xl font-glaho">ფიზიკა</h3>
          <Button
            color="gray"
            className="lg:w-1/3 md:w-1/2 w-full"
            href="/physics_sample_8.pdf"
          >
            VIII კლასი
          </Button>
          <Button
            color="gray"
            className="lg:w-1/3 md:w-1/2 w-full"
            href="/physics_sample_9.pdf"
          >
            IX კლასი
          </Button>
          <Button
            color="gray"
            className="lg:w-1/3 md:w-1/2 w-full"
            href="/physics_sample_10.pdf"
          >
            X კლასი
          </Button>
          <Button
            color="gray"
            className="lg:w-1/3 md:w-1/2 w-full"
            href="/physics_sample_11.pdf"
          >
            XI კლასი
          </Button>
        </div>
      </div>

      <Transition show={open}>
        <Dialog className="relative z-10" onClose={setOpen}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg dark:bg-slate-800 bg-white text-left shadow-xl dark:text-white transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white dark:bg-slate-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-300 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle
                          as="h3"
                          className="dark:text-white text-base font-semibold leading-6 text-gray-900"
                        >
                          მოსწავლე ვერ მოიძებნა
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 dark:text-gray-300">
                            მოსწავლე ამ პირადი ნომრით არ არის რეგისტრირებული, თუ
                            თვლით, რომ ეს ტექნიკური ხარვეზია, დაგვიკავშირდით
                            სკოლის ნომერზე ან ელ. ფოსტებზე.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    {/* <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center dark:text-white dark:bg-slate-700 dark:hover:bg-slate-600  rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            data-autofocus
                                        >
                                            OK
                                        </button> */}
                    <Button
                      color="blue"
                      onClick={() => setOpen(false)}
                      className="mt-3 inline-flex w-full justify-center sm:mt-0 sm:w-auto"
                      pill
                    >
                      OK
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition show={openS}>
        <Dialog className="relative z-10" onClose={setOpenS}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg dark:bg-slate-800 bg-white text-left shadow-xl dark:text-white transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                  <div className="bg-white dark:bg-slate-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle
                          as="h3"
                          className="dark:text-white text-2xl font-glaho mb-3 font-semibold leading-6 text-gray-900"
                        >
                          მოსწავლის კოდი <b>{data.code}</b>
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="text-xl font-glaho mt-10 text-gray-500 dark:text-gray-300">
                            სახელი: {data.name}
                            <br></br>
                            გვარი: {data.surname}
                            <br></br>
                            პ/ნ: {data.id}
                            <br></br>
                            <br></br>
                            გთხოვთ დაიმახსოვრეთ კოდი რადგან დაგჭირდებათ
                            გამოცდაზე და ქულის სანახავად. <br></br>
                            სარეგისტრაციო ბარათის გადმოიწერება ავტომატურად.
                            სარეგისტრაციო ბარათი დაგჭირდებათ გამოცდაზე
                            შესასვლელად.<br></br>
                            {pdfloading ? (
                              <a href="">
                                სარეგისტრაციო ბარათის ფაილი იტვირთება გთხოვთ
                                დაიცადოთ...
                              </a>
                            ) : (
                              <a href={pdflink} className="underline">
                                სარეგისტრაციო ბარათის გადმოწერა
                              </a>
                            )}
                          </p>
                        </div>
                        {/* <PDFViewer>
                          <Card />
                        </PDFViewer> */}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button
                      color="blue"
                      onClick={() => setOpenS(false)}
                      className="mt-3 inline-flex w-full justify-center sm:mt-0 sm:w-auto"
                      pill
                    >
                      OK
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition show={openE}>
        <Dialog className="relative z-10" onClose={setOpenE}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto font-glaho">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg dark:bg-slate-800 bg-white text-left shadow-xl dark:text-white transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                  <div className="bg-white dark:bg-slate-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-300 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle
                          as="h3"
                          className="dark:text-white font-semibold leading-6 text-lg text-gray-900"
                        >
                          მოსწავლე საშაბათო სკოლაშია
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="text-base text-gray-500 dark:text-gray-300">
                            მოსწავლე ამ პირადი ნომრით არის საშაბათო სკოლის
                            სიაში. (მოსწავლე არის უკვე რეგისტრირებული და შეუძლია
                            გამოცხადდეს გამოცდაზე თავისი კოდით და იმ ფურცლით
                            რომელიც სკოლაში გადაეცა)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button
                      color="blue"
                      onClick={() => setOpenE(false)}
                      className="mt-3 inline-flex w-full justify-center sm:mt-0 sm:w-auto"
                      pill
                    >
                      გასაგებია
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Exam;
