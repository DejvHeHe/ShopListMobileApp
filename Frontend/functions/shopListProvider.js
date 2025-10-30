import AsyncStorage from "@react-native-async-storage/async-storage";


export async function create(data) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch("http://:5000/shoplist/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      return { error: true, message: result.message };
    }

    return { error: false, data: result };
  } catch (error) {
    console.error("Error during create:", error);
    return { error: true, message: error.message };
  }
}
export async function list() {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch("http://:5000/shoplist/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
      
    });

    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      return { error: true, message: result.message };
    }

    return result;
  } catch (error) {
    console.error("Error during list:", error);
    return { error: true, message: error.message };
  }
}
export async function addItem(data) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch("http://:5000/shoplist/addItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      return { error: true, message: result.message };
    }

    return { error: false, data: result };
  } catch (error) {
    console.error("Error during addItem:", error);
    return { error: true, message: error.message };
  }
}
export async function uncheckItem(data) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch("http://:5000/shoplist/uncheckItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      return { error: true, message: result.message };
    }

    return { error: false, data: result };
  } catch (error) {
    console.error("Error during uncheck item:", error);
    return { error: true, message: error.message };
  }
}
export async function removeItem(data) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch("http://:5000/shoplist/removeItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      return { error: true, message: result.message };
    }

    return { error: false, data: result };
  } catch (error) {
    console.error("Error during uncheck item:", error);
    return { error: true, message: error.message };
  }
}
export async function update(data) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch("http://:5000/shoplist/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      return { error: true, message: result.message };
    }

    return { error: false, data: result };
  } catch (error) {
    console.error("Error during update shopList:", error);
    return { error: true, message: error.message };
  }
}


export async function viewSharedTo(data) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch("http://:5000/shoplist/viewSharedTo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Response viewSharedTo:", result);

    if (!response.ok) {
      console.error("Server vrátil chybu:", result.message || result);
      return [];
    }

    // ✅ pokud server vrátí pole (jako v tvém příkladu), vrať ho rovnou
    if (Array.isArray(result)) {
      return result;
    }

    // fallback – kdyby se někdy formát změnil
    return [];
  } catch (error) {
    console.error("Error during viewSharedTo:", error);
    return [];
  }
}


