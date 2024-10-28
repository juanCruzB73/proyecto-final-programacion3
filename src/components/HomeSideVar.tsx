import { useEffect, useState } from "react"
import { AddComponent } from "./AddComponent"
import { EmpresaCard } from "./EmpresaCard"
import { AppDispatch } from "../redux/store/store"
import { useDispatch, useSelector } from "react-redux"
import { EmpresaService } from "../services/EmpresaService"
import { setDataEmpresaTable } from "../redux/slices/tablaEmpresaSlice"
import { RootState } from '../redux/store/store'


const api_url = "http://190.221.207.224:8090"
const full_api=api_url+"/empresas"
export const HomeSideVar = () => {

  const empresaService=new EmpresaService(full_api)

  const [loading,setLoading]=useState(false);

  const dispatch=useDispatch<AppDispatch>()

  const {dataTable}=useSelector((state:RootState)=>state.tablaEmpresa)

  const getEmpresas=async()=>{
    await empresaService.getAll().then(response=>{
      dispatch(setDataEmpresaTable(response));
      setLoading(false)
    })
  }

  useEffect(()=>{
    setLoading(true)
    getEmpresas()
  },[])
  return (
    <>

      <AddComponent name="Empresas"/>
      <div className="card-container-empresa">
      {
          dataTable.map(empresa=>(
            <EmpresaCard element={empresa} key={empresa.id}/>
          ))
        } 
      
      </div>
    
    </>
  )
}

