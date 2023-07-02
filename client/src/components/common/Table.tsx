import React, { FC } from 'react';
import Button from "@/components/common/Button"
import Link from "next/link"
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';


type ITable = {
    title: string,
    subTitle: string,
    columns: Array<string>,
    // data: Array<Array<any>>,
}

const people = [
    { name: 'סוויספורט שירותי מטען', bnNumber: 505025151, email: 'office@swissport.co.il', phone: '085151411', address: "נמל התעופה בן גוריון 107", jobNumbers: 5, candidateNumber: 3 },
    { name: 'נירלט', bnNumber: 535025151, email: 'office@nirlat.co.il', phone: '08331511211', address: "קיבוץ ניר עוז", jobNumbers: 13, candidateNumber: 23 },
]

const Table: FC<ITable> = ({ title = '', subTitle = "" }) => {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">{title}</h1>
                    <p className="mt-2 text-sm text-gray-700">{subTitle}</p>
                </div>

                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Button type="button" className="block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" label="הוסף לקוח" />
                </div>
            </div>

            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-white-200 shadow-default">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0">שם הלקוח</th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0">ח"פ</th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0">אימייל</th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0">פלאפון</th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0">כתובת</th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0">משרות</th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0">מעומדים</th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0">פעולות</th>
                                </tr>
                            </thead>

                            <tbody className="text-center">
                                {people.map((item, index) => (
                                    <tr key={index}>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.name}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.bnNumber}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.email}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.phone}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.address}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.jobNumbers}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.candidateNumber}</td>
                                        <td className="relative flex items-center justify-center whitespace-nowrap py-4 px-4 text-center text-sm font-medium">
                                            <Link href={"/"} className="text-[#0073EA] hover:text-[#0060b9] px-3"><PencilSquareIcon width={15} /></Link>
                                            <Link href={"/"} className="text-[#0073EA] hover:text-[#0060b9]"><TrashIcon width={15} /></Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;
