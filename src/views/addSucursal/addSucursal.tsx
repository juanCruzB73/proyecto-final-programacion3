import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { onAddSucursal } from '../../redux/slices/sucursalesSlices';
import './addSucursal.css'
import { useForm } from '../../hooks/useForm';
import { useServices } from '../../hooks/useServices';
import { useEffect, useState} from 'react';
import { useSelect } from '../../hooks/useSelect';
import { SucursalService } from '../../services/SucursalService';
import { ICreateSucursal } from '../../types/dtos/sucursal/ICreateSucursal';
import { useValidations } from '../../hooks/useValidations';
import { UploadImage } from '../../components/UploadImage';
import { ProvinciaService } from '../../services/ProvinciaService';
import { setTableProvincia } from '../../redux/slices/provinciaSlice';
import { LocalidadService } from '../../services/LocalidadService';
import { setTableLocalidad } from '../../redux/slices/tablaLocalidadSlice';


interface IForm {
  nombre:string,
  horarioApertura:string,
  horarioCierre:string,
  latitud:string,
  longitud:string,
  esCasaMatriz:boolean,
  idEmpresa:string,
  logo:string,
  calle:string,
  nroCalle:string,
  cp:string,
  piso:string,
  nroDpto:string,
}

//initial value input fields
const initialValue:IForm={
  nombre: '',
  horarioApertura: "00:00:00",
  horarioCierre: "00:00:00",
  latitud:'',
  longitud:'',
  esCasaMatriz: false,
  idEmpresa:'',
  logo:'',
  calle:'',
  nroCalle:'',
  cp:'',
  piso:'',
  nroDpto:'',
}


interface ISelect{
  paisSelect:string;
  provinciaSelect:string;
  localidadSelect:string;
  empresaSelect:string;
  casaMatrizSelect:string
}



