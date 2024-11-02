import { FC } from "react"
import { AppDispatch, RootState } from "../../redux/store/store"
import { onAddCompany } from "../../redux/slices/companySlice"
import { useDispatch, useSelector } from "react-redux"
import { onAddSucursal } from "../../redux/slices/sucursalesSlices"

interface Props{
    name:string
}

export const AddComponent:FC<Props> = ({name}) => {
  const dispatch=useDispatch<AppDispatch>()
  const {elementActive}=useSelector((state:RootState)=>state.tablaEmpresa);
  const operation = ()=>{
    if(name=="Empresas"){
      dispatch(onAddCompany())
    }else{
      dispatch(onAddSucursal())
    }
  }
  
  return (
    <div className="agregar">
      {name=="Empresas"?<h2>{name}</h2>:<h2>{name} {elementActive?.nombre}</h2>}
      <button onClick={() => operation()} >{`Agregar ${name}`}</button>
    </div>
  )
}
