//view para detalles de empresa
import Card from 'react-bootstrap/Card';
import { AppDispatch } from '../../redux/store/store';
import { onSeeDetails } from '../../redux/slices/companySlice';
import { useDispatch } from "react-redux"

import './empresaDetail.css'
import { Button } from 'react-bootstrap';


export const EmpresaDetails = () => {
  const dispatch=useDispatch<AppDispatch>()
  
  return (
    <div className="empresa-detail">
    
       <Card className="details-container" >
          
          <Card.Body >
            <Card.Title>Empresa</Card.Title>
          
          <Card.Text>
            Nombre de sucursal:
          </Card.Text>

          <Card.Text>
            Domicilio:
          </Card.Text>

          <Card.Text>
            Hora apertura:
          </Card.Text>

          <Card.Text>
            Nombre de sucursal:
          </Card.Text>

          <Card.Text className="img-empresa">
            Logo:
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" style={{width:"80%",height:"30%"}} /> 
          </Card.Text>
          <Button variant="primary" style={{background:"#21232A",color:"white",padding:"0.3rem",border:"node",borderRadius:"0.4rem"}} onClick={()=>dispatch(onSeeDetails())} >Cerrar</Button>
        </Card.Body>
      </Card>
    </div>
  
  );
}
