import { useState } from "react"
import { AddComponent } from "./AddComponent"
import { EmpresaCard } from "./EmpresaCard"
import { AppDispatch } from "../redux/store/store"
import { onSeeDetails } from "../redux/slices/companySlice"
import { useDispatch } from "react-redux"

interface ISucursal{
    id:number;
    eliminado:boolean;
    nombre:string;
    razonSocial:string;
    cuit:number;
    logo:string;
}

export const HomeSideVar = () => {

  const [empresas,setEmpresas]=useState(["empresa 1","empresa 2","empresa3"])

  const dispatch=useDispatch<AppDispatch>()
  
  return (
    <>

      <AddComponent name="Empresas"/>
      <div className="card-container-empresa">
      {
          empresas.map(empresa=>(
            <EmpresaCard name={empresa}/>
          ))
        } 
      
      </div>
    
    </>
  )
}

