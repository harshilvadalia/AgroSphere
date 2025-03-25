import { createContext, useEffect, useState } from "react";
import axios from "axios";

const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [item_list, setItemList] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async(itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
    if(token)
    {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token: token } });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = item_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchItemList = async () => {
    const response = await axios.get(url + "/api/products/list");
    setItemList(response.data.data);
  };
  
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get", 
        {}, 
        { headers: { token: token } }
      );
      if (response.data.success) {
        setCartItems(response.data.data || {});
      }
    } catch (error) {
      console.error("Error loading cart:", error);
      setCartItems({});
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        await fetchItemList();
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          await loadCartData(storedToken);
        }
      } catch (error) {
        console.error("Error in loadData:", error);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    item_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext };