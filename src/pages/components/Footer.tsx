import Logo from "./images/vekua_simplified.png";
import { Link } from "react-router-dom";

const Line = ({ width }: { width: string }) => {
  return <div className={`w-${width} p-1 bg-sky-600 mt-3 rounded-md`}></div>;
};

const Footer = () => {
  const currentDate = new Date();

  return (
    <footer className="shadow-inner dark:bg-slate-800 bg-sky-100 transition-all duration-300">
      <div className="container py-8">
        <div className="w-full mb-4">
          <img
            src={Logo}
            alt="logo"
            className=" w-24 bg-white rounded-full p-1"
          />
        </div>
        <div className="flex md:flex-row flex-col gap-8">
          <div className="md:basis-2/6 basis-full">
            <h2 className="font-alk text-2xl dark:text-[#ffffffdb]">
              ჩვენ შესახებ
            </h2>
            <Line width="2/12" />
            <div className="flex flex-col gap-3 mt-3">
              <h3 className=" font-glaho w-2/3 dark:text-[#ffffffdb]">
                აკადემიკოს ილია ვეკუას სახელობის ფიზიკა-მათემატიკის ქალაქ
                თბილისის N42 საჯარო სკოლა
              </h3>
            </div>
            <div className="flex mt-4 gap-3">
              <a
                href="https://www.facebook.com/schoolvekua/"
                className="flex justify-center rounded-sm shadow-lg w-8 items-center aspect-square bg-blue-800 text-white"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/42vekuaschool/"
                className="flex justify-center rounded-sm shadow-lg w-8 items-center aspect-square bg-pink-700 text-white"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://www.youtube.com/channel/UCHl29oGvshhX8VzeU9Lgziw"
                className="flex justify-center rounded-sm shadow-lg w-8 items-center aspect-square bg-red-700 text-white"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className="md:basis-2/6 basis-full flex flex-col justify-between">
            <div>
              <h2 className="font-alk text-2xl dark:text-[#ffffffdb]">
                კონტაქტი
              </h2>
              <Line width="2/12" />
            </div>
            <div className="flex-col flex gap-4 mt-5 justify-between">
              <div className="flex gap-3 items-center">
                <div className="flex justify-center rounded-sm shadow-lg w-8 items-center aspect-square bg-slate-700 text-white">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <p className="font-glaho dark:text-[#ffffffdb]">
                  თბილისი, პეტრე ჩაიკოვსკის 9.
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <div className="flex justify-center rounded-sm shadow-lg w-8 items-center aspect-square bg-slate-700 text-white">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <p className="font-glaho dark:text-[#ffffffdb]">
                  tbilisi42@mes.gov.ge
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <div className="flex justify-center rounded-sm shadow-lg w-8 items-center aspect-square bg-slate-700 text-white">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <p className="font-glaho dark:text-[#ffffffdb]">
                  (995) 032 2 99 00 73
                </p>
              </div>
            </div>
          </div>
          <div className="md:basis-2/6 basis-full flex flex-col">
            <div>
              <h2 className="font-alk text-2xl dark:text-[#ffffffdb]">
                ნავიგაცია
              </h2>
              <Line width="2/12" />
            </div>
            <div className="flex-row flex justify-between mt-5">
              <div className="links flex-col flex gap-3">
                <Link to="/" className="font-glaho dark:text-[#ffffffdb]">
                  მთავარი
                </Link>
                <Link
                  to="/history"
                  className="font-glaho dark:text-[#ffffffdb]"
                >
                  ჩვენ შესახებ
                </Link>
                <Link to="/news" className="font-glaho dark:text-[#ffffffdb]">
                  სიახლეები
                </Link>
                <Link
                  to="/saturday-school"
                  className="font-glaho dark:text-[#ffffffdb]"
                >
                  საშაბათო სკოლა
                </Link>
              </div>
              <div className="links flex-col flex gap-3">
                <Link to="/exams" className="font-glaho dark:text-[#ffffffdb]">
                  სარეკომენდაციო წერა
                </Link>
                <Link
                  to="/contact"
                  className="font-glaho dark:text-[#ffffffdb]"
                >
                  კონტაქტი
                </Link>
                <Link to="/blogs" className="font-glaho dark:text-[#ffffffdb]">
                  ბლოგი
                </Link>
                <Link to="/tv" className="font-glaho dark:text-[#ffffffdb]">
                  ვეკუა TV
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container shadow-inner bg-orange-400 mt-7 dark:bg-orange-800">
        <div className="flex md:flex-row flex-col justify-between font-glaho py-1">
          <p className="text-sm dark:text-[#ffffffdb]">
            სსიპ აკადემიკოს ილია ვეკუას სახელობის ფიზიკა-მათემატიკის ქალაქ
            თბილისის N42 საჯარო სკოლა
          </p>
          <p className="text-sm md:mt-0 mt-4 dark:text-[#ffffffdb]">{`ყველა უფლება დაცულია © ${currentDate.getFullYear()}`}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
