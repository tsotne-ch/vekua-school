import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Line = ({ width }: { width: string }) => {
  return (
    <div
      className={`p-1 bg-sky-600 mt-3 rounded-md dark:bg-gray-600`}
      style={{ width: width }}
    ></div>
  );
};

const About = () => {
  const [faded, setFaded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) setFaded(true);
  }, [isInView]);

  return (
    <motion.section
      ref={ref}
      className={` bg-[rgb(232, 249, 255)] py-20 dark:bg-slate-900 transition-all duration-300 ${faded ? "animate-floatIn" : ""
        }`}
    >
      <div className="container">
        <div className={`flex xl:flex-row flex-col`}>
          <div className=" xl:basis-1/2 basis-full">
            <h1 className="font-alk text-4xl w- dark:text-white">
              ჩვენ შესახებ
            </h1>
            <Line width={"100%"} />
            <p className="font-glaho mt-5 text-lg dark:text-[#ffffffdb]">
              აკადემიკოს ილია ვეკუას სახელობის ფიზიკა-მათემატიკის ქალაქ თბილისის
              N42 საჯარო სკოლა სპეციალიზებულია. სკოლის სტრატეგიული მიზნები და
              მისია მისი პროფილიდან გამომომდინარეობს. სკოლა აქტიურად ზრუნავს,
              მოამზადოს ახალგარდა ლიდერები სამოქალაქო საზოგადოების მშენებლობაში
              წარმატებული მოღვაწეობისათვის. მხოლოდ სამოქალაქო საზოგადოების
              პირობებშია შესაძლებელი დემოკრატიული სახელმწიფოს ფორმირება. სკოლის
              საქმიანობა ასევე ემსახურება მომავალ თაობებში პატრიოტული
              გრძნობებისა და სამოქალაქო ცნობიერების განვითარებას, სათანადო
              უნარ-ჩვევების გამომუშავებას, პიროვნების პატივისცემასა და ა.შ.
              სკოლის ძირითადი დანიშნულებაა მოამზადოს განათლებული ახალგაზრდა
              ლიდერები, რომელთაც შეეძლებათ, საბაზრო ეკონომიკის პირობებში,
              თავიანთი ინტელექტუალური პოტენციალის თვითრეალიზება და ქვეყნის
              ეკონომიკური განვითარების პროცესებში წარმატებულად მონაწილეობა.
            </p>
          </div>
          <div className="xl:basis-1/2 basis-full md:p-9 relative">
            <img
              src="/images/dots.png"
              className="absolute top-0 z-0 right-0 animate-wave md:inline-block hidden dark:brightness-70"
              alt="grid"
            ></img>
            <img
              src="/images/hall.jpg"
              className="w-full rounded-2xl animate-float shadow-xl"
              alt="vekua school pic"
            ></img>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