export const AddSucursal = () => {

  const dispatch=useDispatch<AppDispatch>()
  //URL para la api profe
  const sucursalService=new SucursalService("http://190.221.207.224:8090/sucursales/create")

  //URL para la API en docker
  //const sucursalService=new SucursalService("http://localhost:8090/sucursales/create")

  //peticiones http con hook
  //URL para la API profe
  const {loading,setLoading,getPaises}=useServices("http://190.221.207.224:8090/paises")
  const {getProvincia}=useServices(`http://190.221.207.224:8090/provincias`)
  const {getLocalidad}=useServices(`http://190.221.207.224:8090/localidades`)
  const {getSucursales}=useServices(`http://190.221.207.224:8090/sucursales`)

  //URL para la API en docker
  // const {loading,setLoading,getPaises}=useServices("http://localhost:8090/paises")
  // const {getProvincia}=useServices(`http://localhost:8090/provincias`)
  // const {getLocalidad}=useServices(`http://localhost:8090/localidades`)
  // const {getSucursales}=useServices(`http://localhost:8090/sucursales`)

  //datos redux
  const {paisTable}=useSelector((state:RootState)=>state.tablaPaises)
  const {provinciaTable}=useSelector((state:RootState)=>state.tablaProvincia)
  const {localidadTable}=useSelector((state:RootState)=>state.tablaLocalidad)
  const {dataTable}=useSelector((state:RootState)=>state.tablaEmpresa)

  //initial value select
  const selectInitialValue:ISelect={
    paisSelect:"",
    provinciaSelect:"",
    localidadSelect:"",
    empresaSelect:"",
    casaMatrizSelect:"si",
  }
  
  //selct fields
  const {paisSelect,provinciaSelect,localidadSelect,empresaSelect,casaMatrizSelect,handleSelectChange}=useSelect<ISelect>(selectInitialValue);


  //input fields
  const {nombre,horarioApertura,horarioCierre,latitud,longitud,calle,nroCalle,cp,piso,nroDpto,logo,onInputChange,onResetForm}=useForm<IForm>(initialValue)

  //validations
  const [wrongName,setWrongName]=useState(false);
  const [wronghorarioApertura,setWronghorarioApertura]=useState(false);
  const [wronghorarioCierre,setWronghorarioCierre]=useState(false);
  const [wronglatitud,setWronglatitud]=useState(false);
  const [wronglongitud,setWronglongitud]=useState(false);
  const [wrongcalle,setWrongcalle]=useState(false);  
  const [wrongnroCalle,setWrongnroCalle]=useState(false);
  const [wrongcp,setWrongcp]=useState(false);  
  const [wrongpiso,setWrongpiso]=useState(false);
  const [wrongnroDepto,setWrongnroDepto]=useState(false);
  
  const [isEmptyCondition,setIsEmptyCondition]=useState(false);
  const [containsLetterCondition,setcontainsLetterCondition]=useState(false);
  const [isTimeCondition,setisTimeCondition]=useState(false);
  const [conditionMessage,setconditionMessage]=useState('');

  const {containLetters,isEmpty,isTime}=useValidations();

  const [image, setImage] = useState<string | null>(null);
  
  //const {sucursalTable}=useSelector((state:RootState)=>state.tablaSucursal)
  useEffect(()=>{
    if(isEmptyCondition || containsLetterCondition || isTimeCondition){
      setWrongName(false);setWronghorarioApertura(false);setWronghorarioCierre(false);setWronglatitud(false);
      setWronglongitud(false);setWrongcalle(false);setWrongnroCalle(false);setWrongcp(false);setWrongpiso(false)
      setWrongnroDepto(false);setIsEmptyCondition(false);setisTimeCondition(false);setcontainsLetterCondition(false);
      
    }
  },
  [
    nombre,horarioApertura,horarioCierre,latitud,longitud,calle,nroCalle,cp,piso,
    nroDpto,paisSelect,provinciaSelect,localidadSelect,empresaSelect,casaMatrizSelect
  ])

  useEffect(()=>{
    getPaises();
    getProvincia();
    getLocalidad();
    
  },[])

  useEffect(()=>{
    const fetchData=async()=>{      
      if(!paisSelect)return
        let pais=findIdPais(paisSelect)
        if(!pais)return
        //URL para la API en Docker
        //const provinciaService=new ProvinciaService(`http://190.221.207.224:8090/provincias/findByPais/1`);   
        //URL para la API del profesor
        const provinciaService=new ProvinciaService(`http://190.221.207.224:8090/provincias/findByPais/1`);        
        await provinciaService.getAll().then(response=>{
          dispatch(setTableProvincia(response));
          setLoading(false)
      })
    }
    fetchData()
  },[paisSelect,paisTable])

  useEffect(()=>{
    const fetchData=async()=>{      
      if(!provinciaSelect)return
        let provincia=findProvinciaById(provinciaSelect)
        if(!provincia)return   
        //URL para la API en docker
        //const localidadService=new LocalidadService(`http://190.221.207.224:8090/localidades/findByProvincia/${provincia.id}`);
        //URL para la API del profesor
        const localidadService=new LocalidadService(`http://190.221.207.224:8090/localidades/findByProvincia/${provincia.id}`);
        await localidadService.getAll().then(response=>{
          dispatch(setTableLocalidad(response));
          setLoading(false)
      })
    }
    fetchData()
  },[provinciaSelect,provinciaTable])

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    
   const localidad=findIdLocalidadLocation(localidadSelect);
   const empresa=findIdEmpresa(empresaSelect)
   
    //if(!localidad || !empresa)return
    
    const data:ICreateSucursal={
      nombre:nombre,
      horarioApertura:horarioApertura,
      horarioCierre:horarioCierre,
      esCasaMatriz:casaMatrizSelect==="si"?true:false,
      latitud:parseInt(latitud),
      longitud:parseInt(longitud),
      domicilio:{
        calle:calle,
        numero:parseInt(nroCalle),
        cp:parseInt(cp),
        piso:parseInt(piso),
        nroDpto:parseInt(nroDpto),
        idLocalidad:localidad?.id ?? localidadTable[0].id,
      },
      idEmpresa:empresa?.id ?? dataTable[0].id,
      logo:image,
    }    
    //validaciones para inputs vacios
    if(
      isEmpty(nombre) || isEmpty(horarioApertura) || isEmpty(horarioCierre)
      || isEmpty(latitud) || isEmpty(longitud) || isEmpty(calle) || isEmpty(nroCalle)
      || isEmpty(nroDpto) || isEmpty(cp) || isEmpty(piso)
    ){
      setIsEmptyCondition(true);
      setconditionMessage("algun campo esta vacio");
      isEmpty(nombre) && setWrongName(true);
      isEmpty(horarioApertura) && setWronghorarioApertura(true);
      isEmpty(horarioCierre) && setWronghorarioCierre(true);
      isEmpty(latitud) && setWronglatitud(true);
      isEmpty(longitud) && setWronglongitud(true);
      isEmpty(calle) && setWrongcalle(true);
      isEmpty(nroCalle) && setWrongnroCalle(true);
      isEmpty(nroDpto)&&setWrongnroDepto(true);
      isEmpty(cp)&&setWrongcp(true);
      isEmpty(piso)&&setWrongpiso(true);
    //validaciones para inputs con letras donde solo van numeros
    }else if(
      containLetters(latitud) || containLetters(longitud) || containLetters(nroCalle)
      || containLetters(cp) || containLetters(piso) || containLetters(nroDpto)
      || containLetters(piso)
    ){
      setcontainsLetterCondition(true);
      setconditionMessage("algunos campos solo deben contener numeros");
      containLetters(latitud)&&setWronglatitud(true);
      containLetters(longitud)&&setWronglongitud(true);
      containLetters(nroCalle)&&setWrongnroCalle(true);
      containLetters(cp)&&setWrongcp(true);
      containLetters(piso)&&setWrongpiso(true);
      containLetters(nroDpto)&&setWrongnroDepto(true);
    }else if(!isTime(horarioApertura) || !isTime(horarioCierre)){
      setisTimeCondition(true);
      setconditionMessage("use un horario correcto HH:MM")
      isTime(horarioApertura) && setWronghorarioApertura(true);
      isTime(horarioCierre) && setWronghorarioCierre(true);
    }else{
      try{
        await sucursalService.post(data)
        getSucursales()
        dispatch(onAddSucursal())
    }catch (error) {
      console.error("Error adding empresa:", error);
  }
    }
  }
  const findIdEmpresa=(nombre:string)=>{
    let result=dataTable.filter(e=>e.nombre==nombre)
    if(result){
      return result[0];
    }else{
      console.log("no hay resultado");
    }
  }

    const findIdPais=(nombre:string)=>{
    let result=paisTable.filter(e=>e.nombre==nombre)
    if(result){
      return result[0];
    }else{
      console.log("no hay provincias");
      }
    }
    const findProvinciaById=(nombre:string)=>{
      let result=provinciaTable.filter(e=>e.nombre==nombre)
      if(result){
        return result[0];
      }else{
        console.log("no hay provincias");
        }
    }
    const findIdLocalidadLocation=(nombre:string)=>{
    let result=localidadTable.filter(e=>e.nombre==nombre)
    if(result){
      return result[0];
    }else{
      console.log("no hay resultado");
    }
    
  }

  return (
    <div className='containerSucursalFather'>
      <div className="addEditSucursalContainer"> 
        <h1>Crear una sucursal</h1> 
        <Form className="form-container" onSubmit={handleSubmit}>
            <div className={isEmptyCondition||containsLetterCondition||isTimeCondition ? 'errorMessagge' : "noErrors"}>
              <span>{conditionMessage}</span>
            </div>

              <div className='information'>

                  <div className='bloqueInfomation'>

                    <Form.Group className='form-element' as={Col} >
                      <Form.Control id={wrongName?"isWrong":"isNotWrong"} type="text" name='nombre' value={nombre} onChange={onInputChange} placeholder="Ingrese sucursal" />
                    </Form.Group>

                    <Form.Group className='form-element'as={Col}>
                      <Form.Control id={wronghorarioApertura?"isWrong":"isNotWrong"} type="text" name='horarioApertura' value={horarioApertura} onChange={onInputChange} placeholder="Ingresar hora de apertura" />
                    </Form.Group>

                    <Form.Group className='form-element' as={Col}>
                      <Form.Control id={wronghorarioCierre?"isWrong":"isNotWrong"} type="text" name='horarioCierre' value={horarioCierre} onChange={onInputChange} placeholder="Ingresar hora de cierre" />
                    </Form.Group>

                    <Form.Label>Seleccione Empresa</Form.Label>
                    <Form.Select className="isNotWrongSelect" id="empresa-select" name='empresaSelect' value={empresaSelect} onChange={handleSelectChange}>

                          {dataTable.map((pais)=>(
                            <option key={pais.id} value={pais.nombre}>{pais.nombre}</option>
                          ))}

                    </Form.Select>

                    <Form.Label>Es casa matriz?</Form.Label>
                    <Form.Select id="empresa-select" name='casaMatrizSelect' value={casaMatrizSelect} onChange={handleSelectChange}>
                            <option value={"si"}>Si</option>
                            <option value={"no"}>No</option>
                    </Form.Select>
                    <div className='image-container'>
                      <h1>Ingrese su imagen</h1>
                      <UploadImage image={image} setImage={setImage} />
                    </div>

                </div>

                  <div className='bloqueInfomation'>

                    <Form.Group className='form-element' as={Col}>
                      <Form.Label>Seleccione Pais</Form.Label>
                      <Form.Select id="pais-select" name='paisSelect' value={paisSelect} onChange={handleSelectChange}>

                          {paisTable.map((pais)=>(
                            <option key={pais.id} value={pais.nombre}>{pais.nombre}</option>
                          ))}

                      </Form.Select>
                    </Form.Group>
                    <Form.Group className='form-element' as={Col}>
                      <Form.Label>Seleccione Provincia</Form.Label>
                      <Form.Select disabled={provinciaTable.length === 0} id="provincia-select" name='provinciaSelect' value={provinciaSelect} onChange={handleSelectChange}>

                          {Array.isArray(provinciaTable) && provinciaTable.map((provincia)=>(
                            <option key={provincia.id} value={provincia.nombre}>{provincia.nombre}</option>
                          ))}

                      </Form.Select>
                    </Form.Group>
                    <Form.Group className='form-element' as={Col}>
                    <Form.Label>Seleccione localidad</Form.Label>
                      <Form.Select disabled={localidadTable.length === 0} className="isNotWrongSelect" id="localidad-select" name='localidadSelect' value={localidadSelect} onChange={handleSelectChange}>

                          { Array.isArray(localidadTable) && localidadTable.map((localidad)=>(
                            <option key={localidad.id} value={localidad.nombre}>{localidad.nombre}</option>
                          ))}

                      </Form.Select>
                    </Form.Group>
                    <Form.Group className='form-element' as={Col}>
                      <Form.Control id={wrongcalle?"isWrong":"isNotWrong"} type="text" name='calle' value={calle} onChange={onInputChange} placeholder="Ingresar calle" />
                    </Form.Group>
                    <Form.Group className='form-element' as={Col}>
                      <Form.Control id={wrongnroCalle?"isWrong":"isNotWrong"} type="text" name='nroCalle' value={nroCalle} onChange={onInputChange} placeholder="Ingresar numero de calle" />
                    </Form.Group>
                    <Form.Group className='form-element' as={Col}>
                      <Form.Control id={wrongcp?"isWrong":"isNotWrong"} type="text" name='cp' value={cp} onChange={onInputChange} placeholder="Ingresar cp" />
                    </Form.Group>
                    <Form.Group className='form-element' as={Col}>
                      <Form.Control id={wrongpiso?"isWrong":"isNotWrong"} type="text" name='piso' value={piso} onChange={onInputChange} placeholder="Ingresar del piso del piso" />
                    </Form.Group>
                    <Form.Group className='form-element' as={Col}>
                      <Form.Control id={wrongnroDepto?"isWrong":"isNotWrong"} type="text" name='nroDpto' value={nroDpto} onChange={onInputChange} placeholder="Ingresar numero departamento" />
                    </Form.Group>
                    <Form.Group className='form-element' as={Col}>
                      <Form.Control id={wronglatitud?"isWrong":"isNotWrong"} type="text"  name='latitud' value={latitud} onChange={onInputChange} placeholder="latitud" />
                    </Form.Group>
                    <Form.Group className='form-element' as={Col}>
                      <Form.Control type="text" id={wronglongitud?"isWrong":"isNotWrong"} name='longitud' value={longitud} onChange={onInputChange} placeholder="longitud" />
                    </Form.Group>
                  </div>
              </div>
              <div className="button">
                  <Button variant="primary" type='submit' style={{padding:"0.4rem",border:"none",borderRadius:"0.4rem",background:"#32cd32"  }}>{/* type="submit" */}
                    Confirmar
                  </Button>
                  <Button onClick={()=>dispatch(onAddSucursal())}  variant="primary"  style={{padding:"0.4rem",border:"none",borderRadius:"0.4rem",background:"#ba3939"  }}>
                    Cancelar
                  </Button>
                </div>
          </Form>
        </div>
      </div>
  )
}