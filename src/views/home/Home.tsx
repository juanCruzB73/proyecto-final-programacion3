import { useSelector } from 'react-redux'
import { HomeSideVar } from '../../components/empresasSucursales/HomeSideVar'
import { SucursalesMenu } from '../../components/empresasSucursales/SucursalesMenu'
import { RootState } from '../../redux/store/store'
import  './home.css'
import { EmpresaDetails } from '../empresaDetails/EmpresaDetails'
import { AddEmpresa } from '../addEmpresa/AddEmpresa'
import { EditEmpresa } from '../editEmpresa/EditEmpresa'
import { SucursalDetails } from '../sucursalDetails/SucursalDetails'
import { EditSucursal } from '../editSucursal/editSucursal'
import { AddSucursal } from '../addSucursal/addSucursal'
import { useEffect, useState } from 'react'

//view home con sucursales y empresas
export const Home = () => {
  
  const {addCompany,seeMore,edit}=useSelector((state:RootState)=>state.company)
  const {addSucursal,seeMoreSucursal,editSucursal}=useSelector((state:RootState)=>state.sucursal)
  const [popUps,setPopUps]=useState(false)

  useEffect(()=>{
    if(addCompany||seeMore||edit||addSucursal||seeMoreSucursal||editSucursal){
      setPopUps(true)
    }else{
      setPopUps(false)
    }
  },[addCompany,seeMore,edit,addSucursal,seeMoreSucursal,editSucursal])

  return (
    <div className="main-container">
      <div className={popUps?'popUpsActive':'popUpsDeactivated'}>
        {seeMore && <EmpresaDetails/>}
        {addCompany && <AddEmpresa/>}
        {edit && <EditEmpresa/>}
        {seeMoreSucursal && <SucursalDetails/>}
        {editSucursal && <EditSucursal/>}
        {addSucursal&&<AddSucursal/>}
      </div>
      <div className="empresa-container">
          <HomeSideVar/> 
      </div>
      <div className="sucursales-container">
          <SucursalesMenu/>
      </div>
    </div>
  )
}
