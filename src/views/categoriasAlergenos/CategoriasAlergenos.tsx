import React from 'react'
import './categoriasAlergenos.css'
import { TopBar } from '../../components/categoriasAlergenos/TopBar'
import { SideBar } from '../../components/categoriasAlergenos/SideBar'
import ListGroup from 'react-bootstrap/ListGroup';
import { ListCards } from '../../components/categoriasAlergenos/listCards';

export const CategoriasAlergenos = () => {
  
  return (
    <div className="main-container-administracion">
      <div className='topBar'>
        <TopBar/>
      </div>
      <div className='board'>

        <div className='sideBar'>
          <SideBar/>
        </div>
        <div className='itemMenu'>
            <div className='Items'>
              <div className='categoriaContainer'>
                  <span className='categoria'>item</span>
                  <div className='subcategorias'>
                    <span className='categoria'>item</span>
                    <span className='categoria'>item</span>
                  </div>
              </div>
              <span className='categoria'>item</span>
              <span className='categoria'>item</span>
              <span className='categoria'>item</span>
              <span className='categoria'>item</span>
            </div>
        </div>
      </div>
    </div>
  )
}