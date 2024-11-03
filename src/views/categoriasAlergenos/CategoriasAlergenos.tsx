import './categoriasAlergenos.css'
import { TopBar } from '../../components/categoriasAlergenos/TopBar'
import { SideBar } from '../../components/categoriasAlergenos/SideBar'
import { ListCards } from '../../components/categoriasAlergenos/ListCards'
import { AppDispatch, RootState } from '../../redux/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { onAddAlergeno, onAddCategoria, onAddProducto } from '../../redux/slices/administracionSlice'


export const CategoriasAlergenos = () => {

  const dispatch=useDispatch<AppDispatch>()
  const {categoriaFilter,productoFilter,alergenosFilter,}=useSelector((state:RootState)=>state.administracion)
  
  return (
    <div className="main-container-administracion">
      <div className='topBar'>
        <TopBar/>
      </div>
      <div className='board'>

        <div className='sideBar'>
          <SideBar/>
        </div>
        <div className='itemMenu'>
          <button onClick={()=>{
            categoriaFilter&&dispatch(onAddCategoria())
            productoFilter&&dispatch(onAddProducto())
            alergenosFilter&&dispatch(onAddAlergeno())
          }} >Agregar</button>
          <div className='Items'>
            <ListCards/>
          </div>
        </div>
      </div>
    </div>
  )
}