import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { AppDispatch } from '../../redux/store/store'; 
import { useDispatch } from "react-redux"
import { onAddCompany } from '../../redux/slices/companySlice';
import './addEmpresa.css'
import { FormEvent } from 'react';
import { useForm } from '../../hooks/useForm';
import { EmpresaService } from '../../services/EmpresaService';
import { IEmpresa } from '../../types/dtos/empresa/IEmpresa';

interface IForm {
  nombre:string;
  razonSocial:string;
  cuit:number;
}


const initialValue:IForm={
  nombre:'',
  razonSocial:'',
  cuit:0,
}

const api_url = "http://190.221.207.224:8090"
const empresaService=new EmpresaService(api_url+"/empresas");

export const AddEmpresa=()=> {
  
  const dispatch=useDispatch<AppDispatch>()
  const {nombre,razonSocial,cuit,onInputChange,onResetForm}=useForm<IForm>(initialValue)
  
  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    try{
      values={
        nombre:nombre,
        razonSocial:razonSocial,
        cuit:Number(cuit),
      }
      await empresaService.post(values)
    }catch (error) {
      console.error("Error adding empresa:", error);
  }
  }

  return (
      <div className="addEditEmpresaContainer">
      <h1>Crear una empresa</h1>  
      <Form className="form-container"> 

              <Form.Group as={Col} >
                  <Form.Control name='nombre' value={nombre} onChange={onInputChange} type="text" placeholder="Ingrese empresa" />
              </Form.Group>
              
              <Form.Group as={Col}>
                <Form.Control name='razonSocial' value={razonSocial} onChange={onInputChange} type="text" placeholder="Ingrese razon social" />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" >
                <Form.Control name='cuit' value={cuit} onChange={onInputChange} placeholder="Ingrese CUIT" />
              </Form.Group>

              <Form.Group as={Col} className="mb-3">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control name='logo' type="file" />
              </Form.Group>

              <div className="buttonEmpresa">
                <Button variant="primary" style={{padding:"0.4rem",border:"none",borderRadius:"0.4rem",background:"#32cd32"  }}>{/* type="submit" */}
                  Confirmar
                </Button>
                <Button onClick={()=>dispatch(onAddCompany())}  variant="primary"  style={{padding:"0.4rem",border:"none",borderRadius:"0.4rem",background:"#ba3939"  }}>
                  Cancelar
                </Button>
              </div>
        </Form>
      </div> 
  
  )
}