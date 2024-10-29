import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import { ISucursal } from '../types/dtos/sucursal/ISucursal';
import { SucursalDetails } from '../views/sucursalDetails/SucursalDetails'; 
import { EditSucursal } from '../views/editSucursal/EditSucursal';
import { onEditSucursal, onSeeDetailsSucursal } from '../redux/slices/sucursalesSlices';
import { AddSucursal } from '../views/addSucursal/AddSucursal';
import { setElementActive } from '../redux/slices/tablaSucursalSlice';


interface Props{
    element:ISucursal;
}

export const SucursalCard:FC<Props> = ({element}) => {

    const {addSucursal,seeMore,edit}=useSelector((state:RootState)=>state.sucursal)
    
    const dispatch=useDispatch<AppDispatch>()

  return (
    <div className='sucursal-card'>
            {seeMore && <SucursalDetails/>}
            {edit && <EditSucursal/>}
            {addSucursal&&<AddSucursal/>}
            <Card style={{width: '90%', maxHeight:"100%"}}>
                <Card style={{width: '90%', maxHeight:"100%"}}>
                <Card.Img variant="top" src={element.logo} style={{width:"100%",maxHeight:"30vh"}}/>
                <Card.Body style={{display:"flex",flexDirection: "column",justifyContent:"center",alignItems:"center",maxHeight:"35%"}} >
                    <Card.Title style={{color:"black"}}>{element.nombre}</Card.Title>
                    <Button  onClick={()=>{
                        dispatch(onSeeDetailsSucursal())
                        dispatch(setElementActive({element:element}))
                        }} variant="primary" style={{ border:"none",borderRadius:"0.2rem",width:"90%" ,backgroundColor:" #21232A",color:"white",padding:"0.3rem",margin:"8px 0px"}} >Ver mas</Button>
                    <Button  onClick={()=>{
                        dispatch(onEditSucursal())
                        dispatch(setElementActive({element:element}))
                        }} variant="primary" style={{ border:"none",borderRadius:"0.2rem",width:"90%" ,backgroundColor:" #21232A",color:"white",padding:"0.3rem",margin:"8px 0px"}} >Editar</Button>
                    <Button  variant="primary" style={{ border:"none",borderRadius:"0.2rem",width:"90%" ,backgroundColor:" #21232A",color:"white",padding:"0.3rem",margin:"8px 0px"}} >Borrar</Button>
                </Card.Body>
        </Card>
        </Card>
    </div>
    );
}
