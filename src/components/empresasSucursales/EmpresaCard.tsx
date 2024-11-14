import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AppDispatch } from "../../redux/store/store";
import { onSeeDetails,onEditCompany } from "../../redux/slices/companySlice";
import { setElementActive } from '../../redux/slices/tablaEmpresaSlice'; 
import { useDispatch,  } from "react-redux";
import { IEmpresa } from '../../types/dtos/empresa/IEmpresa';

  
interface Props{
    element:IEmpresa
}

export const EmpresaCard:FC<Props> = ({element}) => {

  const dispatch=useDispatch<AppDispatch>()
  
  return (

    <div  className='empresa-card'>

    <Card style={{ width: '18rem' }}>
        <Card.Body style={{display: "flex",flexDirection: "column",justifyContent:"center",alignItems:"center"}}>
          <Card.Title style={{cursor: "pointer"}} onClick={()=>dispatch(setElementActive({element:element}))}>{element.nombre}</Card.Title>
          <div className='card-buttons-empresa'>
          <Button className='button-cards' onClick={()=>{
            dispatch(onSeeDetails())
            dispatch(setElementActive({element:element}))
          }} variant="primary"><i style={{fontSize:"1.3rem"}} className="bi bi-eye"></i></Button>
          <Button className='button-cards' onClick={()=>{
            dispatch(onEditCompany())
            dispatch(setElementActive({element:element}))
            }} variant="primary"><i style={{fontSize:"1.3rem"}}className="bi bi-pencil-square"></i></Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}