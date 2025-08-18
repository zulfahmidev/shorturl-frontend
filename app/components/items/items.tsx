'use client'

import { useEffect, useState } from "react";
import Pagination from "./pagination";
import type URL from "@/app/models/URL";
import CreateModal from "./create-modal";

export default function Items({setItem} : {
  setItem: React.Dispatch<React.SetStateAction<URL | null>>;
}) {
    const [urls, setUrls] = useState<URL[]>([])
    const [openCreateModal, setOpenCreateModal] = useState(false)

    async function fetchListUrl() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/`)
        const data: URL[] = (await res.json()).body
        setUrls(data)
    }

    useEffect(() => {
        fetchListUrl()
    }, [openCreateModal])

    return (
        <main className="col-span-2 p-5 h-full overflow-auto">
            <CreateModal openCreateModal={openCreateModal} setOpenCreateModal={setOpenCreateModal} />

            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">List URL</h2>
                {/* <input
                    type="text"
                    className="py-2 px-4 rounded border border-black/15 dark:border-white/15 text-sm"
                    placeholder="Search..." /> */}

                <button 
                    className="py-2 px-4 rounded text-sm bg-black text-white dark:bg-white dark:text-black cursor-pointer"
                    onClick={() => {
                        setOpenCreateModal(true)
                    }}>Add New</button>
            </div>

            <table className="mt-3">
                <thead>
                    <tr>
                        <th>Token</th>
                        <th>Visitor</th>
                        <th>Origin URL</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        urls.map((data, index) => (
                                <tr key={index} onClick={() => {
                                    setItem(data)
                                }}>
                                    <td>{data.token}</td>
                                    <td>{data.visitor_count}</td>
                                    <td className="line-clamp-1 leading-8">{data.url}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>

        </main>
    )
}