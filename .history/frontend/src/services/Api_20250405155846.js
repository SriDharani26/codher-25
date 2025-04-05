const BASE_URL = "http://127.0.0.1:5000";

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  console.log("Response:", res);
  return await res.json();
};

// Fetch all products
export const product = async () => {
  const res = await fetch(`${BASE_URL}/product`);
  return await res.json();
};

// Add a new product
export const addproduct = async (productData) => {
  const res = await fetch(`${BASE_URL}/addproduct`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  return await res.json();
};

// Add product to blockchain
export const addtoblockchain = async (data) => {
  const res = await fetch(`${BASE_URL}/products/blockchain`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const whitelistProducts = async () => {
    const res = await fetch(`${BASE_URL}/whitelist`);
    return await res.json();
  };
  
  // Get route info for a specific product
  export const getWhitelistByProductId = async (productId) => {
    const res = await fetch(`${BASE_URL}/whitelist/${productId}`);
    return await res.json();
  };
  
  // Get all users
  export const getUsers = async () => {
    const res = await fetch(`${BASE_URL}/users`);
    return await res.json();
  };