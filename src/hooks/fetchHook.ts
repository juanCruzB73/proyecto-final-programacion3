import { useEffect, useState } from "react"



interface IFetchState<T>{
    data: T|null,
    isLoading:Boolean,
    hasError:boolean,
    error:{code:number,message:string}|null,
}


export const useFetch = <T = any>(url: string) => {

    const [state, setState] = useState<IFetchState<T>>({
        data: null,
        isLoading: true,
        hasError: false,
        error: null,
    });

    useEffect(()=>{
        getFetch()
    },[url])

    const setLoadingState=()=>{
        setState({
            data:null,
            isLoading:true,
            hasError:false,
            error:null,
        })
    }
    const getFetch=async()=>{
        setLoadingState();
        const response=await fetch(url);
        if(!response.ok){
            setState({
                data:null,
                isLoading:false,
                hasError:true,
                error:{
                    code: response.status,
                    message: response.status,
                },
            })
        return;
        }
        const data=await response.json();
        setState({
            data:data,
            isLoading:false,
            hasError:false,
            error:false,
        })
    }
    return{
        data:state.data,
        isLoading:state.isLoading,
        hasError:state.hasError
    }

}   