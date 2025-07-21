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

  // const addVariant = () => {
  //   setProduct((prev) => ({
  //     ...prev,
  //     variants: [...prev.variants, { option: 'Size', value: 'Enter size' }],
  //   }));
  // };

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
              <button className='btn btn-primary fw-bold'>Publier le produit</button>
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
                          <button className='btn '>
                            <Bold size={14} />
                          </button>
                          <button className='btn '>
                            <Italic size={14} />
                          </button>
                          <button className='btn '>
                            <Underline size={14} />
                          </button>
                          <button className='btn '>
                            <List size={14} />
                          </button>
                          <button className='btn '>
                            <AlignLeft size={14} />
                          </button>
                          <button className='btn '>
                            <Link size={14} />
                          </button>
                          <button className='btn '>
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
                  {product.variants.map((variant, index) => (
                    <div className='row mb-3' key={index}>
                      <div className='col-md-6'>
                        <label className='form-label'>Options</label>
                        <select
                          className='form-select'
                          value={variant.option}
                          onChange={(e) => {
                            const newVariants = [...product.variants];
                            newVariants[index].option = e.target.value;
                            setProduct((prev) => ({ ...prev, variants: newVariants }));
                          }}>
                          <option value=''>Sélectionner</option>
                          <option value='Taille'>Taille</option>
                          <option value='Couleur'>Couleur</option>
                          <option value='Matériel'>Matériel</option>
                        </select>
                      </div>
                      <div className='col-md-6'>
                        <label className='form-label'>Valeur</label>
                        <input
                          type='text'
                          className='form-control'
                          placeholder={`Entrer la ${variant.option || 'valeur'}`}
                          value={variant.value}
                          onChange={(e) => {
                            const newVariants = [...product.variants];
                            newVariants[index].value = e.target.value;
                            setProduct((prev) => ({ ...prev, variants: newVariants }));
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    type='button'
                    className='btn btn-primary fw-bold'
                    onClick={() =>
                      setProduct((prev) => ({
                        ...prev,
                        variants: [...prev.variants, { option: '', value: '' }],
                      }))
                    }>
                    <Plus size={16} className='me-1' />
                    Ajouter une autre option
                  </button>
                </div>
              </div>

              <div className='card mb-4 p-2'>
                <div className='card-header'>
                  <h5 className='card-title mb-0'>Inventaire</h5>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-12 col-md-4 col-xl-5 col-xxl-4 mx-auto card-separator'>
                      <div className='d-flex justify-content-between flex-column mb-4 mb-md-0 pe-md-4'>
                        <div className='nav-align-left'>
                          <ul className='nav nav-pills gap-2 flex-column w-100'>
                            <li className='nav-item'>
                              <button
                                style={{ width: '100%' }}
                                className={`nav-link d-flex align-items-center text-start ${activeTab === 'restock' ? 'btn btn-primary text-white fw-bold' : 'text-secondary'}`}
                                onClick={() => setActiveTab('restock')}>
                                <i className='ti ti-box ti-sm me-2'></i>
                                <span className='align-middle'>Réapprovisionner</span>
                              </button>
                            </li>
                            <li className='nav-item'>
                              <button
                                style={{ width: '100%' }}
                                className={`nav-link d-flex align-items-center text-start ${activeTab === 'shipping' ? 'btn btn-primary text-white fw-bold' : 'text-secondary'}`}
                                onClick={() => setActiveTab('shipping')}>
                                <i className='ti ti-car ti-sm me-2'></i>
                                <span className='align-middle'>Expédition</span>
                              </button>
                            </li>
                            <li className='nav-item'>
                              <button
                                style={{ width: '100%' }}
                                className={`nav-link d-flex align-items-center text-start ${activeTab === 'global-delivery' ? 'btn btn-primary text-white fw-bold' : 'text-secondary'}`}
                                onClick={() => setActiveTab('global-delivery')}>
                                <i className='ti ti-world ti-sm me-2'></i>
                                <span className='align-middle'>Livraison globale</span>
                              </button>
                            </li>
                            <li className='nav-item'>
                              <button
                                style={{ width: '100%' }}
                                className={`nav-link d-flex align-items-center text-start ${activeTab === 'attributes' ? 'btn btn-primary text-white fw-bold' : 'text-secondary'}`}
                                onClick={() => setActiveTab('attributes')}>
                                <i className='ti ti-link ti-sm me-2'></i>
                                <span className='align-middle'>Attributs</span>
                              </button>
                            </li>
                            <li className='nav-item'>
                              <button
                                style={{ width: '100%' }}
                                className={`nav-link d-flex align-items-center text-start ${activeTab === 'advanced' ? 'btn btn-primary text-white fw-bold' : 'text-secondary'}`}
                                onClick={() => setActiveTab('advanced')}>
                                <i className='ti ti-lock ti-sm me-2'></i>
                                <span className='align-middle'>Avancé</span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className='col-12 col-md-8 col-xl-7 col-xxl-8 pt-6 pt-md-0'>
                      <div className='tab-content p-0 ps-md-4'>
                        {activeTab === 'restock' && (
                          
                          <div className='tab-pane fade show active' role='tabpanel'>

                            <h6 className='text-body mb-3'>Options</h6>
                             <label className='form-label' htmlFor='ecommerce-product-stock'>
                              Ajouter au stock
                            </label>
                            <div className='row mb-4 g-4 pe-md-4'>
                              <div className='col-12 col-sm-9'>
                               
                                <input type='number' className='form-control' id='ecommerce-product-stock' placeholder='Quantité' name='quantity' aria-label='Quantité' />
                              </div>
                              <div className='col-12 col-sm-3'>
                                <button className='btn btn-primary fw-bold'>Confirmer</button>
                              </div>
                            </div>
                            <div>
                              <h6 className='mb-2 fw-normal'>Produit en stock maintenant: {product?.inventory?.quantity || 54}</h6>
                              <h6 className='mb-2 fw-normal'>Produit en transit: {product?.inventory?.transit || 390}</h6>
                              <h6 className='mb-2 fw-normal'>Dernier réapprovisionnement: {product?.inventory?.lastRestocked || '24 juin 2023'}</h6>
                              <h6 className='mb-0 fw-normal'>Stock total sur la durée de vie: {product?.inventory?.totalStockValue || 2430}</h6>
                            </div>
                          </div>
                        )}

                        {activeTab === 'shipping' && (
                          <div className='tab-pane fade show active' role='tabpanel'>
                            <h6 className='mb-3 text-body'>Type d'expédition</h6>
                            <div>
                              <div className='form-check mb-4'>
                                <input className='form-check-input' type='radio' name='shippingType' id='seller' />
                                <label className='form-check-label' htmlFor='seller'>
                                  <span className='mb-1 h6'>Expédié par le vendeur</span>
                                  <br />
                                  <small>
                                    Vous serez responsable de la livraison du produit.
                                    <br />
                                    Tout dommage ou retard durant l'expédition peut vous coûter des frais de dommages.
                                  </small>
                                </label>
                              </div>
                              <div className='form-check mb-6'>
                                <input className='form-check-input' type='radio' name='shippingType' id='companyName' defaultChecked />
                                <label className='form-check-label' htmlFor='companyName'>
                                  <span className='mb-1 h6'>
                                    Expédié par l'entreprise &nbsp;
                                    <span className='badge rounded-2 badge-warning bg-label-warning fs-tiny py-1'>RECOMMANDÉ</span>
                                  </span>
                                  <br />
                                  <small>
                                    Votre produit, notre responsabilité.
                                    <br />
                                    Pour une somme modique, nous nous chargerons du processus de livraison pour vous.
                                  </small>
                                </label>
                              </div>
                              <p className='mb-0'>
                                Voir nos <a href='javascript:void(0);'>conditions de livraison</a> pour plus de détails
                              </p>
                            </div>
                          </div>
                        )}

                        {activeTab === 'global-delivery' && (
                          <div className='tab-pane fade show active' role='tabpanel'>
                            <h6 className='mb-3 text-body'>Livraison globale</h6>

                            <div className='form-check mb-4'>
                              <input className='form-check-input' type='radio' name='globalDel' id='worldwide' />
                              <label className='form-check-label' htmlFor='worldwide'>
                                <span className='mb-1 h6'>Livraison mondiale</span>
                                <br />
                                <small>
                                  Uniquement disponible avec la méthode d'expédition :<a href='javascript:void(0);'>Expédié par l'entreprise</a>
                                </small>
                              </label>
                            </div>

                            <div className='form-check mb-4'>
                              <input className='form-check-input' type='radio' name='globalDel' defaultChecked />
                              <label className='form-check-label w-75 pe-12' htmlFor='country-selected'>
                                <span className='mb-2 h6'>Pays sélectionnés</span>
                                <input type='text' className='form-control' placeholder='Tapez le nom du pays' id='country-selected' />
                              </label>
                            </div>

                            <div className='form-check'>
                              <input className='form-check-input' type='radio' name='globalDel' id='local' />
                              <label className='form-check-label' htmlFor='local'>
                                <span className='mb-1 h6'>Livraison locale</span>
                                <br />
                                <small>
                                  Livrer dans votre pays de résidence :<a href='javascript:void(0);'>Modifier l'adresse du profil</a>
                                </small>
                              </label>
                            </div>
                          </div>
                        )}

                        {activeTab === 'attributes' && (
                          <div className='tab-pane fade show active' role='tabpanel'>
                            <h6 className='mb-2 text-body'>Attributs</h6>
                            <div>
                              <div className='form-check mb-4'>
                                <input className='form-check-input' type='checkbox' value='fragile' id='fragile' />
                                <label className='form-check-label' htmlFor='fragile'>
                                  <span className='fw-medium'>Produit fragile</span>
                                </label>
                              </div>

                              <div className='form-check mb-4'>
                                <input className='form-check-input' type='checkbox' value='biodegradable' id='biodegradable' />
                                <label className='form-check-label' htmlFor='biodegradable'>
                                  <span className='fw-medium'>Biodégradable</span>
                                </label>
                              </div>

                              <div className='form-check mb-4'>
                                <input className='form-check-input' type='checkbox' value='frozen' defaultChecked />
                                <label className='form-check-label w-75 pe-12' htmlFor='frozen'>
                                  <span className='mb-1 h6'>Produit congelé</span>
                                  <input type='number' className='form-control' placeholder='Température maximale autorisée' id='frozen' />
                                </label>
                              </div>

                              <div className='form-check mb-6'>
                                <input className='form-check-input' type='checkbox' value='expDate' id='expDate' defaultChecked />
                                <label className='form-check-label w-75 pe-12' htmlFor='date-input'>
                                  <span className='mb-1 h6'>Date d'expiration du produit</span>
                                  <input type='date' className='product-date form-control' id='date-input' />
                                </label>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === 'advanced' && (
                          <div className='tab-pane fade show active' role='tabpanel'>
                            <h6 className='mb-3 text-body'>Avancé</h6>
                            <div className='row'>
                              <div className='col'>
                                <label className='form-label' htmlFor='product-id'>
                                  <span className='mb-1 h6'>Type d'ID produit</span>
                                </label>
                                <select id='product-id' className='select2 form-select' data-placeholder='ISBN'>
                                  <option value=''>ISBN</option>
                                  <option value='ISBN'>ISBN</option>
                                  <option value='UPC'>UPC</option>
                                  <option value='EAN'>EAN</option>
                                  <option value='JAN'>JAN</option>
                                </select>
                              </div>

                              <div className='col'>
                                <label className='form-label' htmlFor='product-id-1'>
                                  <span className='mb-1 h6'>ID produit</span>
                                </label>
                                <input type='number' id='product-id-1' className='form-control' placeholder='Numéro ISBN' />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                      <span className='input-group-text'>MGA</span>
                    </div>
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Prix remisé</label>
                    <div className='input-group'>
                      <input type='number' className='form-control' placeholder='Prix remisé' value={product.discountedPrice} onChange={(e) => handleInputChange('discountedPrice', e.target.value)} />
                      <span className='input-group-text'>MGA</span>
                    </div>
                  </div>

                  <div className='form-check mb-3'>
                    <input className='form-check-input' type='checkbox' id='chargeTax' checked={product.chargeTax} onChange={(e) => handleInputChange('chargeTax', e.target.checked)} />
                    <label className='form-check-label' htmlFor='chargeTax'>
                      Facturer la taxe sur ce produit
                    </label>
                  </div>
                  <hr />
                  <div className='d-flex justify-content-between align-items-center mb-2'>
                    <label className='form-label mb-0' htmlFor='inStock'>
                      En stock
                    </label>
                    <div className='form-check form-switch m-0'>
                      <input className='form-check-input' type='checkbox' id='inStock' checked={product.inStock} onChange={(e) => handleInputChange('inStock', e.target.checked)} />
                    </div>
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
