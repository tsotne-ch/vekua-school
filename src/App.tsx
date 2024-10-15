import "./App.css";
import Header from "./pages/components/Header";
import Footer from "./pages/components/Footer";
import BackToTop from "./pages/props/BackToTop";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import History from "./pages/History";
import Saturday from "./pages/Saturday";
import Exam from "./pages/Exam";
import Policy from "./pages/Policy";
import Contact from "./pages/Contact";
import News from "./pages/News";
import Plan from "./pages/Plan";
import Students from "./pages/Students";
import Card from "./pages/Card";
import { PDFViewer } from "@react-pdf/renderer";
import Post from "./pages/Post";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import Achievments from "./pages/Achievments";
import Login from "./pages/Login";
import SaturdaySchool from './pages/Saturday';
import SaturdaySchoolRegistrationPage from "./pages/SaturdaySchoolRegistrationPage"; // longass import statement lmao
import SaturdaySchoolAboutPage from './pages/SaturdaySchoolAbout';
import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase/firebase.config";
import Spreadsheet from "./pages/Spreadsheet";

function PrivateRoute({ children }: { children?: ReactNode }) {

  const [admin, setAdmin] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setAdmin(user);
        console.log("uid", uid);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []);

  return <>{admin ? <>{children}</> : <></>}</>


}

function App() {
  let location = window.location;
  let urls = ["/login"];
  return (
    <Router>
      <div className="App">
        {location.pathname != '/admin' ? <><Header /><BackToTop /></> : <></>}
        <div className="content dark:bg-slate-900 transition-colors duration-300">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route
              path="/saturday-school"
              element={<SaturdaySchool />}
            />
            <Route path="/exams" element={<Exam />} />
            <Route path="/laws" element={<Policy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<Post />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/achievments" element={<Achievments />} />
            <Route path="/projects/:id" element={<Project />} />
            <Route path="/login" element={<Login />} />

            <Route path="/admin" element={<PrivateRoute><Spreadsheet /></PrivateRoute>} />
            {/* <Route path="/student/:code" element={<Students />} /> */}
            <Route
              path="*"
              element={
                <div className="py-20 container dark:text-white">
                  <h1 className="text-7xl text-center">404</h1>
                  <h1 className="text-3xl mt-7 font-glaho text-center">
                    გვერდი ვერ მოიძებნა
                  </h1>
                </div>
              }
            />
          </Routes>
        </div>
        {location.pathname != '/admin' ? <Footer /> : <></>}
      </div>
    </Router>
  );
}

export default App;
