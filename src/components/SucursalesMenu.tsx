import { useEffect, useState } from "react"
import { AddComponent } from "./AddComponent"
import { SucursalCard } from "./SucursalCard"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { EmpresaService } from "../services/EmpresaService";
import { setDataCategoryTable } from "../redux/slices/tablaCategorySlice";


const api_url = "http://190.221.207.224:8090"
const full_api=api_url+"/sucursales"

export const SucursalesMenu = () => {
    
    const [loading,setLoading]=useState(false);
    
    const dispatch=useDispatch<AppDispatch>();

    const empresaService=new EmpresaService(full_api);

    const {dataTable}=useSelector((state:RootState)=>state.tablaCategoria);

    const getEmpresas=async()=>{
        await empresaService.getAll().then(response=>{
          dispatch(setDataCategoryTable(response));
          setLoading(false)
        })
      }
    
      useEffect(()=>{
        setLoading(true)
        getEmpresas()
      },[])
    
    return (
    <>
        <AddComponent name="Sucursales"/>
        <div className="sucursales-container">
            {
                dataTable.map(sucursal=>(
                    <SucursalCard element={sucursal} key={sucursal.id}/>
                ))
            }
        </div>
    </>
  )
}
