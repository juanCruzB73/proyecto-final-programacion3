import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { AppDispatch } from '../../redux/store/store'; 
import { useDispatch } from "react-redux"
import { onAddCompany } from '../../redux/slices/companySlice';
import './addEmpresa.css'
import { FormEvent } from 'react';



export const AddEmpresa=()=> {
  
  const dispatch=useDispatch<AppDispatch>()


  return (
      <div className="addEditEmpresaContainer">
      <h1>Crear una empresa</h1>  
      <Form className="form-container"> 

              <Form.Group as={Col} >
                  <Form.Control type="text" placeholder="Ingrese empresa" />
              </Form.Group>
              
              <Form.Group as={Col}>
                <Form.Control type="text" placeholder="Ingrese razon social" />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" >
                <Form.Control placeholder="Ingrese CUIT" />
              </Form.Group>

              <Form.Group as={Col} className="mb-3">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control type="file" />
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