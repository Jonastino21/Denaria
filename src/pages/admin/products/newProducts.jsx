import React, { useState, useRef, useEffect } from 'react';
import { Plus, Upload, Bold, Italic, Underline, List, AlignLeft, Link, Image } from 'lucide-react';
import { BrowserRouter, Route } from 'react-router-dom';
import ProductManagement from './productManagement';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const NewProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    stock: 0,
    stock_quantity: 0,
    description: '',
    category: '',
    image: '',
  });

  useEffect(() => {
    const fetchcategories = async () => {
      try {
        const response = await axios.get(
          'http://localhost:9999/api/categories/list_categories',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );

        console.log('Response status:', response.status);
        console.log('Response data:', response.data);

        if (response.status !== 200) {
          throw new Error('Erreur lors de la récupération des categories');
        }

        console.log('Fetched categories:', response.data);
        setCategories(response.data); // ou setProducts si c'est la liste des produits
      } catch (error) {
        console.error(error);
      }
    };
    fetchcategories();
  }, []);


  const [categories, setCategories] = useState([]);

  const [imagePreview, setImagePreview] = useState(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  

  const handleInputChange = (field, value) => {
    console.log(`Updating field: ${field} with value: ${value}`);
    
    if (field === 'stock') {

      if (value === '') {
      setProduct(prev => ({
        ...prev,
        stock: 0,
        stock_quantity: 0,
      }));
      return;
    }

      const stockValue = parseInt(value, 10);  // base 10 explicitement
      if (!isNaN(stockValue) && stockValue >= 0) {
        setProduct(prev => ({
          ...prev,
          stock: stockValue,
          stock_quantity: stockValue,
        }));
      }
      return;
    }

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

  const cancelProduct = () => {
    navigate('/admin/products/list');

  }

  const validateProduct = () => {
    if (!product.name.trim()) {
      toast.error("Le nom du produit est obligatoire !");
      return false;
    }
    if (!product.stock || product.stock < 0) {
      toast.error("Le stock doit être supérieur ou égal à 0 !");
      return false;
    }
    if (!product.basePrice || product.basePrice < 0) {
      toast.error("Le prix doit être supérieur ou égal à 0 !");
      return false;
    }
    if (!product.category) {
      toast.error("Veuillez sélectionner une catégorie !");
      return false;
    }
    // L'image n'est pas obligatoire, donc pas de check ici
    return true;
  };

  const buildProductData = () => {
  return {
    name: product.name,
    description: product.description,
    price: parseFloat(product.basePrice) || 0,
    stock_quantity: parseInt(product.stock) || 0,
    category: { id: parseInt(product.category) || 1 },
    images: imagePreview ? [{ imageUrl: imagePreview }] : []
  };
};

  const publishProduct = async () => {
    if (!validateProduct()) return; // arrêt si validation échoue
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post(
          'http://localhost:9999/api/products/create_product',
          buildProductData,
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
        toast.success('Produit publié avec succès !', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/admin/products/list');
      } else {
        toast.error('Erreur lors de la publication du produit.', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error publishing product:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la publication du produit.', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };


  // const addVariant = () => {
  //   setProduct((prev) => ({
  //     ...prev,
  //     variants: [...prev.variants, { option: 'Size', value: 'Enter size' }],
  //   }));
  // };


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
              <button className='btn btn-outline-secondary' onClick={cancelProduct}>Annuler</button>
              {/* <button className='btn btn-outline-primary'>Enregistrer le brouillon</button> */}
              <button onClick={publishProduct} className='btn btn-primary fw-bold'>Publier le produit</button>
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
                      <label className='form-label'>Stock</label>
                      <input type='text' className='form-control' min="0" value={product.stock} onChange={(e) => handleInputChange('stock', e.target.value)} />
                    </div>
                    <div className='col-md-6'>
                      <label className='form-label'>Quantité Stock</label>
                      <input type='text' disabled className='form-control' placeholder='' value={product.stock_quantity} onChange={(e) => handleInputChange('stock_quantity', e.target.value)} />
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
                  {/* <button type='button' className='btn btn-link btn-sm text-primary' onClick={() => setShowUrlInput((v) => !v)}>
                    Ajouter un média depuis une URL
                  </button> */}
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
                    <label className='form-label'>Catégorie</label>
                    <div className='input-group'>
                        <select className='form-select' value={product.category} onChange={(e) => handleInputChange('category', e.target.value)}>
                          <option value=""> </option>
                          {categories && categories.length > 0 ? (
                            categories.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.name}
                              </option>
                            ))
                          ) : (
                            <option value="">Aucune catégorie disponible</option>
                          )}
                        </select>
                    </div>
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
