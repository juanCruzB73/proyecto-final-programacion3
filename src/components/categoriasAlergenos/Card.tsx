import 'bootstrap-icons/font/bootstrap-icons.css';
import { ICategorias } from '../../types/dtos/categorias/ICategorias';
import { IProductos } from '../../types/dtos/productos/IProductos';
import { IAlergenos } from '../../types/dtos/alergenos/IAlergenos';
import { FC, useState } from 'react';
import { RootState } from '../../redux/store/store';
import { useSelector } from 'react-redux';

interface Iprops{
    element:ICategorias | IProductos | IAlergenos
}


export const Card:FC<Iprops> = ({element}) => {

  const {categoriaFilter,productoFilter,alergenosFilter}=useSelector((state:RootState)=>state.administracion)

  const [display,setDisplay]=useState(false);
  
  return (
    <>
    {
        categoriaFilter&&(
          <>
            <span className='categoria'>{element.denominacion?element.denominacion : "no name"} <div><i onClick={()=>setDisplay(!display)} className="bi bi-arrow-down-circle"></i> <i className="bi bi-pencil-square"></i> <i className="bi bi-plus-circle"></i></div></span>
            <div className={ display ? 'subcategorias' : "notDisplayed"}>
              <span className='categoria'>item</span>
              <span className='categoria'>item</span>
            </div>
          </>
        )
      }
      {
        productoFilter&&(
          <>
            <span className='categoria'>{element.denominacion?element.denominacion : "no name"} <div><i className="bi bi-eye-fill"></i> <i className="bi bi-pencil-square"></i> <i className="bi bi-trash"></i></div></span>
            <div className={ display ? 'subcategorias' : "notDisplayed"}>
              <span className='categoria'>item</span>
              <span className='categoria'>item</span>
            </div>
          </>
          )
      }
      {
        alergenosFilter&&(
          <>
            <span className='categoria'>{element.denominacion?element.denominacion : "no name"} <div><i className="bi bi-eye-fill"></i> <i className="bi bi-pencil-square"></i> <i className="bi bi-trash"></i></div></span>
            <div className={ display ? 'subcategorias' : "notDisplayed"}>
              <span className='categoria'>item</span>
              <span className='categoria'>item</span>
            </div>
          </>
        )
      }
        
    </>
  )
}

