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
  const res = await fetch(`${BASE_URL}/getusers`);
  return await res.json();
};

//Sending product_id to backend for updated blockchain status 
export const productUpdate = async (productId) => {
  const res = await fetch(`${BASE_URL}/addedtoblockchain/${productId}`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
  }
   
  );
  return await res.json();
};

// Create a new user
export const createUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/createuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error("Error creating user");
  }

  return await res.json(); // Assuming the backend returns a JSON response
};

//Add route to product
export const addRoute = async (routeData) => {
  const res = await fetch(`${BASE_URL}/addRoute`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(routeData),
  });

  if (!res.ok) {
    throw new Error("Error adding route");
  }

  return await res.json();
};
