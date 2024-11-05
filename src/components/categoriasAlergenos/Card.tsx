import 'bootstrap-icons/font/bootstrap-icons.css';
import { ICategorias } from '../../types/dtos/categorias/ICategorias';
import { IProductos } from '../../types/dtos/productos/IProductos';
import { IAlergenos } from '../../types/dtos/alergenos/IAlergenos';
import { FC, useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import {onAddSubCategoria, onEditAlergeno, onEditCategoria, onEditProducto, onEditSubCategoria } from '../../redux/slices/administracionSlice';
import { setElementActiveAdministracionAlergenos, setElementActiveAdministracionCategoria, setElementActiveAdministracionProductos } from '../../redux/slices/tableAdministracionSlice';
import { CategoriasService } from '../../services/CategoriasService';
import { ProductoService } from '../../services/ProductoService';
import { AlergenosService } from '../../services/AlergenosService';

interface Iprops{
    element:ICategorias | IProductos | IAlergenos
}


export const Card:FC<Iprops> = ({element}) => {
  
  const {categoriaFilter,productoFilter,alergenosFilter,}=useSelector((state:RootState)=>state.administracion)
  const {elementActiveCategoria,administracionTable}=useSelector((state:RootState)=>state.tableAdministracion)
  const categoriaService=new CategoriasService('http://190.221.207.224:8090/categorias');
  const articuloService=new ProductoService('http://190.221.207.224:8090/articulos');
  const alergenosService=new AlergenosService('http://190.221.207.224:8090/alergenos');

  /*
  onAddSubCategoria,onAddProducto,onAddAlergeno,onEditCategoria,onEditSubCategoria,onEditProducto,onEditAlergeno
  */
  const dispatch=useDispatch<AppDispatch>()

  const [display,setDisplay]=useState(false);
  
  const [category,setcategory]=useState<ICategorias>()
  const [product,setProduct]=useState<IProductos>()
  const [alergeno,setAlergeno]=useState<IAlergenos>()
  const [promiseResponse,setPromiseResponse]=useState<any>()


  useEffect(()=>{
    const fetchData=async()=>{
      if(categoriaFilter){
        console.log("categorias");
        await categoriaService.getById(element.id).then(response=>(response&&setPromiseResponse(response)))
      }else if(productoFilter){
        await articuloService.getById(element.id).then(response=>response&&setPromiseResponse(response))
      }else{
        await alergenosService.getById(element.id).then(response=>response&&setPromiseResponse(response))
      }
    }
    fetchData()
  },[categoriaFilter,productoFilter,alergenosFilter])
  useEffect(()=>{
    if(categoriaFilter){
      setcategory(promiseResponse)
    }else if(productoFilter){
      setProduct(promiseResponse)
    }else{
      setAlergeno(promiseResponse)
    }
  },[promiseResponse])

  return (
    <>
      {categoriaFilter && (
        <>
          <span className="categoria">
            {element.denominacion ? element.denominacion : 'no name'}
            <div>
              <i onClick={() => setDisplay(!display)} className="bi bi-arrow-down-circle"></i>
              <i
                onClick={() => {
                  category && dispatch(setElementActiveAdministracionCategoria({ element: category }));
                  dispatch(onEditCategoria());
                }}
                className="bi bi-pencil-square"
              ></i>
              <i onClick={() => dispatch(onAddSubCategoria())} className="bi bi-plus-circle"></i>
            </div>
          </span>
          <div className={display ? 'subcategorias' : 'notDisplayed'}>
            {administracionTable
              ? administracionTable.map(subCategoria => (
                  <span className="categoria" key={subCategoria.id}>
                    {subCategoria.denominacion ? subCategoria.denominacion : 'no name'}
                    <div>
                      <i onClick={() => dispatch(onEditSubCategoria())} className="bi bi-pencil-square"></i>
                    </div>
                  </span>
                ))
              : <span>no hay subcategorias</span>}
          </div>
        </>
      )}
      {productoFilter && (
        <>
          <span className="categoria">
            {element.denominacion ? element.denominacion : 'no name'}
            <div>
              <i className="bi bi-eye-fill"></i>
              <i
                onClick={() => {
                  product && dispatch(setElementActiveAdministracionProductos({ element: product }));
                  dispatch(onEditProducto());
                }}
                className="bi bi-pencil-square"
              ></i>
              <i className="bi bi-trash"></i>
            </div>
          </span>
          <div className={display ? 'subcategorias' : 'notDisplayed'}>
            <span className="categoria">item</span>
            <span className="categoria">item</span>
          </div>
        </>
      )}
      {alergenosFilter && (
        <>
          <span className="categoria">
            {element.denominacion ? element.denominacion : 'no name'}
            <div>
              <i className="bi bi-eye-fill"></i>
              <i
                onClick={() => {
                  alergeno && dispatch(setElementActiveAdministracionAlergenos({ element: alergeno }));
                  dispatch(onEditAlergeno());
                }}
                className="bi bi-pencil-square"
              ></i>
              <i className="bi bi-trash"></i>
            </div>
          </span>
          <div className={display ? 'subcategorias' : 'notDisplayed'}>
            <span className="categoria">item</span>
            <span className="categoria">item</span>
          </div>
        </>
      )}
    </>
  );
}

