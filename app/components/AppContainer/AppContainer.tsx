
import AppGrid from "../AppGrid/AppGrid"

const AppContainer = () => {
    return (
        <div className='flex flex-col w-full h-full px-5 gap-3'>
            <div className='flex flex-row justify-end md:justify-between mt-3 pt-0.5 md:pt-0 md:mt-2'>
                <span className="text-xl font-bold hidden md:block">Demographic Insights</span>
                <span className='text-md font-semibold'>Select a country</span>
            </div>
            <AppGrid />
        </div>
    )
}

export default AppContainer