import React from "react";

const FBanner = () => {
  return (
    <div className="bg-cover bg-center relative flex items-center bg-black bg-blend-overlay bg-opacity-25 h-[calc(60dvh-111px)] bg-beta-image ">
      <div className="py-5 w-full absolute bottom-5 bg-black bg-opacity-30">
        <div className="container">
          <h1 className="text-white font-alk text-3xl animate-floatIn">
            აკადემიკოს ილია ვეკუას სახელობის ფიზიკა-მათემატიკის ქალაქ თბილისის
            N42 საჯარო სკოლა
          </h1>
        </div>
      </div>
    </div>
  );
};

export default FBanner;
