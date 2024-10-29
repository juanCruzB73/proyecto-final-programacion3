import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { AppDispatch, RootState } from '../../redux/store/store'; 
import { useDispatch, useSelector } from "react-redux"
import { onAddCompany } from '../../redux/slices/companySlice';
import { useForm } from '../../hooks/useForm';
import { EmpresaService } from '../../services/EmpresaService';
import { useServices } from '../../hooks/useServices';
import './addEmpresa.css'



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
const full_api=api_url+"/empresas"
const empresaService=new EmpresaService(full_api);


export const AddEmpresa=()=> {

  const {loading,setLoading,getEmpresas}=useServices(full_api)
  
  const dispatch=useDispatch<AppDispatch>()
  const {nombre,razonSocial,cuit,onInputChange,onResetForm}=useForm<IForm>(initialValue)

  const {dataTable}=useSelector((state:RootState)=>state.tablaEmpresa)

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();

    const maxId = dataTable.reduce((max, item) => (item.id > max ? item.id : max), 0);

    const newId = maxId + 1;
    const data={nombre:nombre,razonSocial:razonSocial,cuit:cuit,logo:null}

    //const newData = { ...data, id: newId };
    
    
    try{
        await empresaService.post(data)
        setLoading(true)
        getEmpresas()
        dispatch(onAddCompany())

    }catch (error) {
      console.error("Error adding empresa:", error);
  }
  }

  return (
      <div className="addEditEmpresaContainer">
      <h1>Crear una empresa</h1>  
      <Form className="form-container" onSubmit={handleSubmit}> 

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
                <Button variant="primary" type='submit'  style={{padding:"0.4rem",border:"none",borderRadius:"0.4rem",background:"#32cd32"  }}>
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