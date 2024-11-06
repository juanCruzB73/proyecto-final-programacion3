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
import { useEffect, useState } from 'react';
import { useValidations } from '../../hooks/useValidations';
import { UploadImage } from '../../components/UploadImage';


const api_url = "http://190.221.207.224:8090"
const full_api=api_url+"/empresas"
const empresaService=new EmpresaService(full_api);

interface IForm {
  nombre:string;
  razonSocial:string;
  cuit:number;
  logo:string
}

let initialValue:IForm={
  nombre:'',
  razonSocial:'',
  cuit:0,
  logo:""
}
export const EditEmpresa=()=> {
  
  const {loading,setLoading,getEmpresas}=useServices(full_api)
  const [image, setImage] = useState<string | null>(null);
  
  const dispatch=useDispatch<AppDispatch>()
  
  const {elementActive}=useSelector((state:RootState)=>state.tablaEmpresa)

  let logoValue=""

  if(elementActive?.logo){
    logoValue=elementActive.logo
  }

  if(elementActive){
    initialValue={
      nombre:elementActive.nombre,
      razonSocial:elementActive.razonSocial,
      cuit:elementActive.cuit,
      logo:logoValue
    }
  }

  const {nombre,razonSocial,cuit,logo,onInputChange,onResetForm}=useForm<IForm>(initialValue)

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
    const data={...elementActive,nombre:nombre,razonSocial:razonSocial,cuit:cuit,logo:image}
    const newData={...data,id:elementActive?.id}

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
        if (!elementActive) return;
        await empresaService.put(elementActive.id,newData)
        console.log("fetcch");
        
        setLoading(true)
        getEmpresas()
        dispatch(onEditCompany())
      }catch (error) {
        console.error("Error adding empresa:", error);
    }}
  }

  return (
      <div className="addEditEmpresaContainer">
      <h1>Editar empresa</h1>  
      <Form className="form-container" onSubmit={handleSubmit}> 
              <div className={isEmptyCondition||containsLetterCondition ? 'errorMessagge' : "noErrors"}>
                <span>{conditionMessage}</span>
              </div>
              <Form.Group as={Col} >
                  <Form.Control id={wrongName?"isWrong":"isNotWrong"} type="text" name='nombre' onChange={onInputChange} value={nombre} placeholder="Ingrese empresa" />
              </Form.Group>
              
              <Form.Group as={Col}>
                <Form.Control id={wrongRazonSocial?"isWrong":"isNotWrong"} type="text" name='razonSocial' value={razonSocial} onChange={onInputChange} placeholder="Ingrese razon social" />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" >
                <Form.Control id={wrongCuit?"isWrong":"isNotWrong"} name='cuit' value={cuit} onChange={onInputChange} placeholder="Ingrese CUIT" />
              </Form.Group>

              <h1>Ingrese su imagen</h1>

              <UploadImage image={image} setImage={setImage} />

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