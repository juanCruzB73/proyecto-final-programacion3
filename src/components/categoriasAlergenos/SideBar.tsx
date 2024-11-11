import { useDispatch, useSelector  } from "react-redux"
import { AppDispatch, RootState  } from "../../redux/store/store"
import { onActiveAlergeno, onActiveCategoria, onActiveProducto } from "../../redux/slices/administracionSlice"

export const SideBar = () => {

  
  const dispatch=useDispatch<AppDispatch>()
  const { categoriaFilter, productoFilter, alergenosFilter } = useSelector((state: RootState) => state.administracion);

  
  onActiveProducto
  onActiveAlergeno
  return (
    <>
      <div style={{width:"100%"}}><h3  >Administracion</h3></div>
      <div className="buttonsSideBar">
      <button className={categoriaFilter?"activeFilter":"notActive"} onClick={()=>{dispatch(onActiveCategoria())}} >Categorias</button>
      <button className={productoFilter?"activeFilter":"notActive"} onClick={()=>{dispatch(onActiveProducto())}} >Productos</button>
      <button className={alergenosFilter?"activeFilter":"notActive"} onClick={()=>{dispatch(onActiveAlergeno())}} >Alergenos</button>
      </div>
    </>
  )
}
