import { Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store/store"
import "./AddCategoria.css"
import React, { FC, useEffect, useState } from "react"
import { onAddCategoria, onEditCategoria } from "../../redux/slices/administracionSlice"
import { CategoriasService } from "../../services/CategoriasService"
import { useForm } from "../../hooks/useForm"
import { useServices } from "../../hooks/useServices"
import { useValidations } from "../../hooks/useValidations"



interface IForm{
    denominacion:string
}
const AddCategoria:FC = () => {


    const {addCategoria,editCategoria}=useSelector((state:RootState)=>state.administracion);
    const {elementActive}=useSelector((state:RootState)=>state.tablaSucursal);
    const {elementActiveCategoria}=useSelector((state:RootState)=>state.tableAdministracion)
    const [title,setTitle]=useState("Crear Categoria")

    const dispatch=useDispatch<AppDispatch>()

//URL para la API del profe
const categoriaService= addCategoria ? new CategoriasService("http://190.221.207.224:8090/categorias/create") : new CategoriasService("http://190.221.207.224:8090/categorias/update")
const {getCategorias}=useServices(`http://190.221.207.224:8090/categorias/allCategoriasPadrePorSucursal/${elementActive?.id}`)    
const initialFormValues = editCategoria && elementActiveCategoria
? { denominacion: elementActiveCategoria.denominacion }
: { denominacion: "" };

//URL para la API en docker

    // const categoriaService= addCategoria ? new CategoriasService("http://localhost:8090/categorias/create") : new CategoriasService("http://localhost:8090/categorias/update")
    // const {getCategorias}=useServices(`http://localhost:8090/categorias/allCategoriasPadrePorSucursal/${elementActive?.id}`)    
    // const initialFormValues = editCategoria && elementActiveCategoria
    // ? { denominacion: elementActiveCategoria.denominacion }
    // : { denominacion: "" };

    const {denominacion,onInputChange,onResetForm}=useForm<IForm>(initialFormValues)

    //validation
    const [denominacionCorrect,setDenominacionCorrect]=useState<boolean>(true);
    const [messageError,setMessageError]=useState<string>("");
    const {isEmpty}=useValidations();
    
    useEffect(() => {
        if (editCategoria && elementActiveCategoria) {
            setTitle("Editar Categoria");
            onResetForm();
        } else {
            setTitle("Crear Categoria");
        }
    }, [addCategoria, editCategoria, elementActiveCategoria]);


    const handleFinalSubmit = async(e:React.FormEvent)=>{
        e.preventDefault()
        
        if(editCategoria){
            
            if(!elementActiveCategoria)return
            if(!elementActive)return

            if(isEmpty(denominacion)){
                setDenominacionCorrect(false);
                setMessageError("La denominacion no puede estar vacia.")
            }else{
                const idSucursales=getIdSucursales()
                const data={
                    id:elementActiveCategoria.id,
                    denominacion:denominacion,
                    idEmpresa:elementActive.empresa.id,
                    eliminado:elementActiveCategoria.eliminado,
                    idSucursales:idSucursales,
                    idCategoriaPadre:null
                }
    
                try{
                    await categoriaService.put(elementActiveCategoria.id,data)
                    getCategorias()
                    dispatch(onEditCategoria())
                }catch(error){
                    console.log(error);
    
                }
     
            }

        }
        if (addCategoria){
            
            if(!elementActive)return
            if(isEmpty(denominacion)){
                setDenominacionCorrect(false);
                setMessageError("La denominacion no puede estar vacia.")
            }else{
                const data={
                    denominacion:denominacion,
                    idEmpresa:elementActive.empresa.id,
                    idCategoriaPadre:null
                }
    
                try{
                    await categoriaService.post(data)
                    getCategorias()
                    dispatch(onAddCategoria())
                }catch(error){
                    console.log(error);    
                }
            }
        }
    }
    

    const getIdSucursales=()=>{
        if(!elementActiveCategoria)return []
        let data=elementActiveCategoria.sucursales.map(sucursal=>sucursal.id)
        return data
    }
    
    
    return (
        <div className="contenedorPadre">
            <div className="addCategoria">
                <h1 style={{color:"black"}}>{title}</h1>
                <div className={!denominacionCorrect ? 'errorMessagge' : "noErrors"}>
                    <span>{messageError}</span>
                </div>
                <Form className="formContainer" onSubmit={handleFinalSubmit}>
                    <div className="formInput">
                        <Form.Group className={ denominacionCorrect ? "mb-3" : "denominacionError"}>
                            <Form.Label>Ingresar la denominación</Form.Label>
                            <Form.Control name="denominacion"  onChange={onInputChange} value={denominacion} className="control" type="text" placeholder="Nombre:" />
                        </Form.Group>
                    </div>
                    <div className="buttons">
                        <Button variant="primary" type="submit">
                            Guardar Categoria
                        </Button>
                        <Button variant="primary" onClick={()=>{
                            addCategoria&&dispatch(onAddCategoria())
                            editCategoria&&dispatch(onEditCategoria())
                        }}>
                            Cancelar
                        </Button>
                    </div>
                </Form>

            </div>
        </div>
)
}

export default AddCategoria
