import { Button, Form } from "react-bootstrap";
import "./AddEditProducto.css"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { FC, useEffect, useState } from "react";
import { onAddProducto, onEditProducto } from "../../redux/slices/administracionSlice";
import { removeElementActiveProducto } from "../../redux/slices/tableAdministracionSlice";

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
    categoriaSelect:number;
}
//imagenes
const AddEditProducto:FC = () => {
    const {addProducto,editProducto}=useSelector((state:RootState)=>state.administracion);

    const {elementActive}=useSelector((state:RootState)=>state.tablaSucursal);
    const {elementActiveProducto,administracionTable,administracionTable2}=useSelector((state:RootState)=>state.tableAdministracion)

    const {getCategorias}=useServices(`http://localhost:8090/categorias/allCategoriasPadrePorSucursal/${elementActive?.id}`)
    const {getAlergenos}=useServices("http://localhost:8090/alergenos")
    const {getProductos}=useServices(`http://localhost:8090/articulos/porSucursal/${elementActive?.id}`)
    const productoService= addProducto ? new ProductoService("http://localhost:8090/articulos/create") : new ProductoService("http://localhost:8090/articulos/update");
    
    /*const subCategoryService = elementActive?.id && category?.id
    ? new CategoriasService(`http://localhost:8090/categorias/allSubCategoriasPorCategoriaPadre/${category.id}/${elementActive.id}`)
    : null;*/  

    //alergenos checkBox
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
    
    const [selectedValues,setSelectedValues]=useState<number[]>([]);

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
    const [title,setTitle]=useState("Crear Producto aaaaaaa")
    //imagenes
    const [imagenProducto, setImageProducto] = useState<IImagen | null>(null);

    //select
    let initalSelectValues: ISelectForm= {
        categoriaSelect: addProducto
            ? (categoryTable[0]?.id) // Use the first category's ID if adding a new product
            : elementActiveProducto?.categoria.id || 0 // Use the active product's category ID if editing
    };;
    

    const {categoriaSelect,handleSelectChange}=useSelect<ISelectForm>(initalSelectValues);

    const initialFormValues = editProducto && elementActiveProducto
    ? { denominacion: elementActiveProducto.denominacion,precioVenta:elementActiveProducto.precioVenta,descripcion:elementActiveProducto.descripcion,habilitado:elementActiveProducto.habilitado,codigo:elementActiveProducto.codigo,idCategoria:elementActiveProducto.id,imagenes:elementActiveProducto.imagenes }//falatan alegenos
    : { denominacion: "",precioVenta:0,descripcion:"",codigo:"" };

    const {denominacion,precioVenta,descripcion,codigo,onInputChange,onResetForm}=useForm<IForm>(initialFormValues)

    useEffect(() => {
        if (editProducto && elementActiveProducto) {
            setTitle("Editar Producto");
            onResetForm();
        } else {
            setTitle("Crear Producto");
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
                idCategoria:categoriaSelect??categoryTable[0].id,
                idAlergenos:selectedValues,
                imagenes:imagenProducto ? [imagenProducto] : [],
            }
            try{
                await productoService.post(data)
                getProductos()
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
                idCategoria:categoriaSelect,
                idAlergenos:selectedValues,
                imagenes: [...elementActiveProducto.imagenes, imagenProducto].filter((img): img is IImagen => img !== null)
            }
            try{
                await productoService.put(elementActiveProducto.id,data)
                getProductos()
                dispatch(onEditProducto())
            }catch(error){
                console.log(error);
            }
        }
    }
    /*const filterCategoriasHijas=(table:ICategorias[])=>{
        const result = table.map(category=>category.sucursales.)
        setHijasCategoryTable(result);
    }
    const [hijasCategoryTable,setHijasCategoryTable]=useState<any[]>([])

    useEffect(()=>{
        console.log(categoryTable);
        
        filterCategoriasHijas(categoryTable);
        console.log(hijasCategoryTable);
        
    },[categoryTable])

    console.log(categoryTable.length);
    console.log(hijasCategoryTable.length);
    */
   console.log(title);
   
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
                    
                    
                    <Form.Label>Seleccione La categoria</Form.Label>
                    <Form.Select id="categoriaSelect" name='categoriaSelect' value={categoriaSelect} onChange={handleSelectChange}>

                        {categoryTable.map((category:ICategorias)=>(
                          <option key={category.id} value={category.id}>{category.denominacion}</option>
                        ))}

                    </Form.Select>

                    <h1>Ingrese su imagen</h1>

                    <UploadImage
                        imageObjeto={imagenProducto}
                        setImageObjeto={setImageProducto}
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
