import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { auth, firestore } from "../firebase/firebase.config";
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
    documentId,
} from "firebase/firestore";
import parse from "html-react-parser";
import { Helmet } from "react-helmet";
import { Link as LinkRoute } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Button } from "flowbite-react";
import Swal from "sweetalert2";

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
            where(documentId(), "==", "FJr4rScWRSuhJaCCCHlI")
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
                            <div className="blogPost">
                                <div className="flex justify-center">
                                    <img
                                        src={post.url}
                                        className="md:w-2/3 w-full rounded-xl"
                                    ></img>
                                </div>
                                <h1 className="font-alk text-4xl mt-5">{post.title}</h1>
                                <p className="mt-7 font-glaho gap-5 text-lg">
                                    {parse("" + post.content)}
                                </p>
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
