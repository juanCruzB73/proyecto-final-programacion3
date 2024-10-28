import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { onAddCompany } from '../../redux/slices/companySlice';
import './editSucursal.css'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store/store';

export const editSucursal = () => {
    const dispatch=useDispatch<AppDispatch>()

    return (
        <div className="addEditSucursalContainer"> 
        <Form className="form-container">
            <h1>Crear una sucursal</h1>  
            <div className='information'>
                <div className='bloqueInfomation'>
                <Form.Group className='form-element' as={Col} >
                    <Form.Control type="text" placeholder="Ingrese sucursal" />
                </Form.Group>

                <Form.Group className='form-element'as={Col}>
                    <Form.Control type="text" placeholder="Ingresar hora de apertura" />
                </Form.Group>

                <Form.Group className='form-element' as={Col}>
                    <Form.Control type="text" placeholder="Ingresar hora de cierre" />
                </Form.Group>

                <Form.Group as={Col} >
                    <Form.Label>Ingresar imagen de la sucursal</Form.Label>
                    <Form.Control className="form-element-img" type="file"/>
                </Form.Group>
                </div>

                <div className='bloqueInfomation'>
                <Form.Group className='form-element' as={Col}>
                    <Form.Control type="text" placeholder="Ingresar pais" />
                </Form.Group>
                <Form.Group className='form-element' as={Col}>
                    <Form.Control type="text" placeholder="Ingresar provincia" />
                </Form.Group>
                <Form.Group className='form-element' as={Col}>
                    <Form.Control type="text" placeholder="Ingresar localidad" />
                </Form.Group>
                </div>


                <div className='bloqueInfomation'>
                <Form.Group className='form-element' as={Col}>
                    <Form.Control type="text" placeholder="Ingresar calle" />
                </Form.Group>
                <Form.Group className='form-element' as={Col}>
                    <Form.Control type="text" placeholder="Ingresar numero de calle" />
                </Form.Group>
                <Form.Group className='form-element' as={Col}>
                    <Form.Control type="text" placeholder="Ingresar piso" />
                </Form.Group>
                <Form.Group className='form-element' as={Col}>
                    <Form.Control type="text" placeholder="Ingresar departamento" />
                </Form.Group>
                </div>
            </div>
            

            <div className="button">
              <Button variant="primary" style={{padding:"0.4rem",border:"none",borderRadius:"0.4rem",background:"#32cd32"  }}>{/* type="submit" */}
                Confirmar
                </Button>
                <Button onClick={()=>dispatch(onAddCompany())}  variant="primary"  style={{padding:"0.4rem",border:"none",borderRadius:"0.4rem",background:"#ba3939"  }}>
                Cancelar
                </Button>
            </div>
        </Form>
    </div>
)
}
