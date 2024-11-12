import 'bootstrap-icons/font/bootstrap-icons.css';
import { ICategorias } from '../../types/dtos/categorias/ICategorias';
import { IProductos } from '../../types/dtos/productos/IProductos';
import { IAlergenos } from '../../types/dtos/alergenos/IAlergenos';
import { FC, useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { onAddSubCategoria, onEditAlergeno, onEditCategoria, onEditProducto, onEditSubCategoria, onSeeAlergeno, onSeeProduct } from '../../redux/slices/administracionSlice';
import { setElementActiveSubCategoria,setElementActiveAdministracionAlergenos, setElementActiveAdministracionCategoria, setElementActiveAdministracionProductos, removeElementActiveProducto, setAdministracionTable2, setAdministracionTable3 } from '../../redux/slices/tableAdministracionSlice';
import { CategoriasService } from '../../services/CategoriasService';
import { ProductoService } from '../../services/ProductoService';
import { AlergenosService } from '../../services/AlergenosService';
import { useServices } from '../../hooks/useServices';
import Swal from 'sweetalert2'

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
  const [displayPhone,setDisplayPhone]=useState(false);

  // URL para la API en Docker
  /*const categoriaService = new CategoriasService("http://190.221.207.224:8090/categorias");
  const categoriasPadreService = new CategoriasService("http://190.221.207.224:8090/categorias");
  const articuloService = new ProductoService("http://190.221.207.224:8090/articulos");
  const alergenosService = new AlergenosService("http://190.221.207.224:8090/alergenos");
  const subCategoryService = elementActive?.id && category?.id
    ? new CategoriasService(`http://190.221.207.224:8090/categorias/allSubCategoriasPorCategoriaPadre/${category.id}/${elementActive.id}`)
    : null;  */
  
  // URL para la API del profesor
  
  const categoriaService = new CategoriasService("http://localhost:8090/categorias");
  const categoriasPadreService = new CategoriasService("http://localhost:8090/categorias");
  const articuloService = new ProductoService("http://localhost:8090/articulos");
  const {getProductos}=useServices(`http://localhost:8090/articulos/porSucursal/${elementActive?.id}`)

  const alergenosService = new AlergenosService("http://localhost:8090/alergenos");
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

  const handleDeleteAlergeno=async(id:number)=>{
    try {
      await alergenosService.delete(id); 

      const updatedAlergenos = await alergenosService.getAll();
      
      dispatch(setAdministracionTable2(updatedAlergenos));
    } catch (error) {
        console.error(`Error al eliminar el alérgeno con ID ${id}:`, error);
    }
  }

  const handleDeleteArticulos=async(id:number)=>{
    try {
      await articuloService.delete(id);
      getProductos()
    } catch (error) {
        console.error(`Error al eliminar el articulo con ID ${id}:`, error);
    }
  }

  return (
    <>
      {categoriaFilter && (
        <>
          <span className="categoria">
            <div className='categoriaPadreContainer'>
              <div className='categoriaInfo' style={{borderBottom:"white 1px solid",padding:"1rem",justifyContent:"space-between"}} >
                  <span>{element.denominacion || 'no name'}</span>
                  <div style={{width:"10%",display:"flex",justifyContent:"space-around",fontSize:"1.5rem"}}>
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
              </div>
            <div className={display ? 'subcategorias' : 'notDisplayed'}>
              {Array.isArray(subCategorias) && subCategorias.length > 0
                ? subCategorias.map(subCategoria => (
                    <span className="subcategoria" key={subCategoria.id}>
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
            </div>
        </span>
        </>
      )}


      {productoFilter && (
        <>
        <div className='categoriaPadreContainer'>
        <span className="categoriaInfo">
            <div className='mainContainerProduct'>
              <span onClick={()=>setDisplayPhone(!displayPhone)} className='infoProductPhone' style={{cursor: 'pointer',border:"none"}}>{product?.denominacion}</span>
              <div className={displayPhone?'infoPhone':"notDisplayMainContainerProduct"}>
                  <span className='infoProductPhone'>Precio: {product?.precioVenta}</span>
                  <span className='infoProductPhone'>Descripción: {product?.descripcion}</span>
                  <span className='infoProductPhone'>Categoria: {product?.categoria.denominacion}</span>
                  <span className='infoProductPhone'>Habilitado: {product?.habilitado ? <i className="bi bi-hand-thumbs-up" style={{color:"green"}}></i> : <i className="bi bi-hand-thumbs-down" style={{color:"red"}}></i>}</span>
              </div>
            </div>
            <div className='info'>
              <span className='infoProduct'>{product?.denominacion}</span>
              <span className='infoProduct'>{product?.precioVenta}</span>
              <span className='infoProduct'>{product?.descripcion}</span>
              <span className='infoProduct'>{product?.categoria.denominacion}</span>
              <span className='infoProduct' style={{textAlign:"center"}}>{product?.habilitado ? <i className="bi bi-hand-thumbs-up" style={{color:"green"}}></i> : <i style={{color:"red"}}className="bi bi-hand-thumbs-down" ></i>}</span>
            </div>
            <div className='buttonsProduct' style={{fontSize:"1.5rem"}}>
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
              <i 
              onClick={()=>{
                Swal.fire({
                  title: "¿Estas seguro?",
                  text: `¿Seguro que quieres eliminar?`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Si, Eliminar!",
                  cancelButtonText: "Cancelar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    product && dispatch(setElementActiveAdministracionProductos({ element: product }));
                    product && handleDeleteArticulos(product.id)
                  }
                });
              }}
              className="bi bi-trash"></i>
            </div>
          </span>
        </div>
        </>
      )}


      {alergenosFilter && (
        <>
        <div className='categoriaPadreContainer'>
        <span className="categoriaInfo" style={{justifyContent:"space-between",padding:"1rem"}}>
            {element.denominacion || 'no name'}
            <div style={{width:"10%",display:"flex",justifyContent:"space-around",fontSize:"1.5rem"}}>
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
              <i 
                onClick={()=>{
                  Swal.fire({
                    title: "¿Estas seguro?",
                    text: `¿Seguro que quieres eliminar?`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, Eliminar!",
                    cancelButtonText: "Cancelar",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      alergeno && dispatch(setElementActiveAdministracionAlergenos({ element: alergeno }));
                      alergeno && handleDeleteAlergeno(alergeno.id)
                    }
                  });
                }}
              className="bi bi-trash"></i>
            </div>
          </span>
        </div>
        </>
      )}
    </>
  );
};
