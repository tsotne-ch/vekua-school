import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { auth, firestore, firebase } from "../firebase/firebase.config";
import { Navigate, useNavigate } from "react-router-dom";
import { FaSchool } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { HiMiniTrophy } from "react-icons/hi2";
import { TbMathFunction } from "react-icons/tb";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  doc,
  updateDoc,
  deleteDoc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import parse from "html-react-parser";
import { Helmet } from "react-helmet";
import { Link as LinkRoute } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Button } from "flowbite-react";
import Swal from "sweetalert2";

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
  EditorConfig,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

interface postType {
  title: string;
  url: string;
  content: string;

}

const Post = () => {
  const id = useParams();
  const [post, setPost] = useState<postType | null>(null);
  const nav = useNavigate();
  const [found, setFound] = useState(true);
  const [admin, setAdmin] = useState<User | null>(null);
  const [data, setData] = useState("");
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  const getPost = async () => {
    const q = query(
      collection(firestore, "posts"),
      where(firebase.firestore.FieldPath.documentId(), "==", id.id)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.docs.length) {
      setFound(false);
      return;
    }
    setPost(querySnapshot.docs[0].data() as postType);
  };

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

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);

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

  const onPost = async (e: any) => {
    e.preventDefault();
    if (admin && id.id) {
      const document: DocumentReference<DocumentData, DocumentData> = doc(firestore as any, "posts", id.id);

      await updateDoc(document, {
        title: e.target.title.value,
        url: e.target.url.value,
        content: data,
      });

      await getPost();
    } else {
      console.log("unauthorized");
    }
  };

  const onDelete = async (e: any) => {
    if (admin && id.id) {
      const document = doc(firestore as any, "posts", id.id);

      Swal.fire({
        title: "დარწმუნებული ხართ?",
        text: "წაშლილ პოსტს ვერ დააბრუნებთ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "კი წაშალე!",
        cancelButtonText: "არა დაბრუნდი!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDoc(document);

          nav("/news");
        }
      });
    } else {
      console.log("unauthorized");
    }
  };

  return (
    <>
      <div className=" border-b dark:border-gray-800 w-full py-1"></div>
      <div className="py-20 container dark:text-white">
        {found && post ? (
          <>
            <div className="flex flex-col md:flex-row gap-3">
              <Helmet>
                <title>{post.title}</title>
              </Helmet>
              <div className=" md:w-3/4">
                <div className="flex">
                  <img
                    src={post.url}
                    className="md:w-2/3 w-full rounded-xl"
                  ></img>
                </div>
                {admin ? (
                  <>
                    <form className="mb-16 mt-10" onSubmit={onPost}>
                      <div className="relative mb-7">
                        <input
                          type="text"
                          id="floating_outlined"
                          name="title"
                          defaultValue={post.title}
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
                          defaultValue={post.url}
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
                          className="rounded-lg overflow-hidden text-black"
                          ref={editorContainerRef}
                        >
                          <div className=" ">
                            <div ref={editorRef}>
                              {isLayoutReady && (
                                <CKEditor
                                  data={post.content}
                                  onChange={(event, editor) =>
                                    setData(editor.getData())
                                  }
                                  editor={ClassicEditor}
                                  config={editorConfig as EditorConfig}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-5">
                        <Button type="submit" color={"blue"} className="mt-7">
                          სიახლის რედაქტირება
                        </Button>

                        <Button
                          onClick={onDelete}
                          type="button"
                          color={"red"}
                          className="mt-7"
                        >
                          სიახლის წაშლა
                        </Button>
                      </div>
                    </form>
                  </>
                ) : (
                  <></>
                )}
                <h1 className="font-alk text-4xl mt-5">{post.title}</h1>
                <p className="mt-7 font-glaho gap-5 text-lg">
                  {parse("" + post.content)}
                </p>
              </div>
              <div className=" md:w-1/4 dark:bg-slate-900 bg-sky-100 dark:bg-blend-overlay rounded-xl dark:bg-opacity-75 bg-grid">
                <h1 className="font-alk text-4xl mt-5 text-center mb-7">
                  იხილეთ მეტი
                </h1>
                <div className="container gap-3 flex flex-col">
                  <LinkRoute
                    to="/history"
                    className="hover:scale-110 transition-all duration-300 ease-in-out p-3 flex flex-col items-center rounded-xl justify-center bg-white dark:bg-slate-800  shadow-xl"
                  >
                    <FaSchool
                      size={"4rem"}
                      className="text-[#0284c7] dark:text-white"
                    />
                    <h3 className="font-glaho text-xl mt-3 dark:text-white">
                      ისტორია და მისია
                    </h3>
                  </LinkRoute>
                  <LinkRoute
                    to="/exams"
                    className="hover:scale-110 transition-all duration-300 ease-in-out p-3 flex flex-col items-center rounded-xl justify-center bg-white dark:bg-slate-800  shadow-xl"
                  >
                    <PiStudentFill
                      size={"4rem"}
                      className="text-[#0284c7] dark:text-white"
                    />
                    <h3 className="font-glaho text-xl mt-3 dark:text-white">
                      სარეკომენდაციო წერა
                    </h3>
                  </LinkRoute>
                  <LinkRoute
                    to="/achievments"
                    className="hover:scale-110 transition-all duration-300 ease-in-out p-3 flex flex-col items-center rounded-xl justify-center bg-white dark:bg-slate-800 shadow-xl"
                  >
                    <HiMiniTrophy
                      size={"4rem"}
                      className="text-[#0284c7] dark:text-white"
                    />
                    <h3 className="font-glaho text-xl mt-3 dark:text-white">
                      მიღწევები
                    </h3>
                  </LinkRoute>
                  <LinkRoute
                    to="/saturday-school"
                    className="hover:scale-110 transition-all duration-300 ease-in-out p-3 flex flex-col items-center rounded-xl justify-center bg-white dark:bg-slate-800  shadow-xl"
                  >
                    <TbMathFunction
                      size={"4rem"}
                      className="text-[#0284c7] dark:text-white"
                    />
                    <h3 className="font-glaho text-xl mt-3 dark:text-white">
                      საშაბათო სკოლა
                    </h3>
                  </LinkRoute>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Helmet>
              <title>404</title>
            </Helmet>
            <h1 className="text-7xl text-center">404</h1>
            <h1 className="text-3xl mt-7 font-glaho text-center">
              გვერდი ვერ მოიძებნა
            </h1>
          </>
        )}
      </div>
    </>
  );
};

export default Post;
