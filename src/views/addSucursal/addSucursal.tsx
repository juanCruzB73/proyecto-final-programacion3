import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { onAddSucursal } from '../../redux/slices/sucursalesSlices';
import './addSucursal.css'
import { useForm } from '../../hooks/useForm';
import { useServices } from '../../hooks/useServices';
import { useEffect} from 'react';
import { useSelect } from '../../hooks/useSelect';
import { SucursalService } from '../../services/SucursalService';
import { IDomicilio } from '../../types/IDomicilio';
import { ISucursal } from '../../types/dtos/sucursal/ISucursal';
import { ICreateSucursal } from '../../types/dtos/sucursal/ICreateSucursal';


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



const initialValue:IForm={
  nombre: '',
  horarioApertura: "00:00",
  horarioCierre: "00:00",
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

const selectInitialValue:ISelect={
  paisSelect:"",
  provinciaSelect:"",
  localidadSelect:"",
  empresaSelect:"",
  casaMatrizSelect:"",
}

export const AddSucursal = () => {

  const dispatch=useDispatch<AppDispatch>()
  const sucursalService=new SucursalService("http://190.221.207.224:8090/sucursales/create")
  const {nombre,horarioApertura,horarioCierre,latitud,longitud,calle,nroCalle,cp,piso,nroDpto,logo,onInputChange,onResetForm}=useForm<IForm>(initialValue)

  const {dataTable}=useSelector((state:RootState)=>state.tablaEmpresa)
  const {sucursalTable}=useSelector((state:RootState)=>state.tablaSucursal)
  const {paisTable}=useSelector((state:RootState)=>state.tablaPaises)
  const {provinciaTable}=useSelector((state:RootState)=>state.tablaProvincia)
  const {localidadTable}=useSelector((state:RootState)=>state.tablaLocalidad)

  const {loading,setLoading,getPaises}=useServices("http://190.221.207.224:8090/paises")
  const {getProvincia}=useServices("http://190.221.207.224:8090/provincias")
  const {getLocalidad}=useServices("http://190.221.207.224:8090/localidades")
  const {getSucursales}=useServices("http://190.221.207.224:8090/sucursales")

  const {paisSelect,provinciaSelect,localidadSelect,empresaSelect,casaMatrizSelect,handleSelectChange}=useSelect<ISelect>(selectInitialValue);

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
   
    console.log(localidad,empresa)
    if(!localidad || !empresa)return
    console.log("resturn pasad aca")
    /*
  domicilio: IDomicilio;
    */
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
        idLocalidad:localidad.id,
      },
      idEmpresa:empresa.id,
      logo:logo,
    }
    console.log(data)
    try{
      await sucursalService.post(data)
      //setLoading(true)
      getSucursales()
      dispatch(onAddSucursal())
  }catch (error) {
    console.error("Error adding empresa:", error);
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
      console.log(nombre,result)
      return result[0];
    }else{
      console.log("no hay resultado");
    }
  }
  
  return (
    <div className="addEditSucursalContainer"> 
      <h1>Crear una sucursal</h1> 
      <Form className="form-container" onSubmit={handleSubmit}> 
              <div className='information'>

                <div className='bloqueInfomation'>

                  <Form.Group className='form-element' as={Col} >
                    <Form.Control type="text" name='nombre' value={nombre} onChange={onInputChange} placeholder="Ingrese sucursal" />
                  </Form.Group>

                  <Form.Group className='form-element'as={Col}>
                    <Form.Control type="text" name='horarioApertura' value={horarioApertura} onChange={onInputChange} placeholder="Ingresar hora de apertura" />
                  </Form.Group>

                  <Form.Group className='form-element' as={Col}>
                    <Form.Control type="text" name='horarioCierre' value={horarioCierre} onChange={onInputChange} placeholder="Ingresar hora de cierre" />
                  </Form.Group>

                  <Form.Label>Seleccione Empresa</Form.Label>
                  <Form.Select id="empresa-select" name='empresaSelect' value={empresaSelect} onChange={handleSelectChange}>

                        {dataTable.map((pais)=>(
                          <option key={pais.id} value={pais.nombre}>{pais.nombre}</option>
                        ))}

                  </Form.Select>

                  <Form.Label>Es casa matriz?</Form.Label>
                  <Form.Select id="empresa-select" name='casaMatrizSelect' value={casaMatrizSelect} onChange={handleSelectChange}>
                          <option value={"si"}>Si</option>
                          <option value={"no"}>No</option>
                  </Form.Select>

                  <Form.Group as={Col} >
                    <Form.Label>Ingresar imagen de la sucursal</Form.Label>
                    <Form.Control type="text" name='logo' value={logo} onChange={onInputChange} placeholder="Ingresar el link de la imagen" />
                  </Form.Group>

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
                    <Form.Select id="localidad-select" name='localidadSelect' value={localidadSelect} onChange={handleSelectChange}>

                        {localidadTable.map((localidad)=>(
                          <option key={localidad.id} value={localidad.nombre}>{localidad.nombre}</option>
                        ))}

                    </Form.Select>
                  </Form.Group>
                  <Form.Group className='form-element' as={Col}>
                    <Form.Control type="text" name='calle' value={calle} onChange={onInputChange} placeholder="Ingresar calle" />
                  </Form.Group>
                  <Form.Group className='form-element' as={Col}>
                    <Form.Control type="text" name='nroCalle' value={nroCalle} onChange={onInputChange} placeholder="Ingresar numero de calle" />
                  </Form.Group>
                  <Form.Group className='form-element' as={Col}>
                    <Form.Control type="text" name='cp' value={cp} onChange={onInputChange} placeholder="Ingresar cp" />
                  </Form.Group>
                  <Form.Group className='form-element' as={Col}>
                    <Form.Control type="text" name='piso' value={piso} onChange={onInputChange} placeholder="Ingresar cp" />
                  </Form.Group>
                  <Form.Group className='form-element' as={Col}>
                    <Form.Control type="text" name='nroDpto' value={nroDpto} onChange={onInputChange} placeholder="Ingresar cp" />
                  </Form.Group>
                  <Form.Group className='form-element' as={Col}>
                    <Form.Control type="text"  name='latitud' value={latitud} onChange={onInputChange} placeholder="latitud" />
                  </Form.Group>
                  <Form.Group className='form-element' as={Col}>
                    <Form.Control type="text" name='longitud' value={longitud} onChange={onInputChange} placeholder="longitud" />
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
  )
}
