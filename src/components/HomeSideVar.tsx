import { useEffect, useState } from "react"
import { AddComponent } from "./AddComponent"
import { EmpresaCard } from "./EmpresaCard"
export const HomeSideVar = () => {

  const [empresas,setEmpresas]=useState<string[]>([])
  useEffect(()=>{
    setEmpresas(["empresa 1","empresa 2","empresa 3"])
  },[])
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

