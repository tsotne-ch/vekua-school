import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/firebase.config';
import { Button, Label, Select } from 'flowbite-react';
import Swal from 'sweetalert2';


const Spreadsheet = () => {

    const teachers: any = {
        "math": {
            "c3": [
                {
                    "id": "3001",
                    "name": "თევდორაშვილი მაია",
                    "spots": 25,
                    "subject": "math",
                    "time": "14:00"
                },
                {
                    "id": "3002",
                    "name": "ნემსაძე ალექსანდრე",
                    "spots": 25,
                    "subject": "math",
                    "time": "13:00"
                },
                {
                    "id": "3003",
                    "name": "ტრაპაიძე ლელა",
                    "spots": 25,
                    "subject": "math",
                    "time": "9:15"
                },
                {
                    "id": "3004",
                    "name": "ონაშვილი ეკა",
                    "spots": 25,
                    "subject": "math",
                    "time": "14:15"
                }
            ],
            "c4": [
                {
                    "id": "4001",
                    "name": "თევდორაშვილი მაია",
                    "spots": 25,
                    "subject": "math",
                    "time": "12:30"
                },
                {
                    "id": "4002",
                    "name": "ნემსაძე ალექსანდრე",
                    "spots": 25,
                    "subject": "math",
                    "time": "14:30"
                },
                {
                    "id": "4003",
                    "name": "კუპატაძე კოტე",
                    "spots": 25,
                    "subject": "math",
                    "time": "10:45"
                },
                {
                    "id": "4004",
                    "name": "ლელა ტრაპაიძე",
                    "spots": 25,
                    "subject": "math",
                    "time": "14:15"
                },
                {
                    "id": "4005",
                    "name": "ონაშვილი ეკა",
                    "spots": 25,
                    "subject": "math",
                    "time": "9:00"
                }
            ],
            "c5": [
                {
                    "id": "5001",
                    "name": "მახათაძე ნუგზარ",
                    "spots": 25,
                    "subject": "math",
                    "time": "14:25"
                },
                {
                    "id": "5002",
                    "name": "ქუშაშვილი ნონა",
                    "spots": 25,
                    "subject": "math",
                    "time": "10:30"
                },
                {
                    "id": "5003",
                    "name": "ქუშაშვილი ნონა",
                    "spots": 25,
                    "subject": "math",
                    "time": "14:00"
                },
                {
                    "id": "5004",
                    "name": "გურგენაძე მედეია",
                    "spots": 25,
                    "subject": "math",
                    "time": "12:30"
                },
                {
                    "id": "5005",
                    "name": "თევდორაშვილი მაია",
                    "spots": 25,
                    "subject": "math",
                    "time": "10:30"
                },
                {
                    "id": "5006",
                    "name": "მეტრეველი ნანა",
                    "spots": 25,
                    "subject": "math",
                    "time": "11:00"
                },
                {
                    "id": "5007",
                    "name": "მეტრეველი ნანა",
                    "spots": 25,
                    "subject": "math",
                    "time": "14:30"
                },
                {
                    "id": "5008",
                    "name": "ნემსაძე ალექსანდრე",
                    "spots": 25,
                    "subject": "math",
                    "time": "13:00"
                },
                {
                    "id": "5009",
                    "name": "კუპატაძე კოტე",
                    "spots": 25,
                    "subject": "math",
                    "time": "12:30"
                },
                {
                    "id": "5010",
                    "name": "ტრაპაიძე ლელა",
                    "spots": 25,
                    "subject": "math",
                    "time": "12:30"
                },
                {
                    "id": "5011",
                    "name": "ონაშვილი ეკა",
                    "spots": 25,
                    "subject": "math",
                    "time": "10:45"
                }
            ],
            "c6": [
                {
                    "id": "6001",
                    "name": "მახათაძე ნუგზარ",
                    "spots": 25,
                    "subject": "math",
                    "time": "9:00"
                },
                {
                    "id": "6002",
                    "name": "მახათაძე ნუგზარ",
                    "spots": 25,
                    "subject": "math",
                    "time": "12:30"
                },
                {
                    "id": "6003",
                    "name": "ქუშაშვილი ნონა",
                    "spots": 25,
                    "subject": "math",
                    "time": "9:00"
                },
                {
                    "id": "6004",
                    "name": "ქუშაშვილი ნონა",
                    "spots": 25,
                    "subject": "math",
                    "time": "12:30"
                },
                {
                    "id": "6005",
                    "name": "სიხარულიძე გურამ",
                    "spots": 25,
                    "subject": "math",
                    "time": "11:00"
                },
                {
                    "id": "6006",
                    "name": "სიხარულიძე გურამ",
                    "spots": 25,
                    "subject": "math",
                    "time": "14:00"
                },
                {
                    "id": "6007",
                    "name": "თევდორაშვილი მაია",
                    "spots": 25,
                    "subject": "math",
                    "time": "9:00"
                },
                {
                    "id": "6008",
                    "name": "მეტრეველი ნანა",
                    "spots": 25,
                    "subject": "math",
                    "time": "9:00"
                },
                {
                    "id": "6009",
                    "name": "მეტრეველი ნანა",
                    "spots": 25,
                    "subject": "math",
                    "time": "12:30"
                },
                {
                    "id": "6010",
                    "name": "ნემსაძე ალექსანდრე",
                    "spots": 25,
                    "subject": "math",
                    "time": "9:30"
                },
                {
                    "id": "6011",
                    "name": "კუპატაძე კოტე",
                    "spots": 25,
                    "subject": "math",
                    "time": "9:00"
                },
                {
                    "id": "6012",
                    "name": "კუპატაძე კოტე",
                    "spots": 25,
                    "subject": "math",
                    "time": "14:15"
                },
                {
                    "id": "6013",
                    "name": "ონაშვილი ეკა",
                    "spots": 25,
                    "subject": "math",
                    "time": "12:30"
                }
            ],
            "c7": [
                {
                    "id": "7001",
                    "name": "მახათაძე ნუგზარ",
                    "spots": 25,
                    "subject": "math",
                    "time": "10:45"
                },
                {
                    "id": "7002",
                    "name": "სიხარულიძე გურამ",
                    "spots": 25,
                    "subject": "math",
                    "time": "9:30"
                },
                {
                    "id": "7003",
                    "name": "სიხარულიძე გურამ",
                    "spots": 25,
                    "subject": "math",
                    "time": "12:30"
                },
                {
                    "id": "7004",
                    "name": "მამულაშვილი ლელა",
                    "spots": 25,
                    "subject": "math",
                    "time": "9:30"
                },
                {
                    "id": "7005",
                    "name": "მამულაშვილი ლელა",
                    "spots": 25,
                    "subject": "math",
                    "time": "11:00"
                }
            ],
            "c8": [
                {
                    "id": "8001",
                    "name": "გურგენაძე მედეია",
                    "spots": 25,
                    "subject": "math",
                    "time": "9:00"
                },
                {
                    "id": "8002",
                    "name": "გურგენაძე მედეია",
                    "spots": 25,
                    "subject": "math",
                    "time": "14:00"
                }
            ],
            "c9": [
                {
                    "id": "9001",
                    "name": "გურგენაძე მედეია",
                    "spots": 25,
                    "subject": "math",
                    "time": "10:30"
                }
            ],
            "c10": [
                {
                    "id": "1201",
                    "name": "ლელა ტრაპაიძე",
                    "spots": 25,
                    "subject": "math",
                    "time": "11:00"
                }
            ]
        },
        "physics": {
            "c7": [
                {
                    "id": "7006",
                    "name": "კაკაბაძე გიორგი",
                    "spots": 25,
                    "subject": "physics",
                    "time": "11:00"
                },
                {
                    "id": "7007",
                    "name": "კაკაბაძე გიორგი",
                    "spots": 25,
                    "subject": "physics",
                    "time": "12:30"
                },
                {
                    "id": "7008",
                    "name": "ნარინდოშვილი ლეილა",
                    "spots": 25,
                    "subject": "physics",
                    "time": "9:15"
                },
                {
                    "id": "7009",
                    "name": "გაჩეჩილაძე თემურ",
                    "spots": 25,
                    "subject": "physics",
                    "time": "11:30"
                },
                {
                    "id": "7010",
                    "name": "გაჩეჩილაძე თემურ",
                    "spots": 25,
                    "subject": "physics",
                    "time": "12:30"
                }
            ],
            "c8": [
                {
                    "id": "8003",
                    "name": "ხიზანიშვილი ესმა",
                    "spots": 25,
                    "subject": "physics",
                    "time": "10:30"
                },
                {
                    "id": "8004",
                    "name": "ხიზანიშვილი ესმა",
                    "spots": 25,
                    "subject": "physics",
                    "time": "12:30"
                }
            ],
            "c9": [
                {
                    "id": "9002",
                    "name": "თოდუა ნონა",
                    "spots": 25,
                    "subject": "physics",
                    "time": "9:00"
                }
            ],
            "c10": [
                {
                    "id": "1101",
                    "name": "კაკაბაძე გიორგი",
                    "spots": 25,
                    "subject": "physics",
                    "time": "9:30"
                }
            ],
            "c11": [
                {
                    "id": "1201",
                    "name": "ლელა ტრაპაიძე",
                    "spots": 25,
                    "subject": "math",
                    "time": "11:00"
                }
            ]
        },
        "critical": {
            "c6": [
                {
                    "id": "6013",
                    "name": "ქეთი იოსელიანი",
                    "spots": 25,
                    "subject": "critical",
                    "time": "9:00"
                },
                {
                    "id": "6014",
                    "name": "ქეთი იოსელიანი",
                    "spots": 25,
                    "subject": "critical",
                    "time": "11:00"
                },
                {
                    "id": "6015",
                    "name": "ქეთი იოსელიანი",
                    "spots": 25,
                    "subject": "critical",
                    "time": "13:00"
                }
            ]
        }
    }

    const [data, setData] = useState<null | any>(null);
    const [grade, setGrade] = useState<null | number>(null);
    const [subject, setSubject] = useState<null | string>(null);
    const [paid, setPaid] = useState<null | string>(null);
    const [group, setGroup] = useState<null | string>(null);
    const [filter, setFilter] = useState<number>(0);

    async function getter() {
        console.log(auth.currentUser)
        if (!auth.currentUser) {
            return;
        }
        const token = await auth.currentUser.getIdToken();
        // Swal.fire({
        //     title: "<p class='font-glaho'>იტვირთება</p>",
        //     html: "<p class='font-glaho'>გთხოვთ დაიცადოთ, მონაცემები იტვირთება</p>",
        //     allowOutsideClick: false,
        //     didOpen: () => {
        //         Swal.showLoading();
        //     },
        // });
        let resp = await axios.get(import.meta.env.VITE_REACT_APP_ROOT_FIREBASE + '/admin/all', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch(console.error)
        // Swal.close();
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

        // Swal.fire({
        //     title: "<p class='font-glaho'>იტვირთება</p>",
        //     html: "<p class='font-glaho'>გთხოვთ დაიცადოთ, მონაცემები იტვირთება</p>",
        //     allowOutsideClick: false,
        //     didOpen: () => {
        //         Swal.showLoading();
        //     },
        // });

        let resp = await axios.get(import.meta.env.VITE_REACT_APP_ROOT_FIREBASE + '/admin/markaspaid/' + studentid, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch(console.error)

        // Swal.close();

        await getter();
    }

    async function markAsUnPaid(studentid: string) {
        console.log(auth.currentUser)
        if (!auth.currentUser) {
            return;
        }
        const token = await auth.currentUser.getIdToken();

        // Swal.fire({
        //     title: "<p class='font-glaho'>იტვირთება</p>",
        //     html: "<p class='font-glaho'>გთხოვთ დაიცადოთ, მონაცემები იტვირთება</p>",
        //     allowOutsideClick: false,
        //     didOpen: () => {
        //         Swal.showLoading();
        //     },
        // });

        let resp = await axios.get(import.meta.env.VITE_REACT_APP_ROOT_FIREBASE + '/admin/markasunpaid/' + studentid, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch(console.error)

        // Swal.close();

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

    useEffect(() => {
        console.log(teachers.math["c" + grade])
    }, [grade])

    return (
        <>
            <div className='p-4 grid grid-cols-4 gap-5'>
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
                        <Label htmlFor="countries1" value="ჯგუფის არჩევა" />
                    </div>
                    <Select disabled={grade ? false : true} onChange={(e: any) => {
                        setGroup(e.target.value == 'none' ? null : e.target.value);
                    }} id="countries1" required>
                        <option value='none'>ყველა</option>
                        {grade ?
                            <>

                                {grade < 6 ? <>


                                    {teachers.math["c" + grade].map((group: any) => {
                                        return <option value={group.id}>(მათემატიკა) {group.name} - {group.time}</option>
                                    })}


                                </> : <></>}

                                {grade == 6 ? <>


                                    {teachers.math.c6.map((group: any) => {
                                        return <option value={group.id}>(მათემატიკა) {group.name} - {group.time}</option>
                                    })}

                                    {teachers.critical.c6.map((group: any) => {
                                        return <option value={group.id}>(კრიტიკული) {group.name} - {group.time}</option>
                                    })}


                                </> : <></>}

                                {grade > 6 ? <>

                                    {teachers.math["c" + grade].map((group: any) => {
                                        return <option value={group.id}>(მათემატიკა) {group.name} - {group.time}</option>
                                    })}

                                    {teachers.physics["c" + grade].map((group: any) => {
                                        return <option value={group.id}>(ფიზიკა) {group.name} - {group.time}</option>
                                    })}

                                </> : <></>}

                            </>
                            : <></>}
                    </Select>
                </div>
            </div>
            <p className='my-4 py-4'>
                სულ {data ? data.length : "?"} მოსწავლე <br></br>
            </p>
            <table className='border-collapse border-slate-500 border font-glaho'>

                <thead>
                    <tr>
                        <th className="border p-2 border-slate-600">N</th>
                        <th className="border p-2 border-slate-600">მოსწავლის პ/ნ</th>
                        <th className="border p-2 border-slate-600">მოსწავის სახელი და გვარი</th>
                        <th className="border p-2 border-slate-600">საგანი</th>
                        <th className="border p-2 border-slate-600">კლასი</th>
                        <th className="border p-2 border-slate-600">მშობლის სახელი და გვარი</th>
                        <th className="border p-2 border-slate-600">ტელ-ნომერი</th>
                        <th className="border p-2 border-slate-600">ელ-ფოსტა</th>
                        <th className="border p-2 border-slate-600">მშობლის პ/ნ</th>
                        <th className="border p-2 border-slate-600">ჯგუფი</th><th className="border p-2 border-slate-600">დარეგისტრირდა</th>
                        <th className="border p-2 border-slate-600">სტატუსი</th>

                        <th className="border p-2 border-slate-600">მოქმედება</th>
                    </tr>
                </thead>

                <tbody>


                    {data ? <>

                        {data.map((student: any, index: number) => {


                            if (grade && student.class != grade) return;

                            if (subject && student.subject != subject) return;

                            if (paid) {
                                if (paid == 'false' && student.paid) return;

                                if (paid == 'true' && !student.paid) return;
                            }

                            if (group && student.groupId != group) return;


                            return (<tr key={student._id}>
                                <td className='p-2 border border-slate-400'>{index}</td>
                                <td className='p-2 border border-slate-400'>{student.studentId}</td>
                                <td className='p-2 border border-slate-400'>{student.studentfirstname} {student.studentlastname}</td>
                                <td className='p-2 border border-slate-400'>{student.subject === 'math' ? "მათემატიკა" : student.subject === 'physics' ? "ფიზიკა" : "კრიტიკულ."}</td>
                                <td className='p-2 border border-slate-400'>{student.class}</td>
                                <td className='p-2 border border-slate-400'>{student.parentfirstname} {student.parentlastname}</td>
                                <td className='p-2 border border-slate-400'>{student.phone}</td>
                                <td className='p-2 border border-slate-400'>{student.parentemail}</td>
                                <td className='p-2 border border-slate-400'>{student.parentid}</td>
                                <td className='p-2 border border-slate-400'>{student.groupfullname}</td>
                                <td className='p-2 border border-slate-400'>{new Date(student.createdAt).toLocaleDateString()}</td>
                                <td className={`p-4 border border-slate-400 ${student.paid ? "bg-green-500" : "bg-red-500"}`}>{student.paid ? "გადახდილი" : "გადაუხდელი"} </td>
                                <td className='p-2 border flex gap-4 border-slate-400'>{student.paid ? <Button color="warning" onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                                    e.currentTarget.classList.add('opacity-50');
                                    await markAsUnPaid(student._id);

                                    e.currentTarget.classList.remove('opacity-50');
                                }}>გადუხდელად მონიშვნა</Button> : <Button color="success" onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                                    e.currentTarget.classList.add('opacity-50');
                                    await markAsPaid(student._id);
                                    e.currentTarget.classList.remove('opacity-50');
                                }}>გადახდილად მონიშვნა</Button>} <Button onClick={() => { onDelFromGroup(student._id) }} color="failure">სიიდან ამოშლა</Button></td>
                            </tr>)
                        })}

                    </> : <></>}


                </tbody>

            </table>

        </>
    )
}

export default Spreadsheet