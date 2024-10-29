import { useDispatch } from "react-redux";
import { EmpresaService } from "../services/EmpresaService";
import { AppDispatch } from "../redux/store/store";
import { setDataEmpresaTable } from "../redux/slices/tablaEmpresaSlice";
import { useState } from "react";
import { PaisService } from "../services/PaisesService";
import { setTablePais } from "../redux/slices/tablaPaisSlice";
import { ProvinciaService } from "../services/ProvinciaService";
import { setTableProvincia } from "../redux/slices/provinciaSlice";
import { LocalidadService } from "../services/LocalidadService";
import { setTableLocalidad } from "../redux/slices/tablaLocalidadSlice";
import { SucursalService } from "../services/SucursalService";
import { setDataSucursalTable } from "../redux/slices/tablaSucursalSlice";

export const useServices= (apiURL:string,) => {

    const empresaService=new EmpresaService(apiURL)
    const sucursalService=new SucursalService(apiURL)
    const paisService=new PaisService(apiURL);
    const provinciaService=new ProvinciaService(apiURL);
    const localidadService=new LocalidadService(apiURL)

    const dispatch=useDispatch<AppDispatch>()
    const [loading,setLoading]=useState(false);

    const getEmpresas=async()=>{
        await empresaService.getAll().then(response=>{
          dispatch(setDataEmpresaTable(response));
          setLoading(false)
        })
    }
    const getPaises=async()=>{
      await paisService.getAll().then(response=>{
        dispatch(setTablePais(response));
        setLoading(false)
      })
    }
    const getProvincia=async()=>{
      await provinciaService.getAll().then(response=>{
        dispatch(setTableProvincia(response));
        setLoading(false)
      })
    }
    const getLocalidad=async()=>{
      await localidadService.getAll().then(response=>{
        dispatch(setTableLocalidad(response));
        setLoading(false)
      })
    }

    const getSucursales=async()=>{
      await sucursalService.getAll().then(response=>{
        dispatch(setDataSucursalTable(response));
        setLoading(false)
      })
    }

    return {
        getEmpresas,getPaises,getProvincia,getLocalidad,getSucursales,
        loading,setLoading,
    }
}
