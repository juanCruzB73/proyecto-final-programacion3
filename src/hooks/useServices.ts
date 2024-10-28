import { useDispatch } from "react-redux";
import { EmpresaService } from "../services/EmpresaService";
import { AppDispatch } from "../redux/store/store";
import { setDataEmpresaTable } from "../redux/slices/tablaEmpresaSlice";
import { useState } from "react";

interface IProps{
    apiURL:string;
}

export const useServices= (apiURL:string) => {

    const empresaService=new EmpresaService(apiURL)
    const dispatch=useDispatch<AppDispatch>()
    const [loading,setLoading]=useState(false);

    const getEmpresas=async()=>{
        await empresaService.getAll().then(response=>{
          dispatch(setDataEmpresaTable(response));
          setLoading(false)
        })
      }
    return {
        getEmpresas,loading,setLoading,
    }
}
