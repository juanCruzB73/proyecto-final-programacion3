import { Card } from "react-bootstrap"
import "./AlergenosDetails.css"

const AlergenosDetails = () => {
    return (
        <div className="detailsContainer">
            <Card className="cardContainer" style={{ width: '18rem' }}>
                <div className="imagenContainer">
                <Card.Img className="imagen" variant="top" src="holder.js/100px180" />
                </div>

                <Card.Body className="text">
                    <Card.Title>Denominación:</Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}

export default AlergenosDetails
