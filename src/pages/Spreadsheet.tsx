import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/firebase.config';
import { Button, Label, Select } from 'flowbite-react';
import Swal from 'sweetalert2';


const Spreadsheet = () => {

    const [data, setData] = useState<null | any>(null);
    const [grade, setGrade] = useState<null | number>(null);
    const [subject, setSubject] = useState<null | string>(null);
    const [paid, setPaid] = useState<null | string>(null);

    async function getter() {
        console.log(auth.currentUser)
        if (!auth.currentUser) {
            return;
        }
        const token = await auth.currentUser.getIdToken();
        Swal.fire({
            title: "<p class='font-glaho'>იტვირთება</p>",
            html: "<p class='font-glaho'>გთხოვთ დაიცადოთ, მონაცემები იტვირთება</p>",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
        let resp = await axios.get(import.meta.env.VITE_REACT_APP_ROOT_FIREBASE + '/admin/all', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch(console.error)
        Swal.close();
        console.log(resp);

        if (resp) {
            setData(resp.data);
        }
    }

    async function markAsPaid(studentid: string) {
        console.log(auth.currentUser)
        if (!auth.currentUser) {
            return;
        }
        const token = await auth.currentUser.getIdToken();

        Swal.fire({
            title: "<p class='font-glaho'>იტვირთება</p>",
            html: "<p class='font-glaho'>გთხოვთ დაიცადოთ, მონაცემები იტვირთება</p>",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        let resp = await axios.get(import.meta.env.VITE_REACT_APP_ROOT_FIREBASE + '/admin/markaspaid/' + studentid, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch(console.error)

        Swal.close();

        await getter();
    }

    async function deleteStudentFromGroup(studentid: string) {
        console.log(auth.currentUser)
        if (!auth.currentUser) {
            return;
        }
        const token = await auth.currentUser.getIdToken();

        Swal.fire({
            title: "<p class='font-glaho'>იტვირთება</p>",
            html: "<p class='font-glaho'>გთხოვთ დაიცადოთ, მონაცემები იტვირთება</p>",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        let resp = await axios.post(import.meta.env.VITE_REACT_APP_ROOT_FIREBASE + '/admin/delete/' + studentid, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch(console.error)

        Swal.close();

        await getter();
    }

    async function onDelFromGroup(studentid: string) {
        Swal.fire({
            title: "დარწმუნებული ხარ?",
            text: "წაშლილი მოსწავლე ვერ დაბრუნდება",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "კი! წაშალე!",
            cancelButtonText: "არა, გააუქმე!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteStudentFromGroup(studentid);
            }
        });
    }

    useEffect(() => {

        getter();


    }, [])

    return (
        <>
            <div className='p-4 grid grid-cols-3 gap-5'>
                <div className="">
                    <div className="mb-2 block">
                        <Label htmlFor="countries" value="კლასის არჩევა" />
                    </div>
                    <Select onChange={(e: any) => {
                        setGrade(e.target.value == 'none' ? null : e.target.value as number);
                    }} id="countries" required>
                        <option value='none'>ყველა</option>
                        {[...Array(9).keys()].map((key) => (
                            <option key={key + 3} value={key + 3}>მე-{key + 3} კლასი</option>
                        ))}
                    </Select>
                </div>
                <div className="">
                    <div className="mb-2 block">
                        <Label htmlFor="class" value="საგნის არჩევა" />
                    </div>
                    <Select onChange={(e: any) => {
                        setSubject(e.target.value == 'none' ? null : e.target.value);
                    }} id="class" required>
                        <option value='none'>ყველა</option>
                        <option value='math'>მათემატიკა</option>
                        <option value='physics'>ფიზიკა</option>
                        <option value='other'>კრიტიკული</option>
                    </Select>
                </div>
                <div className="">
                    <div className="mb-2 block">
                        <Label htmlFor="class" value="სტატუსის არჩევა" />
                    </div>
                    <Select onChange={(e: any) => {
                        setPaid(e.target.value == 'none' ? null : e.target.value);
                    }} id="class" required>
                        <option value='none'>ყველა</option>
                        <option value='true'>გადახდილი</option>
                        <option value='false'>გადაუხდელი</option>
                    </Select>
                </div>
            </div>
            <table className='border-collapse border-slate-500 border font-glaho'>

                <thead>
                    <tr>
                        <th className="border p-4 border-slate-600">მოსწავლის პ/ნ</th>
                        <th className="border p-4 border-slate-600">მოსწავის სახელი და გვარი</th>
                        <th className="border p-4 border-slate-600">საგანი</th>
                        <th className="border p-4 border-slate-600">კლასი</th>
                        <th className="border p-4 border-slate-600">მშობლის სახელი და გვარი</th>
                        <th className="border p-4 border-slate-600">ტელ-ნომერი</th>
                        <th className="border p-4 border-slate-600">ელ-ფოსტა</th>
                        <th className="border p-4 border-slate-600">მშობლის პ/ნ</th>
                        <th className="border p-4 border-slate-600">ჯგუფი</th><th className="border p-4 border-slate-600">დარეგისტრირდა</th>
                        <th className="border p-4 border-slate-600">სტატუსი</th>

                        <th className="border p-4 border-slate-600">მოქმედება</th>
                    </tr>
                </thead>

                <tbody>


                    {data ? <>

                        {data.map((student: any) => {

                            if (grade && student.class != grade) return;

                            if (subject && student.subject != subject) return;

                            if (paid) {
                                if (paid == 'false' && student.paid) return;

                                if (paid == 'true' && !student.paid) return;
                            }

                            return (<tr key={student._id}>
                                <td className='p-4 border border-slate-400'>{student.studentId}</td>
                                <td className='p-4 border border-slate-400'>{student.studentfirstname} {student.studentlastname}</td>
                                <td className='p-4 border border-slate-400'>{student.subject === 'math' ? "მათემატიკა" : student.subject === 'physics' ? "ფიზიკა" : "კრიტიკულ."}</td>
                                <td className='p-4 border border-slate-400'>{student.class}</td>
                                <td className='p-4 border border-slate-400'>{student.parentfirstname} {student.parentlastname}</td>
                                <td className='p-4 border border-slate-400'>{student.phone}</td>
                                <td className='p-4 border border-slate-400'>{student.parentemail}</td>
                                <td className='p-4 border border-slate-400'>{student.parentid}</td>
                                <td className='p-4 border border-slate-400'>{student.groupfullname}</td>
                                <td className='p-4 border border-slate-400'>{new Date(student.createdAt).toLocaleDateString()}</td>
                                <td className={`p-4 border border-slate-400 ${student.paid ? "bg-green-500" : "bg-red-500"}`}>{student.paid ? "გადახდილი" : "გადაუხდელი"} </td>
                                <td className='p-4 border flex gap-4 border-slate-400'>{student.paid ? <></> : <Button color="success" onClick={() => { markAsPaid(student._id) }}>გადახდილად მონიშვნა</Button>} <Button onClick={() => { onDelFromGroup(student._id) }} color="failure">სიიდან ამოშლა</Button></td>
                            </tr>)
                        })}

                    </> : <></>}


                </tbody>

            </table>

        </>
    )
}

export default Spreadsheet