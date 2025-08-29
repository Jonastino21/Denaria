
export default async function fetchProducts() {
  const USE_MOCK = false; // changer en false pour utiliser la vraie api

  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // mock products
    return [
      { id: 1, name: 'Produit 1', price: 100 },
      { id: 2, name: 'Produit 2', price: 200 },
      { id: 3, name: 'Produit 3', price: 300 },
    ];
  } else {
    const response = await fetch('http://localhost:9999/api/products/list_products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
        // parse JSON body
    const products = response.data;
    console.log("Products:", products);
    // console.log("Token:", localStorage.getItem("authToken"));


    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des produits');
    }

    return response.json();
  }
}