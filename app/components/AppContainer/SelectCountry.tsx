"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Country } from "../ServerComponents/Countries"
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
    countries: Country[]
}


export function SelectCountry({ countries }: SelectCountryProps) {
    const [value, setValue] = useState<Country | null>(null)

    return (
        <Combobox items={countries} value={value} onValueChange={setValue}>
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

