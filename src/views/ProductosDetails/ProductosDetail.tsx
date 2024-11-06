import { Card } from "react-bootstrap"
import "./ProductosDetails.css"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store/store"
import { onSeeProduct } from "../../redux/slices/administracionSlice"

const ProductosDetail = () => {
    const {elementActiveProducto}=useSelector((state:RootState)=>state.tableAdministracion)
    const imageValue = elementActiveProducto?.imagenes || [];
    const dispatch=useDispatch<AppDispatch>()
    return (
        <div className="detailsContainer">
            <Card className="cardContainer" style={{ width: '18rem' }}>
                <div className="imagenContainer">
                {
                    imageValue.map(img=>(
                        <Card.Img className="imagen" key={img.id} variant="top" src={img.url} />
                    ))
                }
                </div>

                <Card.Body className="text">
                    <Card.Title style={{color:"black"}}>{elementActiveProducto?.denominacion}</Card.Title>
                </Card.Body>
            </Card>
            <button onClick={()=>dispatch(onSeeProduct())} >Cerrar</button>
        </div>
    )
}

export default ProductosDetail
