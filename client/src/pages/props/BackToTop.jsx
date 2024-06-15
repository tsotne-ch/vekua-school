import React from 'react'
import {useState, useEffect} from 'react'

const BackToTop = () => {

    const [btnState, setbtnState] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 120)
            {
                setbtnState(true);
            }
            else
            {
                setbtnState(false);
            }
        })
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <button className={`transition-all ease duration-300 ${btnState ? 'scale-100' : 'scale-0'} fixed bottom-4 left-4 z-10 rounded-full bg-sky-800 text-white w-12 aspect-square flex justify-center items-center shadow-lg`} onClick={() => { scrollToTop() }}>
            <i className="fa-solid fa-chevron-up"></i>
        </button>
    )
}

export default BackToTop