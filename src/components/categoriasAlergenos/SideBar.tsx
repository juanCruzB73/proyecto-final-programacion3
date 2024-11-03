import { useDispatch  } from "react-redux"
import { AppDispatch  } from "../../redux/store/store"
import { onActiveAlergeno, onActiveCategoria, onActiveProducto } from "../../redux/slices/administracionSlice"

export const SideBar = () => {

  
  const dispatch=useDispatch<AppDispatch>()
  
  onActiveProducto
  onActiveAlergeno
  return (
    <>
      <div style={{width:"100%"}}><h3  >Administracion</h3></div>
      <div className="buttonsSideBar">
      <button onClick={()=>{dispatch(onActiveCategoria())}} >Categorias</button>
      <button onClick={()=>dispatch(onActiveProducto())} >Productos</button>
      <button onClick={()=>dispatch(onActiveAlergeno())} >Alergenos</button>
      </div>
    </>
  )
}
