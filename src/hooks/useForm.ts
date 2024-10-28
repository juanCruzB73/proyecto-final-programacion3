import { ChangeEvent, useState } from "react";

interface FormValues{
    [key:string]:string|number;
}

export const useForm=<T extends FormValues>(initialState:T) => {

    const [formState,setFormState]=useState<T>(initialState);


    const onInputChange=({target}:ChangeEvent<HTMLInputElement>)=>{
        const{name,value}=target;
        setFormState(
            {
            ...formState,
            [`${name}`]:value
        }
    );
    };

    const onResetForm=()=>{
        setFormState(initialState)
    }

    return {
       ...formState,//desestructura los elementos pasados en intial value
       formState,onInputChange,onResetForm
  }
}