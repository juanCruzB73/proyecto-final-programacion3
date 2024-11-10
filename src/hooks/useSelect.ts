import { useState } from "react";

interface SelectValues{
    [key:string]:string;
}

export const useSelect=<T extends SelectValues>(initialState:T) => {
    
    const [selectedValues, setSelectedValue] = useState<T>(initialState);
    
    const handleSelectChange = ({target}: React.ChangeEvent<HTMLSelectElement>) => {
        const {name,value}=target;
        setSelectedValue({
            ...selectedValues,
            [`${name}`]:value
        });
    };
    
    return {...selectedValues,selectedValues,setSelectedValue,handleSelectChange}
}
