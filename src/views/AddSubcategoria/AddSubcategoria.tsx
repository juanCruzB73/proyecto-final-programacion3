import { Button, Form } from "react-bootstrap"
import "./AddSubcategoria.css"

const AddSubcategoria = () => {
    return (
        <div className="addSubcategoria">
                <h1>Crear Subcategoria</h1>
                <Form className="formContainer">
                    <div className="formInput">
                        <Form.Group className="mb-3">
                            <Form.Label>Ingresar el nombre</Form.Label>
                            <Form.Control className="control" type="text" placeholder="Nombre:" />
                        </Form.Group>
                    </div>
                    <div className="buttons">
                        <Button variant="primary">
                            Guardar Subcategoria
                        </Button>
                        <Button variant="primary" type="submit">
                            Cancelar
                        </Button>
                    </div>
                </Form>

            </div>
    )
}

export default AddSubcategoria
