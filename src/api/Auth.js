
import axios from 'axios';

export async function login(email, password) {

  const response = await axios.post(
    'http://localhost:9999/auth/login',
    { email: email, password: password },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );

  return response.data;
}
