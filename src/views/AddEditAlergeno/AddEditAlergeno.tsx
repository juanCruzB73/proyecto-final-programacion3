import { Button, Form } from "react-bootstrap";
import "./AddEditAlergeno.css"
import { AppDispatch, RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { onAddAlergeno, onEditAlergeno } from "../../redux/slices/administracionSlice";
import { useForm } from "../../hooks/useForm";
import { AlergenosService } from "../../services/AlergenosService";
import { useServices } from "../../hooks/useServices";
import { IImagen } from "../../types/IImagen";
import { UploadImage } from "../../components/UploadImage";
import { useValidations } from "../../hooks/useValidations";
const AddEditAlergeno = () => {
    
//URL para la api en docker
const {addAlergeno,editAlergeno}=useSelector((state:RootState)=>state.administracion);
const {elemetActiveAlergeno}=useSelector((state:RootState)=>state.tableAdministracion)
const alergenoService = new AlergenosService("http://190.221.207.224:8090/alergenos")
const [title,setTitle]=useState("Crear Alergeno")

    //URL para la API en docker
    // const {addAlergeno,editAlergeno}=useSelector((state:RootState)=>state.administracion);
    // const {elemetActiveAlergeno}=useSelector((state:RootState)=>state.tableAdministracion)
    // const alergenoService = new AlergenosService("http://localhost:8090/alergenos")
    // const [title,setTitle]=useState("Crear Alergeno")

    //imagenes
    const [imagenAlergeno, setImageAlergeno] = useState<IImagen | null>(null);

    const initialFormValue=editAlergeno && elemetActiveAlergeno
    ? {denominacion:elemetActiveAlergeno.denominacion}
    : {denominacion:""};

    //validation
    const [denominacionCorrect,setDenominacionCorrect]=useState<boolean>(true);
    const [messageError,setMessageError]=useState<string>("");
    const {isEmpty}=useValidations();

    const dispatch=useDispatch<AppDispatch>()
    const{denominacion,onInputChange,onResetForm}=useForm(initialFormValue)
    const {getAlergenos}=useServices("http://localhost:8090/alergenos")
    useEffect(()=>{
        if(editAlergeno && elemetActiveAlergeno ){
            setTitle("Editar Alergeno")
            onResetForm();
        }else{
            setTitle("Crear Alergeno");
        }
    },[editAlergeno,addAlergeno,elemetActiveAlergeno])

    const handleFinalSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        if(editAlergeno){
            if(!elemetActiveAlergeno) return
            if(isEmpty(denominacion)){
                setDenominacionCorrect(false);
                setMessageError("La denominacion no puede estar vacia.")
            }else{
                const data={
                    id:elemetActiveAlergeno.id,
                    denominacion:denominacion,
                    imagen:imagenAlergeno ? imagenAlergeno : elemetActiveAlergeno.imagen,
                }
                try{
                    await alergenoService.put(elemetActiveAlergeno.id,data)
                    getAlergenos()
                    dispatch(onEditAlergeno())
                }catch(error){
                    console.log(error);  
                }
            }
            
        }
        if(addAlergeno){
            if(isEmpty(denominacion)){
                setDenominacionCorrect(false);
                setMessageError("La denominacion no puede estar vacia.")
            }else{
                const data={
                    denominacion:denominacion,
                    imagen:imagenAlergeno ? imagenAlergeno : null,
                }
                try{
                    await alergenoService.post(data)
                    getAlergenos()
                    dispatch(onAddAlergeno())
                }catch(error){
                    console.log(error);  
                }
            }
            
        }
    }

return (
    <div className="containerAddEditAlergeno">
        <h1 style={{color:"black"}}>{title}</h1>
        <div className={!denominacionCorrect ? 'errorMessagge' : "noErrors"}>
            <span>{messageError}</span>
        </div>
        <Form className="formContainer" onSubmit={handleFinalSubmit}>
            <div className="formInput">
                <Form.Group className={ denominacionCorrect ? "mb-3" : "denominacionError"}>
                    <Form.Label>Ingresar la denominacion</Form.Label>
                    <Form.Control name="denominacion" value={denominacion} onChange={onInputChange} className="control" type="text" placeholder="Nombre:" />
                </Form.Group>
            </div>
            <UploadImage
                        imageObjeto={imagenAlergeno}
                        setImageObjeto={setImageAlergeno}
                        typeElement="alergenos" // el tipe element es para que sepa en que parte del endpoint tiene que hacer la union "articulos" o "alergenos"
                    />
            <div className="buttons">
                <Button variant="primary" type="submit">
                    Guardar
                </Button>
                <Button variant="primary" onClick={()=>{
                    addAlergeno&&dispatch(onAddAlergeno())
                    editAlergeno&&dispatch(onEditAlergeno())
                }}>
                    Cancelar
                </Button>
            </div>
        </Form>

    </div>
);
}

export default AddEditAlergeno
