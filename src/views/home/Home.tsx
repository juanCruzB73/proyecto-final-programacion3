import { useSelector } from 'react-redux'
import { HomeSideVar } from '../../components/HomeSideVar'
import { SucursalesMenu } from '../../components/SucursalesMenu'
import { AddEditEmpresa } from '../addEditEmpresa/AddEditEmpresa'
import { RootState } from '../../redux/store/store'
import { EmpresaDetails } from '../empresaDetails/EmpresaDetails'
import  './home.css'

//view home con sucursales y empresas

export const Home = () => {

  const {addCompany,seeMore}=useSelector((state:RootState)=>state.company)


  return (
    <div className="main-container">
      {addCompany&&<AddEditEmpresa/>}
      {seeMore&&<EmpresaDetails/>}
      <div className="empresa-container">
          <HomeSideVar/> 
      </div>
      <div className="sucursales-container">
          <SucursalesMenu/>
      </div>
    </div>
  )
}
