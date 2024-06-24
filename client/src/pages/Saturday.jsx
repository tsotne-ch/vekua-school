import React from "react";
import Banner from "./components/Banner";
import { Helmet } from "react-helmet";
import { Button } from "flowbite-react";

const Saturday = () => {
  return (
    <>
      <Helmet>
        <title>საშაბათო სკოლა</title>
      </Helmet>
      <Banner heading="საშაბათო სკოლა" />
      <div className="dark:bg-slate-900">
        <div className="dark:text-white py-10 container font-glaho">
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
          <div>
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
          </p>
        </div>
      </div>
    </>
  );
};

export default Saturday;
