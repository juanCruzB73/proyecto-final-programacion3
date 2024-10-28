import { useSelector } from 'react-redux'
import { HomeSideVar } from '../../components/HomeSideVar'
import { SucursalesMenu } from '../../components/SucursalesMenu'
import { AddEmpresa } from '../addEmpresa/AddEmpresa'
import { RootState } from '../../redux/store/store'
import { EmpresaDetails } from '../empresaDetails/EmpresaDetails'
import { EditEmpresa } from '../editEmpresa/EditEmpresa'
import  './home.css'

//view home con sucursales y empresas
export const Home = () => {

  const {addCompany,edit}=useSelector((state:RootState)=>state.company)


  return (
    <div className="main-container">
      {addCompany&&<AddEmpresa/>}
      
      {edit&&<EditEmpresa/>}
      

      <div className="empresa-container">
          <HomeSideVar/> 
      </div>
      <div className="sucursales-container">
          <SucursalesMenu/>
      </div>
    </div>
  )
}
