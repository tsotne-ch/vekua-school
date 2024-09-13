import React, { useState } from "react";
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
import { Button, Checkbox, Label, TextInput, Select } from "flowbite-react";

const SaturdaySchoolRegistrationPage = () => {
  const [grade, setGrade] = useState(3);

  return (
    <>
      <Helmet>
        <title>საშაბათო სკოლა</title>
      </Helmet>
      <Banner heading="საშაბათო სკოლა" />
      <div className="dark:bg-slate-900">
        <div className="dark:text-white py-20 container font-glaho">
          <Accordion>
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

          <vekuaregistrateform className="block mt-10">
            <form className="flex max-w-3xl m-auto flex-col gap-4">
              <h1 className="text-center text-2xl mb-4">
                საშაბათო სკოლაში მოსწავლის რეგისტრაცია
              </h1>
              {/* <div>
                <div className="mb-2 block">
                  <Label htmlFor="grade" value="კლასი *" />
                </div>
                <Select id="grade" name="grade" required>
                  {[...Array(10).keys()].map((key) => (
                    <option value={key + 3}>მე-{key + 3}</option>
                  ))}
                </Select>
              </div> */}
              <h1 className="text-center mt-4 text-xl mb-4">
                მშობელი/კანონიერი წარმომადგენელი, რომელთანაც იდება ხელშეკრულება:
              </h1>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <div className="mb-2 block">
                    <Label
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
                      htmlFor="ParentPersonalId"
                      value="მშობლის/კანონიერი წარმომადგენლის პირადი ნომერი *"
                    />
                  </div>
                  <TextInput
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
            </form>
          </vekuaregistrateform>
        </div>
      </div>
    </>
  );
};

export default SaturdaySchoolRegistrationPage;
