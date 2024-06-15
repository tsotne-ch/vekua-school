import React from "react";
import { Helmet } from "react-helmet";
import Banner from "./components/Banner";
import { Button } from "flowbite-react";
import { FaSchool } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { HiMiniTrophy } from "react-icons/hi2";
import { TbMathFunction } from "react-icons/tb";
import { SiFacebook } from "react-icons/si";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const Achievments = () => {
  return (
    <div className="">
      <Helmet>
        <title>მიღწევები</title>
      </Helmet>
      <Banner heading={"მიღწევები"} />
      <div className="py-20 container flex justify-center dark:text-white">
        <div>
          <h2 className="text-3xl mb-7 font-glaho">
            მიღწევების სანახავად გადადით შესაბამის ბმულზე
          </h2>
          <div className="flex flex-col-reverse">
            <Button className="font-glaho m-auto mb-6" href="/2011-2012.pdf">
              2011-2012 სასწავლო წლის მიღწევები
            </Button>
            <Button className="font-glaho m-auto mb-6" href="/2012-2013.pdf">
              2012-2013 სასწავლო წლის მიღწევები
            </Button>
            <Button className="font-glaho m-auto mb-6" href="/2013-2014.pdf">
              2013-2014 სასწავლო წლის მიღწევები
            </Button>
            <Button className="font-glaho m-auto mb-6" href="/2014-2015.pdf">
              2014-2015 სასწავლო წლის მიღწევები
            </Button>
            <Button className="font-glaho m-auto mb-6" href="/2015-2016.pdf">
              2015-2016 სასწავლო წლის მიღწევები
            </Button>
            <Button className="font-glaho m-auto mb-6" href="/2017-2018.pdf">
              2017-2018 სასწავლო წლის მიღწევები
            </Button>
            <Button className="font-glaho m-auto mb-6" href="/2018-2019.pdf">
              2018-2019 სასწავლო წლის მიღწევები
            </Button>
            <Button className="font-glaho m-auto mb-6" href="/2019-2020.pdf">
              2019-2020 სასწავლო წლის მიღწევები
            </Button>
          </div>
        </div>
      </div>
      <div className="dark:bg-slate-900 bg-sky-100 dark:bg-blend-overlay mt-7 dark:bg-opacity-75 bg-grid transition-all duration-300 p-4">
        <div className="py-20 container gap-3 grid lg:grid-cols-4 md:grid-cols-2">
          <a
            href="https://www.facebook.com/schoolvekua/"
            className="hover:scale-110 transition-all duration-300 ease-in-out p-3 flex flex-col items-center rounded-xl justify-center bg-white dark:bg-slate-800  shadow-xl"
          >
            <SiFacebook size={"4rem"} className="text-[#0261c7] " />
            <h3 className="font-glaho text-xl mt-3 dark:text-white">
              Facebook
            </h3>
          </a>
          <a
            href="https://www.instagram.com/42vekuaschool/"
            className="hover:scale-110 transition-all duration-300 ease-in-out p-3 flex flex-col items-center rounded-xl justify-center bg-white dark:bg-slate-800  shadow-xl"
          >
            <FaSquareInstagram size={"4rem"} className="text-pink-700 " />
            <h3 className="font-glaho text-xl mt-3 dark:text-white">
              Instagram
            </h3>
          </a>
          <a
            href="https://www.youtube.com/channel/UCHl29oGvshhX8VzeU9Lgziw"
            className="hover:scale-110 transition-all duration-300 ease-in-out p-3 flex flex-col items-center rounded-xl justify-center bg-white dark:bg-slate-800 shadow-xl"
          >
            <FaYoutube size={"4rem"} className="text-red-700" />
            <h3 className="font-glaho text-xl mt-3 dark:text-white">Youtube</h3>
          </a>
          <a
            href="https://mes.gov.ge/content.php?id=3929&lang=geo"
            className="hover:scale-110 transition-all duration-300 ease-in-out p-3 flex flex-col items-center rounded-xl justify-center bg-white dark:bg-slate-800  shadow-xl"
          >
            <img src="/coa.png" className=" w-20" />
            <h3 className="font-glaho text-xl text-center mt-3 dark:text-white">
              განათლებისა და მეცნიერების სამინისტრო
            </h3>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Achievments;
