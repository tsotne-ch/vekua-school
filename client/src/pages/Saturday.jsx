import React, { useState } from "react";
import Banner from "./components/Banner";
import { Helmet } from "react-helmet";
import { Button, Label, TextInput, Select, FileInput } from "flowbite-react";
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

const Saturday = () => {
  let [open, setOpen] = useState(false);
  let [found, setFound] = useState(false);
  let [data, setData] = useState({});

  const handleSubmit = async (e) => {
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
      .post(process.env.REACT_APP_SERVERURL + "/score", obj)
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
          {/* <p>
            <div>
              <p>
                საშაბათო სკოლაში მსმენელთა (III-XI კლასები) ონლაინ რეგისტრაცია,
                რომელიც დაიწყება 2024 წლის 21 სექტემბრს და გაგრძელდება 2
                ოქტომბრამდე. რეგისტრაციისთვის ეწვიეთ სკოლის ვებ-გვერდზე -{" "}
                <a href="/" className=" text-sky-600">
                  www.vekua42.edu.ge
                </a>{" "}
                არსებულ გრაფას „საშაბათო სკოლა“. <br />
                <br /> III–VI კლასებისათვის მეცადინეობები ჩატარდება
                მათემატიკაში; VII-XI კლასებისათვის - მათემატიკასა და ფიზიკაში.
                მეცადინეობის ხანგრძლივობაა 1,5 ასტრონომიული საათი. <br />
                <br /> მსმენელები, რომლებიც გასულ სასწავლო წელს სარგებლობდნენ
                საშაბათო სკოლის მომსახურებით და სურვილი აქვთ იმავე მომსახურებით
                ისარგებლონ მიმდინარე სასწავლო წელსაც, რეგისტრირდებიან თავიდან.
                <br />
                <br />
                რეგისტრაციისას მსმენელი შეარჩევს მისთვის სასურველ პედაგოგს
                შესაბამისი კლასისა და დროის გათვალისწინებით. მეცადინეობების
                განრიგი იხილეთ თანდართული ფაილის სახით.
                <br />
                <br />
                თითოეული ჯგუფის სრულად დაკომპლექტების შემთხვევაში ავტომატურად
                შეწყდება რეგისტრაცია. აღნიშნულ შემთხვევაში შესაძლებლობა გექნებათ
                რეგისტრაცია გაიაროთ სხვა ჯგუფებში, სხვა პედაგოგთან. <br />
                <br />
              </p>
              <ul className=" list-disc pl-5">
                <p>საშაბათო სკოლაში სწავლის მსურველი ვალდებულია:</p>
                <li>
                  გაიაროს ონლაინ რეგისტრაცია სკოლის ვებგვერდზე - vekua42.edu.ge;
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
                    მოსწავლეებისთვის, ნებისმიერი სხვა ელ. ფოსტა კეძო სკოლების
                    მოსწავლეებისთვის)
                  </li>
                  <li>მშობლის/კანონოერი წარმომადგენლის სახელი, გვარი;</li>
                  <li>მშობლის/კანონოერი წარმომადგენლის ტელეფონის ნომერი;</li>
                  <li>მშობლის/კანონოერი წარმომადგენლის პირადი ნომერი;</li>
                  <li>
                    მშობლის/კანონოერი წარმომადგენლის სახოვრებელი მისამართი;
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
                  რეგისტრაციის დასრულებას დაგიდასტურებთ წარწერა „მადლობას გიხდით
                  რეგისტრაციისთვის“.
                </li>
              </ul>
              <p>
                თუ მსმენელს სურვილი აქვს აირჩიოს ორივე საგანი (მათემატიკა და
                ფიზიკა) , რეგისტრაციას გადის ცალ-ცალკე თითოეულ საგანში; <br />
                <br />
                საშაბათო სკოლაში მეცადინეობა დაიწყება{" "}
                <b>2023 წლის 7 ოქტომბერს</b>. მეცადინეობები წარიმართება სკოლაში
                მისამართზე. ჩაიკოვსკის ქუჩა N9
                <br />
                <br />
                საშაბათო სკოლის მომსახურების საფასური ყოველ კალენდარულ თვეში
                შეადგენს 100 ლარს, რომლის გადახდა ხდება წინასწარ ყოველი თვის 7
                რიცხვამდე. სურვილის შემთხვევაში შესაძლებელია რამდენიმე თვის
                საფასურის ერთად გადახდა.
                <br />
                <br />
              </p>
              <p>
                საშაბათო სკოლაში რეგისტრირებული მსმენელის მშობელი მიმართავს
                სკოლას ხელშეკრულების გასაფორმებლად შემდეგი განრიგის მიხედვით
                (11-დან 16 საათამდე):
              </p>
              <ul>
                <li>3 ოქტომბერი - III–IV კლასები;</li>
                <li>4 ოქტომბერი - V-VI კლასები;</li>
                <li>5 ოქტომბერი - VI-VII კლასები;</li>
                <li>6 ოქტომბერი - VII-XI კლასები;</li>
              </ul>
              <p>
                <b>
                  აუცილებელია მშობელმა თან იქონიოს თავისი პირადობის მოწმობის
                  ასლი.
                </b>
              </p>
              <p>
                <b>
                  მიმდინარე სასწავლო წლის განმავლობაში, სასწავლო კურსის
                  არანაკლებ 6 თვით სარგებლობის შემთხვევაში VI-X კლასების
                  მსმენელებს უფლება აქვთ მონაწილეობა მიიღონ საშაბათო სკოლის
                  შემაჯამებელ წერაში მხოლოდ იმ საგანში, რომლითაც სარგებლობდნენ.
                </b>{" "}
                ამასთანავე აუცილებელია მითითებული 6 თვიდან მსმენელი საშაბათო
                სკოლაში ირიცხებოდეს ბოლო 3 თვის განმავლობაში. წერის შედეგებიდან
                გამომდინარე წარმატებულ მსმენელს რეკომენდაცია ეძლევა სწავლა
                გააგრძელოს აკადემიკოს ი. ვეკუას სახელობის ფიზიკა-მათემატიკის ქ.
                თბილისის N 42 საჯარო სკოლაში.
              </p>
              <br />
              <br />
              <p>გისურვებთ წარმატებებს.</p>
            </div>
          </p> */}
          {/* <div>
            <h2 className="mt-10 text-center text-3xl font-glaho">
              პროგრამები კლასების მიხედვით
            </h2>
            <div className="grid mt-10 mb-12 md:grid-cols-2 gap-5">
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
          </div>
          <p class="mt-7 font-glaho gap-5 text-lg">
            <p>
              <span data-contrast="none">საშაბათო</span>{" "}
              <span data-contrast="none">სკოლის</span>{" "}
              <span data-contrast="none">მსმენელთა</span>{" "}
              <span data-contrast="none">საყურადღებოდ</span>
              <span data-contrast="none">!</span>
              <span data-ccp-props='{"201341983":0,"335557856":16777215,"335559739":0,"335559740":240}'>
                &nbsp;
              </span>
            </p>
            <p>
              <span data-ccp-props='{"201341983":0,"335557856":16777215,"335559739":0,"335559740":240}'>
                &nbsp;
              </span>
            </p>
            <p>
              <span data-contrast="none">საშაბათო</span>{" "}
              <span data-contrast="none">სკოლის</span>{" "}
              <span data-contrast="none">მსმენელებისთვის</span>{" "}
              <span data-contrast="none">შემაჯამებელი</span>{" "}
              <span data-contrast="none">წერა</span>{" "}
              <span data-contrast="none">ჩატარდება</span>
              <span data-contrast="none">:</span>
              <span data-ccp-props='{"201341983":0,"335557856":16777215,"335559739":0,"335559740":240}'>
                &nbsp;
              </span>
            </p>
            <ul>
              <li>
                <span data-contrast="none"> VI </span>
                <span data-contrast="none">კლასი</span>
                <span data-contrast="none"> - </span>
                <span data-contrast="none">მათემატიკა</span>
                <span data-contrast="none"> 202</span>
                <span data-contrast="none">4</span>{" "}
                <span data-contrast="none">წლის</span>
                <span data-contrast="none"> 28 </span>
                <span data-contrast="none">ივნისს</span>
                <span data-contrast="none">, 9 </span>
                <span data-contrast="none">საათზე</span>
                <span data-contrast="none">;</span>
              </li>
              <li>
                <span data-contrast="none"> VII, VIII, IX, X </span>
                <span data-contrast="none">კლასებში</span>
                <span data-contrast="none"> - </span>
                <span data-contrast="none">მათემატიკა</span>
                <span data-contrast="none"> - 2024 </span>
                <span data-contrast="none">წლის</span>{" "}
                <span data-contrast="none">1 ივლისს,</span>
                <span data-contrast="none"> 9 </span>
                <span data-contrast="none">საათზე</span>
                <span data-contrast="none">;&nbsp;</span>
              </li>
            </ul>
            <p>
              <span data-contrast="none">ფიზიკაში</span>
              <span data-contrast="none"> - 2024 </span>
              <span data-contrast="none">წლის</span>
              <span data-contrast="none"> 2 </span>
              <span data-contrast="none">ივლისს</span>
              <span data-contrast="none"> 9 </span>
              <span data-contrast="none">საათზე</span>
              <span data-contrast="none">;</span>
              <span data-ccp-props='{"201341983":0,"335557856":16777215,"335559739":0,"335559740":240}'>
                &nbsp;
              </span>
            </p>
            <p>
              <span data-ccp-props='{"201341983":0,"335557856":16777215,"335559739":0,"335559740":240}'>
                &nbsp;
              </span>
            </p>
            <p>
              <span data-contrast="none">წერის</span>{" "}
              <span data-contrast="none">დაწყებამდე</span>{" "}
              <span data-contrast="none">მოსწავლე</span>{" "}
              <span data-contrast="none">უნდა</span>{" "}
              <strong>
                <span data-contrast="none">გამოცხადდეს</span>
              </strong>
              <strong> </strong>
              <strong>
                <span data-contrast="none">ნახევარი</span>
              </strong>{" "}
              <span data-contrast="none">საათით</span>{" "}
              <span data-contrast="none">ადრე</span>
              <span data-contrast="none">;</span>
              <span data-ccp-props='{"201341983":0,"335557856":16777215,"335559739":0,"335559740":240}'>
                &nbsp;
              </span>
            </p>
            <p>
              <span data-contrast="none">საშაბათო</span>{" "}
              <span data-contrast="none">სკოლის</span>{" "}
              <span data-contrast="none">მსმენელებს</span>{" "}
              <span data-contrast="none">სარეგისტრაციო</span>{" "}
              <span data-contrast="none">ბარათი</span>{" "}
              <span data-contrast="none">ურიგდებათ</span>{" "}
              <span data-contrast="none">სკოლაში</span>
              <span data-contrast="none">, </span>
              <span data-contrast="none">რომელსაც</span>{" "}
              <span data-contrast="none">წარმოადგენენ</span>{" "}
              <span data-contrast="none">შემაჯამებელ</span>{" "}
              <span data-contrast="none">წერაზე</span>
              <span data-contrast="none">. </span>
              <span data-contrast="none">
                ბარათზე მითითებული&nbsp; კოდით&nbsp;&nbsp; შესაძლებელი
                იქნება&nbsp; შემაჯამებელი წერების შედეგების ნახვა.&nbsp;&nbsp;
              </span>
              <span data-ccp-props='{"201341983":0,"335557856":16777215,"335559739":0,"335559740":240}'>
                &nbsp;
              </span>
            </p>
            <p>
              <span data-ccp-props='{"201341983":0,"335557856":16777215,"335559739":0,"335559740":240}'>
                &nbsp;
              </span>
            </p>
            <p>
              <span data-contrast="none">მოსწავლეებს</span>
              <span data-contrast="none">,</span>
              <span data-contrast="none">&nbsp;&nbsp;</span>{" "}
              <span data-contrast="none">საშაბათო</span>{" "}
              <span data-contrast="none">სკოლის</span>{" "}
              <span data-contrast="none">შემაჯამებელი</span>{" "}
              <span data-contrast="none">წერების</span>{" "}
              <span data-contrast="none">შედეგების</span>{" "}
              <span data-contrast="none">საფუძველზე</span>
              <span data-contrast="none">&nbsp;</span>
              <span data-contrast="none">&nbsp; მიეცემა</span>
              <span data-contrast="none">
                თ რეკომენდაცია სწავლა გააგრძელონ აკადემიკოს ი. ვეკუას სახელობის
                ფიზიკა-მათემატიკის ქ. თბილისის{" "}
              </span>
              <span data-contrast="none">N 42 </span>
              <span data-contrast="none">საჯარო სკოლაში</span>
              <span data-contrast="none">,&nbsp;</span>
              <span data-contrast="none">
                {" "}
                ხოლო იმ მოსწავლეებს რომლებსაც ასეთი რეკომენდაცია არ მიეცემათ{" "}
              </span>
              <span data-contrast="none">სურვილის</span>{" "}
              <span data-contrast="none">შემთხვევაში</span>
              <span data-contrast="none">, </span>
              <span data-contrast="none">უფლება აქვთ </span>
              <span data-contrast="none">მონაწილე</span>
              <span data-contrast="none">ობა მიიღონ&nbsp;</span>{" "}
              <span data-contrast="none">სარეკომენდაციო</span>{" "}
              <span data-contrast="none">წერაზე</span>{" "}
              <span data-contrast="none">იმ</span>{" "}
              <span data-contrast="none">ბარათებით</span>
              <span data-contrast="none">, </span>
              <span data-contrast="none">რომლებიც</span>{" "}
              <span data-contrast="none">დაურიგდათ</span>{" "}
              <span data-contrast="none">საშაბათო</span>{" "}
              <span data-contrast="none">სკოლის</span>{" "}
              <span data-contrast="none">მეცადინეობების</span>{" "}
              <span data-contrast="none">დროს</span>
              <span data-contrast="none">!&nbsp;</span>
              <span data-ccp-props='{"201341983":0,"335557856":16777215,"335559739":0,"335559740":240}'>
                &nbsp;
              </span>
            </p>
            <p>
              <span data-ccp-props='{"201341983":0,"335557856":16777215,"335559739":0,"335559740":240}'>
                &nbsp;
              </span>
            </p>
            <ul>
              <li>
                <span data-contrast="none">გაითვალისწინეთ</span>
                <span data-contrast="none">! </span>
                <span data-contrast="none">საშაბათო</span>{" "}
                <span data-contrast="none">სკოლის</span>{" "}
                <span data-contrast="none">შემაჯამებელ</span>{" "}
                <span data-contrast="none">წერაში</span>{" "}
                <span data-contrast="none">მსმენელი</span>{" "}
                <span data-contrast="none">მონაწილეობს</span>{" "}
                <span data-contrast="none">მხოლოდ</span>{" "}
                <span data-contrast="none">იმ</span>{" "}
                <span data-contrast="none">საგანში</span>
                <span data-contrast="none">, </span>
                <span data-contrast="none">რომლის</span>{" "}
                <span data-contrast="none">მომსახურებითაც</span>{" "}
                <span data-contrast="none">სარგებლობდა</span>
                <span data-contrast="none"> 2023-2024 </span>
                <span data-contrast="none">სასწავლო</span>{" "}
                <span data-contrast="none">წლის</span>
                <span data-contrast="none">, </span>
                <span data-contrast="none">არანაკლებ</span>
                <span data-contrast="none"> 6 </span>
                <span data-contrast="none">თვის</span>
                <span data-contrast="none"> ( </span>
                <span data-contrast="none">მათ</span>{" "}
                <span data-contrast="none">შორის</span>{" "}
                <span data-contrast="none">სავალდებულო</span>{" "}
                <span data-contrast="none">ბოლო</span>{" "}
                <span data-contrast="none">სამი</span>{" "}
                <span data-contrast="none">თვის</span>
                <span data-contrast="none">) </span>
                <span data-contrast="none">განმავლობაში</span>
                <span data-contrast="none">.</span>
              </li>
            </ul>
            <p>
              <span data-ccp-props='{"201341983":0,"335557856":16777215,"335559739":0,"335559740":240}'>
                &nbsp;
              </span>
            </p>
            <p>
              <span data-contrast="none">შემაჯამებელ&nbsp;</span>{" "}
              <span data-contrast="none">წერაზე</span>{" "}
              <span data-contrast="none">გამომსვლელი</span>{" "}
              <span data-contrast="none">ვალდებულია</span>
              <span data-contrast="none">:</span>
              <span data-ccp-props='{"201341983":0,"335557856":16777215,"335559739":0,"335559740":240}'>
                &nbsp;
              </span>
            </p>
            <p>
              <span data-ccp-props='{"201341983":0,"335557856":16777215,"335559739":0,"335559740":240}'>
                &nbsp;
              </span>
            </p>
            <ul>
              <li>
                <span data-contrast="none">დროულად</span>{" "}
                <span data-contrast="none">გამოცხადდეს</span>{" "}
                <span data-contrast="none">წერაზე და თან იქონიოს </span>
                <span data-contrast="none">სარეგისტრაციო</span>{" "}
                <span data-contrast="none">ბარათი</span>
                <span data-contrast="none">;</span>
              </li>
              <li>
                <span data-contrast="none">ჰქონდეს</span>{" "}
                <span data-contrast="none">საწერი</span>{" "}
                <span data-contrast="none">კალამი</span>
                <span data-contrast="none">, </span>
                <span data-contrast="none">სახაზავი</span>
                <span data-contrast="none">, </span>
                <span data-contrast="none">ფანქარი</span>
                <span data-contrast="none">, </span>
                <span data-contrast="none">საშლელი</span>
                <span data-contrast="none">;</span>
              </li>
            </ul>
            <p>
              <span data-contrast="none">შემაჯამებელ</span>{" "}
              <span data-contrast="none">წერაზე</span>{" "}
              <span data-contrast="none">გამომსვლელს</span>{" "}
              <span data-contrast="none">უფლება</span>{" "}
              <span data-contrast="none">აქვს</span>
              <span data-contrast="none">:</span>
              <span data-ccp-props='{"201341983":0,"335557856":16777215,"335559739":0,"335559740":240}'>
                &nbsp;
              </span>
            </p>
            <ul>
              <li>
                <span data-contrast="none">ტექნიკურ</span>{" "}
                <span data-contrast="none">საკითხებთან</span>{" "}
                <span data-contrast="none">დაკავშირებით</span>{" "}
                <span data-contrast="none">კონსულტაციისა</span>{" "}
                <span data-contrast="none">და</span>{" "}
                <span data-contrast="none">განმარტებისათვის</span>{" "}
                <span data-contrast="none">მიმართოს</span>{" "}
                <span data-contrast="none">მეთვალყურეს</span>
                <span data-contrast="none">;</span>
              </li>
              <li>
                <span data-contrast="none">ჰქონდეს</span>{" "}
                <span data-contrast="none">წყალი</span>{" "}
                <span data-contrast="none">პოლიეთილენის</span>{" "}
                <span data-contrast="none">ბოთლით</span>
                <span data-contrast="none">;</span>
              </li>
            </ul>
            <p>
              <span data-contrast="none">შემაჯამებელ</span>{" "}
              <span data-contrast="none">წერაზე</span>{" "}
              <span data-contrast="none">გამომსვლელს</span>{" "}
              <span data-contrast="none">ეკრძალება</span>
              <span data-contrast="none">:</span>
              <span data-ccp-props='{"201341983":0,"335557856":16777215,"335559739":0,"335559740":240}'>
                &nbsp;
              </span>
            </p>
            <ul>
              <li>
                <span data-contrast="none">თან</span>{" "}
                <span data-contrast="none">ჰქონდეს</span>{" "}
                <span data-contrast="none">მობილური</span>{" "}
                <span data-contrast="none">ტელეფონი</span>
                <span data-contrast="none">;</span>
              </li>
              <li>
                <span data-contrast="none">გამოიყენოს</span>{" "}
                <span data-contrast="none">ნებისმიერი</span>{" "}
                <span data-contrast="none">საინფორმაციო</span>{" "}
                <span data-contrast="none">წყარო</span>
                <span data-contrast="none">;</span>
              </li>
              <li>
                <span data-contrast="none">წერის</span>{" "}
                <span data-contrast="none">მსვლელობის</span>{" "}
                <span data-contrast="none">დროს</span>{" "}
                <span data-contrast="none">ვერბალური</span>{" "}
                <span data-contrast="none">და</span>{" "}
                <span data-contrast="none">არავერბალური</span>{" "}
                <span data-contrast="none">კომუნიკაცია</span>{" "}
                <span data-contrast="none">სხვა</span>{" "}
                <span data-contrast="none">მონაწილესთან</span>
                <span data-contrast="none">.</span>
              </li>
              <li>
                <span data-contrast="none">მათემატიკის</span>{" "}
                <span data-contrast="none">წერაზე</span>{" "}
                <span data-contrast="none">კალკულატორის</span>{" "}
                <span data-contrast="none">გამოყენება</span>
                <span data-ccp-props='{"201341983":0,"335557856":16777215,"335559739":0,"335559740":240}'>
                  &nbsp;
                </span>
              </li>
            </ul>
            <p>
              <span data-ccp-props='{"201341983":0,"335557856":16777215,"335559739":0,"335559740":240}'>
                &nbsp;
              </span>
            </p>
            <p>
              <span data-contrast="none">ნამუშევრის</span>{" "}
              <span data-contrast="none">შეფასება</span>{" "}
              <span data-contrast="none">და</span>{" "}
              <span data-contrast="none">შედეგის</span>{" "}
              <span data-contrast="none">გამოქვეყნება</span>
              <span data-contrast="none">:</span>
              <span data-ccp-props='{"201341983":0,"335557856":16777215,"335559739":0,"335559740":240}'>
                &nbsp;
              </span>
            </p>
            <p>
              <span data-ccp-props='{"201341983":0,"335557856":16777215,"335559739":0,"335559740":240}'>
                &nbsp;
              </span>
            </p>
            <ul>
              <li>
                <span data-contrast="none">ნამუშევრები</span>{" "}
                <span data-contrast="none">გამსწორებლამდე</span>{" "}
                <span data-contrast="none">მიდის</span>{" "}
                <span data-contrast="none">კოდირებული</span>{" "}
                <span data-contrast="none">ფორმით</span>
                <span data-contrast="none">;</span>
              </li>
              <li>
                <span data-contrast="none">შეფასებები</span>{" "}
                <span data-contrast="none">გამოქვეყნდება</span>{" "}
                <span data-contrast="none">სკოლის</span>{" "}
                <span data-contrast="none">საიტზე</span>
                <span data-contrast="none"> 3 </span>
                <span data-contrast="none">კალენდარული</span>{" "}
                <span data-contrast="none">დღის</span>{" "}
                <span data-contrast="none">განმავლობაში</span>{" "}
                <span data-contrast="none">სარეგისტრაციო</span>{" "}
                <span data-contrast="none">ბარათის</span>{" "}
                <span data-contrast="none">ნომრის</span>{" "}
                <span data-contrast="none">შესაბამისად</span>
                <span data-contrast="none">;</span>
              </li>
            </ul>
            <p>
              <span data-contrast="none">დამატებითი</span>{" "}
              <span data-contrast="none">ინფორმაციისთვის</span>{" "}
              <span data-contrast="none">დაგვიკავშირდით</span>{" "}
              <span data-contrast="none">სკოლის</span>{" "}
              <span data-contrast="none">ტელ</span>
              <span data-contrast="none">. </span>
              <span data-contrast="none">ნომერზე</span>
              <span data-contrast="none">: 2 99 00 73 </span>
              <span data-contrast="none">ან</span>{" "}
              <span data-contrast="none">ელექტრონულ</span>{" "}
              <span data-contrast="none">ფოსტებზე</span>
              <span data-contrast="none">: support@vekua42.edu.ge; </span>
              <a href="mailto:it@vekua42.edu.ge">
                <span data-contrast="none">it@vekua42.edu.ge</span>
              </a>
              <span data-contrast="none">.</span>
              <span data-ccp-props='{"201341983":0,"335557856":16777215,"335559739":0,"335559740":240}'>
                &nbsp;
              </span>
            </p>
          </p> */}
          <>
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
            {found ? (
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
          </>
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
    </>
  );
};

export default Saturday;
