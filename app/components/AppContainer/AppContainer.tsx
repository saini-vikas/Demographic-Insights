import fetchCountries from "../ServerComponents/Countries"
import type { Country } from "../ServerComponents/Countries"
import AppHeader from "./AppHeader"


const AppContainer = async () => {
    const countries: Country[] = await fetchCountries()

    return (
        <AppHeader countries={countries} />
    )
}

export default AppContainer