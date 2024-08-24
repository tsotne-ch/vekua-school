import { Button } from "flowbite-react";
import { FaDownload } from "react-icons/fa6";
import Banner from "./components/Banner";
import React from "react";
import { FcDocument } from "react-icons/fc";
import { Helmet } from "react-helmet";

const Policy = () => {
  return (
    <>
      <Helmet>
        <title>შინაგანწესი</title>
      </Helmet>
      <Banner heading="სკოლის შინაგანწესი" />
      <div className="py-20 container">
        <div className="flex justify-center mb-7">
          <FcDocument size={"6rem"} />
        </div>

        <h1 className="text-3xl font-alk text-center dark:text-white">
          სსიპ აკადემიკოს ილია ვეკუას სახელობის ფიზიკა-მათემატიკის ქალაქ
          თბილისის #42 საჯარო სკოლის შინაგანწესი
        </h1>

        <h2 className="text-2xl font-alk text-center mt-3 dark:text-white">
          2021 წელი
        </h2>

        <div className="flex justify-center mt-5">
          <Button color="blue" href="/laws.pdf" download="">
            <FaDownload size={"1.1rem"} className="mr-3" /> შინაგანწესის
            გადმოწერა
          </Button>
        </div>
      </div>
    </>
  );
};

export default Policy;
