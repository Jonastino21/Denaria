import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiEye, FiEdit, FiTrash2, FiX, FiSave, FiUpload } from 'react-icons/fi';
import { salesData, productsMock, categories, statuses } from '../../../data/productsMock';

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEntries, setShowEntries] = useState(7);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-danger';
      default:
        return 'text-muted';
    }
  };

  const filteredProducts = productsMock.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, showEntries);

  const isAllSelected = filteredProducts.length > 0 && selectedProducts.length === filteredProducts.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    }
  };

  const toggleSelectOne = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((pid) => pid !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setModalMode('view');
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product });
    setModalMode('edit');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setEditedProduct(null);
  };

  const handleSaveProduct = () => {
    console.log('Produit sauvegardé:', editedProduct);
    setShowModal(false);
    setSelectedProduct(null);
    setEditedProduct(null);
  };

  const handleInputChange = (field, value) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Disponible: 'bg-success',
      'Stock faible': 'bg-warning',
      Rupture: 'bg-danger',
      Discontinué: 'bg-secondary',
    };
    return statusConfig[status] || 'bg-secondary';
  };

  return (
    <div className='container min-vh-100 py-4'>
      <div className='container'>
        <div className='row mb-4'>
          {salesData.map((item, index) => (
            <div key={index} className='col-md-6 col-lg-3 mb-3'>
              <div className='card h-100 shadow-sm border-0'>
                <div className='card-body d-flex justify-content-between align-items-start'>
                  <div className='flex-grow-1'>
                    <div className='d-flex justify-content-between align-items-start mb-2'>
                      <h6 className='card-title text-muted mb-0 small'>{item.title}</h6>
                    </div>
                    <h3 className='mb-1 fw-bold'>{item.amount}</h3>
                    <div className='d-flex justify-content-between align-items-center'>
                      <small className='text-muted'>{item.orders}</small>
                      {item.change && <small className={`fw-bold ${getChangeColor(item.changeType)}`}>{item.change}</small>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='card shadow-sm border-0'>
          <div className='card-body'>
            <div className='row align-items-center mb-4 g-2'>
              <div className='col-md-4'>
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

              <div className='col-md-4'></div>
              <div className='col-md-1'>
                <select className='form-select form-select-sm' value={showEntries} onChange={(e) => setShowEntries(Number(e.target.value))} style={{ height: 40 }}>
                  <option value={7}>7</option>
                  <option value={15}>15</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div className='col-md-3'>
                <div className='d-flex gap-2'>
                  <button className='btn btn-outline-secondary btn-sm flex-fill' style={{ height: 40 }}>
                    <i className='fas fa-download me-1'></i>
                    Exporter
                  </button>
                  <a href='/admin/products/add' style={{ textDecoration: 'none' }}>
                    <button className='btn btn-primary btn-sm flex-fill' style={{ height: 40 }}>
                      <i className='fas fa-plus me-1'></i>
                      Ajouter un produit
                    </button>
                  </a>
                </div>
              </div>
            </div>

            <div className='table-responsive text-center'>
              <table className='table table-hover'>
                <thead className='table'>
                  <tr>
                    <th scope='col' width='50'>
                      <input type='checkbox' className='form-check-input' checked={isAllSelected} onChange={toggleSelectAll} />
                    </th>
                    <th scope='col'>PRODUIT</th>
                    <th scope='col'>CATÉGORIE</th>
                    <th scope='col'>STOCK</th>
                    <th scope='col'>SKU</th>
                    <th scope='col'>PRIX</th>
                    <th scope='col'>QTÉ</th>
                    <th scope='col'>STATUT</th>
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
                  ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <input type='checkbox' className='form-check-input' checked={selectedProducts.includes(product.id)} onChange={() => toggleSelectOne(product.id)} />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.stock}</td>
                        <td>{product.sku}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>
                          <span className={`badge ${getStatusBadge(product.status)}`}>{product.status}</span>
                        </td>
                        <td>
                          <button className='btn btn-sm btn-outline-secondary me-2' title='Voir' onClick={() => handleViewProduct(product)}>
                            <FiEye />
                          </button>
                          <button className='btn btn-sm btn-outline-primary me-2' title='Modifier' onClick={() => handleEditProduct(product)}>
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
                Affichage de {filteredProducts.length > 0 ? 1 : 0} à {filteredProducts.length} sur {productsMock.length} entrées
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
        </div>
      </div>

      {showModal && selectedProduct && (
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
                    <button type='button' className='btn btn-sm btn-success' onClick={handleSaveProduct}>
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
                        <img src={selectedProduct.image} alt={selectedProduct.name} className='img-fluid rounded shadow-sm' style={{ maxHeight: '250px', objectFit: 'cover' }} />
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
                        <label className='form-label fw-semibold'>Nom du produit</label>
                        {modalMode === 'view' ? (
                          <div className='bg-light rounded p-2'>{selectedProduct.name}</div>
                        ) : (
                          <input type='text' className='form-control' value={editedProduct.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                        )}
                      </div>

                      <div className='col-md-6'>
                        <label className='form-label fw-semibold'>Catégorie</label>
                        {modalMode === 'view' ? (
                          <div className='bg-light rounded p-2'>{selectedProduct.category}</div>
                        ) : (
                          <select className='form-select' value={editedProduct.category} onChange={(e) => handleInputChange('category', e.target.value)}>
                            {categories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>

                      <div className='col-md-4'>
                        <label className='form-label fw-semibold'>SKU</label>
                        {modalMode === 'view' ? (
                          <div className='bg-light rounded p-2'>{selectedProduct.sku}</div>
                        ) : (
                          <input type='text' className='form-control' value={editedProduct.sku} onChange={(e) => handleInputChange('sku', e.target.value)} />
                        )}
                      </div>

                      <div className='col-md-4'>
                        <label className='form-label fw-semibold'>Prix</label>
                        {modalMode === 'view' ? (
                          <div className='bg-light rounded p-2'>{selectedProduct.price}</div>
                        ) : (
                          <input type='text' className='form-control' value={editedProduct.price} onChange={(e) => handleInputChange('price', e.target.value)} />
                        )}
                      </div>

                      <div className='col-md-4'>
                        <label className='form-label fw-semibold'>Stock</label>
                        {modalMode === 'view' ? (
                          <div className='bg-light rounded p-2'>{selectedProduct.stock}</div>
                        ) : (
                          <input type='number' className='form-control' value={editedProduct.stock} onChange={(e) => handleInputChange('stock', parseInt(e.target.value))} />
                        )}
                      </div>

                      <div className='col-12'>
                        <label className='form-label fw-semibold'>Description</label>
                        {modalMode === 'view' ? (
                          <div className='bg-light rounded p-2'>{selectedProduct.description}</div>
                        ) : (
                          <textarea className='form-control' rows='3' value={editedProduct.description} onChange={(e) => handleInputChange('description', e.target.value)} />
                        )}
                      </div>

                      <div className='col-md-6'>
                        <label className='form-label fw-semibold'>Poids</label>
                        {modalMode === 'view' ? (
                          <div className='bg-light rounded p-2'>{selectedProduct.weight}</div>
                        ) : (
                          <input type='text' className='form-control' value={editedProduct.weight} onChange={(e) => handleInputChange('weight', e.target.value)} />
                        )}
                      </div>

                      <div className='col-md-6'>
                        <label className='form-label fw-semibold'>Dimensions</label>
                        {modalMode === 'view' ? (
                          <div className='bg-light rounded p-2'>{selectedProduct.dimensions}</div>
                        ) : (
                          <input type='text' className='form-control' value={editedProduct.dimensions} onChange={(e) => handleInputChange('dimensions', e.target.value)} />
                        )}
                      </div>

                      <div className='col-md-6'>
                        <label className='form-label fw-semibold'>Couleur</label>
                        {modalMode === 'view' ? (
                          <div className='bg-light rounded p-2'>{selectedProduct.color}</div>
                        ) : (
                          <input type='text' className='form-control' value={editedProduct.color} onChange={(e) => handleInputChange('color', e.target.value)} />
                        )}
                      </div>

                      <div className='col-md-6'>
                        <label className='form-label fw-semibold'>Statut</label>
                        {modalMode === 'view' ? (
                          <div className='mt-1'>
                            <span className={`badge ${getStatusBadge(selectedProduct.status)} fs-6`}>{selectedProduct.status}</span>
                          </div>
                        ) : (
                          <select className='form-select' value={editedProduct.status} onChange={(e) => handleInputChange('status', e.target.value)}>
                            {statuses.map((status) => (
                              <option key={status.value} value={status.value}>
                                {status.label}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-4'>
                  <h6 className='fw-semibold mb-3'>Informations supplémentaires</h6>
                  <div className='row g-3'>
                    <div className='col-md-3'>
                      <small className='text-muted'>Fournisseur</small>
                      <div>{selectedProduct.supplier}</div>
                    </div>
                    <div className='col-md-3'>
                      <small className='text-muted'>Garantie</small>
                      <div>{selectedProduct.warranty}</div>
                    </div>
                    <div className='col-md-3'>
                      <small className='text-muted'>Créé le</small>
                      <div>{selectedProduct.createdAt}</div>
                    </div>
                    <div className='col-md-3'>
                      <small className='text-muted'>Modifié le</small>
                      <div>{selectedProduct.updatedAt}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css' />
    </div>
  );
};

export default ProductManagement;
