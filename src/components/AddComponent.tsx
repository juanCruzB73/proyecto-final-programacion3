import { FC } from "react"
import { AppDispatch } from "../redux/store/store"
import { onAddCompany } from "../redux/slices/companySlice"
import { useDispatch } from "react-redux"

interface Props{
    name:string
}

export const AddComponent:FC<Props> = ({name}) => {
  const dispatch=useDispatch<AppDispatch>()

  const operation = ()=>{
    if(name=="Empresas"){
      dispatch(onAddCompany())
    }
  }
  
  return (
    <div className="agregar">
      <h2>{name}</h2>
      <button onClick={() => operation()} >{`Agregar ${name}`}</button>
    </div>
  )
}
