import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


interface Props{
    name:string;
}

export const SucursalCard:FC<Props> = ({name}) => {
  return (
    <div className='sucursal-card'>
         <Card style={{width: '90%', maxHeight:"100%"}}>
            <Card.Img variant="top" src="holder.js/100px180" style={{width:"100%",maxHeight:"30vh"}}/>
            <Card.Body style={{display:"flex",flexDirection: "column",justifyContent:"center",alignItems:"center",maxHeight:"35%"}} >
                <Card.Title style={{color:"black"}}>{name}</Card.Title>
                <Button variant="primary" style={{ border:"none",borderRadius:"0.2rem",width:"90%" ,backgroundColor:" #21232A",color:"white",padding:"0.3rem",margin:"8px 0px"}} >Ver mas</Button>
                <Button variant="primary" style={{ border:"none",borderRadius:"0.2rem",width:"90%" ,backgroundColor:" #21232A",color:"white",padding:"0.3rem",margin:"8px 0px"}} >Ver empresa</Button>
                <Button variant="primary" style={{ border:"none",borderRadius:"0.2rem",width:"90%" ,backgroundColor:" #21232A",color:"white",padding:"0.3rem",margin:"8px 0px"}} >Editar</Button>
            </Card.Body>
        </Card>
    </div>
     );
}
