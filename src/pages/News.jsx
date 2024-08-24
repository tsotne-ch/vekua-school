import React, { useEffect, useRef } from "react";
import { FaDownload } from "react-icons/fa6";
import Banner from "./components/Banner";
import { Button } from "flowbite-react";
import { Datepicker } from "flowbite-react";
import { Card } from "flowbite-react";
import { motion } from "framer-motion";
import { auth, firestore, firebase } from "../firebase/firebase.config";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { Pagination } from "flowbite-react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { onAuthStateChanged } from "firebase/auth";
import { Link as LinkRoute } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  ClassicEditor,
  AccessibilityHelp,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  Bold,
  Code,
  CodeBlock,
  Essentials,
  GeneralHtmlSupport,
  Heading,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Paragraph,
  PasteFromOffice,
  SelectAll,
  ShowBlocks,
  SourceEditing,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

const MotionComponent = ({ as, children, ...props }) => {
  const ChildrenComponent = motion(as, {
    forwardMotionProps: true,
  });

  return <ChildrenComponent {...props}>{children}</ChildrenComponent>;
};

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [feed, setFeed] = useState([]);
  const [size, setSize] = useState(1);
  const [admin, setAdmin] = useState(null);
  const [data, setData] = useState("");

  const getPosts = async () => {
    const q = query(
      collection(firestore, "posts"),
      where("status", "==", "enabled"),
      orderBy("number", "desc")
    );
    const querySnapshot = await getDocs(q);
    let list = [];
    querySnapshot.forEach((doc) => {
      list.push({ info: doc.data(), id: doc.id });
    });
    setSize(Math.ceil(list.length / 4));

    setPosts(list);
    setFeed(list.slice(0, 4));
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
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

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const onPageChange = (page) => {
    setCurrentPage(page);
    const l = (page - 1) * 4;
    const r = l + 4;
    setFeed(posts.slice(l, r));
  };

  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  const editorConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "sourceEditing",
        "showBlocks",
        "selectAll",
        "|",
        "heading",
        "|",
        "bold",
        "italic",
        "code",
        "|",
        "link",
        "insertImageViaUrl",
        "insertTable",
        "codeBlock",
        "htmlEmbed",
        "|",
        "bulletedList",
        "numberedList",
        "|",
        "accessibilityHelp",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      BalloonToolbar,
      Bold,
      Code,
      CodeBlock,
      Essentials,
      GeneralHtmlSupport,
      Heading,
      HtmlComment,
      HtmlEmbed,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Paragraph,
      PasteFromOffice,
      SelectAll,
      ShowBlocks,
      SourceEditing,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      Undo,
    ],
    balloonToolbar: [
      "bold",
      "italic",
      "|",
      "link",
      "|",
      "bulletedList",
      "numberedList",
    ],
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true,
        },
      ],
    },
    image: {
      toolbar: [
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "resizeImage",
      ],
    },
    initialData: "",
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        toggleDownloadable: {
          mode: "manual",
          label: "Downloadable",
          attributes: {
            download: "file",
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    placeholder: "აქ ჩაწერეთ მთავარი ტექსტი",
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
      ],
    },
  };

  const onPost = async (e) => {
    e.preventDefault();
    if (admin) {
      const q = query(collection(firestore, "posts"));
      const querySnapshot = await getDocs(q);

      const code = querySnapshot.size + 35;
      let now = new Date();
      let date = `${now.getDate()}.${now.getMonth()}.${now.getFullYear()} წ.`;

      console.log({
        title: e.target.title.value,
        url: e.target.url.value,
        date: date,
        content: data,
        number: code,
        status: "enabled",
      });

      await firestore.collection("posts").add({
        title: e.target.title.value,
        url: e.target.url.value,
        date: date,
        content: data,
        number: code,
        status: "enabled",
      });

      getPosts();
    } else {
      console.log("unauthorized");
    }
  };

  return (
    <>
      <Banner heading="სიახლეები" />
      <Helmet>
        <title>სიახლეები</title>
      </Helmet>
      <div className="py-20 container">
        {admin ? (
          <>
            <form className="mb-16" onSubmit={onPost}>
              <div className="relative mb-7">
                <input
                  type="text"
                  id="floating_outlined"
                  name="title"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_outlined"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  სათაური
                </label>
              </div>
              <div className="relative mb-7">
                <input
                  type="text"
                  id="floating_outlined2"
                  name="url"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_outlined2"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  სურათის URL
                </label>
              </div>
              <div className="">
                <div
                  className="rounded-lg overflow-hidden"
                  ref={editorContainerRef}
                >
                  <div className=" ">
                    <div ref={editorRef}>
                      {isLayoutReady && (
                        <CKEditor
                          onChange={(event, editor) =>
                            setData(editor.getData())
                          }
                          editor={ClassicEditor}
                          config={editorConfig}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Button type="submit" color={"blue"} className="mt-7">
                სიახლის დამატება
              </Button>
            </form>
          </>
        ) : (
          <></>
        )}
        <div className="flex flex-col lg:flex-row">
          <div className="lg:basis-1/4 p-4 justify-center flex">
            <Datepicker inline className=" sticky" />
          </div>
          <div className="lg:basis-3/4 p-4">
            <div className="data">
              {feed.map((post, index) => (
                <LinkRoute
                  key={index}
                  to={`/news/${post.id}`}
                  className=" hover:scale-105 overflow-ellipsis overflow-hidden relative mt-2 p-3 md:h-48 w-full flex flex-col md:flex-row rounded-md shadow-md bg-white hover:bg-gray-50 transition-all ease-in-out duration-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                >
                  <div
                    style={{
                      backgroundImage: `url(${post.info.url})`,
                      backgroundSize: "cover",
                    }}
                    className="aspect-square w-full md:h-full md:w-auto rounded-md"
                  ></div>
                  <div className="px-3">
                    <h1 className="xl:text-3xl text-2xl font-glaho mt-4 overflow-ellipsis">
                      {post.info.title}
                    </h1>
                    {/* <p className="font-glaho mt-3 mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla tempus vel lectus vel pellentesque. Donec aliquam eros
                    nec magna lobortis malesuada. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit.
                  </p> */}
                    <p className=" text-gray-700 font-glaho mt-2 dark:text-gray-400 absolute bottom-3 right-3">
                      {post.info.date}
                    </p>
                  </div>
                </LinkRoute>
              ))}
            </div>
            <div className="flex mt-3 overflow-x-auto justify-center">
              <Pagination
                currentPage={currentPage}
                nextLabel=""
                previousLabel=""
                showIcons
                totalPages={size}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
