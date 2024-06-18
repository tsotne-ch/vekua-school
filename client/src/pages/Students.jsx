import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FcBusinessContact } from "react-icons/fc";

const Students = () => {
  const [load, setLoaded] = useState(false);
  const [found, setFound] = useState(false);
  const [student, setStudent] = useState({});
  const { code } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8080/findstudent/" + code)
      .then((res) => {
        setStudent(res.data);
        setLoaded(true);
        setFound(true);
      })
      .catch((err) => {
        console.log(err);
        setLoaded(true);
        setFound(false);
      });
  }, []);

  return (
    <div className="py-36 dark:text-white">
      <div className="flex justify-center mb-7">
        <FcBusinessContact size={"9rem"} />
      </div>
      <h1 className="text-7xl text-center font-alk">{code}</h1>

      <div className="container font-glaho mt-10">
        {load ? (
          <>
            {found ? (
              <>
                <div className="text-center">
                  <p>სახელი და გვარი</p>
                  <h2 className="text-3xl mt-2">
                    {student.name} {student.surname}
                  </h2>
                </div>

                <div className="flex flex-col text-center mt-5">
                  <p>პირადი ნომერი</p>
                  <p className="text-3xl">{student.id}</p>
                </div>

                <p className="text-4xl text-center mt-7">
                  მე-{student.class} კლასი
                </p>

                <p className="mt-10 text-xl text-center">
                  გთხოვთ დაიმახსოვროთ ეს კოდი რადგან დაგჭირდებათ ქულის
                  სანახავად. <br></br> გამოცდაზე გთხოვთ გამოცხადდეთ პირადობის
                  დამადასტურებელი საბუთით და კოდით
                </p>
              </>
            ) : (
              <>
                <h1 className="text-3xl mt-10 text-center font-alk">
                  მოსწავლე ამ კოდით არ მოიძებნა
                </h1>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Students;
