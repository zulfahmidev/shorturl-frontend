import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function CreateModal({ openCreateModal, setOpenCreateModal }: {
    openCreateModal: boolean,
    setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [url, setUrl] = useState('');
    const [alawysNew, setAlawysNew] = useState(false);
    const [errors, setErrors] = useState<{
        url: string
    }>();

    async function generateShortenURL(url: string, idempotent: boolean) {
        if (url == "") {
            return
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/shorten`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url, idempotent
                }),
            });

            const result = await response.json();

            if (response.status == 422) {
                setErrors({
                    url: result.message
                })
                return
            }

            if (response.status == 400) {
                setErrors({
                    url: result.message
                })
                return
            }

            if (response.status != 201) {
                throw new Error('Failed to create link');
            }
            
            setUrl("")
            setOpenCreateModal(false)
        } catch (error) {
            console.error(error);
            alert("Something went wrong")
            return null;
        }
    }

    return (
        <div className={`left-0 top-0 w-full h-full fixed z-20 bg-black/25 dark:bg-none backdrop-blur-xs flex items-center justify-center ${!openCreateModal ? 'hidden' : ''}`}>
            <div className="w-96 p-5 bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-lg">
                <div className="flex items-center justify-between border-b border-white/10 py-2">
                    <div className="text-xl">Generate Shorten URL</div>
                    <div
                        onClick={() => {
                            setOpenCreateModal(false)
                        }}
                        className="w-6 h-6 flex items-center justify-center bg-black/10 text-black dark:bg-white/10 dark:text-white rounded-full cursor-pointer">
                        <FaTimes />
                    </div>
                </div>
                <div className="mb-3">
                    <div className="text-sm opacity-75 py-2">Origin URL</div>
                    <input 
                        type="text" 
                        checked={alawysNew}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full py-2 px-3 rounded border border-white/15 text-sm" 
                        placeholder="https://" />
                    {
                        errors?.url ? (
                            <div className="text-sm text-red-500">
                                {errors?.url}
                            </div>
                        ) : ('')
                    }
                </div>
                <div className="flex items-center gap-2 mb-3">
                    <input 
                    type="checkbox"
                    value={url}
                    onChange={(e) => setAlawysNew(e.target.checked)} />
                    <div className="text-sm opacity-75 py-2">Always create new</div>
                </div>
                <button 
                    onClick={() => {
                        generateShortenURL(url, !alawysNew)
                    }}
                    className="py-2 px-3 rounded bg-black dark:bg-white w-full text-black cursor-pointer">
                    Generate
                </button>
            </div>
        </div>
    )
}