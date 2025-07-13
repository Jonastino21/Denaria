import axios from 'axios';

const USE_MOCK = true;  // changer en false pour utiliser la vraie api 

export async function login(email, password) {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // mock user
    const mockUser = {
      email: 'admin@denaria.com',
      password: 'admin123',
    };

    if (email === mockUser.email && password === mockUser.password) {
      return { token: 'mock-jwt-token-123456789' };
    } else {
      // erreur simuler
      throw {
        response: {
          data: { message: 'Email ou mot de passe invalide.' },
        },
      };
    }
  } else {

    const response = await axios.post(
      'http://localhost:9999/auth/login',
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );

    return response.data;
  }
}
