import Card from 'react-bootstrap/Card';
import { AppDispatch } from '../../redux/store/store';
import { onSeeDetails } from '../../redux/slices/companySlice';
import { useDispatch } from "react-redux"

import './sucursalDetails.css'
import { Button } from 'react-bootstrap';

//view para detalles de empresa
export const SucursalDetails = () => {

    const dispatch=useDispatch<AppDispatch>();
  
    return (
      <div className="sucursal-details">
      
        <Card className="details-container" >
            
            <Card.Body >
            <Card.Title className='titleSucursal'>Sucursal</Card.Title>
            
            <Card.Text className='textSucursal'>
              Nombre de la sucursal:
            </Card.Text>
  
            <Card.Text className='textSucursal'>
              Domicilio:
            </Card.Text>
  
            <Card.Text className='textSucursal'>
              Hora apertura:
            </Card.Text>
  
            <Card.Text className='textSucursal'>
              Hora de cierre:
            </Card.Text>
  
            <Card.Text className="img-sucursal">
              Logo:
              <Card.Img variant="top" src="holder.js/100px180?text=Image cap" style={{width:"80%",height:"30%"}} /> 
            </Card.Text>
            <Button className='buttonSucursal' variant="primary" style={{background:"#21232A",color:"white",padding:"0.3rem",border:"node",borderRadius:"0.4rem"}} onClick={()=>dispatch(onSeeDetails())} >Cerrar</Button>
          </Card.Body>
        </Card>
      </div>
    
    );
  
}