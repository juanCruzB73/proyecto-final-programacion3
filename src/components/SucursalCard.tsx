import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import { ISucursal } from '../types/dtos/sucursal/ISucursal';


interface Props{
    element:ISucursal;
}

export const SucursalCard:FC<Props> = ({element}) => {

    const dispatch=useDispatch<AppDispatch>()

  return (
    <div className='sucursal-card'>
         <Card style={{width: '90%', maxHeight:"100%"}}>
            <Card.Img variant="top" src={element.logo} style={{width:"100%",maxHeight:"30vh"}}/>
            <Card.Body style={{display:"flex",flexDirection: "column",justifyContent:"center",alignItems:"center",maxHeight:"35%"}} >
                <Card.Title style={{color:"black"}}>{element.nombre}</Card.Title>
                <Button variant="primary" style={{ border:"none",borderRadius:"0.2rem",width:"90%" ,backgroundColor:" #21232A",color:"white",padding:"0.3rem",margin:"8px 0px"}} >Ver mas</Button>
                <Button variant="primary" style={{ border:"none",borderRadius:"0.2rem",width:"90%" ,backgroundColor:" #21232A",color:"white",padding:"0.3rem",margin:"8px 0px"}} >Ver empresa</Button>
                <Button variant="primary" style={{ border:"none",borderRadius:"0.2rem",width:"90%" ,backgroundColor:" #21232A",color:"white",padding:"0.3rem",margin:"8px 0px"}} >Editar</Button>
            </Card.Body>
        </Card>
    </div>
     );
}
