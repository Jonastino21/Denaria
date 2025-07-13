import React, { useState } from 'react';
import DenariaLogo from '../../assets/denaria_ico.png';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/Auth';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await login(email, password);
      if (response && response.token) {
        localStorage.setItem('authToken', response.token);
        toast.success('Connexion réussie !', {
          position: 'bottom-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/admin');
      } else {
        setError(response.data?.message || 'Erreur lors de la connexion');
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Email ou mot de passe invalide.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light'>
      <div className='card shadow w-100' style={{ maxWidth: '600px' }}>
        <div className='card-body p-4'>
          <div className='d-flex justify-content-center mb-2'>
            <a href='/' className='d-flex align-items-center'>
              <img src={DenariaLogo} alt='Logo denaria' style={{ width: '80px', height: '80px' }} />
            </a>
          </div>
          <h4 className='text-center mb-4'>DENARIA</h4>
          <form onSubmit={handleLogin}>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input type='email' id='email' className='form-control' placeholder='Entrer votre adresse email' value={email} onChange={(e) => setEmail(e.target.value)} autoFocus required />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Mot de passe
              </label>
              <div className='input-group'>
                <input type='password' id='password' className='form-control' placeholder='••••••••' value={password} onChange={(e) => setPassword(e.target.value)} required />
                <span className='input-group-text'>
                  <i className='ti ti-eye-off'></i>
                </span>
              </div>
            </div>
            {error && <p className='text-danger text-center small'>{error}</p>}
            <button type='submit' disabled={loading} className='btn btn-primary w-100'>
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
            <div className='text-center mt-2'>
              <a href='/forgot-password' className='text-decoration-none'>
                Mot de passe oublié ?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
