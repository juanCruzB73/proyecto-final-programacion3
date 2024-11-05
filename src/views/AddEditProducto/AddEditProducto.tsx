import { Button, Form } from "react-bootstrap";
import "./AddEditProducto.css"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { useEffect, useState } from "react";
import { onAddProducto, onEditProducto } from "../../redux/slices/administracionSlice";
import { ProductoService } from "../../services/ProductoService";
import { useServices } from "../../hooks/useServices";
import { useForm } from "../../hooks/useForm";
import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";
import { ICategorias } from "../../types/dtos/categorias/ICategorias";
import { useSelect } from "../../hooks/useSelect";
import { IImagen } from "../../types/IImagen";
import { UploadImage } from "../../components/UploadImage";

interface IForm{
    denominacion:string;
    precioVenta:number;
    descripcion:string;
    codigo:string;
}

interface ISelectForm{
    //habilitado:true;
    categoriaSelect:string;
}
//imagenes
const AddEditProducto = () => {
    
    const {addProducto,editProducto}=useSelector((state:RootState)=>state.administracion);
    const {elementActive}=useSelector((state:RootState)=>state.tablaSucursal);
    const {elementActiveProducto,administracionTable,administracionTable2}=useSelector((state:RootState)=>state.tableAdministracion)

    const {getCategorias}=useServices(`http://190.221.207.224:8090/categorias/allCategoriasPorSucursal/${elementActive?.id}`)
    const {getAlergenos}=useServices("http://190.221.207.224:8090/alergenos")
    const {getProductos}=useServices(`http://190.221.207.224:8090/articulos/porSucursal/${elementActive?.id}`)
    const productoService= addProducto ? new ProductoService("http://190.221.207.224:8090/articulos/create") : new ProductoService("http://190.221.207.224:8090/articulos/update");
    

    //alergenos checkBox
    const [selectedValues,setSelectedValues]=useState<number[]>([]);
    const [alergenosTable,setAlergenosTable]=useState<any>([]);
    const [categoryTable,setCategoryTable]=useState<any>([]);
    //handle change checkbox change

    useEffect(()=>{
        if(!elementActive)return
        const fetchData=async()=>{
            await getAlergenos()
            await getCategorias()
        }
        fetchData();
    },[])

    useEffect(()=>{
        setAlergenosTable(administracionTable2)
        setCategoryTable(administracionTable)
        
    },[administracionTable,administracionTable2])
    
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        const id=parseInt(value);

        setSelectedValues((prevSelected) =>
            checked
                ? [...prevSelected, id] // Add if checked
                : prevSelected.filter((item) => item !== id) // Remove if unchecked
        );
    };
    
    //titulo de carta
    const [title,setTitle]=useState("Crear Producto")
    //imagenes
    const [imageAlergeno, setImageAlergeno] = useState<IImagen[] | null>(null);

    //select
    const initalSelectValues:ISelectForm= editProducto && elementActiveProducto
    ? {categoriaSelect:elementActiveProducto.categoria.denominacion}
    : {categoriaSelect:""}

    const initialFormValues = editProducto && elementActiveProducto
    ? { denominacion: elementActiveProducto.denominacion,precioVenta:elementActiveProducto.precioVenta,descripcion:elementActiveProducto.descripcion,habilitado:elementActiveProducto.habilitado,codigo:elementActiveProducto.codigo,idCategoria:elementActiveProducto.id,imagenes:elementActiveProducto.imagenes }//falatan alegenos
    : { denominacion: "",precioVenta:0,descripcion:"",codigo:"" };

    const {denominacion,precioVenta,descripcion,codigo,onInputChange,onResetForm}=useForm<IForm>(initialFormValues)
    const {categoriaSelect,handleSelectChange}=useSelect<ISelectForm>(initalSelectValues);

    useEffect(() => {
        if (editProducto && elementActiveProducto) {
            setTitle("Editar Categoria");
            onResetForm();
        } else {
            setTitle("Crear Categoria");
        }
    }, [addProducto, editProducto, elementActiveProducto]);   

    const dispatch=useDispatch<AppDispatch>()
    
    const handleFinalSubmit =async(e:React.FormEvent)=>{
        e.preventDefault()
        if(addProducto){
            const data = {
                denominacion:denominacion,
                precioVenta:precioVenta,
                descripcion:descripcion,
                habilitado:true,
                codigo:codigo,
                idCategoria:parseInt(categoriaSelect),
                idAlergenos:selectedValues,
                imagenes:imageAlergeno ?? []
            }
            try{
                await productoService.post(data)
                dispatch(onAddProducto())
            }catch(error){
                console.log(error);
            }
        }
        if(editProducto){
            if(!elementActiveProducto)return
            const data = {
                id:elementActiveProducto.id,
                denominacion:denominacion,
                precioVenta:precioVenta,
                descripcion:descripcion,
                habilitado:elementActiveProducto.habilitado,
                codigo:codigo,
                idCategoria:parseInt(categoriaSelect),
                idAlergenos:selectedValues,
                imagenes:imageAlergeno ?? []
            }
            try{
                await productoService.put(elementActiveProducto.id,data)
                dispatch(onEditProducto())
            }catch(error){
                console.log(error);
            }
        }
    }
    
    return (
        <div className="addEditProducto">
        <h1 style={{color:"black"}}>{title}</h1>
        <Form className="formContainer" onSubmit={handleFinalSubmit}>
            <div className="formInput">
                <Form.Group className="mb-3">

                    <Form.Control name="denominacion" value={denominacion} onChange={onInputChange} className="control" type="text" placeholder="Denominacion:" />
                    <Form.Control name="precioVenta" value={precioVenta} onChange={onInputChange} className="control" type="number" placeholder="Precio:" />
                    <Form.Control name="descripcion" value={descripcion} onChange={onInputChange} className="control" type="text" placeholder="Categoria:" />
                    <Form.Control name="codigo" value={codigo} onChange={onInputChange} className="control" type="text" placeholder="Codigo:" />
                    <div>

                        <h3 style={{color:"black"}}>Select Alergenos:</h3>
                        {alergenosTable.map((alergeno:IAlergenos) => (
                            <label key={alergeno.id} style={{color:"black"}}>
                                <input
                                    type="checkbox"
                                    value={alergeno.id.toString()}
                                    checked={selectedValues.includes(alergeno.id)}
                                    onChange={handleCheckboxChange}
                                />
                                {alergeno.denominacion}
                            </label>
                        ))}

                    </div>
                    
                    
                    <Form.Label>Seleccione Pais</Form.Label>
                    <Form.Select id="categoriaSelect" name='categoriaSelect' value={categoriaSelect} onChange={handleSelectChange}>

                        {categoryTable.map((category:ICategorias)=>(
                          <option key={category.id} value={category.id}>{category.denominacion}</option>
                        ))}

                    </Form.Select>

                    <h1>Ingrese su imagen</h1>

                    <UploadImage
                        imageObjeto={imageAlergeno}
                        setImageObjeto={setImageAlergeno}
                        typeElement="articulos" // el tipe element es para que sepa en que parte del endpoint tiene que hacer la union "articulos" o "alergenos"
                    />
                
                </Form.Group >

            </div>
            <div className="buttons">
                <Button variant="primary" type="submit">
                    Guardar Producto
                </Button>
                <Button variant="primary" onClick={()=>{
                    addProducto&&dispatch(onAddProducto());
                    editProducto&&dispatch(onEditProducto());
                }}>
                    Cancelar
                </Button>
            </div>
        </Form>

    </div>
)
}

export default AddEditProducto
