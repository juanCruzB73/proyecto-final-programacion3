import { Button, Form } from "react-bootstrap"
import "./AddSubcategoria.css"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { FC, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { onAddSubCategoria, onEditSubCategoria } from "../../redux/slices/administracionSlice";
import { useServices } from "../../hooks/useServices";
import { CategoriasService } from "../../services/CategoriasService";

interface IForm{
    denominacion:string
}

const AddSubcategoria:FC = () => {

    const {addSubCategoria,editSubCategoria}=useSelector((state:RootState)=>state.administracion);
    const {elementActive}=useSelector((state:RootState)=>state.tablaSucursal);
    const {elementActiveCategoria,elementActiveCategoriaSubCategoria}=useSelector((state:RootState)=>state.tableAdministracion)
    const [title,setTitle]=useState("Crear Subcategoria")

    const dispatch=useDispatch<AppDispatch>()

    const categoriaService= addSubCategoria ? new CategoriasService(`http://localhost:8090/categorias/create`) : new CategoriasService(`http://localhost:8090/categorias/update`)

    const {getCategorias}=useServices(`http://localhost:8090/categorias/allCategoriasPadrePorSucursal/${elementActive?.id}`)
    
    const initialFormValues = editSubCategoria
    ? { denominacion: elementActiveCategoriaSubCategoria?.denominacion }
    : { denominacion: "" };

    const {denominacion,onInputChange,onResetForm}=useForm<IForm>(initialFormValues);

    useEffect(() => {
        if (editSubCategoria) {
            setTitle("Editar SubCategoria");
            onResetForm();
        } else {
            setTitle("Crear SubCategoria");
        }
    }, [addSubCategoria, editSubCategoria, elementActiveCategoria,elementActiveCategoriaSubCategoria]);

    const handleFinalSubmit = async(e:React.FormEvent)=>{
        e.preventDefault()

        if(editSubCategoria){
            
            if(!elementActiveCategoria)return
            if(!elementActive)return
            if(!elementActiveCategoriaSubCategoria) return
            const idSucursales=getIdSucursales()
            
            const data={
                id:elementActiveCategoriaSubCategoria.id,
                denominacion:denominacion,
                idEmpresa:elementActive.empresa.id,
                eliminado:elementActiveCategoriaSubCategoria.eliminado,
                idSucursales:idSucursales,
                idCategoriaPadre:elementActiveCategoria.id
            }
            
            try{
                await categoriaService.put(elementActiveCategoriaSubCategoria.id,data)
                getCategorias()
                
                dispatch(onEditSubCategoria())
            }catch(error){
                console.log(error);
            }
        }
        if (addSubCategoria){
            
            if(!elementActive || !elementActiveCategoria)return
        
            const data={
                denominacion:denominacion,
                idEmpresa:elementActive.empresa.id,
                idCategoriaPadre:elementActiveCategoria.id
            }

            try{
                await categoriaService.post(data)
                getCategorias()
                dispatch(onAddSubCategoria())
            }catch(error){
                console.log(error);    
            }
        }
    }
    

    const getIdSucursales=()=>{
        if(!elementActiveCategoria)return []
        let data=elementActiveCategoria.sucursales.map(sucursal=>sucursal.id)
        return data
    }
    

    return (
        <div className="addSubcategoria">
                <h1 style={{color:"black"}}>{title}</h1>
                <Form className="formContainer" onSubmit={handleFinalSubmit}>
                    <div className="formInput">
                        <Form.Group className="mb-3">
                            <Form.Label>Ingresar el nombre</Form.Label>
                            <Form.Control className="control" name="denominacion" value={denominacion} onChange={onInputChange} type="text" placeholder="Nombre:" />
                        </Form.Group>
                    </div>
                    <div className="buttons">
                        <Button variant="primary" type="submit">
                            Guardar Subcategoria
                        </Button>
                        <Button variant="primary" onClick={()=>{
                            addSubCategoria && dispatch(onAddSubCategoria());
                            editSubCategoria && dispatch(onEditSubCategoria())
                        }}>
                            Cancelar
                        </Button>
                    </div>
                </Form>

            </div>
    )
}

export default AddSubcategoria
