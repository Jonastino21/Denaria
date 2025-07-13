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
    <div className='navbar-container container p-0'>
      <Navbar
        expand='xl'
        className='layout-navbar navbar-detached bg-white shadow-sm rounded-3 mx-4 my-3 px-4'
        style={{
          position: 'sticky',
          top: '1rem',
          zIndex: 1020,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95) !important',
        }}>
        <div className='d-flex align-items-center d-xl-none me-3'>
          <Button variant='link' className='p-0 text-muted'>
            <Menu size={20} />
          </Button>
        </div>

        <div className='flex-grow-1 d-flex align-items-center me-4'>
          <div className='search-wrapper position-relative'>
            <Search size={16} className='position-absolute text-muted' style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <Form.Control type='text' placeholder='Search (Ctrl+/)' className='ps-5 border-0 bg-light rounded-pill' style={{ minWidth: '300px' }} />
          </div>
        </div>

        <Nav className='d-flex flex-row align-items-center gap-2'>
          <Dropdown align='end'>
            <Dropdown.Toggle as='button' className='btn btn-light btn-sm rounded-pill d-flex align-items-center justify-content-center' style={{ width: '40px', height: '40px', border: 'none' }}>
              <Languages size={18} />
            </Dropdown.Toggle>
            <Dropdown.Menu className='shadow-lg border-0 rounded-3' style={{ minWidth: '200px' }}>
              <div className='dropdown-header py-3 px-3 border-bottom'>
                <h6 className='mb-0 fw-semibold'>Sélectionnez une langue</h6>
              </div>
              <div className='p-2'>
                <Dropdown.Item className='rounded-2 p-2 mb-1'>
                  <div>
                    <div className='fw-medium'>English</div>
                    <small className='text-muted'>Default</small>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item className='rounded-2 p-2 mb-1'>
                  <div>
                    <div className='fw-medium'>Français</div>
                    <small className='text-muted'>French</small>
                  </div>
                </Dropdown.Item>
              </div>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown align='end'>
            <Dropdown.Toggle as='button' className='btn btn-light btn-sm rounded-pill d-flex align-items-center justify-content-center' style={{ width: '40px', height: '40px', border: 'none' }}>
              <Sun size={18} />
            </Dropdown.Toggle>
            <Dropdown.Menu className='shadow-lg border-0 rounded-3' style={{ minWidth: '180px' }}>
              <div className='dropdown-header py-3 px-3 border-bottom'>
                <h6 className='mb-0 fw-semibold'>Thème</h6>
              </div>
              <div className='p-2'>
                <Dropdown.Item className='rounded-2 p-2 mb-1'>
                  <div className='d-flex align-items-center'>
                    <div className='me-3 bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center' style={{ width: '32px', height: '32px' }}>
                      <Sun size={16} className='text-warning' />
                    </div>
                    <div>
                      <div className='fw-medium'>Light</div>
                      <small className='text-muted'>Default theme</small>
                    </div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item className='rounded-2 p-2 mb-1'>
                  <div className='d-flex align-items-center'>
                    <div className='me-3 bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center' style={{ width: '32px', height: '32px' }}>
                      <Moon size={16} className='text-primary' />
                    </div>
                    <div>
                      <div className='fw-medium'>Dark</div>
                      <small className='text-muted'>Dark theme</small>
                    </div>
                  </div>
                </Dropdown.Item>
              </div>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown align='end'>
            <Dropdown.Toggle as='button' className='btn btn-light btn-sm rounded-pill d-flex align-items-center justify-content-center' style={{ width: '40px', height: '40px', border: 'none' }}>
              <AppWindow size={18} />
            </Dropdown.Toggle>
            <Dropdown.Menu className='shadow-lg border-0 rounded-3' style={{ minWidth: '280px' }}>
              <div className='dropdown-header d-flex align-items-center justify-content-between py-3 px-3 border-bottom'>
                <h6 className='mb-0 fw-semibold'>Raccourcis</h6>
                <Button variant='link' className='p-0 text-muted'>
                  <Plus size={16} />
                </Button>
              </div>
              <div className='p-3'>
                <div className='row g-3'>
                  <div className='col-6'>
                    <a href='#!' className='d-flex flex-column align-items-center text-decoration-none p-3 rounded-3 border border-light-subtle hover-bg-light transition-all'>
                      <div className='mb-2 bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center' style={{ width: '48px', height: '48px' }}>
                        <Calendar size={24} className='text-primary' />
                      </div>
                      <small className='text-dark fw-medium'>Calendrier</small>
                    </a>
                  </div>
                  <div className='col-6'>
                    <a href='#!' className='d-flex flex-column align-items-center text-decoration-none p-3 rounded-3 border border-light-subtle hover-bg-light transition-all'>
                      <div className='mb-2 bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center' style={{ width: '48px', height: '48px' }}>
                        <FileText size={24} className='text-success' />
                      </div>
                      <small className='text-dark fw-medium'>Facture</small>
                    </a>
                  </div>
                  <div className='col-6'>
                    <a href='#!' className='d-flex flex-column align-items-center text-decoration-none p-3 rounded-3 border border-light-subtle hover-bg-light transition-all'>
                      <div className='mb-2 bg-info bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center' style={{ width: '48px', height: '48px' }}>
                        <User size={24} className='text-info' />
                      </div>
                      <small className='text-dark fw-medium'>Utilisateur</small>
                    </a>
                  </div>
                  <div className='col-6'>
                    <a href='#!' className='d-flex flex-column align-items-center text-decoration-none p-3 rounded-3 border border-light-subtle hover-bg-light transition-all'>
                      <div className='mb-2 bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center' style={{ width: '48px', height: '48px' }}>
                        <Users size={24} className='text-warning' />
                      </div>
                      <small className='text-dark fw-medium'>Rôles</small>
                    </a>
                  </div>
                </div>
              </div>
              <div className='dropdown-footer border-top p-3'>
                <Button variant='outline-primary' size='sm' className='w-100'>
                  Voir tous les raccourcis
                </Button>
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown align='end'>
            <Dropdown.Toggle
              as='button'
              className='btn btn-light btn-sm rounded-pill d-flex align-items-center justify-content-center position-relative'
              style={{ width: '40px', height: '40px', border: 'none' }}>
              <Bell size={18} />
              <Badge pill bg='danger' className='position-absolute top-0 end-0 translate-middle p-1 border border-light' style={{ fontSize: '0.5rem' }}>
                <span className='visually-hidden'>New alerts</span>
              </Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu className='shadow-lg border-0 rounded-3' style={{ minWidth: '320px' }}>
              <div className='dropdown-header d-flex align-items-center justify-content-between py-3 px-3 border-bottom'>
                <h6 className='mb-0 fw-semibold'>Notifications</h6>
                <div className='d-flex align-items-center'>
                  <Badge bg='primary' className='me-2 px-2 py-1 rounded-pill'>
                    8 Nouveau
                  </Badge>
                  <Button variant='link' className='p-0 text-muted'>
                    <MailOpen size={16} />
                  </Button>
                </div>
              </div>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <div className='d-flex align-items-start p-3 border-bottom'>
                  <div className='position-relative me-3'>
                    <Image src={Avatar} roundedCircle width={40} height={40} />
                    <Badge bg='success' className='position-absolute top-0 end-0 p-1 rounded-circle border border-white' />
                  </div>
                  <div className='flex-grow-1'>
                    <div className='d-flex justify-content-between align-items-start mb-1'>
                      <p className='mb-0 fw-medium text-dark'>John Doe</p>
                      <small className='text-muted'>1 heure</small>
                    </div>
                    <p className='mb-0 text-muted small'>Lorem ipsum dolos....</p>
                  </div>
                  <Button variant='link' className='p-0 text-muted ms-2'>
                    <X size={14} />
                  </Button>
                </div>
                <div className='d-flex align-items-start p-3 border-bottom'>
                  <div className='position-relative me-3'>
                    <div className='bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center' style={{ width: '40px', height: '40px' }}>
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
                  <Button variant='link' className='p-0 text-muted ms-2'>
                    <X size={14} />
                  </Button>
                </div>
                <div className='d-flex align-items-start p-3'>
                  <div className='position-relative me-3'>
                    <div className='bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center' style={{ width: '40px', height: '40px' }}>
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
                  <Button variant='link' className='p-0 text-muted ms-2'>
                    <X size={14} />
                  </Button>
                </div>
              </div>
              <div className='dropdown-footer border-top p-3'>
                <Button variant='outline-primary' size='sm' className='w-100'>
                  Voir toutes les notifications
                </Button>
              </div>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown align='end'>
            <Dropdown.Toggle as='button' className='btn p-0 border-0 bg-transparent'>
              <div className='position-relative'>
                <Image src={Avatar} roundedCircle width={40} height={40} className='border border-light' />
                <Badge bg='success' className='position-absolute bottom-0 end-0 p-1 rounded-circle border border-white' />
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className='shadow-lg border-0 rounded-3' style={{ minWidth: '240px' }}>
              <div className='dropdown-header p-3 border-bottom'>
                <div className='d-flex align-items-center'>
                  <div className='position-relative me-3'>
                    <Image src={Avatar} roundedCircle width={48} height={48} />
                    <Badge bg='success' className='position-absolute bottom-0 end-0 p-1 rounded-circle border border-white' />
                  </div>
                  <div>
                    <h6 className='mb-0 fw-semibold'>John Doe</h6>
                    <small className='text-muted'>Administrateur</small>
                    <div className='mt-1'>
                      <Badge bg='primary' className='px-2 py-1 rounded-pill'>
                        Pro Plan
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <div className='p-2'>
                <Dropdown.Item className='rounded-2 p-2 mb-1'>
                  <div className='d-flex align-items-center'>
                    <div className='me-3 bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center' style={{ width: '32px', height: '32px' }}>
                      <User size={16} className='text-primary' />
                    </div>
                    <div>
                      <div className='fw-medium'>Mon profile</div>
                      <small className='text-muted'>Paramètres de comptes</small>
                    </div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item className='rounded-2 p-2 mb-1'>
                  <div className='d-flex align-items-center'>
                    <div className='me-3 bg-info bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center' style={{ width: '32px', height: '32px' }}>
                      <Settings size={16} className='text-info' />
                    </div>
                    <div>
                      <div className='fw-medium'>Paramètres</div>
                      <small className='text-muted'>Préférences</small>
                    </div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item className='rounded-2 p-2 mb-1'>
                  <div className='d-flex align-items-center'>
                    <div className='me-3 bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center' style={{ width: '32px', height: '32px' }}>
                      <DollarSign size={16} className='text-success' />
                    </div>
                    <div>
                      <div className='fw-medium'>Facturation</div>
                      <small className='text-muted'>Gestion d'abonnement</small>
                    </div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item className='rounded-2 p-2 mb-1'>
                  <div className='d-flex align-items-center'>
                    <div className='me-3 bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center' style={{ width: '32px', height: '32px' }}>
                      <HelpCircle size={16} className='text-warning' />
                    </div>
                    <div>
                      <div className='fw-medium'>Aide & FAQ</div>
                      <small className='text-muted'>Obtenir de l'aide</small>
                    </div>
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

        <Modal show={showLogoutModal} onHide={handleLogoutCancel} centered>
          <Modal.Header closeButton className='border-0'>
            <Modal.Title className='d-flex align-items-center'>
              <AlertTriangle size={24} className='text-warning me-2' />
              Confirmer la déconnexion
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='pt-0'>
            <p className='mb-3 text-muted'>Êtes-vous sûr de vouloir vous déconnecter de votre compte ?</p>
            <div className='d-flex align-items-center p-3 bg-light rounded-3'>
              <Image src={Avatar} roundedCircle width={40} height={40} className='me-3' />
              <div>
                <h6 className='mb-0 fw-semibold'>John Doe</h6>
                <small className='text-muted'>john.doe@example.com</small>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className='border-0'>
            <Button variant='light' onClick={handleLogoutCancel} disabled={isLoggingOut}>
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
    </div>
  );
}
