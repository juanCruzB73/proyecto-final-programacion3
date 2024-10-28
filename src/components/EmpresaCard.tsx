import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AppDispatch, RootState } from "../redux/store/store";
import { onSeeDetails,onEditCompany } from "../redux/slices/companySlice";
import { setElementActive,removeElementActive } from '../redux/slices/tablaEmpresaSlice';
import { EmpresaDetails } from '../views/empresaDetails/EmpresaDetails';
import { useDispatch, useSelector } from "react-redux";
import { IEmpresa } from '../types/dtos/empresa/IEmpresa';

interface Props{
    element:IEmpresa
}

export const EmpresaCard:FC<Props> = ({element}) => {

  const {seeMore,edit}=useSelector((state:RootState)=>state.company) 
  const dispatch=useDispatch<AppDispatch>()
  
  return (

    <div  className='empresa-card'>
      {seeMore&&<EmpresaDetails/>}
    <Card style={{ width: '18rem' }}>
        <Card.Body style={{display: "flex",flexDirection: "column",justifyContent:"center",alignItems:"center"}}>
          <Card.Title>{element.nombre}</Card.Title>
          <Button onClick={()=>{
            dispatch(onSeeDetails())
            dispatch(setElementActive({element:element}))
          }} variant="primary" style={{ border:"none",borderRadius:"0.2rem",width:"90%" ,backgroundColor:" #21232A",color:"white",padding:"0.3rem",margin:"8px 0px"}}>Ver Más</Button>
          <Button onClick={()=>{
            dispatch(onEditCompany())
            dispatch(setElementActive({element:element}))
            }} variant="primary" style={{ border:"none",borderRadius:"0.2rem",width:"90%" ,backgroundColor:" #21232A",color:"white",padding:"0.3rem"}}>Editar</Button>
        </Card.Body>
      </Card>
    </div>
  );
}