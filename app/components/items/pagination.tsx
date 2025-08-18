export default function Pagination() {
    return (
        <div className="flex gap-3 w-fit mx-auto mr-0 mt-8">
            <div className="py-2 px-3 bg-black text-white dark:bg-white dark:text-black rounded cursor-pointer">Prev</div>
            <div className="py-2 px-3 border border-black/15 text-black dark:border-white dark:text-white rounded cursor-pointer">1</div>
            <div className="py-2 px-3 bg-black text-white dark:bg-white dark:text-black rounded cursor-pointer">2</div>
            <div className="py-2 px-3 border border-black/15 text-black dark:border-white dark:text-white rounded cursor-pointer">3</div>
            <div className="py-2 px-3 bg-black text-white dark:bg-white dark:text-black rounded cursor-pointer">Next</div>
        </div>
    )
}