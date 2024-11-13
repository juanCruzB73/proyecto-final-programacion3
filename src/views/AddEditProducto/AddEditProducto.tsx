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
import { MultiSelectDropdown } from "../../components/categoriasAlergenos/MultipleSelectDropDown";

interface IForm{
    denominacion:string;
    precioVenta:number;
    descripcion:string;
    codigo:string;
}

interface ISelectForm{
    subcategoriaSelect:number;
}
//imagenes
const AddEditProducto:FC = () => {

    const {addProducto,editProducto}=useSelector((state:RootState)=>state.administracion);

    const {elementActive}=useSelector((state:RootState)=>state.tablaSucursal);
    const {elementActiveProducto,administracionTable,administracionTable2}=useSelector((state:RootState)=>state.tableAdministracion)

    const {getAlergenos}=useServices("http://localhost:8090/alergenos")
    const {getProductos}=useServices(`http://localhost:8090/articulos/porSucursal/${elementActive?.id}`)
    const productoService= addProducto ? new ProductoService("http://localhost:8090/articulos/create") : new ProductoService("http://localhost:8090/articulos/update");
    //alergenos checkBox
    const [alergenosTable,setAlergenosTable]=useState<any>([]);
    const [subcategoryTable,setSubcategoryTable]=useState<ICategorias[]>([]);
    const [selectedValues,setSelectedValues]=useState<number[]>([]);

    //handle change checkbox change
    // Fetch allergens data
    useEffect(() => {
        const fetchData = async () => {
            const allergens = await getAlergenos();
            setAlergenosTable(administracionTable2);
        };
        if (elementActive) fetchData();
    }, [elementActive, administracionTable2]);

    // Initialize dropdown state and handle input changes
    const handleMultiSelectChange = (values: number[]) => {
        setSelectedValues(values);
    };
    
    
    //titulo de carta
    const [title,setTitle]=useState("Crear Producto")
    //imagenes
    const [imagenProducto, setImageProducto] = useState<IImagen | null>(null);
    
    //selects    
    const [initalSelectValues, setInitalSelectValues] = useState<ISelectForm>({
        subcategoriaSelect: 0,
    });

    const {subcategoriaSelect,setSelectedValue,handleSelectChange}=useSelect<ISelectForm>(initalSelectValues);

    useEffect(() => {
        if (editProducto && elementActiveProducto) {
            
            setInitalSelectValues({
                subcategoriaSelect: elementActiveProducto?.categoria.id,
            });
            setSelectedValue(initalSelectValues);            
        }

        if(addProducto){
            
            
            setInitalSelectValues({
                subcategoriaSelect: (subcategoriaSelect ?? 0),
            });
            setSelectedValue(initalSelectValues);            
        }
           
    }, [ elementActiveProducto]);//subir sefunda sub cat

    

    useEffect(() => {
        
        if (!elementActive?.id) return;
        
        const subCatService = new CategoriasService(
            `http://localhost:8090/categorias/allSubCategoriasPorSucursal/${elementActive.id}`
        );
        
        const fetchData = async () => {
            try {
                const response = await subCatService.getAll();
                setSubcategoryTable(response);
                if(subcategoryTable.length > 0){                    
                    setSelectedValue({
                        subcategoriaSelect: response[0].id,
                    });            
                }
                
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            }
        };
        fetchData();
        
    }, []);

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
    },[subcategoriaSelect,denominacion,precioVenta,descripcion,codigo])

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
   console.log(selectedValues,subcategoriaSelect,subcategoryTable);
   
    return (
        <div className="addEditProducto">
        <h1 style={{color:"black"}}>{title}</h1>
        <div className={(!denominacionCorrect || !precioVentaCorrect  ||  !descripcionCorrect || !codigoCorrect || !categoriaCorrect ) ? 'errorMessagge' : "noErrors"}>
            <span>{messageError}</span>
        </div>
        <Form className="formContainer" onSubmit={handleFinalSubmit}>
            <div className="formInput">
                    <Form.Group className="form-groups">
                        <Form.Group className="form-group1">
                            <input name="denominacion" value={denominacion} onChange={onInputChange} className={ denominacionCorrect ? "denominacion" : "denominacionError-prodcut"} type="text" placeholder="Denominacion:" />
                            <input name="precioVenta" value={precioVenta} onChange={onInputChange} className={ precioVentaCorrect ? "denominacion" : "denominacionError-prodcut"} type="number" placeholder="Precio:" />
                            <input name="codigo" value={codigo} onChange={onInputChange} className={ codigoCorrect ? "denominacion" : "denominacionError-prodcut"} type="text" placeholder="Codigo:" />
                        </Form.Group>
                        <Form.Group className="form-group-descripcion">
                            <input name="descripcion" value={descripcion} onChange={onInputChange}  className={ descripcionCorrect ? "denominacion" : "denominacionError-prodcut"} type="text" placeholder="Descripcion:" />
                        </Form.Group>
                    </Form.Group>
                    
                    <Form.Group className="form-group2">

                    <div className="alergenosSelect">
                        <h3 style={{color:"black"}}>Seleccione Alergenos</h3>
                        <MultiSelectDropdown
                            options={alergenosTable}
                            selectedValues={selectedValues}
                            onChange={handleMultiSelectChange}
                        />
                    </div>
                        <div className="categoriSelect">
                            <h3 style={{color:"black"}}>Seleccione La Categoria</h3>
                            <Form.Select disabled={subcategoryTable.length === 0} className={ categoriaCorrect ? "denominacion" : "denominacionError-prodcut"} id="subcategoriaSelect" name='subcategoriaSelect' value={subcategoriaSelect} onChange={handleSelectChange}>
                                {Array.isArray(subcategoryTable) && subcategoryTable.map((category:ICategorias)=>(
                                    <option key={category.id} value={category.id}>{category.denominacion}</option>
                                ))}
                            </Form.Select>
                        </div>
                    </Form.Group>
                    <Form.Group className="form-group3">
                        <h1>Ingrese su imagen</h1>
                        <UploadImage
                            imageObjeto={imagenProducto}
                            setImageObjeto={setImageProducto}
                            typeElement="articulos" // el tipe element es para que sepa en que parte del endpoint tiene que hacer la union "articulos" o "alergenos"
                        />
                    </Form.Group>
            </div>
            <div className="buttons-product">
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
