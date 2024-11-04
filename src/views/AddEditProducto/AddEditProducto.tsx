import { Button, Form } from "react-bootstrap";
import "./AddEditProducto.css"
const AddEditProducto = () => {

    return (
        <div className="addEditProducto">
        <h1>Crear Producto</h1>
        <Form className="formContainer">
            <div className="formInput">
                <Form.Group className="mb-3">
                    <Form.Control className="control" type="text" placeholder="Nombre:" />
                    <Form.Control className="control" type="text" placeholder="Precio:" />
                    <Form.Control className="control" type="text" placeholder="Categoria:" />
                    <Form.Control className="control" type="text" placeholder="Disponibilidad:"/>
                    <Form.Control className="control" type="text" placeholder="Value:" />
                    <Form.Control className="control" type="text" placeholder="Link de la imagen del producto:" />
                </Form.Group >

            </div>
            <div className="buttons">
                <Button variant="primary">
                    Guardar
                </Button>
                <Button variant="primary" type="submit">
                    Cancelar
                </Button>
            </div>
        </Form>

    </div>
)
}

export default AddEditProducto
