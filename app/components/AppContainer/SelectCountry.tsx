import { Button } from "@/components/ui/button"
import type { Country } from "../ServerComponents/Countries"
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxTrigger,
    ComboboxValue,
} from "@/components/ui/combobox"

interface SelectCountryProps {
    countries: Country[],
    selectedCountry: string,
    setSelectedCountry: (country: string) => void
}



export function SelectCountry({ countries, selectedCountry, setSelectedCountry }: SelectCountryProps) {
    return (
        <Combobox items={countries} value={selectedCountry || "Select a country"} onValueChange={(value) => setSelectedCountry(value ?? "")}>
            <ComboboxTrigger
                render={
                    <Button variant="outline" className="w-60 justify-between font-medium text-md py-3! px-4">
                        <ComboboxValue placeholder="Select a country" />
                    </Button>
                }
            />

            <ComboboxContent>
                <ComboboxInput showTrigger={false} className="text-md" placeholder="Search country..." />
                <ComboboxEmpty className="text-md">No items found.</ComboboxEmpty>

                <ComboboxList >
                    {(item) => (
                        <ComboboxItem className="text-md" key={item.id} value={item.name}>
                            {item.name}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}


export default SelectCountry

