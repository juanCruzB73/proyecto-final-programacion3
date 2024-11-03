import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { FC, useEffect, useState } from 'react';
import { ICategorias } from '../../types/dtos/categorias/ICategorias';
import { IProductos } from '../../types/dtos/productos/IProductos';
import { IAlergenos } from '../../types/dtos/alergenos/IAlergenos';
import {Card} from './Card';
import { useServices } from '../../hooks/useServices';

export const ListCards:FC = () => { 

  const {elementActive}=useSelector((state:RootState)=>state.tablaSucursal)

  const {getProductos}=useServices(`http://190.221.207.224:8090/articulos/porSucursal/${elementActive?.id}`);
  const {getAlergenos}=useServices('http://190.221.207.224:8090/alergenos')
  const {getCategorias}=useServices('http://190.221.207.224:8090/categorias')
  //const {administracionTable}=useSelector((state:RootState)=>state.tableAdministracion)

  const {administracionTable}=useSelector((state:RootState)=>state.tableAdministracion)

  const {categoriaFilter,productoFilter,alergenosFilter}=useSelector((state:RootState)=>state.administracion)
  
  const dispatch=useDispatch<AppDispatch>()
  
  

  const [selectedFilter,setSelectedFilter]=useState<ICategorias[]|IProductos[]|IAlergenos[]>([]);


  
  useEffect(() => {
    const fetchData = async () => {
      if (categoriaFilter) {
        await getCategorias();
      } else if (productoFilter) {
        await getProductos(); 
      } else if (alergenosFilter) {
        await getAlergenos(); 
      }
    };
    fetchData();
  }, [categoriaFilter, productoFilter, alergenosFilter, elementActive]);

  let value:ICategorias[]|IProductos[]=[];

  //hacer filtro por sucursal para categoria preguntar profe

  useEffect(() => {
    if (categoriaFilter || productoFilter || alergenosFilter) {      
      setSelectedFilter(administracionTable);
    }
  }, [administracionTable]);

    return (
        <div className='categoriaContainer'>
          {
              selectedFilter.map(element=>(
                <Card key={element.id} element={element}/>
              ))
          }
        </div>
      );
}




