import React, { useEffect } from "react";
import { FaDownload } from "react-icons/fa6";
import Banner from "./components/Banner";
import { Button } from "flowbite-react";
import { Datepicker } from "flowbite-react";
import { Card } from "flowbite-react";
import { motion } from "framer-motion";
import { auth, firestore, firebase } from "../firebase/firebase.config";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { Pagination } from "flowbite-react";
import { useState } from "react";
import { Helmet } from "react-helmet";

interface PostType {
  info: {
    url: string;
    title: string;
    date: string;
  }
  id: string;
}

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [feed, setFeed] = useState<PostType[]>([]);
  const [size, setSize] = useState(1);

  const getPosts = async () => {
    const q = query(
      collection(firestore, "projects"),
      where("status", "==", "enabled"),
      orderBy("number", "desc")
    );
    const querySnapshot = await getDocs(q);
    let list: PostType[] = [];
    querySnapshot.forEach((doc: any) => {
      list.push({ info: doc.data(), id: doc.id });
    });
    setSize(Math.ceil(list.length / 4));

    setPosts(list);
    setFeed(list.slice(0, 4));
  };

  useEffect(() => {
    getPosts();
  }, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    const l = (page - 1) * 4;
    const r = l + 4;
    setFeed(posts.slice(l, r));
  };
  return (
    <>
      <Banner heading="პროგრამები და პროექტები" />
      <Helmet>
        <title>პროგრამები და პროექტები</title>
      </Helmet>
      <div className="py-20 container">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:basis-1/4 p-4 justify-center flex">
            <Datepicker inline className=" sticky" />
          </div>
          <div className="lg:basis-3/4 p-4">
            <div className="data">
              {feed.map((post, index) => (
                <motion.a
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.2,
                    delay: 0.1 * (index - 1),
                    ease: [0, 0.71, 0.9, 1.01],
                  }}
                  href={`/projects/${post.id}`}
                  className="overflow-ellipsis overflow-hidden relative mt-2 p-3 md:h-48 w-full flex flex-col md:flex-row rounded-md shadow-md bg-white hover:bg-gray-50 transition-all ease-in-out duration-100 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                >
                  <div
                    style={{
                      backgroundImage: `url(${post.info.url})`,
                      backgroundSize: "cover",
                    }}
                    className="aspect-square w-full md:h-full md:w-auto rounded-md"
                  ></div>
                  <div className="px-3">
                    <h1 className="xl:text-3xl text-2xl font-glaho mt-4 overflow-ellipsis">
                      {post.info.title}
                    </h1>
                    {/* <p className="font-glaho mt-3 mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla tempus vel lectus vel pellentesque. Donec aliquam eros
                    nec magna lobortis malesuada. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit.
                  </p> */}
                    <p className=" text-gray-700 font-glaho mt-2 dark:text-gray-400 absolute bottom-3 right-3">
                      {post.info.date}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
            <div className="flex mt-3 overflow-x-auto justify-center">
              <Pagination
                currentPage={currentPage}
                nextLabel=""
                previousLabel=""
                showIcons
                totalPages={size}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
