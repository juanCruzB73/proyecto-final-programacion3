import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { FC, useEffect, useState } from 'react';
import { ICategorias } from '../../types/dtos/categorias/ICategorias';
import { IProductos } from '../../types/dtos/productos/IProductos';
import { IAlergenos } from '../../types/dtos/alergenos/IAlergenos';
import {Card} from './Card';
import { useServices } from '../../hooks/useServices';

export const ListCards:FC = () => { 
//URL para la API  en Docker
const {elementActive}=useSelector((state:RootState)=>state.tablaSucursal)

//api del profe
const {getProductos}=useServices(`http://190.221.207.224:8090/articulos/porSucursal/${elementActive?.id}`);
const {getAlergenos}=useServices('http://190.221.207.224:8090/alergenos')
const {getCategorias}=useServices(`http://190.221.207.224:8090/categorias/allCategoriasPadrePorSucursal/${elementActive?.id}`)

  //URL para la API docker
  
// const {getProductos}=useServices(`http://localhost:8090/articulos/porSucursal/${elementActive?.id}`);
// const {getAlergenos}=useServices('http://localhost:8090/alergenos')
// const {getCategorias}=useServices(`http://localhost:8090/categorias/allCategoriasPadrePorSucursal/${elementActive?.id}`)

  //const {administracionTable}=useSelector((state:RootState)=>state.tableAdministracion)

  const {administracionTable,administracionTable2,administracionTable3}=useSelector((state:RootState)=>state.tableAdministracion)

  const {categoriaFilter,productoFilter,alergenosFilter}=useSelector((state:RootState)=>state.administracion)  
  

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

  //hacer filtro por sucursal para categoria preguntar profe

  useEffect(() => {
    if (categoriaFilter) {      
      setSelectedFilter(administracionTable);
    }
    if(productoFilter){
      setSelectedFilter(administracionTable3);
    }
    if(alergenosFilter){
      setSelectedFilter(administracionTable2)
    }
  }, [administracionTable,administracionTable2,administracionTable3]);

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




