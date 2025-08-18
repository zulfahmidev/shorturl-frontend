import URL from "@/app/models/URL";
import { FaRegCopy, FaEye, FaTimes } from "react-icons/fa"; // Font Awesome
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export default function Detail({ item, setItem }: {
    item: URL | null
    setItem: React.Dispatch<React.SetStateAction<URL | null>>
}) {

    async function copyText(text: string) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Gagal menyalin:', err);
        }
    };


    return (
        <div 
            className={`
                fixed z-20 bg-black/25 md:bg-black/0 backdrop-blur-sm items-center justify-center left-0 top-0 w-full h-full
                md:static md:backdrop-blur-none md:z-0 md:block 
                ${item == null ? 'hidden md:block' : 'flex'}
            `}>
            <aside className="md:border-none md:border-l md:border-black/15 dark:border-white/15 p-5 md:h-full bg-black md:bg-black/0 border border-white/20 h-fit">
                {
                    item == null ? (
                        <>
                            <h2 className="text-xl">Detail</h2>
                            <p className="mt-2 opacity-75">No item selected</p>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-xl">Detail</h2>
                                <div className="flex gap-4 items-center">
                                    <div className="flex items-center gap-2">
                                        <FaEye />
                                        <span className="text-sm">{item.visitor_count}</span>
                                    </div>
                                    <div className="h-8 border-l border-white/20"></div>
                                    <div
                                        onClick={() => {
                                            setItem(null)
                                        }}
                                        className="w-6 h-6 flex items-center justify-center bg-black/10 text-black dark:bg-white/10 dark:text-white rounded-full cursor-pointer">
                                        <FaTimes />
                                    </div>
                                </div>
                            </div >
                            <div className="mb-3">
                                <div className="flex justify-between items-center py-2">
                                    <div className="opacity-75 text-sm">Short Token URL:</div>
                                    <div className="flex gap-1">
                                        <div 
                                            className="py-1 px-2 bg-black text-white rounded dark:bg-white dark:text-black text-sm cursor-pointer active:bg-white/50"
                                            onClick={() => {
                                                copyText(`${process.env.NEXT_PUBLIC_BACKEND_API}/${item.token}`)
                                            }}><FaRegCopy /></div>
                                        <a href={`${process.env.NEXT_PUBLIC_BACKEND_API}/${item.token}`} target="_blank" rel="noopener noreferrer" className="py-1 px-2 bg-black text-white rounded dark:bg-white dark:text-black text-sm cursor-pointer"><FaArrowUpRightFromSquare /></a>
                                    </div>
                                </div>
                                <div className="py-2 px-3 bg-black/10 text-black dark:bg-white/10 dark:text-white rounded text-sm">
                                    <code>{process.env.NEXT_PUBLIC_BACKEND_API}/{item.token}</code>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="flex justify-between items-center py-2">
                                    <div className="opacity-75 text-sm">Original URL:</div>
                                    <div className="flex gap-1">
                                        <div 
                                            className="py-1 px-2 bg-black text-white rounded dark:bg-white dark:text-black text-sm cursor-pointer active:bg-white/50"
                                            onClick={() => {
                                                copyText(item.url)
                                            }}><FaRegCopy /></div>
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="py-1 px-2 bg-black text-white rounded dark:bg-white dark:text-black text-sm cursor-pointer"><FaArrowUpRightFromSquare /></a>
                                    </div>
                                </div>
                                <div className="py-2 px-3 bg-black/10 text-black dark:bg-white/10 dark:text-white rounded text-sm">
                                    <code>{item.url}</code>
                                </div>
                            </div>
                        </>
                    )
                }
            </aside >
        </div>
    )
}