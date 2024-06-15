import Logo from "./images/vekua_simplified.png";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#909590" : "#909590",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        backgroundColor: "#909590",
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#b0b1b0" : "#b0b1b0",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const products = [
  { name: "ისტორია და მისია", href: "/history" },
  { name: "შინაგანწესი", href: "/laws" },
  { name: "სასწავლო გეგმა", href: "/plan" },
  // { name: 'დირექცია და მასწავლებლები', href: '/teachers' },
];

const teachers = [
  { name: "ნინო მთიულიშვილის ბლოგი", href: "https://geocodna.wordpress.com/" },
  { name: "ნინო ნასყიდაშვილის ბლოგი", href: "http://nino42.blogspot.com/" },
  {
    name: "ნინო ნასყიდაშვილის ბლოგი მოსწავლეებისთვის",
    href: "http://moscavleebs.blogspot.com/",
  },
  {
    name: "ანა სალაყაიას ბლოგი",
    href: "https://mtatsminda42.blogspot.com/p/blog-page.html",
  },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [theme, setTheme] = useState("light");
  const [fixed, setFixed] = useState(false);

  useEffect(() => {
    setTheme(localStorage.theme);
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      setChecked(false);
    } else {
      document.documentElement.classList.add("dark");
      setChecked(true);
    }
  }, [theme]);

  function changeTheme() {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 60) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    });
  }, []);

  return (
    <header
      className={`bg-white dark:bg-slate-900 font-alk transition-all duration-300 ${
        fixed ? "md:h-[111.883px]" : ""
      }`}
    >
      <div
        className={
          fixed
            ? "md:fixed md:animate-header md:top-0 md:left-0 md:right-0 z-40 bg-white dark:bg-slate-900 transition-all duration-300 shadow-xl"
            : ""
        }
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5 bg-white rounded-full">
              <img className=" w-16" src={Logo} alt="" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-10">
            <a
              href="/"
              className="text-sm  leading-6 text-gray-900 dark:text-white"
            >
              მთავარი
            </a>
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-sm  leading-6 text-gray-900 dark:text-white">
                ჩვენ შესახებ
                <ChevronDownIcon
                  className="h-5 w-5 flex-none text-gray-400 dark:text-white"
                  aria-hidden="true"
                />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 dark:bg-slate-800 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {products.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 hover:dark:bg-slate-700"
                      >
                        <div className="flex-auto">
                          <a
                            href={item.href}
                            className="block  text-gray-900 dark:text-white"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <a
              href="/news"
              className="text-sm  leading-6 text-gray-900 dark:text-white"
            >
              სიახლეები
            </a>
            <a
              href="/projects"
              className="text-sm  leading-6 text-gray-900 dark:text-white"
            >
              პროგრამები/პროექტები
            </a>
            <a
              href="/exams"
              className="text-sm  leading-6 text-gray-900 dark:text-white"
            >
              სარეკომენდაციო წერა
            </a>
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-sm  leading-6 text-gray-900 dark:text-white">
                ბლოგები
                <ChevronDownIcon
                  className="h-5 w-5 flex-none text-gray-400 dark:text-white"
                  aria-hidden="true"
                />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 dark:bg-slate-800 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {teachers.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 hover:dark:bg-slate-700"
                      >
                        <div className="flex-auto">
                          <a
                            href={item.href}
                            className="block  text-gray-900 dark:text-white"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
            <a
              href="/contact"
              className="text-sm  leading-6 text-gray-900 dark:text-white"
            >
              კონტაქტი
            </a>
            <a
              href="https://www.youtube.com/@TV-ug6oo"
              className="text-sm  leading-6 text-gray-900 dark:text-white"
            >
              ვეკუა TV
            </a>
            <IOSSwitch onChange={() => changeTheme()} checked={checked} />
          </Popover.Group>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-slate-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">ვეკუა 42</span>
                <img className="h-8 w-auto" src={Logo} alt="" />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <a
                    href="/"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base  leading-7 text-gray-900 dark:text-white hover:bg-gray-50"
                  >
                    მთავარი
                  </a>
                  {products.map((item) => (
                    <a
                      href={item.href}
                      key={item.name}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base  leading-7 text-gray-900 dark:text-white hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                  <a
                    href="/news"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base  leading-7 text-gray-900  hover:bg-gray-50 dark:text-white"
                  >
                    სიახლეები
                  </a>
                  <a
                    href="/exams"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base  leading-7 text-gray-900 hover:bg-gray-50 dark:text-white"
                  >
                    სარეკომენდაციო წერა
                  </a>
                  <a
                    href="/contact"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base  leading-7 text-gray-900 hover:bg-gray-50 dark:text-white"
                  >
                    კონტაქტი
                  </a>
                  <a
                    href="https://www.youtube.com/@TV-ug6oo"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base  leading-7 text-gray-900 dark:text-white hover:bg-gray-50"
                  >
                    ვეკუა TV
                  </a>
                  <p className="!mt-8 dark:text-white">ბნელი რეჟიმი</p>
                  <IOSSwitch onChange={() => changeTheme()} checked={checked} />
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
    </header>
  );
}
