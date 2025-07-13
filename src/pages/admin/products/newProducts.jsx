import React, { useState, useRef } from 'react';
import { Plus, Upload, Bold, Italic, Underline, List, AlignLeft, Link, Image } from 'lucide-react';

const NewProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    sku: '',
    barcode: '',
    description: '',
    basePrice: '',
    discountedPrice: '',
    chargeTax: false,
    inStock: false,
    vendor: '',
    category: '',
    collection: '',
    status: 'published',
    tags: ['Normal', 'Standard', 'Premium'],
    variants: [{ option: 'Size', value: 'Enter size' }],
    inventory: {
      quantity: 54,
      transit: 300,
      lastRestocked: '24th June, 2023',
      totalStockValue: 2430,
    },
  });

  const [activeTab, setActiveTab] = useState('restock');
  const [imagePreview, setImagePreview] = useState(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef(null);
  const [tagsInput, setTagsInput] = useState(product.tags.join(', '));

  const handleTagsChange = (e) => {
    setTagsInput(e.target.value);
    const newTags = e.target.value
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    setProduct((prev) => ({ ...prev, tags: newTags }));
  };

  const handleInputChange = (field, value) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setShowUrlInput(false);
      setImageUrl('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setShowUrlInput(false);
      setImageUrl('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUrlSubmit = () => {
    if (imageUrl) {
      setImagePreview(imageUrl);
      setShowUrlInput(false);
      setImageUrl('');
    }
  };

  const addVariant = () => {
    setProduct((prev) => ({
      ...prev,
      variants: [...prev.variants, { option: 'Size', value: 'Enter size' }],
    }));
  };

  const removeTag = (tagIndex) => {
    setProduct((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, index) => index !== tagIndex),
    }));
  };

  return (
    <div className='container min-vh-100 p-4'>
      <div className='row'>
        <div className='col-12'>
          <div className='d-flex justify-content-between align-items-center mb-4'>
            <div>
              <h2 className='mb-1 fs-4'>Ajouter un nouveau produit</h2>
              <p className='text-muted mb-0'>Commandes passées dans votre magasin</p>
            </div>
            <div className='d-flex gap-2'>
              <button className='btn btn-outline-secondary'>Annuler</button>
              {/* <button className='btn btn-outline-primary'>Enregistrer le brouillon</button> */}
              <button className='btn btn-primary'>Publier le produit</button>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-8'>
              <div className='card mb-4 p-3'>
                <div className='card-header'>
                  <h5 className='mb-0'>Informations sur le produit</h5>
                </div>
                <div className='card-body'>
                  <div className='mb-3'>
                    <label className='form-label'>Nom</label>
                    <input type='text' className='form-control' placeholder='Titre du produit' value={product.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                  </div>

                  <div className='row mb-3'>
                    <div className='col-md-6'>
                      <label className='form-label'>SKU</label>
                      <input type='text' className='form-control' value={product.sku} onChange={(e) => handleInputChange('sku', e.target.value)} />
                    </div>
                    <div className='col-md-6'>
                      <label className='form-label'>Code-barres</label>
                      <input type='text' className='form-control' placeholder='0123-4567' value={product.barcode} onChange={(e) => handleInputChange('barcode', e.target.value)} />
                    </div>
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Description (Optionnel)</label>
                    <div className='border rounded'>
                      <div className='p-2 border-bottom'>
                        <div className='btn-group btn-group-sm'>
                          <button className='btn btn-outline-secondary'>
                            <Bold size={14} />
                          </button>
                          <button className='btn btn-outline-secondary'>
                            <Italic size={14} />
                          </button>
                          <button className='btn btn-outline-secondary'>
                            <Underline size={14} />
                          </button>
                          <button className='btn btn-outline-secondary'>
                            <List size={14} />
                          </button>
                          <button className='btn btn-outline-secondary'>
                            <AlignLeft size={14} />
                          </button>
                          <button className='btn btn-outline-secondary'>
                            <Link size={14} />
                          </button>
                          <button className='btn btn-outline-secondary'>
                            <Image size={14} />
                          </button>
                        </div>
                      </div>
                      <textarea
                        className='form-control border-0'
                        rows='5'
                        placeholder='Description du produit'
                        value={product.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='card mb-4 p-3'>
                <div className='card-header d-flex justify-content-between align-items-center'>
                  <h5 className='mb-0'>Image du produit</h5>
                  <button type='button' className='btn btn-link btn-sm text-primary' onClick={() => setShowUrlInput((v) => !v)}>
                    Ajouter un média depuis une URL
                  </button>
                </div>
                <div className='card-body'>
                  {showUrlInput && (
                    <div className='mb-3 d-flex'>
                      <input type='text' className='form-control me-2' placeholder='Entrer l’URL de l’image' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                      <button className='btn btn-primary' onClick={handleUrlSubmit}>
                        Ajouter
                      </button>
                    </div>
                  )}

                  {!imagePreview ? (
                    <div className='border-2 border-dashed border-secondary rounded-3 p-5 text-center bg-light' onDrop={handleDrop} onDragOver={handleDragOver}>
                      <Upload size={48} className='text-muted mb-3' />
                      <h6>Glissez et déposez votre image ici</h6>
                      <p className='text-muted'>ou</p>
                      <button className='btn btn-primary' onClick={() => fileInputRef.current.click()} type='button'>
                        Parcourir l'image
                      </button>
                      <input type='file' accept='image/*' ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload} />
                    </div>
                  ) : (
                    <div className='mt-3 text-center'>
                      <img src={imagePreview} alt='Aperçu du produit' className='img-fluid rounded' style={{ maxHeight: '200px' }} />
                      <div className='mt-2'>
                        <button type='button' className='btn btn-danger btn-sm' onClick={() => setImagePreview(null)}>
                          Supprimer l'image
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className='card mb-4 p-3'>
                <div className='card-header'>
                  <h5 className='mb-0'>Variantes</h5>
                </div>
                <div className='card-body'>
                  <div className='row mb-3'>
                    <div className='col-md-6'>
                      <label className='form-label'>Options</label>
                      <select className='form-select'>
                        <option>Taille</option>
                        <option>Couleur</option>
                        <option>Matériel</option>
                      </select>
                    </div>
                    <div className='col-md-6'>
                      <label className='form-label'>Valeur</label>
                      <input type='text' className='form-control' placeholder='Entrer la taille' />
                    </div>
                  </div>
                  <button className='btn btn-primary btn-sm' onClick={addVariant}>
                    <Plus size={16} className='me-1' />
                    Ajouter une autre option
                  </button>
                </div>
              </div>
                  {/* À Voir  */}
              <div className='card p-3'>
                <div className='card-header'>
                  <h5 className='mb-0'>Inventaire</h5>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-3'>
                      <ul className='nav nav-pills flex-column'>
                        <li className='nav-item'>
                          <button className={`nav-link btn-primary ${activeTab === 'restock' ? 'active' : ''}`} onClick={() => setActiveTab('restock')}>
                            Réapprovisionner
                          </button>
                        </li>
                        <li className='nav-item'>
                          <button className={`nav-link ${activeTab === 'shipping' ? 'active' : ''}`} onClick={() => setActiveTab('shipping')}>
                            Expédition
                          </button>
                        </li>
                        <li className='nav-item'>
                          <button className={`nav-link ${activeTab === 'delivery' ? 'active' : ''}`} onClick={() => setActiveTab('delivery')}>
                            Livraison globale
                          </button>
                        </li>
                        <li className='nav-item'>
                          <button className={`nav-link ${activeTab === 'attributes' ? 'active' : ''}`} onClick={() => setActiveTab('attributes')}>
                            Attributs
                          </button>
                        </li>
                        <li className='nav-item'>
                          <button className={`nav-link ${activeTab === 'advanced' ? 'active' : ''}`} onClick={() => setActiveTab('advanced')}>
                            Avancé
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className='col-md-9'>
                      {activeTab === 'restock' && (
                        <div>
                          <div className='mb-3'>
                            <label className='form-label'>Ajouter en stock</label>
                            <div className='row'>
                              <div className='col-md-6'>
                                <select className='form-select'>
                                  <option>Quantité</option>
                                </select>
                              </div>
                              <div className='col-md-6'>
                                <button className='btn btn-primary'>Confirmer</button>
                              </div>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-md-6'>
                              <p className='mb-1'>
                                <strong>Produit en stock maintenant:</strong> {product.inventory.quantity}
                              </p>
                              <p className='mb-1'>
                                <strong>Produit en transit:</strong> {product.inventory.transit}
                              </p>
                            </div>
                            <div className='col-md-6'>
                              <p className='mb-1'>
                                <strong>Dernier réapprovisionnement:</strong> {product.inventory.lastRestocked}
                              </p>
                              <p className='mb-1'>
                                <strong>Valeur totale du stock:</strong> {product.inventory.totalStockValue}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {activeTab === 'shipping' && <p>Configuration des options d'expédition</p>}
                      {activeTab === 'delivery' && <p>Configuration de la livraison globale</p>}
                      {activeTab === 'attributes' && <p>Gestion des attributs du produit</p>}
                      {activeTab === 'advanced' && <p>Paramètres avancés</p>}
                    </div>
                  </div>
                </div>
              </div>
                  {/* À Voir  */}

            </div>

            <div className='col-lg-4'>
              <div className='card mb-4 p-3'>
                <div className='card-header'>
                  <h5 className='mb-0'>Tarification</h5>
                </div>
                <div className='card-body'>
                  <div className='mb-3'>
                    <label className='form-label'>Prix de base</label>
                    <div className='input-group'>
                      <input type='number' className='form-control' placeholder='Prix' value={product.basePrice} onChange={(e) => handleInputChange('basePrice', e.target.value)} />
                      <span className='input-group-text'>€</span>
                    </div>
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Prix remisé</label>
                    <div className='input-group'>
                      <input type='number' className='form-control' placeholder='Prix remisé' value={product.discountedPrice} onChange={(e) => handleInputChange('discountedPrice', e.target.value)} />
                      <span className='input-group-text'>€</span>
                    </div>
                  </div>

                  <div className='form-check mb-3'>
                    <input className='form-check-input' type='checkbox' id='chargeTax' checked={product.chargeTax} onChange={(e) => handleInputChange('chargeTax', e.target.checked)} />
                    <label className='form-check-label' htmlFor='chargeTax'>
                      Facturer la taxe sur ce produit
                    </label>
                  </div>

                  <div className='form-check'>
                    <input className='form-check-input' type='checkbox' id='inStock' checked={product.inStock} onChange={(e) => handleInputChange('inStock', e.target.checked)} />
                    <label className='form-check-label' htmlFor='inStock'>
                      En stock
                    </label>
                  </div>
                </div>
              </div>
              <div className='card p-3'>
                <div className='card-header'>
                  <h5 className='mb-0'>Organiser</h5>
                </div>
                <div className='card-body'>
                  <div className='mb-3'>
                    <label className='form-label'>Fournisseur</label>
                    <select className='form-select'>
                      <option>Sélectionner un fournisseur</option>
                      <option>Fournisseur A</option>
                      <option>Fournisseur B</option>
                    </select>
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Catégorie</label>
                    <div className='d-flex'>
                      <select className='form-select me-2'>
                        <option>Sélectionner une catégorie</option>
                        <option>Électronique</option>
                        <option>Vêtements</option>
                        <option>Maison</option>
                      </select>
                      <button className='btn btn-outline-primary'>
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Collection</label>
                    <select className='form-select'>
                      <option>Sélectionner</option>
                      <option>Collection Été</option>
                      <option>Collection Hiver</option>
                    </select>
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Statut</label>
                    <select className='form-select' value={product.status} onChange={(e) => handleInputChange('status', e.target.value)}>
                      <option value='published'>Publié</option>
                      <option value='draft'>Brouillon</option>
                      <option value='archived'>Archivé</option>
                    </select>
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Mots-clés (séparés par des virgules)</label>
                    <div className='d-flex flex-wrap gap-2 mt-2 mb-2'>
                      {product.tags.map((tag, index) => (
                        <span key={index} className='badge bg-secondary d-flex align-items-center'>
                          {tag}
                          <button type='button' className='btn-close btn-close-white ms-1' style={{ fontSize: '0.65em' }} onClick={() => removeTag(index)} />
                        </span>
                      ))}
                    </div>
                    <input type='text' className='form-control' value={tagsInput} onChange={handleTagsChange} placeholder='Exemple : Normal, Standard, Premium' />

                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
