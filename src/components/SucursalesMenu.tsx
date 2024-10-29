import { useEffect, useState } from "react"
import { AddComponent } from "./AddComponent"
import { SucursalCard } from "./SucursalCard"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { EmpresaService } from "../services/EmpresaService";
import { setDataSucursalTable } from "../redux/slices/tablaSucursalSlice";
import { SucursalService } from "../services/SucursalService";


const api_url = "http://190.221.207.224:8090"
const full_api=api_url+"/sucursales"

export const SucursalesMenu = () => {
    
    const [loading,setLoading]=useState(false);
    
    const dispatch=useDispatch<AppDispatch>();

    const sucursalService=new SucursalService(full_api);

    const {sucursalTable}=useSelector((state:RootState)=>state.tablaSucursal);

    const getSucursales=async()=>{
        await sucursalService.getAll().then(response=>{
          dispatch(setDataSucursalTable(response));
          setLoading(false)
        })
      }
    
      useEffect(()=>{
        setLoading(true)
        getSucursales()
      },[])
    
    return (
    <>
        <AddComponent name="Sucursales"/>
        <div className="sucursales-container">
            {
                sucursalTable.map(sucursal=>(
                    <SucursalCard element={sucursal} key={sucursal.id}/>
                ))
            }
        </div>
    </>
  )
}
