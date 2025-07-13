import React, { useState } from 'react';
import { Navbar, Nav, Dropdown, Badge, Button, Image, Form, Modal } from 'react-bootstrap';
import Avatar from '../../assets/img/avatars/14.png';
import {
  Menu,
  Search,
  Languages,
  Sun,
  Moon,
  Monitor,
  AppWindow,
  Plus,
  Calendar,
  FileText,
  User,
  Users,
  Settings,
  MailOpen,
  DollarSign,
  HelpCircle,
  LogOut,
  Bell,
  X,
  AlertTriangle,
} from 'lucide-react';
import './navbar.css';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function LayoutNavbar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);

    try {
      // Simulation de la déconnexion
      await new Promise((resolve) => setTimeout(resolve, 1500));

      logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      setIsLoggingOut(false);
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };
  return (
    <Navbar expand='xl' className='layout-navbar sticky-navbar  custom-navbar-border container navbar-detached align-items-center bg-navbar-theme' id='layout-navbar'>
      <div className='layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none'>
        <a className='nav-item nav-link px-0 me-xl-4' href='#!'>
          <Menu size={20} />
        </a>
      </div>

      <Navbar.Collapse id='navbar-collapse' className='navbar-nav-right d-flex align-items-center'>
        <Nav className='navbar-nav align-items-center'>
          <Nav.Item className='navbar-search-wrapper mb-0'>
            <a className='nav-item nav-link search-toggler d-flex align-items-center px-0' href='#!'>
              <Search size={20} className='me-2 me-lg-4' />
              <span className='d-none d-md-inline-block text-muted fw-normal'>Rechercher (Ctrl+/)</span>
            </a>
          </Nav.Item>
        </Nav>

        <Nav className='navbar-nav flex-row align-items-center ms-auto'>
          <Dropdown align='end' className='btn btn-text-secondary btn-icon rounded-pill'>
            <Dropdown.Toggle as='a' className='nav-link'>
              <Languages size={20} />
            </Dropdown.Toggle>
            <Dropdown.Menu className='p-0' style={{ minWidth: '200px' }}>
              <div className='dropdown-header py-3 px-3 border-bottom'>
                <h6 className='mb-0 fw-semibold'>Sélectionnez une langue</h6>
              </div>
              <div className='p-2'>
                <Dropdown.Item href='#!' className='d-flex align-items-center p-2 rounded-2 mb-1'>
                  <div>
                    <div className='fw-medium'>English</div>
                    <small className='text-muted'>Default</small>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item href='#!' className='d-flex align-items-center p-2 rounded-2 mb-1'>
                  <div>
                    <div className='fw-medium'>Français</div>
                    <small className='text-muted'>French</small>
                  </div>
                </Dropdown.Item>
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown align='end' className='btn btn-text-secondary btn-icon rounded-pill'>
            <Dropdown.Toggle as='a' className='nav-link'>
              <Sun size={20} />
            </Dropdown.Toggle>
            <Dropdown.Menu className='p-0' style={{ minWidth: '180px' }}>
              <div className='dropdown-header py-3 px-3 border-bottom'>
                <h6 className='mb-0 fw-semibold'>Thème</h6>
              </div>
              <div className='p-2'>
                <Dropdown.Item href='#!' className='d-flex align-items-center p-2 rounded-2 mb-1'>
                  <div className='d-flex align-items-center justify-content-center me-3 bg-warning bg-opacity-10 rounded-circle' style={{ width: '32px', height: '32px' }}>
                    <Sun size={16} className='text-warning' />
                  </div>
                  <div>
                    <div className='fw-medium'>Light</div>
                    <small className='text-muted'>Default theme</small>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item href='#!' className='d-flex align-items-center p-2 rounded-2 mb-1'>
                  <div className='d-flex align-items-center justify-content-center me-3 bg-primary bg-opacity-10 rounded-circle' style={{ width: '32px', height: '32px' }}>
                    <Moon size={16} className='text-primary' />
                  </div>
                  <div>
                    <div className='fw-medium'>Dark</div>
                    <small className='text-muted'>Dark theme</small>
                  </div>
                </Dropdown.Item>
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown align='end' className='nav-item dropdown-shortcuts navbar-dropdown dropdown'>
            <Dropdown.Toggle as='a' className='nav-link btn btn-text-secondary btn-icon rounded-pill'>
              <AppWindow size={20} />
            </Dropdown.Toggle>
            <Dropdown.Menu className='p-0 dropdown-menu-end' style={{ minWidth: '280px' }}>
              <div className='dropdown-header d-flex align-items-center justify-content-between py-3 px-3 border-bottom'>
                <h6 className='mb-0 fw-semibold'>Raccourçis</h6>
                <a href='#!' className='text-muted hover-primary'>
                  <Plus size={16} />
                </a>
              </div>
              <div className='p-3'>
                <div className='row g-3'>
                  <div className='col-6'>
                    <a href='#!' className='d-flex flex-column align-items-center text-decoration-none p-3 rounded-3 border border-light hover-bg-light transition-all'>
                      <div className='d-flex align-items-center justify-content-center mb-2 bg-primary bg-opacity-10 rounded-circle' style={{ width: '48px', height: '48px' }}>
                        <Calendar size={24} className='text-primary' />
                      </div>
                      <small className='text-dark fw-medium'>Calendrier</small>
                    </a>
                  </div>
                  <div className='col-6'>
                    <a href='#!' className='d-flex flex-column align-items-center text-decoration-none p-3 rounded-3 border border-light hover-bg-light transition-all'>
                      <div className='d-flex align-items-center justify-content-center mb-2 bg-success bg-opacity-10 rounded-circle' style={{ width: '48px', height: '48px' }}>
                        <FileText size={24} className='text-success' />
                      </div>
                      <small className='text-dark fw-medium'>Facture</small>
                    </a>
                  </div>
                  <div className='col-6'>
                    <a href='#!' className='d-flex flex-column align-items-center text-decoration-none p-3 rounded-3 border border-light hover-bg-light transition-all'>
                      <div className='d-flex align-items-center justify-content-center mb-2 bg-info bg-opacity-10 rounded-circle' style={{ width: '48px', height: '48px' }}>
                        <User size={24} className='text-info' />
                      </div>
                      <small className='text-dark fw-medium'>Utilisateur</small>
                    </a>
                  </div>
                  <div className='col-6'>
                    <a href='#!' className='d-flex flex-column align-items-center text-decoration-none p-3 rounded-3 border border-light hover-bg-light transition-all'>
                      <div className='d-flex align-items-center justify-content-center mb-2 bg-warning bg-opacity-10 rounded-circle' style={{ width: '48px', height: '48px' }}>
                        <Users size={24} className='text-warning' />
                      </div>
                      <small className='text-dark fw-medium'>Rôles</small>
                    </a>
                  </div>
                </div>
              </div>
              <div className='dropdown-footer border-top p-3'>
                <Button variant='outline-primary' size='sm' className='w-100'>
                  Voir tous les raccourçis
                </Button>
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown align='end' className='nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-2'>
            <Dropdown.Toggle as='a' className='nav-link btn btn-text-secondary btn-icon rounded-pill'>
              <span className='position-relative'>
                <Bell size={20} />
                <Badge pill bg='danger' className='badge-dot badge-notifications border' />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className='dropdown-menu-end p-0' style={{ minWidth: '320px' }}>
              <div className='dropdown-header d-flex align-items-center justify-content-between py-3 px-3 border-bottom'>
                <h6 className='mb-0 fw-semibold'>Notifications</h6>
                <div className='d-flex align-items-center'>
                  <Badge bg='primary' className='me-2 px-2'>
                    8 Nouveau
                  </Badge>
                  <a href='#!' className='text-muted hover-primary'>
                    <MailOpen size={16} />
                  </a>
                </div>
              </div>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <div className='d-flex align-items-start p-3 border-bottom notification-item'>
                  <div className='position-relative me-3'>
                    <Image src={Avatar} roundedCircle width={40} height={40} />
                    <Badge bg='success' className='position-absolute top-0 end-0 badge-dot border border-white' />
                  </div>
                  <div className='flex-grow-1'>
                    <div className='d-flex justify-content-between align-items-start mb-1'>
                      <p className='mb-0 fw-medium text-dark'>John Doe</p>
                      <small className='text-muted'>1 heure</small>
                    </div>
                    <p className='mb-0 text-muted small'>Lorem ipsum dolos....</p>
                  </div>
                  <a href='#!' className='text-muted ms-2'>
                    <X size={14} />
                  </a>
                </div>
                <div className='d-flex align-items-start p-3 border-bottom notification-item'>
                  <div className='position-relative me-3'>
                    <div className='d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle' style={{ width: '40px', height: '40px' }}>
                      <User size={20} className='text-primary' />
                    </div>
                  </div>
                  <div className='flex-grow-1'>
                    <div className='d-flex justify-content-between align-items-start mb-1'>
                      <p className='mb-0 fw-medium text-dark'>Nouveau Utilisateur</p>
                      <small className='text-muted'>2 heures</small>
                    </div>
                    <p className='mb-0 text-muted small'>Sarah Johnson lorem ipsum dolos site</p>
                  </div>
                  <a href='#!' className='text-muted ms-2'>
                    <X size={14} />
                  </a>
                </div>
                <div className='d-flex align-items-start p-3 notification-item'>
                  <div className='position-relative me-3'>
                    <div className='d-flex align-items-center justify-content-center bg-warning bg-opacity-10 rounded-circle' style={{ width: '40px', height: '40px' }}>
                      <Settings size={20} className='text-warning' />
                    </div>
                  </div>
                  <div className='flex-grow-1'>
                    <div className='d-flex justify-content-between align-items-start mb-1'>
                      <p className='mb-0 fw-medium text-dark'>Mise à jour système</p>
                      <small className='text-muted'>1 jour</small>
                    </div>
                    <p className='mb-0 text-muted small'>lorem ipsum dolores</p>
                  </div>
                  <a href='#!' className='text-muted ms-2'>
                    <X size={14} />
                  </a>
                </div>
              </div>
              <div className='dropdown-footer border-top p-3'>
                <Button variant='outline-primary' size='sm' className='w-100'>
                  Voir toutes les notifications
                </Button>
              </div>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown align='end' className='nav-item navbar-dropdown dropdown-user dropdown'>
            <Dropdown.Toggle as='a' className='nav-link'>
              <div className='avatar avatar-online position-relative'>
                <Image src={Avatar} roundedCircle width={40} height={40} />
                <Badge bg='success' className='position-absolute bottom-0 end-0 badge-dot border border-white' />
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu align='end' className='p-0' style={{ minWidth: '240px' }}>
              <div className='dropdown-header p-3 border-bottom'>
                <div className='d-flex align-items-center'>
                  <div className='position-relative me-3'>
                    <Image src={Avatar} roundedCircle width={48} height={48} />
                    <Badge bg='success' className='position-absolute bottom-0 end-0 badge-dot border border-white' />
                  </div>
                  <div>
                    <h6 className='mb-0 fw-semibold'>John Doe</h6>
                    <small className='text-muted'>Administrateur</small>
                    <div className='mt-1'>
                      <Badge bg='primary' className='badge-sm'>
                        Pro Plan
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <div className='p-2'>
                <Dropdown.Item href='#!' className='d-flex align-items-center p-2 rounded-2 mb-1'>
                  <div className='d-flex align-items-center justify-content-center me-3 bg-primary bg-opacity-10 rounded-circle' style={{ width: '32px', height: '32px' }}>
                    <User size={16} className='text-primary' />
                  </div>
                  <div>
                    <div className='fw-medium'>Mon profile</div>
                    <small className='text-muted'>Paramètres de comptes</small>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item href='#!' className='d-flex align-items-center p-2 rounded-2 mb-1'>
                  <div className='d-flex align-items-center justify-content-center me-3 bg-info bg-opacity-10 rounded-circle' style={{ width: '32px', height: '32px' }}>
                    <Settings size={16} className='text-info' />
                  </div>
                  <div>
                    <div className='fw-medium'>Paramètres</div>
                    <small className='text-muted'>Préférences</small>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item href='#!' className='d-flex align-items-center p-2 rounded-2 mb-1'>
                  <div className='d-flex align-items-center justify-content-center me-3 bg-success bg-opacity-10 rounded-circle' style={{ width: '32px', height: '32px' }}>
                    <DollarSign size={16} className='text-success' />
                  </div>
                  <div>
                    <div className='fw-medium'>Facturation</div>
                    <small className='text-muted'>Gestion d'abonnement</small>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item href='#!' className='d-flex align-items-center p-2 rounded-2 mb-1'>
                  <div className='d-flex align-items-center justify-content-center me-3 bg-warning bg-opacity-10 rounded-circle' style={{ width: '32px', height: '32px' }}>
                    <HelpCircle size={16} className='text-warning' />
                  </div>
                  <div>
                    <div className='fw-medium'>Aide & FAQ</div>
                    <small className='text-muted'>Obtenir de l'aide</small>
                  </div>
                </Dropdown.Item>
              </div>
              <div className='dropdown-footer border-top p-3'>
                <Button variant='outline-danger' size='sm' className='w-100 d-flex align-items-center justify-content-center' onClick={handleLogoutClick}>
                  <LogOut size={16} className='me-2' />
                  Se déconnecter
                </Button>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>

      <div className='navbar-search-wrapper search-input-wrapper d-none'>
        <Form.Control type='text' placeholder='Search...' aria-label='Search...' />
        <X size={16} className='cursor-pointer' />
      </div>

      <Modal show={showLogoutModal} onHide={handleLogoutCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title className='d-flex align-items-center'>
            <AlertTriangle size={24} className='text-warning me-2' />
            Confirmer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='mb-3'>Êtes-vous sûr de vouloir vous déconnecter de votre compte ?</p>
          <div className='d-flex align-items-center p-3 bg-light rounded'>
            <Image src={Avatar} roundedCircle width={40} height={40} className='me-3' />
            <div>
              <h6 className='mb-0'>John Doe</h6>
              <small className='text-muted'>john.doe@example.com</small>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleLogoutCancel} disabled={isLoggingOut}>
            Annuler
          </Button>
          <Button variant='danger' onClick={handleLogoutConfirm} disabled={isLoggingOut} className='d-flex align-items-center'>
            {isLoggingOut ? (
              <>
                <div className='spinner-border spinner-border-sm me-2' role='status'>
                  <span className='visually-hidden'>Chargement...</span>
                </div>
                Déconnexion...
              </>
            ) : (
              <>
                <LogOut size={16} className='me-2' />
                Se déconnecter
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}
