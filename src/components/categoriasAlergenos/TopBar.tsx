import { FC, useEffect, useState } from "react"
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

export const TopBar:FC = () => {
    const { categoriaFilter, productoFilter, alergenosFilter } = useSelector((state: RootState) => state.administracion);
    
    
    const [title,setTitle]=useState("Categorias")
    
    const { elementActive } = useSelector((state: RootState) => state.tablaSucursal);


    useEffect(()=>{
      categoriaFilter && setTitle("Categorias");
      productoFilter && setTitle("Productos");
      alergenosFilter && setTitle("Alergenos")
    },[categoriaFilter, productoFilter, alergenosFilter])
    return (
      <>
        <button><Link style={{color:"black"}} to={"/"}><i style={{fontSize:"1.5rem"}} className="bi bi-arrow-left-square-fill"></i></Link></button>
        <h1>{title} de la sucursal {elementActive?.nombre}</h1>
      </>
    )
}