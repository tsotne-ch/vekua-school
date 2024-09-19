import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, firestore } from "../firebase/firebase.config";
import { Navigate, useNavigate } from "react-router-dom";
import { FaSchool } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { HiMiniTrophy } from "react-icons/hi2";
import { TbMathFunction } from "react-icons/tb";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  documentId,
} from "firebase/firestore";
import parse from "html-react-parser";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Post = () => {

  interface postType {
    title: string;
    url: string;
    content: string;

  }

  const id = useParams();
  const [post, setPost] = useState<postType | null>(null);
  const nav = useNavigate();
  const [found, setFound] = useState(true);

  const getPost = async () => {
    const q = query(
      collection(firestore, "projects"),
      where(documentId(), "==", id.id)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.docs.length) {
      setFound(false);
      return;
    }
    setPost(querySnapshot.docs[0].data() as postType);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <div className=" border-b dark:border-gray-800 w-full py-1"></div>
      <div className="py-20 container dark:text-white">
        {found && post ? (
          <>
            <div className="flex flex-col md:flex-row gap-3">
              <Helmet>
                <title>{post.title}</title>
              </Helmet>
              <div className=" md:w-3/4">
                <div className="flex">
                  <img
                    src={post.url}
                    className="md:w-2/3 w-full rounded-xl"
                  ></img>
                </div>
                <h1 className="font-alk text-4xl mt-5">{post.title}</h1>
                <p className="mt-7 font-glaho gap-5 text-lg">
                  {parse("" + post.content)}
                </p>
              </div>
              <div className=" md:w-1/4 dark:bg-slate-900 bg-sky-100 dark:bg-blend-overlay rounded-xl dark:bg-opacity-75 bg-grid">
                <h1 className="font-alk text-4xl mt-5 text-center mb-7">
                  იხილეთ მეტი
                </h1>
                <div className="container gap-3 flex flex-col">
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
            </div>
          </>
        ) : (
          <>
            <Helmet>
              <title>404</title>
            </Helmet>
            <h1 className="text-7xl text-center">404</h1>
            <h1 className="text-3xl mt-7 font-glaho text-center">
              გვერდი ვერ მოიძებნა
            </h1>
          </>
        )}
      </div>
    </>
  );
};

export default Post;
