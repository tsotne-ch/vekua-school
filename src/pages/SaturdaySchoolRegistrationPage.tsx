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
import { Accordion } from "flowbite-react";
import { Button, Checkbox, Label, TextInput, Select, FileInput } from "flowbite-react";
import { app, database, storage } from "../firebase/firebase.config";
import { ref, get, onValue, child, getDatabase } from 'firebase/database';
import { ref as storageRef, uploadBytes } from 'firebase/storage'

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
    if (grade != 6) {
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
    } else {
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
          <Accordion collapseAll>
            <Accordion.Panel>
              <Accordion.Title>
                როგორ დავრეგისტრირდე საშაბათო სკოლაში?
              </Accordion.Title>
              <Accordion.Content>
                <p>
                  <div>
                    <p>
                      საშაბათო სკოლაში მსმენელთა (III-XI კლასები) ონლაინ
                      რეგისტრაცია, რომელიც დაიწყება 2024 წლის 20 სექტემბრს და
                      გაგრძელდება 2 ოქტომბრამდე. რეგისტრაციისთვის ეწვიეთ სკოლის
                      ვებ-გვერდზე -{" "}
                      <a href="/" className=" text-sky-600">
                        www.vekua42.edu.ge
                      </a>{" "}
                      არსებულ გრაფას „საშაბათო სკოლა“. <br />
                      <br /> III–VI კლასებისათვის მეცადინეობები ჩატარდება
                      მათემატიკაში; VII-XI კლასებისათვის - მათემატიკასა და
                      ფიზიკაში. მეცადინეობის ხანგრძლივობაა 1,5 ასტრონომიული
                      საათი. <br />
                      <br /> მსმენელები, რომლებიც გასულ სასწავლო წელს
                      სარგებლობდნენ საშაბათო სკოლის მომსახურებით და სურვილი აქვთ
                      იმავე მომსახურებით ისარგებლონ მიმდინარე სასწავლო წელსაც,
                      რეგისტრირდებიან თავიდან.
                      <br />
                      <br />
                      რეგისტრაციისას მსმენელი შეარჩევს მისთვის სასურველ პედაგოგს
                      შესაბამისი კლასისა და დროის გათვალისწინებით.
                      მეცადინეობების განრიგი იხილეთ თანდართული ფაილის სახით.
                      <br />
                      <br />
                      თითოეული ჯგუფის სრულად დაკომპლექტების შემთხვევაში
                      ავტომატურად შეწყდება რეგისტრაცია. აღნიშნულ შემთხვევაში
                      შესაძლებლობა გექნებათ რეგისტრაცია გაიაროთ სხვა ჯგუფებში,
                      სხვა პედაგოგთან. <br />
                      <br />
                    </p>
                    <ul className=" list-disc pl-5">
                      <p>საშაბათო სკოლაში სწავლის მსურველი ვალდებულია:</p>
                      <li>
                        გაიაროს ონლაინ რეგისტრაცია სკოლის ვებგვერდზე -
                        vekua42.edu.ge;
                      </li>
                      <li>რეგისტრაციისას მიუთითოს ზუსტი მონაცემები;</li>
                    </ul>
                    <p>
                      რეგისტრაციის გავლისთვის უნდა შეხვიდეთ საიტზე გამოტანილ
                      ფანჯარაში- „საშაბათო სკოლა“ და შეავსეთ სარეგისტრაციო ფორმა
                      შემდეგი ველებით:
                    </p>
                    <ul className=" list-disc pl-5">
                      <ul className=" list-disc pl-5">
                        <li>მოსწავლის სახელი, გვარი;</li>
                        <li>მოსწავლის პირადი ნომერი;</li>
                        <li>
                          მოსწავლის ელ ფოსტა (თიმსის ელ. ფოსტა საჯარო სკოლის
                          მოსწავლეებისთვის, ნებისმიერი სხვა ელ. ფოსტა კეძო
                          სკოლების მოსწავლეებისთვის)
                        </li>
                        <li>მშობლის/კანონოერი წარმომადგენლის სახელი, გვარი;</li>
                        <li>
                          მშობლის/კანონოერი წარმომადგენლის ტელეფონის ნომერი;
                        </li>
                        <li>მშობლის/კანონოერი წარმომადგენლის პირადი ნომერი;</li>
                        <li>
                          მშობლის/კანონოერი წარმომადგენლის სახოვრებელი
                          მისამართი;
                        </li>
                        <li>კლასი რომელშიც მოსწავლე სწავლობს;</li>
                        <li>საგანი, რომელსაც მოსწავლე ირჩევს;</li>
                        <li>პედაგოგი;</li>
                        <li>დრო;</li>
                      </ul>
                      <li>
                        რეგისტრაციის გავლისას „შენახვის“ ღილაკის გამოყენებით
                        ეტაპობრივად (სულ 4 ეტაპი) მოახდინეთ ინფორმაციის შენახვა,
                        შემდეგ ეტაპზე გადასასვლელად გამოიყენეთ ღილაკი „შემდეგი“.
                        რეგისტრაციის დასრულებისთვის კურსორი დააჭირეთ ღილაკს
                        „რეგისტრაცია“;
                      </li>
                      <li>
                        რეგისტრაციის დასრულებას დაგიდასტურებთ წარწერა „მადლობას
                        გიხდით რეგისტრაციისთვის“.
                      </li>
                    </ul>
                    <p>
                      თუ მსმენელს სურვილი აქვს აირჩიოს ორივე საგანი (მათემატიკა
                      და ფიზიკა) , რეგისტრაციას გადის ცალ-ცალკე თითოეულ საგანში;{" "}
                      <br />
                      <br />
                      საშაბათო სკოლაში მეცადინეობა დაიწყება{" "}
                      <b>2023 წლის 7 ოქტომბერს</b>. მეცადინეობები წარიმართება
                      სკოლაში მისამართზე. ჩაიკოვსკის ქუჩა N9
                      <br />
                      <br />
                      საშაბათო სკოლის მომსახურების საფასური ყოველ კალენდარულ
                      თვეში შეადგენს 100 ლარს, რომლის გადახდა ხდება წინასწარ
                      ყოველი თვის 7 რიცხვამდე. სურვილის შემთხვევაში შესაძლებელია
                      რამდენიმე თვის საფასურის ერთად გადახდა.
                      <br />
                      <br />
                    </p>
                    <p>
                      საშაბათო სკოლაში რეგისტრირებული მსმენელის მშობელი
                      მიმართავს სკოლას ხელშეკრულების გასაფორმებლად შემდეგი
                      განრიგის მიხედვით (11-დან 16 საათამდე):
                    </p>
                    <ul>
                      <li>3 ოქტომბერი - III–IV კლასები;</li>
                      <li>4 ოქტომბერი - V-VI კლასები;</li>
                      <li>5 ოქტომბერი - VI-VII კლასები;</li>
                      <li>6 ოქტომბერი - VII-XI კლასები;</li>
                    </ul>
                    <p>
                      <b>
                        აუცილებელია მშობელმა თან იქონიოს თავისი პირადობის
                        მოწმობის ასლი.
                      </b>
                    </p>
                    <p>
                      <b>
                        მიმდინარე სასწავლო წლის განმავლობაში, სასწავლო კურსის
                        არანაკლებ 6 თვით სარგებლობის შემთხვევაში VI-X კლასების
                        მსმენელებს უფლება აქვთ მონაწილეობა მიიღონ საშაბათო
                        სკოლის შემაჯამებელ წერაში მხოლოდ იმ საგანში, რომლითაც
                        სარგებლობდნენ.
                      </b>{" "}
                      ამასთანავე აუცილებელია მითითებული 6 თვიდან მსმენელი
                      საშაბათო სკოლაში ირიცხებოდეს ბოლო 3 თვის განმავლობაში.
                      წერის შედეგებიდან გამომდინარე წარმატებულ მსმენელს
                      რეკომენდაცია ეძლევა სწავლა გააგრძელოს აკადემიკოს ი. ვეკუას
                      სახელობის ფიზიკა-მათემატიკის ქ. თბილისის N 42 საჯარო
                      სკოლაში.
                    </p>
                    <br />
                    <br />
                    <p>გისურვებთ წარმატებებს.</p>
                  </div>
                </p>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>

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
                    {[...Array(10).keys()].map((key) => (
                      <option value={key + 3 == 12 ? 11 : key + 3}>მე-{key + 3} კლასი</option>
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
                    {grade == 6 ? (
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
                      value="კრიტიკული აზროვნება - აირჩიეთ დრო ( მასწავლებლის მიხედვით )"
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
