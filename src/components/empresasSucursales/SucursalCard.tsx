import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { AppDispatch  } from '../../redux/store/store';
import { ISucursal } from '../../types/dtos/sucursal/ISucursal';

import { oneditSucursalSucursal, onSeeDetailsSucursal } from '../../redux/slices/sucursalesSlices';

import { setElementActive } from '../../redux/slices/tablaSucursalSlice';
import { Link } from 'react-router-dom';


interface Props{
    element:ISucursal;
}

export const SucursalCard:FC<Props> = ({element}) => {

    
    
    const dispatch=useDispatch<AppDispatch>()

    return (
    <div className='sucursal-card' style={{width:"20vw", height:"45vh"}}>
            
            <Card style={{width: '90%', maxHeight:"100%"}}>
                <Card.Body style={{display:"flex",justifyContent:"space-around",flexDirection:"column"}} >
                    <div style={{height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }} >
                        <div className='.info-sucursal-cont-img' style={{
            width: "16vw",
            height: "20vh",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
                            <Card.Img variant="top" className='info-sucursal-cont-img' src={element.logo} style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: ".4rem",
            }}/>
                        </div>
                        <Card.Title style={{color:"black",marginBottom:"20px"}}>{element.nombre}</Card.Title>
                    </div>
                    <div className='card-buttons'>
                        <Button className='button-cards' onClick={()=>{
                            dispatch(onSeeDetailsSucursal())
                            dispatch(setElementActive({element:element}))
                            }} variant="primary" ><i style={{fontSize:"1.3rem"}} className="bi bi-eye"></i></Button>
                        <Button className='button-cards' onClick={()=>{
                            dispatch(oneditSucursalSucursal())
                            dispatch(setElementActive({element:element}))
                            }} variant="primary" ><i style={{fontSize:"1.3rem"}}className="bi bi-pencil-square"></i></Button>
                            <Button className='button-cards' onClick={()=>{
                                dispatch(setElementActive({element:element}))
                                }} variant="primary" >
                            <Link to={'/categorias'} style={{color:"white"}}><i style={{fontSize:"1.3rem"}}className="bi bi-shop"></i></Link></Button>                    
                    </div> 
                </Card.Body>
        
        </Card>
    </div>
    );
}
