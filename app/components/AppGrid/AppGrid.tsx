
const AppGrid = () => {
    return (
        <div className='grid grid-cols-3 md:grid-cols-3 gap-6 w-full h-full'>
            <div className="flex border bg-white rounded-lg p-2 "></div>
            <div className="flex border bg-white rounded-lg p-2 "></div>
            <div className="flex border bg-white rounded-lg p-2 "></div>
            <div className="flex border bg-white rounded-lg p-2 col-span-2"></div>
            <div className="flex border bg-white rounded-lg p-2 row-span-2"></div>
            <div className="flex border bg-white rounded-lg p-2 col-span-2"></div>
        </div>
    )
}

export default AppGrid
