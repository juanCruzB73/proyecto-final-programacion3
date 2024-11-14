import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { oneditSucursalSucursal } from '../../redux/slices/sucursalesSlices';
import './editSucursal.css'
import { SucursalService } from '../../services/SucursalService';
import { useForm } from '../../hooks/useForm';
import { useServices } from '../../hooks/useServices';
import { useEffect, useState } from 'react';
import { useSelect } from '../../hooks/useSelect';
import { IUpdateSucursal } from '../../types/dtos/sucursal/IUpdateSucursal';
import { useValidations } from '../../hooks/useValidations';
import { UploadImage } from '../../components/UploadImage';


interface IForm {
    nombre:string,
    horarioApertura:string,
    horarioCierre:string,
    latitud:number,
    longitud:number,
    esCasaMatriz:boolean,
    idEmpresa:number,
    logo?:any,
    calle:string,
    nroCalle:number,
    cp:number,
    piso:number,
    nroDpto:number,
  }
  
  interface ISelect{
    paisSelect:string;
    provinciaSelect:string;
    localidadSelect:string;
    empresaSelect:string;
    casaMatrizSelect:string
  }

export const EditSucursal = () => {
    const dispatch=useDispatch<AppDispatch>()
    //URL para la API en docker
    //const sucursalService=new SucursalService("http://190.221.207.224:8090/sucursales/update")

    //URL para la API del profesor
    const sucursalService=new SucursalService("http://localhost:8090/sucursales/update")
    const {elementActive}=useSelector((state:RootState)=>state.tablaSucursal)
    let casaMatrizValue:string;
    let categoriasValue:any;
    let valueLogo=""
    if(!elementActive)return

    if(elementActive.esCasaMatriz){
      casaMatrizValue="si"
    }else{
      casaMatrizValue="no"
    }

    if(elementActive.categorias){
      categoriasValue=elementActive.categorias
    }else{
      categoriasValue=[]
    }

    const initialValue:IForm={
        nombre:elementActive.nombre ,
        horarioApertura:elementActive.horarioApertura,
        horarioCierre:elementActive.horarioCierre,
        latitud:elementActive.latitud,
        longitud:elementActive.longitud,
        esCasaMatriz:elementActive.esCasaMatriz,
        idEmpresa:elementActive.empresa.id ,
        logo:elementActive.logo,
        calle:elementActive.domicilio.calle,
        nroCalle:elementActive.domicilio.numero,
        cp:elementActive.domicilio.cp,
        piso:elementActive.domicilio.piso,
        nroDpto:elementActive.domicilio.nroDpto,
      }
      const selectInitialValue:ISelect={
        paisSelect:elementActive.domicilio.localidad.provincia.pais.nombre,
        provinciaSelect:elementActive.domicilio.localidad.provincia.nombre,
        localidadSelect:elementActive.domicilio.localidad.nombre,
        empresaSelect:elementActive.empresa.nombre,
        casaMatrizSelect:casaMatrizValue,
    }



    const {nombre,horarioApertura,horarioCierre,latitud,longitud,calle,nroCalle,cp,piso,nroDpto,onInputChange,onResetForm}=useForm<IForm>(initialValue)

    const {dataTable}=useSelector((state:RootState)=>state.tablaEmpresa)
    const {paisTable}=useSelector((state:RootState)=>state.tablaPaises)
    const {provinciaTable}=useSelector((state:RootState)=>state.tablaProvincia)
    const {localidadTable}=useSelector((state:RootState)=>state.tablaLocalidad)

    const {loading,setLoading,getPaises}=useServices("http://localhost:8090/paises")
    const {getProvincia}=useServices("http://localhost:8090/provincias")
    const {getLocalidad}=useServices("http://localhost:8090/localidades")
    const {getSucursales}=useServices("http://localhost:8090/sucursales")

    const {paisSelect,provinciaSelect,localidadSelect,empresaSelect,casaMatrizSelect,handleSelectChange}=useSelect<ISelect>(selectInitialValue);
    const [image, setImage] = useState<string | null>(elementActive.logo);
    //validations
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
  const [wrongnroDepto,setWrongnroDepto]=useState(false);;
  
  const [isEmptyCondition,setIsEmptyCondition]=useState(false);
  const [containsLetterCondition,setcontainsLetterCondition]=useState(false);
  const [isTimeCondition,setisTimeCondition]=useState(false);
  const [conditionMessage,setconditionMessage]=useState('');

  const {containLetters,isEmpty,isTime}=useValidations();
  
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
      setLoading(true);
    },[])

    const handleSubmit=async(e:React.FormEvent)=>{
      e.preventDefault();

    const localidad=findIdLocalidadLocation(localidadSelect);
    const empresa=findIdEmpresa(empresaSelect)
    
      if(!localidad || !empresa)return
      
      const data:IUpdateSucursal={
        id:elementActive.id,
        nombre:nombre,
        horarioApertura:horarioApertura,
        horarioCierre:horarioCierre,
        esCasaMatriz:casaMatrizSelect==="si"?true:false,
        latitud:latitud,
        longitud:longitud,
        eliminado:false,
        domicilio:{
          id:elementActive.domicilio.id,
          calle:calle,
          numero:nroCalle,
          cp:cp,
          piso:piso,
          nroDpto:nroDpto,
          idLocalidad:localidad.id,
        },
        idEmpresa:empresa.id,
        categorias:categoriasValue,
        logo:image,
      }
      //validaciones para inputs vacios
    if(
      isEmpty(nombre) || isEmpty(horarioApertura) || isEmpty(horarioCierre)
      || isEmpty(latitud.toString()) || isEmpty(longitud.toString()) || isEmpty(calle) || isEmpty(nroCalle.toString())
      || isEmpty(localidadSelect) || isEmpty(empresaSelect) || isEmpty(nroDpto.toString()) || isEmpty(cp.toString())
      || isEmpty(piso.toString())
    ){
      setIsEmptyCondition(true);
      setconditionMessage("algun campo esta vacio");
      isEmpty(nombre) && setWrongName(true);
      isEmpty(horarioApertura) && setWronghorarioApertura(true);
      isEmpty(horarioCierre) && setWronghorarioCierre(true);
      isEmpty(latitud.toString()) && setWronglatitud(true);
      isEmpty(longitud.toString()) && setWronglongitud(true);
      isEmpty(calle) && setWrongcalle(true);
      isEmpty(nroCalle.toString()) && setWrongnroCalle(true);
      isEmpty(nroDpto.toString())&&setWrongnroDepto(true);
      isEmpty(cp.toString())&&setWrongcp(true);
      isEmpty(piso.toString())&&setWrongpiso(true);
    //validaciones para inputs con letras donde solo van numeros
    }else if(
      containLetters(latitud.toString()) || containLetters(longitud.toString()) || containLetters(nroCalle.toString())
      || containLetters(cp.toString()) || containLetters(piso.toString()) || containLetters(nroDpto.toString())
    ){
      setcontainsLetterCondition(true);
      setconditionMessage("algunos campos solo deben contener numeros");
      containLetters(latitud.toString())&&setWronglatitud(true);
      containLetters(longitud.toString())&&setWronglongitud(true);
      containLetters(nroCalle.toString())&&setWrongnroCalle(true);
      containLetters(cp.toString())&&setWrongcp(true);
      containLetters(piso.toString())&&setWrongpiso(true);
      containLetters(nroDpto.toString())&&setWrongnroDepto(true);
    }else if(!isTime(horarioApertura) || !isTime(horarioCierre)){
      setisTimeCondition(true);
      setconditionMessage("use un horario correcto HH:MM")
      isTime(horarioApertura) && setWronghorarioApertura(true);
      isTime(horarioCierre) && setWronghorarioCierre(true);
    }else{
      try{
        await sucursalService.put(elementActive.id,data)
        //setLoading(true)
        getSucursales()
        dispatch(oneditSucursalSucursal())
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
  
  const findIdLocalidadLocation=(nombre:string)=>{
    let result=localidadTable.filter(e=>e.nombre==nombre)
    if(result){
      return result[0];
    }else{
      console.log("no hay resultado");
    }
  }

  return (
    <div className="addEditSucursalContainer"> 
      <h1>Editar una sucursal</h1> 
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

                  <h1>Ingrese su imagen</h1>

                  <UploadImage image={image} setImage={setImage} />

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
                    <Form.Select id="provincia-select" name='provinciaSelect' value={provinciaSelect} onChange={handleSelectChange}>

                        {provinciaTable.map((provincia)=>(
                          <option key={provincia.id} value={provincia.nombre}>{provincia.nombre}</option>
                        ))}

                    </Form.Select>
                  </Form.Group>
                  <Form.Group className='form-element' as={Col}>
                  <Form.Label>Seleccione localidad</Form.Label>
                    <Form.Select className="isNotWrongSelect" id="localidad-select" name='localidadSelect' value={localidadSelect} onChange={handleSelectChange}>

                        {localidadTable.map((localidad)=>(
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
                    <Form.Control id={wrongpiso?"isWrong":"isNotWrong"} type="text" name='piso' value={piso} onChange={onInputChange} placeholder="Ingresar nro del piso" />
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
                <Button onClick={()=>dispatch(oneditSucursalSucursal())}  variant="primary"  style={{padding:"0.4rem",border:"none",borderRadius:"0.4rem",background:"#ba3939"  }}>
                  Cancelar
                </Button>
              </div>
        </Form>
      </div>
  )
}
