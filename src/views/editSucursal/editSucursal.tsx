import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { onEditSucursal } from '../../redux/slices/sucursalesSlices';
import './editSucursal.css'
import { SucursalService } from '../../services/SucursalService';
import { useForm } from '../../hooks/useForm';
import { useServices } from '../../hooks/useServices';
import { useEffect } from 'react';
import { ICreateSucursal } from '../../types/dtos/sucursal/ICreateSucursal';
import { useSelect } from '../../hooks/useSelect';


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
    const sucursalService=new SucursalService("http://190.221.207.224:8090/sucursales")
    const {sucursalTable,elementActive}=useSelector((state:RootState)=>state.tablaSucursal)
    let casaMatrizValue:string;
    
    if(!elementActive)return

    if(elementActive.logo?.length===0){
      elementActive.logo=""
    }
    if(elementActive.esCasaMatriz){
      casaMatrizValue="si"
    }else{
      casaMatrizValue="no"
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



    const {nombre,horarioApertura,horarioCierre,latitud,longitud,calle,nroCalle,cp,piso,nroDpto,logo,onInputChange,onResetForm}=useForm<IForm>(initialValue)

    const {dataTable}=useSelector((state:RootState)=>state.tablaEmpresa)
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
        latitud:latitud,
        longitud:longitud,
        domicilio:{
          calle:calle,
          numero:nroCalle,
          cp:cp,
          piso:piso,
          nroDpto:nroDpto,
          idLocalidad:localidad.id,
        },
        idEmpresa:empresa.id,
        logo:logo,
      }
      console.log(data)
      try{
        await sucursalService.put(elementActive.id,data)
        //setLoading(true)
        getSucursales()
        dispatch(onEditSucursal())
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
          <h1>Editar una sucursal</h1> 
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
                        <Form.Control type="text" name='logo' value={!logo?'':logo} onChange={onInputChange} placeholder="Ingresar el link de la imagen" />
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
                    <Button onClick={()=>dispatch(onEditSucursal())}  variant="primary"  style={{padding:"0.4rem",border:"none",borderRadius:"0.4rem",background:"#ba3939"  }}>
                      Cancelar
                    </Button>
                  </div>
            </Form>
          </div>
      )
}
