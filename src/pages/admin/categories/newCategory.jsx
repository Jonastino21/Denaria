import React, { useState, useEffect } from 'react';
import { Plus, Upload, Bold, Italic, Underline, List, AlignLeft, Link, Image } from 'lucide-react';
import { FiEye, FiEdit, FiTrash2, FiX, FiSave, FiUpload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Category from '../../../api/Category';
import { productsMock } from '../../../data/productsMock';

const NewCategory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showEntries, setShowEntries] = useState(5);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategorys, setSelectedCategorys] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('view');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [editedCategory, setEditedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [submitted, setSubmitted] = useState(false);

  const [category, setCategory] = useState({
    name: '',
    description: "",

  });

  useEffect(() => {
    Category()
          .then(data => setCategories(data))
          .catch(error => console.error(error));

    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);


  const navigate = useNavigate();

   const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedCategorys([]);
    } else {
      setSelectedCategorys(filteredCategorys.map((p) => p.id));
    }
  };

  const toggleSelectOne = (id) => {
    if (selectedCategorys.includes(id)) {
      setSelectedCategorys(selectedCategorys.filter((pid) => pid !== id));
    } else {
      setSelectedCategorys([...selectedCategorys, id]);
    }
  };

  // const getStatusBadge = (status) => {
  //   const statusConfig = {
  //     Disponible: 'bg-success',
  //     'Stock faible': 'bg-warning',
  //     Rupture: 'bg-danger',
  //     Discontinué: 'bg-secondary',
  //   };
  //   return statusConfig[status] || 'bg-secondary';
  // };

  const handleViewCategory = (Category) => {
    setSelectedCategory(Category);
    setModalMode('view');
    setShowModal(true);
  };

  const handleEditCategory = (Category) => {
    setSelectedCategory(Category);
    setEditedCategory({ ...Category });
    setModalMode('edit');
    setShowModal(true);
  };

   const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
    setEditedCategory(null);
  };

  const handleSaveCategory = () => {
    console.log('Produit sauvegardé:', editedCategory);
    setShowModal(false);
    setSelectedCategory(null);
    setEditedCategory(null);
  };

    const handleInputChange = (field, value) => {
        setCategory((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


  const cancelCategory = () => {
    navigate('/admin/Categorys/list');

  }

  const validateCategory = () => {
    if (!category.name.trim()) {
      toast.error("Le nom du category est obligatoire !");
      return false;
    }

    return true;
  };


  const filteredCategorys = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.createdAt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.updatedAt.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // const filteredCategorys = Category.filter();
  console.log('Filtered Categorys:', filteredCategorys);
  const isAllSelected = filteredCategorys.length > 0 && selectedCategorys.length === filteredCategorys.length;

  const buildCategoryData = () => {
  return {
    name: category.name,
    description: category.description
  };
};

function formatDateFromBackend(value) {
  const [year, month, day, hour, minute, second, nanos] = value;

  // convertir les nanos en millisecondes
  const ms = Math.floor(nanos / 1_000_000);

  const date = new Date(year, month - 1, day, hour, minute, second, ms);

  // Format dd-mm-yyyy
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replaceAll('/', '-');
}



const handleSubmit = (e) => {
  e.preventDefault();
  setSubmitted(true); // l'utilisateur a cliqué sur submit

  // Vérification simple : tous les champs requis
  if (!category.name ) {
    return; // ne fait rien si un champ est vide
  }

  publishCategory(); // sinon envoie au backend
};
  const publishCategory = async () => {
   
    if (!validateCategory()) return; // arrêt si validation échoue
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post(
          'http://localhost:9999/api/categories/create_category',
          buildCategoryData(),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      if (response.status === 201) {
        toast.success('Category ajoutée avec succès !', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setSubmitted(false);
        // reset formulaire
        setCategory({ name: "", description: "" });
        // ✅ rafraîchir la table en ajoutant la nouvelle catégorie
        setCategories(prev => [...prev, response.data]);
        
      } else {
        toast.error('Erreur lors de l\'ajout de la Category.', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la Category: ', error);
      toast.error(error.response?.data?.message || 'Erreur lors de l\'ajout de la Category.', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };



  return (
    <div className='container min-vh-100 p-4'>
      <div className='row'>
        <div className='col-12'>
          

          <div className='row'>
            <div className='col-lg-8'>
              <div className='card mb-4 p-3'>
                <div className='card-header'>
                  <h2 className='mb-1 fs-4'>Ajouter un nouveau category</h2>
                </div>
                <form >
                    <div className='card-body'>
                        <div className='mb-3'>
                            <label className='form-label'>Nom</label>

                            <input
                                type="text"
                                placeholder='Nom du category'
                                className={`form-control ${submitted && !category.name ? "is-invalid" : ""}`}
                                value={category.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                            />
                            {submitted && !category.name && (
                                <div className="invalid-feedback">Le nom de la category est requis</div>
                            )}
                            
                        </div>

                            <label className='form-label'>Description</label>
                            <input type='text' className='form-control' placeholder='Titre du produit' value={category.description} onChange={(e) => handleInputChange('description', e.target.value)} />
                        

                        </div>
                        <div className='d-flex justify-content-between align-items-center mb-4'>
                            
                            <div className='d-flex gap-2'>
                            <button className='btn btn-outline-secondary' onClick={cancelCategory}>Annuler</button>
                            {/* <button className='btn btn-outline-primary'>Enregistrer le brouillon</button> */}
                            <button onClick={handleSubmit} className='btn btn-primary fw-bold'>Sauvegarder la category</button>
                            </div>
                        </div>
                </form>
              </div>
                

            </div>
          </div>
        </div>

        
        <div className='table-responsive text-center'>
            <div className='row '>
                <div className='col-md-6'>
                    <div className='input-group'>
                        <span className='input-group-text bg-white border-end-0'>
                        <i className='fas fa-search text-muted'></i>
                        </span>
                        <input
                        type='text'
                        className='form-control border-start-0 ps-0'
                        style={{ height: 40 }}
                        placeholder='Rechercher un produit'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className='col-md-6 d-flex justify-content-end'>
                    <div className='col-md-2 '>
                    <select className='form-select form-select-sm' value={showEntries} onChange={(e) => setShowEntries(Number(e.target.value))} style={{ height: 40 }}>
                        <option value={5}>5</option>
                        <option value={15}>15</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                    </div>
                </div>
            </div>
            <table className='table table-hover mt-3'>
            <thead className='table'>
                <tr>
                <th scope='col' width='50'>
                    <input type='checkbox' className='form-check-input' checked={isAllSelected} onChange={toggleSelectAll} />
                </th>
                <th scope='col'>NAME</th>
                <th scope='col'>DESCRIPTION</th>                                   
                <th scope='col'>CREATED ON</th>
                <th scope='col'>UPATED ON</th>
                <th scope='col'>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {isLoading ? (
                <tr>
                    <td colSpan='9' className='text-center py-5'>
                    <div className='spinner-border text-primary' role='status'>
                        <span className='visually-hidden'>Chargement...</span>
                    </div>
                    <div className='mt-2 text-muted'>Chargement...</div>
                    </td>
                </tr>
                ) : filteredCategorys.length > 0 ? (
                filteredCategorys.map((Category) => (
                    <tr key={Category.id}>
                    <td>
                        <input type='checkbox' className='form-check-input' checked={selectedCategorys.includes(Category.id)} onChange={() => toggleSelectOne(Category.id)} />
                    </td>
                    <td>{Category.name}</td>
                    <td>{Category.description}</td>
                    <td>{formatDateFromBackend(Category.createdAt)}</td>
                    <td>{formatDateFromBackend(Category.updatedAt)}</td>

                    <td>
                        <button className='btn btn-sm btn-outline-secondary me-2' title='Voir' onClick={() => handleViewCategory(Category)}>
                        <FiEye />
                        </button>
                        <button className='btn btn-sm btn-outline-primary me-2' title='Modifier' onClick={() => handleEditCategory(Category)}>
                        <FiEdit />
                        </button>
                        <button className='btn btn-sm btn-outline-danger' title='Supprimer'>
                        <FiTrash2 />
                        </button>
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan='9' className='text-center py-5 text-muted'>
                    Aucun produit trouvé
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>

        <div className='d-flex justify-content-between align-items-center mt-3'>
            <div className='text-muted small'>
            Affichage de {filteredCategorys.length > 0 ? 1 : 0} à {filteredCategorys.length} sur {productsMock.length} entrées
            </div>
            <nav>
            <ul className='pagination pagination-sm mb-0'>
                <li className='page-item disabled'>
                <span className='page-link'>‹</span>
                </li>
                <li className='page-item disabled'>
                <span className='page-link'>›</span>
                </li>
            </ul>
            </nav>
        </div>
      </div>

      { showModal && selectedCategory && (
        <div className='modal fade show d-block' tabIndex='-1' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className='modal-dialog modal-xl modal-dialog-centered'>
            <div className='modal-content border-0 shadow-lg rounded-3'>
              <div className='modal-header bg-white border-bottom'>
                <div className='d-flex align-items-center'>
                  {modalMode === 'view' ? <FiEye className='me-2 text-primary' /> : <FiEdit className='me-2 text-primary' />}
                  <h5 className='modal-title mb-0'>{modalMode === 'view' ? 'Détails du produit' : 'Modifier le produit'}</h5>
                </div>
                <div className='d-flex gap-2'>
                  {modalMode === 'view' ? (
                    <button type='button' className='btn btn-sm btn-primary' onClick={() => setModalMode('edit')}>
                      <FiEdit className='me-1' /> Modifier
                    </button>
                  ) : (
                    <button type='button' className='btn btn-sm btn-success' onClick={handleSaveCategory}>
                      <FiSave className='me-1' /> Sauvegarder
                    </button>
                  )}
                  <button type='button' className='btn-close ms-2' onClick={handleCloseModal}></button>
                </div>
              </div>

              <div className='modal-body p-4'>
                <div className='row'>
                  <div className='col-md-4 mb-4'>
                    <div className='card h-100 border-0 bg-light'>
                      <div className='card-body d-flex align-items-center justify-content-center'>
                        <img src={selectedCategory.image} alt={selectedCategory.name} className='img-fluid rounded shadow-sm' style={{ maxHeight: '250px', objectFit: 'cover' }} />
                      </div>
                      {modalMode === 'edit' && (
                        <div className='card-footer bg-transparent text-center'>
                          <button className='btn btn-sm btn-outline-primary'>
                            <FiUpload className='me-1' /> Changer l'image
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='col-md-8'>
                    <div className='row g-3'>

                      <div className='col-md-6'>
                        <label className='form-label fw-semibold'>Catégorie</label>
                        {modalMode === 'view' ? (
                          <div className='bg-light rounded p-2'>{selectedCategory.category}</div>
                        ) : (
                          <select className='form-select' value={editedCategory.category} onChange={(e) => handleInputChange('category', e.target.value)}>
                            {categories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>

                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>

    
    
  );
};

export default NewCategory;
