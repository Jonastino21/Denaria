import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import LayoutNavbar from '../common/navbar';
import { HouseFill, BoxSeam, Tags, CartCheck, PeopleFill, Truck, CreditCard, PersonBadge, GearFill } from 'react-bootstrap-icons';
import Logo from '../../assets/denaria_ico.png';
import './adminlayout.css';
import { TbChevronRight, TbChevronDown } from 'react-icons/tb';
import { BsCircle } from 'react-icons/bs';

export default function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/admin/products')) {
      setIsProductMenuOpen(true);
    } else {
      setIsProductMenuOpen(false);
    }
  }, [location.pathname]);

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
                <NavLink to='/admin' end className={({ isActive }) => `nav-link d-flex align-items-center text-secondary ${isActive ? 'active-bg' : ''}`}>
                  <HouseFill className='me-2 text-secondary' />
                  <span>Tableau de bord</span>
                  <span className='badge bg-danger rounded-pill ms-auto'>5</span>
                </NavLink>
              </li>

              <li className='nav-item'>
                <div onClick={() => setIsProductMenuOpen(!isProductMenuOpen)} className='nav-link d-flex align-items-center text-secondary' style={{ cursor: 'pointer' }}>
                  <BoxSeam className='me-2 text-secondary' />
                  <span>Produits</span>
                  <span className='ms-auto fs-5 text-bold'>{isProductMenuOpen ? <TbChevronDown /> : <TbChevronRight />}</span>
                </div>

                {isProductMenuOpen && (
                  <ul className='nav flex-column gap-2 mt-1'>
                    <li className='nav-item'>
                      <NavLink to='/admin/products/list' className={({ isActive }) => `sub-link nav-link ${isActive ? 'sub-active-bg text-primary' : ''}`}>
                        <BsCircle size={10} className='me-2' />
                        Liste des produits
                      </NavLink>
                    </li>
                    <li className='nav-item'>
                      <NavLink to='/admin/products/add' className={({ isActive }) => `sub-link nav-link d-flex align-items-center ${isActive ? 'sub-active-bg text-primary' : ''}`}>
                        <BsCircle size={10} className='me-2' />
                        Ajouter un produit
                      </NavLink>
                    </li>
                    <li className='nav-item'>
                      <NavLink to='/admin/products/categories' className={({ isActive }) => `sub-link nav-link d-flex align-items-center ${isActive ? 'sub-active-bg text-primary' : ''}`}>
                        <BsCircle size={10} className='me-2' />
                        Catégorie de produits
                      </NavLink>
                    </li>
                  </ul>
                )}
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

        <main className='flex-grow-1 bg-light p-4 overflow-auto'>
          <LayoutNavbar />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
