"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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


export function SelectCountry({ countries }: { countries: any[] }) {
    const [value, setValue] = useState(countries[0])

    return (
        <Combobox items={countries} value={value} onValueChange={setValue}>
            <ComboboxTrigger
                render={
                    <Button variant="outline" className="w-60 justify-between font-normal">
                        <ComboboxValue placeholder="Select country" />
                    </Button>
                }
            />

            <ComboboxContent>
                <ComboboxInput showTrigger={false} placeholder="Search country..." />
                <ComboboxEmpty>No items found.</ComboboxEmpty>

                <ComboboxList>
                    {(item) => (
                        <ComboboxItem key={item.code} value={item}>
                            {item.label}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}


export default SelectCountry

