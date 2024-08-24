import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { HiPhone } from "react-icons/hi2";
import { Helmet } from "react-helmet";
import { auth, firestore, firebase } from "../firebase/firebase.config";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  addDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";

const Contact = () => {
  const [count, setCount] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const q = query(collection(firestore, "messages"));
    const querySnapshot = await getDocs(q);
    let list = [];
    querySnapshot.forEach((doc) => {
      list.push({ info: doc.data(), id: doc.id });
    });
    setCount(list.length);

    console.log(list.length);
    const messageRef = await addDoc(collection(firestore, "messages"), {
      name: e.target.name.value,
      status: "active",
      title: e.target.title.value,
      mobileNumber: e.target.phone.value,
      email: e.target.email.value,
      content: e.target.content.value,
      code: list.length + 1,
    }).then(() => {
      Swal.fire("წარმატება!", "წერილი წარმატებით გაიგზავნა", "success");
    });
  };

  return (
    <div className="py-20 container">
      <Helmet>
        <title>კონტაქტი</title>
      </Helmet>
      <form
        className="flex m-auto max-w-3xl flex-col gap-4 rounded-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-alk text-center mb-3 dark:text-white">
          კონტაქტი
        </h1>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3705.7397193867932!2d44.794248716898544!3d41.69327600549267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cec02a4e4ff%3A0xa40152bf67fa2b5c!2z4YOY4YOa4YOY4YOQIOGDleGDlOGDmeGDo-GDkOGDoSDhg6Hhg5Dhg64uIOKEljQyIOGDoeGDkOGDr-GDkOGDoOGDnSDhg6Hhg5nhg53hg5rhg5A!5e1!3m2!1ska!2sge!4v1631458317983!5m2!1ska!2sge"
          title="map"
          height="450"
          allowfullscreen=""
          className="rounded-xl shadow-lg w-full"
          loading="lazy"
        ></iframe>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="namr" value="სახელი" />
          </div>
          <TextInput
            id="name"
            autoComplete="false"
            name="name"
            type="text"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email2" value="ელ-ფოსტა" />
          </div>
          <TextInput
            id="email2"
            type="email"
            name="email"
            icon={HiMail}
            autoComplete={false}
            placeholder="name@email.com"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phonenum" value="ტელ-ნომერი" />
          </div>
          <TextInput
            id="phonenum"
            autoComplete="false"
            icon={HiPhone}
            type="text"
            name="phone"
            maxLength={9}
            placeholder="+995-5..."
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="header" value="სათაური" />
          </div>
          <TextInput
            id="header"
            name="title"
            autoComplete="false"
            type="text"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="comment" value="შეტყობინება" />
          </div>
          <Textarea
            id="comment"
            placeholder="დატოვეთ შეეტყობინება..."
            required
            name="content"
            rows={4}
          />
        </div>
        <Button type="submit">გაგზავნა</Button>
      </form>
    </div>
  );
};

export default Contact;
