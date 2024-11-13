import { Card } from "react-bootstrap"
import "./AlergenosDetails.css"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store/store"
import { onSeeAlergeno } from "../../redux/slices/administracionSlice"

const AlergenosDetails = () => {

    const dispatch=useDispatch<AppDispatch>()

    const {elemetActiveAlergeno}=useSelector((state:RootState)=>state.tableAdministracion)

    const imageValue = elemetActiveAlergeno?.imagen?.url || "";
    return (
        <div className="detailsContainer">
            <Card className="cardContainer" style={{ width: '18rem' }}>
                <div className="imagenContainer">
                <Card.Img className="imagen" variant="top" src={imageValue} />
                </div>

                <Card.Body className="text">
                    <Card.Title style={{color:"white",textAlign:"center",fontSize:"6vh"}}>{elemetActiveAlergeno?.denominacion}</Card.Title>
                </Card.Body>
            </Card>
            <button onClick={()=>dispatch(onSeeAlergeno())}>cerrar</button>
        </div>
    )
}

export default AlergenosDetails
