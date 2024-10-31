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
import { useEffect, useState } from 'react';
import { useValidations } from '../../hooks/useValidations';



interface IForm {
  nombre:string;
  razonSocial:string;
  cuit:number;
  logo:string
}


const initialValue:IForm={
  nombre:'',
  razonSocial:'',
  cuit:0,
  logo:"",

}

const api_url = "http://190.221.207.224:8090"
const full_api=api_url+"/empresas"
const empresaService=new EmpresaService(full_api);


export const AddEmpresa=()=> {

  const {loading,setLoading,getEmpresas}=useServices(full_api)
  
  const dispatch=useDispatch<AppDispatch>()
  
  const {nombre,razonSocial,cuit,logo,onInputChange,onResetForm}=useForm<IForm>(initialValue)
  

  const {dataTable}=useSelector((state:RootState)=>state.tablaEmpresa)

  //validations
  const [wrongName,setWrongName]=useState(false);
  const [wrongRazonSocial,setWrongRazonSocial]=useState(false);
  const [wrongCuit,setWrongCuit]=useState(false);
  const [isEmptyCondition,setIsEmptyCondition]=useState(false);
  const [containsLetterCondition,setcontainsLetterCondition]=useState(false);
  const [conditionMessage,setconditionMessage]=useState('');

  const {containLetters,isEmpty}=useValidations();

    useEffect(()=>{
      if(isEmptyCondition||containsLetterCondition){
      setWrongName(false)
      setWrongRazonSocial(false)
      setWrongCuit(false)
      setIsEmptyCondition(false)
      }
    },[nombre,razonSocial,cuit])
    

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    const data={
      nombre:nombre,
      razonSocial:razonSocial,
      cuit:cuit,
      logo:logo
    }
    if(isEmpty(nombre) || isEmpty(razonSocial) || isEmpty(cuit.toString())){
      setIsEmptyCondition(true)
      setconditionMessage("algun campo esta vacio")
      isEmpty(nombre)&&setWrongName(true)
      isEmpty(razonSocial)&&setWrongRazonSocial(true)
      isEmpty(cuit.toString())&&setWrongCuit(true)
    }else if(containLetters(cuit.toString())){
      setcontainsLetterCondition(true)
      setconditionMessage("algunos campos solo deben contener numeros")
      containLetters(cuit.toString())&&setWrongCuit(true)
    }else{
      try{
        await empresaService.post(data)
        setLoading(true)
        getEmpresas()
        dispatch(onAddCompany())

      }catch (error) {
        console.error("Error adding empresa:", error);
      }
    }
  }
//
  return (
      <div className="addEditEmpresaContainer">
      <h1>Crear una empresa</h1>
      <Form className="form-container" onSubmit={handleSubmit}>
              <div className={isEmptyCondition||containsLetterCondition ? 'errorMessagge' : "noErrors"}>
                <span>{conditionMessage}</span>
              </div>
              <Form.Group as={Col} >
                  <Form.Control id={wrongName?"isWrong":"isNotWrong"} name='nombre' value={nombre} onChange={onInputChange} type="text" placeholder="Ingrese empresa" />
              </Form.Group>
              
              <Form.Group as={Col}>
                <Form.Control id={wrongRazonSocial?"isWrong":"isNotWrong"} name='razonSocial' value={razonSocial} onChange={onInputChange} type="text" placeholder="Ingrese razon social" />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" >
                <Form.Control id={wrongCuit?"isWrong":"isNotWrong"} name='cuit' value={cuit} onChange={onInputChange} placeholder="Ingrese CUIT" />
              </Form.Group>

              <Form.Group as={Col} className="mb-3">
                <Form.Label>Agregar Logo</Form.Label>
                <Form.Control name='logo' value={logo} onChange={onInputChange} type="text" />
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