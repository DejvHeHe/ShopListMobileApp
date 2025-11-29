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
export async function get(shopListId) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch(
      `http://:5000/shoplist/get?shopListId=${shopListId}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          
        }
      }
    );
    console.log("GET RESPONSE",response)

    const result = await response.json();
    console.log("get result", result);

    if (!response.ok) {
      return { error: true, message: result.message };
    }

    return result;
  } catch (error) {
    console.error("Error during get:", error);
    return { error: true, message: error.message };
  }
}

export async function listArchived() {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch("http://:5000/shoplist/listArchived", {
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
    console.log("List archeved:",result)
    return result;
  } catch (error) {
    console.error("Error during list archived:", error);
    return { error: true, message: error.message };
  }
}
export async function listShared() {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch("http://:5000/shoplist/listShared", {
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


export async function viewSharedTo(shopListId) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch(
      `http://:5000/shoplist/viewSharedTo?shopListId=${shopListId}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();
    console.log("Response viewSharedTo:", result);

    if (!response.ok) {
      console.error("Server vrátil chybu:", result.message || result);
      return [];
    }

    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Error during viewSharedTo:", error);
    return [];
  }
}

export async function share(data) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch("http://:5000/shoplist/share", {
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
    console.error("Error during share:", error);
    return { error: true, message: error.message };
  }
}
export async function removeFromShare(data) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch("http://:5000/shoplist/removeFromShare", {
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
    console.error("Error during remove from share:", error);
    return { error: true, message: error.message };
  }
}

export async function remove(data) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch("http://:5000/shoplist/remove", {
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
    console.error("Error during remove :", error);
    return { error: true, message: error.message };
  }
}
export async function setArchived(data) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch("http://:5000/shoplist/setArchived", {
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
    console.error("Error during set archived :", error);
    return { error: true, message: error.message };
  }
}


