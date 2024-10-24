import { useEffect, useState } from "react"
import { AddComponent } from "./AddComponent"
import { SucursalCard } from "./SucursalCard"
export const SucursalesMenu = () => {
    const [sucursales,setSucursales]=useState<string[]>([])
    useEffect(()=>{
        setSucursales(["sucursal 1","sucursal 2","sucursal 3"])
    },[])
    return (
    <>
        <AddComponent name="Sucursales"/>
        <div className="sucursales-container">
            {
                sucursales.map(sucursal=>(
                    <SucursalCard name={sucursal}/>
                ))
            }
        </div>
    </>
  )
}
