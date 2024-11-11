import { Button, Form } from "react-bootstrap";
import "./AddEditProducto.css"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { FC, useEffect, useState } from "react";
import { onAddProducto, onEditProducto } from "../../redux/slices/administracionSlice";
import { ProductoService } from "../../services/ProductoService";
import { useServices } from "../../hooks/useServices";
import { useForm } from "../../hooks/useForm";
import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";
import { ICategorias } from "../../types/dtos/categorias/ICategorias";
import { useSelect } from "../../hooks/useSelect";
import { IImagen } from "../../types/IImagen";
import { UploadImage } from "../../components/UploadImage";
import { useValidations } from "../../hooks/useValidations";
import { CategoriasService } from "../../services/CategoriasService";

interface IForm{
    denominacion:string;
    precioVenta:number;
    descripcion:string;
    codigo:string;
}

interface ISelectForm{
    categoriaSelect:number;
    subcategoriaSelect:number;
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
    //alergenos checkBox
    const [alergenosTable,setAlergenosTable]=useState<any>([]);
    const [categoryTable,setCategoryTable]=useState<any>([]);
    const [subcategoryTable,setSubcategoryTable]=useState<ICategorias[]>([]);
    const [selectedValues,setSelectedValues]=useState<number[]>([]);

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
        
    },[administracionTable,administracionTable2,selectedValues])

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
    const [imagenProducto, setImageProducto] = useState<IImagen | null>(null);
    
    const [categoriaPadreEdit,setCategoriaPadreEdit]=useState(0);
    useEffect(() => {
        if(categoryTable && editProducto){
            const getCategoriaPadreFromChild = () => {
                let result=20;
                
                categoryTable.forEach((category: ICategorias) => {
                    const aux = category.subCategorias.filter(
                        (subcategory: ICategorias) => subcategory.id === elementActiveProducto?.categoria.id
                    );
                    
                    if (aux.length > 0) {
                        result = category.id;
                        return;
                    }
                });
                return result;
            };
        
            setCategoriaPadreEdit(getCategoriaPadreFromChild());
        }

    }, [categoryTable, elementActiveProducto]);
    //selects    
    const [initalSelectValues, setInitalSelectValues] = useState<ISelectForm>({
        categoriaSelect: 0,
        subcategoriaSelect: 0,
    });

    const {categoriaSelect,subcategoriaSelect,setSelectedValue,handleSelectChange}=useSelect<ISelectForm>(initalSelectValues);

    useEffect(() => {
        if (categoriaPadreEdit && categoryTable.length > 0 && editProducto && elementActiveProducto) {
            
            setInitalSelectValues({
                categoriaSelect: categoriaPadreEdit,
                subcategoriaSelect: elementActiveProducto?.categoria.id,
            });
            setSelectedValue(initalSelectValues);            
        }

        if(categoryTable.length > 0 && addProducto){
            
            
            setInitalSelectValues({
                categoriaSelect: categoryTable[0].id,
                subcategoriaSelect: (categoryTable[0].subCategorias?.[0]?.id ?? 0),
            });
            setSelectedValue(initalSelectValues);            
        }
           
    }, [categoriaPadreEdit, categoryTable, elementActiveProducto]);//subir sefunda sub cat

    

    useEffect(() => {
        
        if (!elementActive?.id || categoryTable.length === 0 || categoriaSelect === 0) return;
        const selectedCategoryId = addProducto ? (categoriaSelect || categoryTable[0]?.id) : categoriaSelect;
        
        const subCatService = new CategoriasService(
            `http://localhost:8090/categorias/allSubCategoriasPorCategoriaPadre/${selectedCategoryId}/${elementActive.id}`
        );
        
        const fetchData = async () => {
            try {
                const response = await subCatService.getAll();
                setSubcategoryTable(response);
                if(subcategoryTable.length > 0){                    
                    setSelectedValue({
                        categoriaSelect: selectedCategoryId,
                        subcategoriaSelect: response[0].id,
                    });            
                }
                
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            }
        };
        fetchData();
        
    }, [categoriaSelect, elementActive]);

    //validation
    const [denominacionCorrect,setDenominacionCorrect]=useState<boolean>(true);
    const [precioVentaCorrect,setPrecioVentaCorrect]=useState<boolean>(true);
    const [descripcionCorrect,setDescripcionCorrect]=useState<boolean>(true);
    const [categoriaCorrect,setCategorianCorrect]=useState<boolean>(true);
    const [codigoCorrect,setCodigoCorrect]=useState<boolean>(true);

    const [messageError,setMessageError]=useState<string>("");
    const {isEmpty,containLetters}=useValidations();


    const initialFormValues = editProducto && elementActiveProducto
    ? { denominacion: elementActiveProducto.denominacion,precioVenta:elementActiveProducto.precioVenta,descripcion:elementActiveProducto.descripcion,habilitado:elementActiveProducto.habilitado,codigo:elementActiveProducto.codigo,idCategoria:elementActiveProducto.id,imagenes:elementActiveProducto.imagenes }//falatan alegenos
    : { denominacion: "",precioVenta:0,descripcion:"",codigo:"" };

    const {denominacion,precioVenta,descripcion,codigo,onInputChange,onResetForm}=useForm<IForm>(initialFormValues)

    useEffect(()=>{
        setDenominacionCorrect(true);
        setPrecioVentaCorrect(true);
        setDescripcionCorrect(true);
        setCategorianCorrect(true);
        setCodigoCorrect(true)
        setMessageError("");
    },[categoriaSelect,subcategoriaSelect,denominacion,precioVenta,descripcion,codigo])

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
            if(isEmpty(denominacion) || isEmpty(precioVenta.toString()) || isEmpty(descripcion) || isEmpty(codigo) || subcategoryTable.length===0  ){
                isEmpty(denominacion) && setDenominacionCorrect(false);
                isEmpty(precioVenta.toString()) && setPrecioVentaCorrect(false);
                isEmpty(descripcion) && setDescripcionCorrect(false);
                isEmpty(codigo) && setCodigoCorrect(false);
                subcategoryTable.length===0 && setCategorianCorrect(false);
                setMessageError("Alguno de los campos esta vacio")
            }else if(containLetters(precioVenta.toString())){
                setPrecioVentaCorrect(false);
                setMessageError("El campo de precio solo puede llevar numeros")
            }else{
                const data = {
                    denominacion:denominacion,
                    precioVenta:precioVenta,
                    descripcion:descripcion,
                    habilitado:true,
                    codigo:codigo,
                    idCategoria:subcategoriaSelect === 0 ? subcategoryTable[0].id : subcategoriaSelect,
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
        }
        if(editProducto){
            if(!elementActiveProducto)return
            if(isEmpty(denominacion) || isEmpty(precioVenta.toString()) || isEmpty(descripcion) || isEmpty(codigo) || isEmpty(subcategoriaSelect.toString()) || subcategoriaSelect===0  ){
                isEmpty(denominacion) && setDenominacionCorrect(false);
                isEmpty(precioVenta.toString()) && setPrecioVentaCorrect(false);
                isEmpty(descripcion) && setDescripcionCorrect(false);
                isEmpty(codigo) && setCodigoCorrect(false);
                isEmpty(subcategoriaSelect.toString())||subcategoriaSelect===0 && setCategorianCorrect(false);
                setMessageError("Alguno de los campos esta vacio")
            }else if(containLetters(precioVenta.toString())){
                setPrecioVentaCorrect(false);
                setMessageError("El campo de precio solo puede llevar numeros")
            }else{
                const data = {
                    id:elementActiveProducto.id,
                    denominacion:denominacion,
                    precioVenta:precioVenta,
                    descripcion:descripcion,
                    habilitado:elementActiveProducto.habilitado,
                    codigo:codigo,
                    idCategoria:subcategoriaSelect,
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
    }
   
    return (
        <div className="addEditProducto">
        <h1 style={{color:"black"}}>{title}</h1>
        <div className={(!denominacionCorrect || !precioVentaCorrect  ||  !descripcionCorrect || !codigoCorrect || !categoriaCorrect ) ? 'errorMessagge' : "noErrors"}>
            <span>{messageError}</span>
        </div>
        <Form className="formContainer" onSubmit={handleFinalSubmit}>
            <div className="formInput">
                <Form.Group className="mb-3">

                    <Form.Control name="denominacion" value={denominacion} onChange={onInputChange} className={ denominacionCorrect ? "control" : "denominacionError"} type="text" placeholder="Denominacion:" />
                    <Form.Control name="precioVenta" value={precioVenta} onChange={onInputChange} className={ precioVentaCorrect ? "control" : "denominacionError"} type="number" placeholder="Precio:" />
                    <Form.Control name="descripcion" value={descripcion} onChange={onInputChange}  className={ descripcionCorrect ? "control" : "denominacionError"} type="text" placeholder="Descripcion:" />
                    <Form.Control name="codigo" value={codigo} onChange={onInputChange} className={ codigoCorrect ? "control" : "denominacionError"} type="text" placeholder="Codigo:" />
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
                    <Form.Select id="categoriaSelect" className={ categoriaCorrect ? "control" : "denominacionError"} name='categoriaSelect' value={categoriaSelect} onChange={handleSelectChange}>

                        {categoryTable.map((category:ICategorias)=>(
                          <option key={category.id} value={category.id}>{category.denominacion}</option>
                        ))}

                    </Form.Select>
                    <Form.Label>Seleccione La SubCat</Form.Label>
                    <Form.Select disabled={subcategoryTable.length === 0} className={ categoriaCorrect ? "control" : "denominacionError"} id="subcategoriaSelect" name='subcategoriaSelect' value={subcategoriaSelect} onChange={handleSelectChange}>

                        {Array.isArray(subcategoryTable) && subcategoryTable.map((category:ICategorias)=>(
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
