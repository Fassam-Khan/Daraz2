import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const SelectCountry = ({handler, value, name}) => {

    const items = [
        { label: "Pakistan", value: "pakistan" },

    ]
    return (
        <div>


            <Select items={items} value={value} onValueChange={handler} name={name}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {items.map((item) => (
                            <SelectItem key={item.value} value={item.value} onChange={(e)=> handler(e)}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

        </div>
    )
}

export default SelectCountry
