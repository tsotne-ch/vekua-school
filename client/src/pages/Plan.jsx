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
        <title>სასწავლო გეგმა</title>
      </Helmet>
      <Banner heading="სასკოლო სასწავლო გეგმა" />
      <div className="py-20 container">
        <div className="flex justify-center mb-7">
          <FcDocument size={"6rem"} />
        </div>

        <h1 className="text-3xl font-alk text-center dark:text-white">
          სსიპ აკადემიკოს ილია ვეკუას სახელობის ფიზიკა-მათემატიკის ქალაქ
          თბილისის #42 საჯარო სკოლის სასკოლო სასწავლო გეგმა
        </h1>

        <h2 className="text-2xl font-alk text-center mt-3 dark:text-white">
          2022-2023 წელი
        </h2>

        <div className="flex justify-center mt-5">
          <Button color="blue" href="/სასკოლო_სასწავლო_გეგმა.pdf" download="">
            <FaDownload size={"1.1rem"} className="mr-3" /> სასწავლო გეგმის
            გადმოწერა
          </Button>
        </div>
      </div>
    </>
  );
};

export default Policy;
