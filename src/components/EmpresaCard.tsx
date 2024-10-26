import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AppDispatch } from "../redux/store/store"
import { onSeeDetails } from "../redux/slices/companySlice"
import { useDispatch } from "react-redux"

interface Props{
    name:string;
}

export const EmpresaCard:FC<Props> = ({name}) => {
  
  const dispatch=useDispatch<AppDispatch>()
  
  return (
    <div  className='empresa-card'>
    <Card style={{ width: '18rem' }}>
        <Card.Body style={{display: "flex",flexDirection: "column",justifyContent:"center",alignItems:"center"}}>
          <Card.Title>{name}</Card.Title>
          <Button onClick={()=>dispatch(onSeeDetails())} variant="primary" style={{ border:"none",borderRadius:"0.2rem",width:"90%" ,backgroundColor:" #21232A",color:"white",padding:"0.3rem",margin:"8px 0px"}}>Ver Más</Button>
          <Button variant="primary" style={{ border:"none",borderRadius:"0.2rem",width:"90%" ,backgroundColor:" #21232A",color:"white",padding:"0.3rem"}}>Editar</Button>
        </Card.Body>
      </Card>
    </div>
  );
}