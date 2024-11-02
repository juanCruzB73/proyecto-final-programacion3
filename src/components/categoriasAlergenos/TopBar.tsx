import { FC } from "react"
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";

export const TopBar:FC = () => {

    return (
      <>
        <button><Link style={{color:"black"}} to={"/"}><i style={{fontSize:"1.5rem"}} className="bi bi-arrow-left-square-fill"></i></Link></button>
        <h1>Categorias</h1>
      </>
    )
}