import "./App.css";
import Header from "./pages/components/Header";
import Footer from "./pages/components/Footer";
import BackToTop from "./pages/props/BackToTop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

function App() {
  let urls = ["/login"];
  return (
    <Router>
      <div className="App">
        <BackToTop />
        <Header />
        <div className="content dark:bg-slate-900 transition-colors duration-300">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/saturday-school" element={<Saturday />} />
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
