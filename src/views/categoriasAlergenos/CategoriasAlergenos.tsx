import './categoriasAlergenos.css'
import { TopBar } from '../../components/categoriasAlergenos/TopBar'
import { SideBar } from '../../components/categoriasAlergenos/SideBar'
import { ListCards } from '../../components/categoriasAlergenos/ListCards'
import { AppDispatch, RootState } from '../../redux/store/store'
import { useDispatch, useSelector } from 'react-redux'

import { onAddAlergeno, onAddCategoria, onAddProducto } from '../../redux/slices/administracionSlice'
import AddCategoria from '../AddCategoria/AddCategoria'
import AddSubcategoria from '../AddSubcategoria/AddSubcategoria'
import AddEditProducto from '../AddEditProducto/AddEditProducto'
import AddEditAlergeno from '../AddEditAlergeno/AddEditAlergeno'
import AlergenosDetails from '../AlergenosDetails/AlegenosDetails'
import ProductosDetail from '../ProductosDetails/ProductosDetail'

export const CategoriasAlergenos = () => {

  const dispatch=useDispatch<AppDispatch>()
  const {categoriaFilter,productoFilter,alergenosFilter,}=useSelector((state:RootState)=>state.administracion)

  const {addCategoria,addSubCategoria,addProducto,addAlergeno,editCategoria,editSubCategoria,editProducto,editAlergeno,seeAlergeno,seeProduct}=useSelector((state:RootState)=>state.administracion)
  
  
  return (
    <div className="main-container-administracion">
      <div className={addCategoria||addSubCategoria||addProducto||addAlergeno||editCategoria||editSubCategoria||editProducto||editAlergeno||seeAlergeno||seeProduct?'admin-pop-up-container':'admin-pop-up-container-deactivated'}>
          {addCategoria&&<AddCategoria/>}
          {editCategoria&&<AddCategoria/>}
          {addSubCategoria&&<AddSubcategoria/>}
          {editSubCategoria&&<AddSubcategoria/>}
          {addProducto&&<AddEditProducto />}
          {editProducto&&<AddEditProducto />}
          {addAlergeno&&<AddEditAlergeno/>}
          {editAlergeno&&<AddEditAlergeno/>}
          {seeAlergeno&&<AlergenosDetails/>}
          {seeProduct&&<ProductosDetail/>}
      </div>
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
            {productoFilter ? (
              <div className='categoriaPadreContainer'>
                <span className="categoriaInfo" style={{width:"90%"}}>
                <div className='mainContainerProduct'style={{width:"100%"}}>
                  <div className='info' style={{padding:"1rem"}}>
                    <span className='infoProduct'>Denominacion</span>
                    <span className='infoProduct'>Precio</span>
                    <span className='infoProduct'>Descripción</span>
                    <span className='infoProduct'>Categoria</span>
                    <span className='infoProduct'>Habilitado</span>
                  </div>
                </div>
                </span>
              </div>
            ):("")}
            <ListCards/>
          </div>
        </div>
      </div>
    </div>
  )
}