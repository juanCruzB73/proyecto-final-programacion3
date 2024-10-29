import { FC } from "react"
import { AppDispatch } from "../redux/store/store"
import { onAddCompany } from "../redux/slices/companySlice"
import { useDispatch } from "react-redux"
import { onAddSucursal } from "../redux/slices/sucursalesSlices"

interface Props{
    name:string
}

export const AddComponent:FC<Props> = ({name}) => {
  const dispatch=useDispatch<AppDispatch>()

  const operation = ()=>{
    if(name=="Empresas"){
      dispatch(onAddCompany())
    }else{
      dispatch(onAddSucursal())
    }
  }
  
  return (
    <div className="agregar">
      <h2>{name}</h2>
      <button onClick={() => operation()} >{`Agregar ${name}`}</button>
    </div>
  )
}
