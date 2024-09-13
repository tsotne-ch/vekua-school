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
import { display } from "@mui/system";

const SaturdaySchoolRegistrationPage = () => {
  const [grade, setGrade] = useState(3);
  const [techer, setTecher] = useState("გიორგი კაკაბაძე");
  const TeacherSelect = () => {
    if (techer === "გიორგი კაკაბაძე") {
      return (
        <Select id="countries" required defaultValue={""}>
          <option>
            გიორგი კაკაბაძე - 11:00 (11 ადგილი) - ჯგუფის ასარჩევად გთხოვთ
            აირჩიოთ შესაბამისი მასწავლებელი
          </option>
          <option>
            გიორგი კაკაბაძე - 12:30 (15 ადგილი) - ჯგუფის ასარჩევად გთხოვთ
            აირჩიოთ შესაბამისი მასწავლებელი
          </option>
        </Select>
      );
    } else if (techer == "თემურ გაჩეჩილაძე") {
      return (
        <Select id="countries" required defaultValue={""}>
          <option>
            თემურ გაჩეჩილაძე - 11:00 (2 ადგილი) - ჯგუფის ასარჩევად გთხოვთ
            აირჩიოთ შესაბამისი მასწავლებელი
          </option>
          <option>
            თემურ გაჩეჩილაძე - 12:30 (2 ადგილი) - ჯგუფის ასარჩევად გთხოვთ
            აირჩიოთ შესაბამისი მასწავლებელი
          </option>
        </Select>
      );
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
            <form className="flex max-w-4xl m-auto flex-col gap-4">
              <h1 className="text-center text-4xl mb-4">
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
              <h1 className="text-center mt-4 text-xl font-bold mb-4">
                მშობელი/კანონიერი წარმომადგენელი, რომელთანაც იდება ხელშეკრულება:
                <div className=" mt-2 bg-blue-500 rounded-lg border border-blue-500 h-[6px] w-full"></div>
              </h1>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <div className="mb-2 block">
                    <Label
                      className="font-glaho text-md"
                      htmlFor="ParentFirstName"
                      value="მშობლის/კანონიერი წარმომადგენლის სახელი"
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
                      value="მშობლის/კანონიერი წარმომადგენლის გვარი"
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
                    value="მშობლის/კანონიერი წარმომადგენლის მისამართი"
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
                      value="მშობლის/კანონიერი წარმომადგენლის ტელ-ნომერი "
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
                      value="მშობლის/კანონიერი წარმომადგენლის პირადი ნომერი"
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
                <div className=" mt-2 bg-blue-500 rounded-lg border border-blue-500 h-[6px] w-full"></div>
              </h1>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <div className="mb-2 block">
                    <Label
                      className="font-glaho text-md"
                      htmlFor="ParentFirstName"
                      value="მოსწავლის სახელი"
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
                      value="მოსწავლის გვარი"
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
                    value="მოსწავლის ელექტრონული ფოსტა (Teams-ში აქტიური ელ.ფოსტა)"
                  />
                </div>
                <TextInput id="Address" name="address" type="text" required />
              </div>
              <div className="grid-cols-2 w-full">
                <div className="">
                  <div className="mb-4 mt-4 block">
                    <Label
                      className="font-glaho text-md"
                      htmlFor="countries"
                      value="მოსწავლის კლასი"
                    />
                  </div>
                  <Select
                    id="countries"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setGrade(e.target.value);
                    }}
                    required
                  >
                    <option value={3}>3 კლასი</option>
                    <option value={4}>4 კლასი</option>
                    <option value={5}>5 კლასი</option>
                    <option value={6}>6 კლასი</option>
                    <option value={7}>7 კლასი</option>
                    <option value={8}>8 კლასი</option>
                    <option value={9}>9 კლასი</option>
                    <option value={10}>10 კლასი</option>
                    <option value={11}>11 კლასი</option>
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
                  {grade > 6 ? (
                    <Select id="countries" required>
                      <option value="math">მათემატიკა</option>
                      <option value="physics">ფიზიკა</option>
                    </Select>
                  ) : (
                    <Select id="countries" required>
                      <option value="math">მათემატიკა</option>
                    </Select>
                  )}
                </div>
              </div>
              <h1 className="text-center mt-4 text-2xl font-bold mb-4">
                დროისა და მასწავლებლის არჩევა:
                <div className=" mt-2 bg-blue-500 rounded-lg border border-blue-500 h-[6px] w-full"></div>
              </h1>
              <div className="grid-cols-2 w-full">
                <div className="">
                  <div className="mb-4 mt-4 block">
                    <Label
                      className="font-glaho text-md"
                      htmlFor="countries"
                      value="აირჩიეთ მასწავლებელი"
                    />
                  </div>
                  <Select
                    id="countries"
                    required
                    onChange={(e) => {
                      setTecher(e.target.value);
                    }}
                  >
                    <option>გიორგი კაკაბაძე</option>
                    <option>თემურ გაჩეჩილაძე</option>
                  </Select>
                </div>
                <div className="">
                  <div className="mb-2 mt-4 block">
                    <Label
                      className="font-glaho text-md"
                      htmlFor="countries"
                      value="აირჩიეთ დრო ( მასწავლებლის მიხედვით )"
                    />
                    <TeacherSelect />
                  </div>
                </div>
                <div className="flex flex-wrap items-start gap-2 w-full mt-5">
                  <Button
                    size="md"
                    className="w-full font-alk tracking-widest "
                  >
                    რეგისტრაცია
                  </Button>
                </div>
              </div>
            </form>
          </vekuaregistrateform>
        </div>
      </div>
    </>
  );
};

export default SaturdaySchoolRegistrationPage;
