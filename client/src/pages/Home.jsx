import About from './components/About'
import FBanner from './components/FBanner'
import { FaSchool } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { HiMiniTrophy } from "react-icons/hi2";
import { TbMathFunction } from "react-icons/tb";

const Home = () => {
  return (
    <>
      <FBanner />
      <div className='dark:bg-slate-900 transition-all duration-300'>
        <div className='py-20 container gap-3 grid lg:grid-cols-4 md:grid-cols-2'>
          <a href='/history' className='hover:scale-110 transition-all duration-300 ease-in-out p-3 flex flex-col items-center rounded-xl justify-center bg-white dark:bg-slate-800  shadow-xl'>
            <FaSchool size={"4rem"} className='text-[#0284c7] dark:text-white' />
            <h3 className='font-glaho text-xl mt-3 dark:text-white'>ისტორია და მისია</h3>
          </a>
          <a href='/exams' className='hover:scale-110 transition-all duration-300 ease-in-out p-3 flex flex-col items-center rounded-xl justify-center bg-white dark:bg-slate-800  shadow-xl'>
            <PiStudentFill size={"4rem"} className='text-[#0284c7] dark:text-white' />
            <h3 className='font-glaho text-xl mt-3 dark:text-white'>მოსწავლეების მიღება</h3>
          </a>
          <a href='#' className='hover:scale-110 transition-all duration-300 ease-in-out p-3 flex flex-col items-center rounded-xl justify-center bg-white dark:bg-slate-800 shadow-xl'>
            <HiMiniTrophy size={"4rem"} className='text-[#0284c7] dark:text-white' />
            <h3 className='font-glaho text-xl mt-3 dark:text-white'>მიღწევები</h3>
          </a>
          <a href='/saturday-school' className='hover:scale-110 transition-all duration-300 ease-in-out p-3 flex flex-col items-center rounded-xl justify-center bg-white dark:bg-slate-800  shadow-xl'>
            <TbMathFunction size={"4rem"} className='text-[#0284c7] dark:text-white' />
            <h3 className='font-glaho text-xl mt-3 dark:text-white'>საშაბათო სკოლა</h3>
          </a>
        </div>
      </div>
      <About />
    </>
  )
}

export default Home