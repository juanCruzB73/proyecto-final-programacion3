import 'bootstrap-icons/font/bootstrap-icons.css';
import { ICategorias } from '../../types/dtos/categorias/ICategorias';
import { IProductos } from '../../types/dtos/productos/IProductos';
import { IAlergenos } from '../../types/dtos/alergenos/IAlergenos';
import { FC, useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { onAddSubCategoria, onEditAlergeno, onEditCategoria, onEditProducto, onEditSubCategoria, onSeeAlergeno, onSeeProduct } from '../../redux/slices/administracionSlice';
import { setElementActiveSubCategoria,setElementActiveAdministracionAlergenos, setElementActiveAdministracionCategoria, setElementActiveAdministracionProductos, removeElementActiveProducto } from '../../redux/slices/tableAdministracionSlice';
import { CategoriasService } from '../../services/CategoriasService';
import { ProductoService } from '../../services/ProductoService';
import { AlergenosService } from '../../services/AlergenosService';

interface Iprops {
    element: ICategorias | IProductos | IAlergenos
}

export const Card: FC<Iprops> = ({ element }) => {
  const { elementActive } = useSelector((state: RootState) => state.tablaSucursal);
  const { categoriaFilter, productoFilter, alergenosFilter } = useSelector((state: RootState) => state.administracion);
  const { administracionTable,administracionTable2,administracionTable3 } = useSelector((state: RootState) => state.tableAdministracion);

  const dispatch = useDispatch<AppDispatch>();

  const [display, setDisplay] = useState(false);
  const [category, setCategory] = useState<ICategorias>();
  const [product, setProduct] = useState<IProductos>();
  const [alergeno, setAlergeno] = useState<IAlergenos>();
  const [promiseResponse, setPromiseResponse] = useState<any>();
  const [subCategorias, setSubCategorias] = useState<ICategorias[]>([]);

  const categoriaService = new CategoriasService('http://localhost:8090/categorias');
  const categoriasPadreService = new CategoriasService(`http://localhost:8090/categorias`)
  const articuloService = new ProductoService('http://localhost:8090/articulos');
  const alergenosService = new AlergenosService('http://localhost:8090/alergenos');
  const subCategoryService = elementActive?.id && category?.id
    ? new CategoriasService(`http://localhost:8090/categorias/allSubCategoriasPorCategoriaPadre/${category.id}/${elementActive.id}`)
    : null;  
  
  useEffect(() => {
    const fetchData = async () => {
      if (categoriaFilter && categoriaService) {
        await categoriasPadreService.getById(element.id).then(response => response && setPromiseResponse(response));
        if (subCategoryService) {
          await subCategoryService.getAll().then(response => setSubCategorias(response || []));
        }
        
        if (subCategoryService) {
          await subCategoryService.getAll().then(response => setSubCategorias(response || []));
        }else{
          console.log("subcategorias null"); 
        }
      } else if (productoFilter) {
        await articuloService.getById(element.id).then(response => response && setPromiseResponse(response));
      } else if (alergenosFilter) {
        await alergenosService.getById(element.id).then(response => response && setPromiseResponse(response));
      }
    };
    fetchData();
  }, [categoriaFilter, productoFilter, alergenosFilter,display,administracionTable,administracionTable2,administracionTable3]);

  
  useEffect(() => {
    if (categoriaFilter) {
      setCategory(promiseResponse);
    } else if (productoFilter) {
      setProduct(promiseResponse);
    } else if (alergenosFilter) {
      setAlergeno(promiseResponse);
    }
  }, [promiseResponse]);

  return (
    <>
      {categoriaFilter && (
        <>
          <span className="categoria">
            {element.denominacion || 'no name'}
            <div>
              <i onClick={() => setDisplay(!display)} className="bi bi-arrow-down-circle"></i>
              <i
                onClick={() => {
                  category && dispatch(setElementActiveAdministracionCategoria({ element: category }));
                  dispatch(onEditCategoria());
                }}
                className="bi bi-pencil-square"
              ></i>
              <i onClick={() => {
                category && dispatch(setElementActiveAdministracionCategoria({ element: category }));
                dispatch(onAddSubCategoria())
                setDisplay(false)
                }} className="bi bi-plus-circle"></i>
            </div>
          </span>
          <div className={display ? 'subcategorias' : 'notDisplayed'}>
            {Array.isArray(subCategorias) && subCategorias.length > 0
              ? subCategorias.map(subCategoria => (
                  <span className="categoria" key={subCategoria.id}>
                    {subCategoria.denominacion || 'no name'}
                    <div>
                      <i onClick={() =>{
                         category && dispatch(setElementActiveAdministracionCategoria({ element: category }));
                         dispatch(setElementActiveSubCategoria({element:subCategoria}))
                         dispatch(onEditSubCategoria())
                         setDisplay(false)
                         }} className="bi bi-pencil-square"></i>
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
            {element.denominacion || 'no name'}
            <div>
              <i
                className="bi bi-eye-fill"
                onClick={() => {
                  product && dispatch(setElementActiveAdministracionProductos({ element: product }));
                  dispatch(onSeeProduct());
                }}
              ></i>
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
            {element.denominacion || 'no name'}
            <div>
              <i
                className="bi bi-eye-fill"
                onClick={() => {
                  alergeno && dispatch(setElementActiveAdministracionAlergenos({ element: alergeno }));
                  dispatch(onSeeAlergeno());
                }}
              ></i>
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
};
