import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import LayoutNavbar from '../common/navbar';
import { HouseFill, BoxSeam, Tags, CartCheck, PeopleFill, Truck, CreditCard, PersonBadge, GearFill } from 'react-bootstrap-icons';
import Logo from '../../assets/denaria_ico.png';
import './adminlayout.css';

export default function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <div className='d-flex flex-column vh-100'>
      <div className='d-flex flex-grow-1 overflow-hidden'>
        <aside className={`layout-menu bg-white border-end overflow-auto ${menuOpen ? '' : 'd-none d-xl-block'}`} style={{ width: '250px' }}>
          <div className='app-brand d-flex align-items-center justify-content-between px-3 py-2'>
            <NavLink to='/' className='app-brand-link d-flex align-items-center text-decoration-none'>
              <span className='app-brand-logo'>
                <img src={Logo} alt='Logo denaria' style={{ width: '80px', height: '80px' }} />
              </span>
              <span className='app-brand-text fw-bold ms-0 fs-4'>Denaria</span>
            </NavLink>

            <button onClick={() => setMenuOpen(!menuOpen)} className='btn btn-link p-0 text-decoration-none text-dark ms-auto d-xl-none'>
              {menuOpen ? <i className='ti ti-x'></i> : <i className='ti ti-menu'></i>}
            </button>
          </div>

          <div className='menu-inner-shadow'></div>

          <nav className='mt-0'>
            <ul className='nav gap-3 flex-column'>
              <li className='nav-item'>
                <NavLink to='/admin' className={({ isActive }) => `nav-link d-flex align-items-center text-secondary ${isActive ? 'active-bg' : ''}`}>
                  <HouseFill className='me-2 text-secondary' />
                  <span>Tableau de bord</span>
                  <span className='badge bg-danger rounded-pill ms-auto'>5</span>
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/admin/products' className={({ isActive }) => `nav-link d-flex align-items-center text-secondary ${isActive ? 'active-bg' : ''}`}>
                  <BoxSeam className='me-2 text-secondary' />
                  Produits
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/admin/category' className={({ isActive }) => `nav-link d-flex align-items-center text-secondary ${isActive ? 'active-bg' : ''}`}>
                  <Tags className='me-2 text-secondary' />
                  Catégories
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/admin/order' className={({ isActive }) => `nav-link d-flex align-items-center text-secondary ${isActive ? 'active-bg' : ''}`}>
                  <CartCheck className='me-2 text-secondary' />
                  Commandes
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/admin/client' className={({ isActive }) => `nav-link d-flex align-items-center text-secondary ${isActive ? 'active-bg' : ''}`}>
                  <PeopleFill className='me-2 text-secondary' />
                  Clients
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/admin/delivery' className={({ isActive }) => `nav-link d-flex align-items-center text-secondary ${isActive ? 'active-bg' : ''}`}>
                  <Truck className='me-2 text-secondary' />
                  Livraison et transporteur
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/admin/payment' className={({ isActive }) => `nav-link d-flex align-items-center text-secondary ${isActive ? 'active-bg' : ''}`}>
                  <CreditCard className='me-2 text-secondary' />
                  Paiements
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/admin/users' className={({ isActive }) => `nav-link d-flex align-items-center text-secondary ${isActive ? 'active-bg' : ''}`}>
                  <PersonBadge className='me-2 text-secondary' />
                  Utilisateurs
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/admin/setting' className={({ isActive }) => `nav-link d-flex align-items-center text-secondary ${isActive ? 'active-bg' : ''}`}>
                  <GearFill className='me-2 text-secondary' />
                  Paramètres du site
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        <main className='flex-grow-1 p-4 overflow-auto'>
          <LayoutNavbar />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
