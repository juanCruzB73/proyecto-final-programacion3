import Card from 'react-bootstrap/Card';
import { AppDispatch, RootState } from '../../redux/store/store';
import { useDispatch, useSelector } from "react-redux"
import { Button } from 'react-bootstrap';
import { onSeeDetailsSucursal } from '../../redux/slices/sucursalesSlices';
import './sucursalDetails.css'

//view para detalles de empresa

export const SucursalDetails = () => {

    const dispatch=useDispatch<AppDispatch>();
    const {elementActive}=useSelector((state:RootState)=>state.tablaSucursal)
  
    return (
      <div className='containerFathersucursal'>

        <div className="sucursal-details">
        
          <Card className="details-container" >

              <Card.Body >
              <Card.Title className='titleSucursal'>Sucursal</Card.Title>

              <Card.Text className='textSucursal'>
                Nombre de la sucursal:{elementActive?.nombre}
              </Card.Text>
      
              <Card.Text className='textSucursal'>
                Domicilio: {elementActive?.domicilio.calle} {elementActive?.domicilio.numero}
              </Card.Text>
      
              <Card.Text className='textSucursal'>
                Hora apertura:{elementActive?.horarioApertura}
              </Card.Text>
      
              <Card.Text className='textSucursal'>
                Hora de cierre: {elementActive?.horarioCierre}
              </Card.Text>

              <Card.Text className="img-sucursal">
                Logo: 
                <Card.Img variant="top" src={elementActive?.logo} style={{width:"100%",height:"85%"}} /> 
              </Card.Text>
              <Button className='buttonSucursal' variant="primary" style={{background:"#21232A",color:"white",padding:"0.3rem",border:"node",borderRadius:"0.4rem"}} onClick={()=>dispatch(onSeeDetailsSucursal())} >Cerrar</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    
    );
  
}