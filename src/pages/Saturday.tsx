import React, { useState } from "react";
import Banner from "./components/Banner";
import { Helmet } from "react-helmet";
import { Button, Label, TextInput, Select, FileInput } from "flowbite-react";
import { FcGraduationCap, FcLock } from "react-icons/fc";
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

interface StudentType {
  name: string;
  surname: string;
  score: string;
  math: string | null;
  physics: string | null;
  class: number;
}

const Saturday = () => {
  let [open, setOpen] = useState(false);
  let [found, setFound] = useState(false);
  let [data, setData] = useState<StudentType | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: "<p class='font-glaho'>იტვირთება</p>",
      html: "<p class='font-glaho'>გთხოვთ დაიცადოთ, მოსწავლე რეგისტრირდება</p>",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    console.log("Req");
    const obj = {
      code: e.target.code.value,
    };

    axios
      .post(import.meta.env.VITE_REACT_APP_SERVERURL + "/score", obj)
      .then((res) => {
        Swal.close();
        if (res.data.err) {
          setOpen(true);
          setFound(false);
          return;
        }
        console.log(res.data);
        setFound(true);
        setData(res.data);
      })
      .catch((err) => {
        setFound(false);
        console.log(err);
        Swal.close();
        setOpen(true);
      });
  };

  return (
    <>
      <Helmet>
        <title>საშაბათო სკოლა</title>
      </Helmet>
      <Banner heading="საშაბათო სკოლა" />
      <div className="dark:bg-slate-900">
        <div className="dark:text-white py-20 container font-glaho">

          <h4 className=" mt-10 font-glaho text-3xl text-center">
            საშაბათო სკოლისთვის ონლაინ რეგისტრაცია დასრულებულია
          </h4>
          <div className="flex justify-center">
            <FcGraduationCap size={"6.4rem"} />
          </div>

          <h1 className="text-center text-2xl mt-24">
            საშაბათო სკოლა - 2024-2025 სასწავლო წელი
          </h1>

          <p className="text-lg mt-12">
            ვეკუას სკოლის საშაბათო სკოლის მეცადინეობა დაიწყება 5 ოქტომბერს III-XI კლასებისთვის. <br /> საშაბათო სკოლის თითო საგნის გაკვეთილი მოიცავს 1.5 ასტრონომიულ საათს და ტარდება კვირაში ერთხელ. <br /> <br /> თვიური ღირებულება თითო საგნისთვის არის 100 ლარი. <b>VI-X</b> კლასელებს შეუძლიათ მიიღონ მონაწილეობა ივნისის ბოლოს საშაბათო სკოლის შემაჯამებელი წერაზე. საშაბათო სკოლის შემაჯამებელ წერაში მსმენელი მონაწილეობს მხოლოდ იმ საგანში, რომლის მომსახურებითაც სარგებლობდა 2023-2024 სასწავლო წლის, არანაკლებ 6 თვის (მათ შორის სავალდებულო ბოლო სამი თვის) განმავლობაში. მოსწავლეებს, საშაბათო სკოლის შემაჯამებელი წერების შედეგების საფუძველზე   მიეცემათ რეკომენდაცია სწავლა გააგრძელონ აკადემიკოს ი. ვეკუას სახელობის ფიზიკა-მათემატიკის ქ. თბილისის N 42 საჯარო სკოლაში <br /><br /> საშაბათო სკოლის 2024-2025 სასწავლო წლის განრიგი:
          </p>

          <div className="flex justify-center">
            <img src="https://i.postimg.cc/mDQDtntF/ganrigi.jpg" className="mt-7 lg:w-2/3 w-full rounded-lg"></img>
          </div>

          <div className="hidden">
            <h1 className="mt-10 mb-10 font-glaho text-3xl text-center">
              28 ივნისს, 1 და 2 ივლისს ჩატარებული საშაბათო სკოლის შემაჯამებელი
              წერის ქულის შემოწმება
            </h1>
            <form
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto flex flex-col"
            >
              <div className="flex justify-center">
                <FcLock size={"6.4rem"} />
              </div>
              <div className="mb-2 block">
                <Label htmlFor="email3" value="მოსწავლის რეგისტრაციის კოდი" />
              </div>
              <TextInput
                id="email3"
                type="text"
                placeholder="მაგ. 7-000"
                required
                name="code"
              // helperText={
              //     <>
              //         We’ll never share your details. Read our
              //         <a href="#" className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
              //             Privacy Policy
              //         </a>
              //         .
              //     </>
              // }
              />
              <Button color="blue" type="submit" className="mt-6 mb-10" pill>
                მოსწავლის ქულის ნახვა
              </Button>
            </form>
            {found && data ? (
              <>
                {/* <div className="text-center">
                  <h1 className="text-2xl">
                    {data.name} {data.surname}
                  </h1>
                  <h2 className="text-4xl mt-5">{data.score} ქულა</h2>
                </div> */}
                {data.class == 7 ? (
                  <div className="text-center">
                    <h1 className="text-2xl">
                      {data.name} {data.surname}
                    </h1>
                    <h2 className="text-4xl mt-5">{data.score} ქულა</h2>
                  </div>
                ) : (
                  <div className="text-center">
                    <h1 className="text-2xl">
                      {data.name} {data.surname}
                    </h1>
                    <h2 className="text-4xl mt-5">
                      მათემატიკა:{" "}
                      {data.math == "x" ? "შეფასება არ აქვს" : "" + data.math}
                    </h2>
                    <h2 className="text-4xl mt-5">
                      ფიზიკა:{" "}
                      {data.physics == "x"
                        ? "შეფასება არ აქვს"
                        : "" + data.physics}
                    </h2>
                  </div>
                )}
              </>
            ) : (
              <></>
            )}
          </div>



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
                          შეფასება ვერ მოიძებნა
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 dark:text-gray-300">
                            არსებულ კოდზე შეფასება არ იძებნება.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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
    </>
  );
};

export default Saturday;
