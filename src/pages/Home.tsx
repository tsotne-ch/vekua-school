import About from "./components/About";
import FBanner from "./components/FBanner";
import { FaSchool } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { HiMiniTrophy } from "react-icons/hi2";
import { TbMathFunction } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect, useRef, useState } from "react";
import { auth, firestore } from "../firebase/firebase.config";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { Button, Datepicker } from "flowbite-react";
import { useInView } from "framer-motion";

const Line = ({ width }: { width: string }) => {
  return (
    <div
      className={`p-1 bg-sky-600 mt-3 rounded-md dark:bg-gray-600`}
      style={{ width: width }}
    ></div>
  );
};

interface PostType {
  info: {
    url: string;
    title: string;
    date: string;
  }
  id: string;
}

const Home = () => {
  const [feed, setFeed] = useState<PostType[]>([]);
  const [loaded, setLoaded] = useState(false);

  const getPosts = async () => {
    const q = query(
      collection(firestore, "posts"),
      where("status", "==", "enabled"),
      limit(4),
      orderBy("number", "desc")
    );
    const querySnapshot = await getDocs(q);
    let list: PostType[] = [];
    querySnapshot.forEach((doc: any) => {
      list.push({ info: doc.data(), id: doc.id });
    });
    setLoaded(true);
    setFeed(list);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const ref = useRef(null);

  const inView = useInView(ref, { once: true });

  return (
    <>
      <Helmet>
        <title>
          {" "}
          სსიპ აკადემიკოს ილია ვეკუას სახელობის ფიზიკა-მათემატიკის ქალაქ
          თბილისის N 42 საჯარო სკოლა
        </title>
      </Helmet>
      <FBanner />
      <div className="dark:bg-slate-900 bg-sky-100 dark:bg-blend-overlay mt-7 dark:bg-opacity-75 bg-grid transition-all duration-300">
        <div className="py-20 container gap-3 grid lg:grid-cols-4 md:grid-cols-2">
          <Link
            to="/history"
            className="hover:scale-110 transition-all duration-300 ease-in-out p-3 flex flex-col items-center rounded-xl justify-center bg-white dark:bg-slate-800  shadow-xl"
          >
            <FaSchool
              size={"4rem"}
              className="text-[#0284c7] dark:text-white"
            />
            <h3 className="font-glaho text-xl mt-3 dark:text-white">
              ისტორია და მისია
            </h3>
          </Link>
          <Link
            to="/exams"
            className="hover:scale-110 transition-all duration-300 ease-in-out p-3 flex flex-col items-center rounded-xl justify-center bg-white dark:bg-slate-800  shadow-xl"
          >
            <PiStudentFill
              size={"4rem"}
              className="text-[#0284c7] dark:text-white"
            />
            <h3 className="font-glaho text-xl mt-3 dark:text-white">
              სარეკომენდაციო წერა
            </h3>
          </Link>
          <Link
            to="/achievments"
            className="hover:scale-110 transition-all duration-300 ease-in-out p-3 flex flex-col items-center rounded-xl justify-center bg-white dark:bg-slate-800 shadow-xl"
          >
            <HiMiniTrophy
              size={"4rem"}
              className="text-[#0284c7] dark:text-white"
            />
            <h3 className="font-glaho text-xl mt-3 dark:text-white">
              მიღწევები
            </h3>
          </Link>
          <Link
            to="/saturday-school"
            className="hover:scale-110 transition-all duration-300 ease-in-out p-3 flex flex-col items-center rounded-xl justify-center bg-white dark:bg-slate-800  shadow-xl"
          >
            <TbMathFunction
              size={"4rem"}
              className="text-[#0284c7] dark:text-white"
            />
            <h3 className="font-glaho text-xl mt-3 dark:text-white">
              საშაბათო სკოლა
            </h3>
          </Link>
        </div>
      </div>

      <About />

      <div className="container mx-auto p-4">
        <h1 className="font-alk text-4xl w- dark:text-white">სიახლეები</h1>
        <Line width={"100%"} />
      </div>

      <div ref={ref} className="flex lg:flex-row flex-col container mx-auto">
        <div
          className={
            "lg:basis-1/4 p-4 hidden lg:flex justify-center transition-all ease-in-out duration-700" +
            `${inView
              ? " translate-x-0 opacity-100"
              : " -translate-x-48 opacity-0"
            }`
          }
        >
          <Datepicker inline className=" sticky" />
        </div>
        <div
          className={
            "lg:basis-3/4 lg:p-4 p-7 transition-all duration-700" +
            `${inView
              ? " translate-y-0 opacity-100"
              : " translate-y-48 opacity-0"
            }`
          }
        >
          <div className="data">
            {loaded ? (
              <>
                {feed.map((post, index) => (
                  <Link
                    key={index}
                    to={`/news/${post.id}`}
                    className={` hover:scale-105 overflow-ellipsis overflow-hidden relative lg:mt-2 mt-4 p-3 md:h-48 w-full flex flex-col md:flex-row rounded-md shadow-md bg-white hover:bg-gray-50 transition-all ease-in-out duration-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700`}
                  >
                    <div
                      style={{
                        backgroundImage: `url(${post.info.url})`,
                        backgroundSize: "cover",
                      }}
                      className="aspect-square w-full md:h-full md:w-auto rounded-md"
                    ></div>
                    <div className="px-3">
                      <h1 className="xl:text-3xl md:text-2xl text-xl font-glaho mt-4 overflow-ellipsis">
                        {post.info.title}
                      </h1>
                      {/* <p className="font-glaho mt-3 mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla tempus vel lectus vel pellentesque. Donec aliquam eros
                    nec magna lobortis malesuada. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit.
                  </p> */}
                      <p className=" text-gray-700 font-glaho mt-2 dark:text-gray-400 lg:absolute lg:bottom-3 lg:right-3">
                        {post.info.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </>
            ) : (
              <>
                <Link to='#'
                  className={` hover:scale-105 overflow-ellipsis overflow-hidden relative mt-2 p-3 md:h-48 w-full flex flex-col md:flex-row rounded-md shadow-md bg-white transition-all ease-in-out duration-300 dark:bg-slate-800 dark:text-white `}
                >
                  <div
                    style={{
                      backgroundSize: "cover",
                    }}
                    className="aspect-square animate-pulse dark:from-gray-600 dark:to-gray-700 from-gray-400 to-gray-500   bg-gradient-to-r w-full md:h-full md:w-auto rounded-md"
                  ></div>
                  <div className="px-3 w-full py-2 animate-pulse">
                    <div className=" h-6 w-full rounded-full from-gray-600 to-gray-700 bg-gradient-to-r"></div>
                    <div className=" h-6 w-full rounded-full mt-4 from-gray-600 to-gray-700 bg-gradient-to-r"></div>
                    <div className=" h-6 w-1/3 rounded-full mt-4 from-gray-600 to-gray-700 bg-gradient-to-r"></div>
                    <div className=" from-gray-600 h-4 w-16 rounded-full to-gray-700 bg-gradient-to-r font-glaho mt-2  absolute bottom-3 right-3"></div>
                  </div>
                </Link>
                <Link to='#'
                  className={` hover:scale-105 overflow-ellipsis overflow-hidden relative mt-2 p-3 md:h-48 w-full flex flex-col md:flex-row rounded-md shadow-md bg-white transition-all ease-in-out duration-300 dark:bg-slate-800 dark:text-white `}
                >
                  <div
                    style={{
                      backgroundSize: "cover",
                    }}
                    className="aspect-square animate-pulse dark:from-gray-600 dark:to-gray-700 from-gray-400 to-gray-500   bg-gradient-to-r w-full md:h-full md:w-auto rounded-md"
                  ></div>
                  <div className="px-3 w-full py-2 animate-pulse">
                    <div className=" h-6 w-full rounded-full from-gray-600 to-gray-700 bg-gradient-to-r"></div>
                    <div className=" h-6 w-full rounded-full mt-4 from-gray-600 to-gray-700 bg-gradient-to-r"></div>
                    <div className=" h-6 w-1/3 rounded-full mt-4 from-gray-600 to-gray-700 bg-gradient-to-r"></div>
                    <div className=" from-gray-600 h-4 w-16 rounded-full to-gray-700 bg-gradient-to-r font-glaho mt-2  absolute bottom-3 right-3"></div>
                  </div>
                </Link>
                <Link to='#'
                  className={` hover:scale-105 overflow-ellipsis overflow-hidden relative mt-2 p-3 md:h-48 w-full flex flex-col md:flex-row rounded-md shadow-md bg-white transition-all ease-in-out duration-300 dark:bg-slate-800 dark:text-white `}
                >
                  <div
                    style={{
                      backgroundSize: "cover",
                    }}
                    className="aspect-square animate-pulse dark:from-gray-600 dark:to-gray-700 from-gray-400 to-gray-500   bg-gradient-to-r w-full md:h-full md:w-auto rounded-md"
                  ></div>
                  <div className="px-3 w-full py-2 animate-pulse">
                    <div className=" h-6 w-full rounded-full from-gray-600 to-gray-700 bg-gradient-to-r"></div>
                    <div className=" h-6 w-full rounded-full mt-4 from-gray-600 to-gray-700 bg-gradient-to-r"></div>
                    <div className=" h-6 w-1/3 rounded-full mt-4 from-gray-600 to-gray-700 bg-gradient-to-r"></div>
                    <div className=" from-gray-600 h-4 w-16 rounded-full to-gray-700 bg-gradient-to-r font-glaho mt-2  absolute bottom-3 right-3"></div>
                  </div>
                </Link>
                <Link to='#'
                  className={` hover:scale-105 overflow-ellipsis overflow-hidden relative mt-2 p-3 md:h-48 w-full flex flex-col md:flex-row rounded-md shadow-md bg-white transition-all ease-in-out duration-300 dark:bg-slate-800 dark:text-white `}
                >
                  <div
                    style={{
                      backgroundSize: "cover",
                    }}
                    className="aspect-square animate-pulse dark:from-gray-600 dark:to-gray-700 from-gray-400 to-gray-500   bg-gradient-to-r w-full md:h-full md:w-auto rounded-md"
                  ></div>
                  <div className="px-3 w-full py-2 animate-pulse">
                    <div className=" h-6 w-full rounded-full from-gray-600 to-gray-700 bg-gradient-to-r"></div>
                    <div className=" h-6 w-full rounded-full mt-4 from-gray-600 to-gray-700 bg-gradient-to-r"></div>
                    <div className=" h-6 w-1/3 rounded-full mt-4 from-gray-600 to-gray-700 bg-gradient-to-r"></div>
                    <div className=" from-gray-600 h-4 w-16 rounded-full to-gray-700 bg-gradient-to-r font-glaho mt-2  absolute bottom-3 right-3"></div>
                  </div>
                </Link>
              </>
            )}
            <Button as={Link} to={"/news"} className="font-glaho w-full mt-6">
              მეტის ნახვა
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
