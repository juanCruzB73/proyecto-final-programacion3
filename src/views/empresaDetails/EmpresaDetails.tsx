//view para detalles de empresa
import Card from 'react-bootstrap/Card';
import { AppDispatch, RootState } from '../../redux/store/store';
import { onSeeDetails } from '../../redux/slices/companySlice';
import { useDispatch, useSelector } from "react-redux"

import './empresaDetail.css'
import { Button } from 'react-bootstrap';


export const EmpresaDetails = () => {
  
  const dispatch=useDispatch<AppDispatch>()
  const {elementActive}=useSelector((state:RootState)=>state.tablaEmpresa)

  return (
    <div className="empresa-detail">
    
       <Card className="details-container" >
          
          <Card.Body >
            <Card.Title>DATOS</Card.Title>
          
          <Card.Text>
            Nombre de sucursal: {elementActive?.nombre}
          </Card.Text>

          <Card.Text>
            cuit: {elementActive?.cuit}
          </Card.Text>

          <Card.Text>
            Razon social: {elementActive?.razonSocial}
          </Card.Text>

          <Card.Text className="img-empresa" style={{width:"80%",height:"40%"}}>
            {elementActive.logo!==null && <Card.Img variant="top" src={elementActive?.logo} style={{width:"100%",height:"100%"}} />} 
          </Card.Text>
          <Button variant="primary" style={{background:"#21232A",color:"white",padding:"0.3rem",border:"node",borderRadius:"0.4rem"}} onClick={()=>dispatch(onSeeDetails())} >Cerrar</Button>
        </Card.Body>
      </Card>
    </div>
  
  );
}
