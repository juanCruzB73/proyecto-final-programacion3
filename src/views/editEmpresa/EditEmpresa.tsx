import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { AppDispatch, RootState } from '../../redux/store/store'; 
import { useDispatch, useSelector } from "react-redux"
import { onEditCompany } from '../../redux/slices/companySlice';
import './editEmpresa.css'
import { useServices } from '../../hooks/useServices';
import { useForm } from '../../hooks/useForm';
import { EmpresaService } from '../../services/EmpresaService';


const api_url = "http://190.221.207.224:8090"
const full_api=api_url+"/empresas"
const empresaService=new EmpresaService(full_api);

interface IForm {
  nombre:string;
  razonSocial:string;
  cuit:number;
}
let initialValue:IForm={
  nombre:'',
  razonSocial:'',
  cuit:0,
}
export const EditEmpresa=()=> {
  
  const {loading,setLoading,getEmpresas}=useServices(full_api)
  
  const dispatch=useDispatch<AppDispatch>()
  
  const {elementActive}=useSelector((state:RootState)=>state.tablaEmpresa)

  if(elementActive){
    initialValue={
      nombre:elementActive.nombre,
      razonSocial:elementActive.razonSocial,
      cuit:elementActive.cuit,
    }
  }

  const {nombre,razonSocial,cuit,onInputChange,onResetForm}=useForm<IForm>(initialValue)

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    const data={...elementActive,nombre:nombre,razonSocial:razonSocial,cuit:cuit,logo:elementActive?.logo}
    const newData={...data,id:elementActive?.id}
    try{
      if (!elementActive) return;
      await empresaService.put(elementActive.id,newData)
      setLoading(true)
      getEmpresas()
      dispatch(onEditCompany())

  }catch (error) {
    console.error("Error adding empresa:", error);
  }
  }

  return (
      <div className="addEditEmpresaContainer">
      <h1>Editar empresa</h1>  
      <Form className="form-container" onSubmit={handleSubmit}> 

              <Form.Group as={Col} >
                  <Form.Control type="text" name='nombre' onChange={onInputChange} value={nombre} placeholder="Ingrese empresa" />
              </Form.Group>
              
              <Form.Group as={Col}>
                <Form.Control type="text" name='razonSocial' value={razonSocial} onChange={onInputChange} placeholder="Ingrese razon social" />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" >
                <Form.Control name='cuit' value={cuit} onChange={onInputChange} placeholder="Ingrese CUIT" />
              </Form.Group>

              <Form.Group as={Col} className="mb-3">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control type="file" />
              </Form.Group>

              <div className="buttonEmpresa">
                <Button variant="primary" type='submit' style={{padding:"0.4rem",border:"none",borderRadius:"0.4rem",background:"#32cd32"  }}>
                  Confirmar
                </Button>
                <Button onClick={()=>dispatch(onEditCompany())}  variant="primary"  style={{padding:"0.4rem",border:"none",borderRadius:"0.4rem",background:"#ba3939"  }}>
                  Cancelar
                </Button>
              </div>
        </Form>
      </div> 
  
  )
}