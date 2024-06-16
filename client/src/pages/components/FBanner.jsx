import React from "react";

const FBanner = () => {
  return (
    <div className="bg-cover bg-center flex items-center bg-black bg-blend-overlay bg-opacity-25 h-[calc(100dvh-111px)] bg-beta-image ">
      <div className="py-5 w-full bg-black bg-opacity-30">
        <div className="container">
          <h1 className="text-white font-alk text-6xl animate-floatIn">
            აკადემიკოს ილია ვეკუას სახელობის
          </h1>
          <h1 className="text-white font-alk text-2xl opacity-0 animate-floatLater mt-4">
            ფიზიკა-მათემატიკის ქალაქ თბილისის N42 საჯარო სკოლა
          </h1>
        </div>
      </div>
    </div>
  );
};

export default FBanner;
