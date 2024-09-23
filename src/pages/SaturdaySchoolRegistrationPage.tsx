import React, { useEffect, useRef, useState } from "react";
import Banner from "./components/Banner";
import { Helmet } from "react-helmet";
import { FcLock } from "react-icons/fc";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Swal from "sweetalert2";
import { Accordion, Modal } from "flowbite-react";
import { Button, Checkbox, Label, TextInput, Select, FileInput } from "flowbite-react";
import { app, auth, database, storage } from "../firebase/firebase.config";
import { ref, get, onValue, child, getDatabase } from 'firebase/database';
import { ref as storageRef, uploadBytes } from 'firebase/storage'
import { Link } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import ProductsDemo from "./components/Datatable";
import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/themes/lara-light-cyan/theme.css";


function change(subject: string) {
  Swal.fire({
    allowOutsideClick: false,
    title: "<span class='font-glaho'>გთხოვთ აირჩიოთ სხვა ჯგუფი</span>",
    html: `<span class='font-glaho'>თქვენ მიერ შერჩეულ ${subject} ჯგუფში ადგილები აღარ არის!</span>`,
    icon: "warning"
  });
}

const SaturdaySchoolRegistrationPage = () => {
  const [grade, setGrade] = useState(-1);
  const [math, setMath] = useState<boolean>(false);
  const [physics, setPhysics] = useState<boolean>(false);
  const [critical, setCritical] = useState<boolean>(false);
  const [data, setData] = useState<any | null>(null);
  const [fileval, setFileval] = useState<string | null>(null);

  const [file, setFile] = useState<any>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const mathRef = useRef<HTMLSelectElement | null>(null);
  const physicsRef = useRef<HTMLSelectElement | null>(null);
  const otherRef = useRef<HTMLSelectElement | null>(null);
  const [admin, setAdmin] = useState<User | null>(null);

  let submitted: boolean = false;


  useEffect(() => {
    console.log("Fetching from Realtime Database...");
    const teachersCountRef = ref(database, '/'); // Check if the path is correct
    onValue(teachersCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log("Data fetched successfully: ", data);



        setData(data);
      } else {
        console.log("No data found at this path.");
      }
    }, (error) => {
      console.error("Error fetching data: ", error);
    });
  }, []);

  useEffect(() => {
    setGrade(3);
  }, [])

  useEffect(() => {
    console.log("Changing Teachers")
    if (grade != 6 && grade != 5) {
      setCritical(false);
    }

    if (grade < 7) {
      setPhysics(false);
    }
    mathRef.current?.value ? mathRef.current.value = "" : '';
    physicsRef.current?.value ? physicsRef.current.value = "" : '';
    otherRef.current?.value ? otherRef.current.value = "" : '';

  }, [grade])

  useEffect(() => {
    let mathSelectedSpots = mathRef.current?.options[mathRef.current.selectedIndex].getAttribute('vekua-spots');
    if (mathSelectedSpots == '0') {
      if (mathRef.current?.value) {
        mathRef.current.value = "";
      }
      console.log("tough luck lil bro");
      submitted ? '' : change('მათემატიკის');
    }
    let physicsSelectedSpots = physicsRef.current?.options[physicsRef.current.selectedIndex].getAttribute('vekua-spots');
    if (physicsSelectedSpots == '0') {
      if (physicsRef.current?.value) {
        physicsRef.current.value = "";
      }
      console.log("tough luck lil bro");
      submitted ? '' : change('ფიზიკის');
    }
    let otherSelectedSpots = otherRef.current?.options[otherRef.current.selectedIndex].getAttribute('vekua-spots');
    if (otherSelectedSpots == '0') {
      if (otherRef.current?.value) {
        otherRef.current.value = "";
      }
      console.log("tough luck lil bro");
      submitted ? '' : change('კრიტიკული და ანალიტიკური აზროვნების');
    }
  }, [data])

  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setAdmin(user);
        console.log("uid", uid);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []);


  async function handleSubmit(e: any) {
    e.preventDefault();

    submitted = true;

    Swal.fire({
      title: "<p class='font-glaho'>იტვირთება</p>",
      html: "<p class='font-glaho'>გთხოვთ დაიცადოთ, მოსწავლე რეგისტრირდება</p>",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    /*  ამოწმებს თუ ადგილი არის დარჩენილი არჩეულ მათემატიკის ჯგუფში  */
    if (math && !e.target.mathgroup.options[e.target.mathgroup.selectedIndex].getAttribute('vekua-spots')) {
      change('მათემატიკის');
      return;
    }

    /*  ამოწმებს თუ ადგილი არის დარჩენილი არჩეულ ფიზიკის ჯგუფში  */
    if (physics && !e.target.physicsgroup.options[e.target.physicsgroup.selectedIndex].getAttribute('vekua-spots')) {
      change('ფიზიკის');
      return;
    }

    /*  ამოწმებს თუ ადგილი არის დარჩენილი არჩეულ ლოგიკის/კრიტიკული აზროვნების ჯგუფში  */
    if (critical && !e.target.othergroup.options[e.target.othergroup.selectedIndex].getAttribute('vekua-spots')) {
      change('კრიტიკული და ანალიტიკური აზროვნების');
      return;
    }

    console.log(e.target)

    let requestBody = new FormData(formRef?.current as HTMLFormElement);

    console.log(requestBody);

    let formData: any = {
      parentfirstname: e.target.parentfirstname.value,
      parentlastname: e.target.parentlastname.value,
      address: e.target.address.value,
      phone: e.target.phone.value,
      parentid: e.target.parentid.value,
      parentemail: e.target.parentemail.value,
      studentfirstname: e.target.studentfirstname.value,
      studentlastname: e.target.studentlastname.value,
      studentid: e.target.studentid.value,
      class: e.target.class.value,
    }

    if (math) {
      formData.math = e.target.mathgroup.value;
      formData.mathPath = e.target.mathgroup.options[e.target.mathgroup.selectedIndex].getAttribute('vekua-database-path')
      formData.mathName = e.target.mathgroup.options[e.target.mathgroup.selectedIndex].getAttribute('vekua-group-details')
      requestBody.append('math', e.target.mathgroup.value);
      requestBody.append('mathPath', e.target.mathgroup.options[e.target.mathgroup.selectedIndex].getAttribute('vekua-database-path'));
    }

    if (physics) {
      formData.physics = e.target.physicsgroup.value;
      formData.physicsPath = e.target.physicsgroup.options[e.target.physicsgroup.selectedIndex].getAttribute('vekua-database-path')
      formData.physicsName = e.target.physicsgroup.options[e.target.physicsgroup.selectedIndex].getAttribute('vekua-group-details')
      requestBody.append('physics', e.target.physicsgroup.value);
      requestBody.append('physicsPath', e.target.physicsgroup.options[e.target.physicsgroup.selectedIndex].getAttribute('vekua-database-path'));
    }

    if (critical) {
      formData.other = e.target.othergroup.value;
      formData.otherPath = e.target.othergroup.options[e.target.othergroup.selectedIndex].getAttribute('vekua-database-path')
      formData.otherName = e.target.othergroup.options[e.target.othergroup.selectedIndex].getAttribute('vekua-group-details')
      requestBody.append('other', e.target.othergroup.value);
      requestBody.append('otherPath', e.target.othergroup.options[e.target.othergroup.selectedIndex].getAttribute('vekua-database-path'));
    }


    let response: any = await axios.post(import.meta.env.VITE_REACT_APP_SERVERURL + '/addsaturdayschoolstudent', formData).catch((err) => { console.log(err); return err })
    Swal.close();
    console.log("a");
    console.log(response);
    if (response && response.data?.ok) {



      // const birthRef = storageRef(storage, `saturdayschoolstudents/BIRTH_${e.target.studentid.value}.${file.name.split('.').pop()}`);

      // uploadBytes(birthRef, file).then(() => {
      //   console.log('Uploaded a blob or file!');
      // });

      Swal.fire({
        title: "მოსწავლე დარეგისტრირდა",
        text: "მოსწავლე წინასწარი რეგისტრაცია წარმატებით გაიარა. ხელშეკრულების გასაფორმებლად 2 სამუშაო დღის განმავლობაში გთხოვთ გადმორიცხოთ თანხა და ქვითარი სკოლაში მოიტანოთ.",
        icon: "success"
      });
    } else if (response.response.status == '409') {
      switch (response.response.data.code) {
        case 10:
          Swal.fire({
            icon: "error",
            title: "მოსწავლე რეგისტრირებულია",
            text: "მოსწავლე საშაბათო სკოლაში მათემატიკაზე რეგისტრირებულია!",
          });
          break;
        case 11:
          Swal.fire({
            icon: "error",
            title: "მოსწავლე რეგისტრირებულია",
            text: "მოსწავლე საშაბათო სკოლაში ფიზიკაზე რეგისტრირებულია!",
          });
          break;
        case 12:
          Swal.fire({
            icon: "error",
            title: "მოსწავლე რეგისტრირებულია",
            text: "მოსწავლე საშაბათო სკოლაში კრიტიკულ და ანალიტიკურ აზროვნებაზე რეგისტრირებულია!",
          });
          break;
        case -1:
          Swal.fire({
            icon: "error",
            title: "ადგილები არ არის",
            text: "თქვენ მიერ შერჩეულ ჯგუფში თავისუფალი ადგილები აღარ არის",
          });
          break;
        default:
          Swal.fire({
            icon: "error",
            title: "შეცდომა დაფიქსირდა",
            text: "გთხოვთ სცადოთ მოგვიანებით ან დაგვიკავშირდით it@vekua42.edu.ge",
          });
          break;
      }
    }


  }

  const onFileUpload = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    setFile(file);
    if (file.size > 5242880) {

      e.target.value = "";
      setFileval("დაბადების მოწმობა არ უნდა აჭარბებდეს 5 MB-ს");
      console.log("LIMIT");
    }
  };

  return (
    <>
      <Helmet>
        <title>საშაბათო სკოლა</title>
      </Helmet>
      <Banner heading="საშაბათო სკოლა" />
      <div className="dark:bg-slate-900">
        <div className="dark:text-white py-20 container font-glaho">


          <div className="my-10 text-black">

            {admin ? <></> : <></>}

          </div>


          <Link to="http://localhost:5173/news/FJr4rScWRSuhJaCCCHlI" className="block">
            <Button className="flex text-center w-full" color="light">როგორ დავრეგისტრირდე საშაბათო სკოლაში?</Button>
          </Link>

          <section className="block mt-10">
            <form ref={formRef} onSubmit={handleSubmit} className="flex max-w-4xl m-auto flex-col gap-4">
              <h1 className="text-center text-4xl mb-4">
                საშაბათო სკოლაში მოსწავლის რეგისტრაცია
              </h1>
              <h1 className="text-center mt-4 text-xl font-bold mb-4">
                მშობელი/კანონიერი წარმომადგენელი, რომელთანაც იდება ხელშეკრულება:
                <div className=" mt-2 bg-sky-600 rounded-lg h-[6px] w-full"></div>
              </h1>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <div className="mb-2 block">
                    <Label
                      className="font-glaho text-md"
                      htmlFor="ParentFirstName"
                      value="მშობლის/კანონიერი წარმომადგენლის სახელი *"
                    />
                  </div>
                  <TextInput
                    id="ParentFirstName"
                    name="parentfirstname"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      className="font-glaho text-md"
                      htmlFor="ParentLastName"
                      value="მშობლის/კანონიერი წარმომადგენლის გვარი *"
                    />
                  </div>
                  <TextInput
                    id="ParentLastName"
                    name="parentlastname"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    className="font-glaho text-md"
                    htmlFor="Address"
                    value="მშობლის/კანონიერი წარმომადგენლის მისამართი *"
                  />
                </div>
                <TextInput id="Address" name="address" type="text" required />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <div className="mb-2 block">
                    <Label
                      className="font-glaho text-md"
                      htmlFor="ParentPhone"
                      value="მშობლის/კანონიერი წარმომადგენლის ტელ-ნომერი *"
                    />
                  </div>
                  <TextInput
                    id="ParentPhone"
                    name="phone"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      className="font-glaho text-md"
                      htmlFor="ParentPersonalId"
                      value="მშობლის/კანონიერი წარმომადგენლის პირადი ნომერი *"
                    />
                  </div>
                  <TextInput minLength={11} maxLength={11}
                    id="ParentPersonalId"
                    name="parentid"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    className="font-glaho text-md"
                    htmlFor="ParentEmail"
                    value="მშობლის/კანონიერი წარმომადგენლის ელ-ფოსტა *"
                  />
                </div>
                <TextInput
                  id="ParentEmail"
                  name="parentemail"
                  type="email"
                  required
                />
              </div>
              <h1 className="text-center mt-4 text-2xl font-bold mb-4">
                მოსწავლის ინფორმაცია:
                <div className=" mt-2 bg-sky-600 rounded-lg h-[6px] w-full"></div>
              </h1>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <div className="mb-2 block">
                    <Label
                      className="font-glaho text-md"
                      htmlFor="studentFirstName"
                      value="მოსწავლის სახელი *"
                    />
                  </div>
                  <TextInput
                    id="studentFirstName"
                    name="studentfirstname"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      className="font-glaho text-md"
                      htmlFor="studentLastName"
                      value="მოსწავლის გვარი *"
                    />
                  </div>
                  <TextInput
                    id="studentLastName"
                    name="studentlastname"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    className="font-glaho text-md"
                    htmlFor="studentId"
                    value="მოსწავლის პირადი ნომერი *"
                  />
                </div>
                <TextInput minLength={11} maxLength={11} id="studentId" name="studentid" type="text" required />
              </div>
              {/* <div>
                <div>
                  <Label htmlFor="file-upload-helper-text" value="ატვირთეთ მოსწავლის დაბადების მოწმობა *" />
                </div>
                <FileInput color={fileval ? "failure" : "gray"} required onChange={onFileUpload} id="file-upload-helper-text" accept="image/*,.pdf" helperText={!fileval ? "PNG, JPG or PDF (MAX. 5MB)." : fileval} />
              </div> */}
              <div className="grid-cols-2 w-full">
                <div className="">
                  <div className="mb-4 mt-4 block">
                    <Label
                      className="font-glaho text-md"
                      htmlFor="studentClass"
                      value="მოსწავლის კლასი"
                    />
                  </div>
                  <Select
                    id="studentClass"
                    name="class"
                    onChange={(e: any) => {
                      console.log(e.target.value);
                      setGrade(e.target.value as number);
                    }}
                    required
                  >
                    {[...Array(9).keys()].map((key) => (
                      <option value={key + 3}>მე-{key + 3} კლასი</option>
                    ))}
                  </Select>
                </div>
                <div className="">
                  <div className="mb-2 mt-4 block">
                    <Label
                      className="font-glaho text-md"
                      htmlFor="countries"
                      value="საგანი"
                    />
                  </div>
                  <div className="flex gap-4 mt-6">
                    <div className="flex items-center gap-2">
                      <Checkbox onChange={() => { setMath(!math) }} id="math" />
                      <Label htmlFor="math" className="font-glaho text-md">
                        მათემატიკა
                      </Label>
                    </div>
                    {grade > 6 ? (
                      <div className="flex items-center gap-2">
                        <Checkbox onChange={() => { setPhysics(!physics) }} id="physics" />
                        <Label htmlFor="physics" className="font-glaho text-md">
                          ფიზიკა
                        </Label>
                      </div>
                    ) : (
                      <></>
                    )}
                    {grade == 6 || grade == 5 ? (
                      <div className="flex items-center gap-2">
                        <Checkbox onChange={() => { setCritical(!critical) }} id="logic" />
                        <Label htmlFor="logic" className="font-glaho text-md">
                          კრიტიკული და ანალიტიკური აზროვნება
                        </Label>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              <h1 className="text-center mt-4 text-2xl font-bold mb-4">
                დროისა და მასწავლებლის არჩევა:
                <div className=" mt-2 bg-sky-600 rounded-lg h-[6px] w-full"></div>
              </h1>
              <div className="grid-cols-2 w-full">
                <div className="">
                  {math ? <div className="mb-2 mt-4 block">
                    <Label
                      className="font-glaho text-md"
                      htmlFor="mathselect"
                      value="მათემატიკა - აირჩიეთ დრო ( მასწავლებლის მიხედვით )"
                    />
                    {/* <p>{JSON.stringify(mathTeachers)}</p> */}
                    <Select ref={mathRef} name="mathgroup" id="mathselect" required defaultValue={""}>
                      <option value="" disabled={true}>აირჩიეთ</option>
                      {data.math["c" + (grade == 11 ? "10" : grade as unknown as string)]?.map((teacher: any, index: number) =>
                      (

                        <>
                          {teacher.spots ? <option vekua-group-details={`${teacher.name} - ${teacher.time}`} vekua-database-path={`/c${grade}/${index}`} value={`${teacher.id}`} vekua-spots={teacher.spots}>
                            {teacher.name} - {teacher.time} ({teacher.spots} ადგილი)
                          </option> : <option vekua-spots={teacher.spots} disabled={true}>
                            {teacher.name} - {teacher.time} ({teacher.spots} ადგილი)
                          </option>}
                        </>
                      )
                      )}
                    </Select>
                  </div> : <></>}
                  {physics ? <div className="mb-2 mt-4 block">
                    <Label
                      className="font-glaho text-md"
                      htmlFor="physics"
                      value="ფიზიკა - აირჩიეთ დრო ( მასწავლებლის მიხედვით )"
                    />
                    <Select ref={physicsRef} name="physicsgroup" id="physics" required defaultValue={""}>
                      <option value="" disabled={true}>აირჩიეთ</option>
                      {data.physics["c" + grade as unknown as string]?.map((teacher: any, index: number) => {
                        return (
                          <>
                            {teacher.spots ? <option vekua-group-details={`${teacher.name} - ${teacher.time}`} vekua-database-path={`/c${grade}/${index}`} value={`${teacher.id}`} vekua-spots={teacher.spots}>
                              {teacher.name} - {teacher.time} ({teacher.spots} ადგილი)
                            </option> : <option vekua-spots={teacher.spots} disabled={true}>
                              {teacher.name} - {teacher.time} ({teacher.spots} ადგილი)
                            </option>}
                          </>
                        )
                      })}
                    </Select>
                  </div> : <></>}
                  {critical ? <div className="mb-2 mt-4 block">
                    <Label
                      className="font-glaho text-md"
                      htmlFor="critical"
                      value="კრიტიკული აზროვნება - აირჩიეთ დრო ( დრო შეიძლება შეიცვალოს. შეთანხმებული იქნება მათემატიკის გაკვეთილებთან მიმართებაში )"
                    />
                    <Select ref={otherRef} name="othergroup" id="critical" required defaultValue={""}>
                      <option value="" disabled={true}>აირჩიეთ</option>
                      {data.critical.c6?.map((teacher: any, index: number) => {
                        return (
                          <>
                            {teacher.spots ? <option vekua-group-details={`${teacher.name} - ${teacher.time}`} vekua-database-path={`/c6/${index}`} value={`${teacher.id}`} vekua-spots={teacher.spots}>
                              {teacher.name} - {teacher.time} ({teacher.spots} ადგილი)
                            </option> : <option vekua-spots={teacher.spots} disabled={true}>
                              {teacher.name} - {teacher.time} ({teacher.spots} ადგილი)
                            </option>}
                          </>
                        )
                      })}
                    </Select>
                  </div> : <></>}
                </div>
                <div className="flex flex-wrap items-start gap-2 w-full mt-5">
                  <Button
                    size="md"
                    type="submit" disabled={!(math || critical || physics)}
                    className="w-full bg-sky-600 font-alk tracking-widest "
                  >
                    რეგისტრაცია
                  </Button>
                </div>
              </div>
            </form>
          </section>



        </div>
      </div>
    </>
  );
};

export default SaturdaySchoolRegistrationPage;
