import AsyncStorage from "@react-native-async-storage/async-storage";

export async function register(data) {
  try {
    const response = await fetch("http://192.168.100.13:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      return { error: true, message: result.message };
    }
    return result;
  } catch (error) {
    console.error("Error during registration:", error);
    return { error: true, message: error.message };
  }
}

export async function login(data) {
  try {
    const response = await fetch("http://192.168.100.13:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      return { error: true, message: result.message };
    }

    // Ulož token, pokud existuje
    if (typeof result === "string") {
      await AsyncStorage.setItem("token", result);
      return { error: false, token: result};
    } else {
      console.error("Login result.token is not a string:", result);
      return { error: true, message: "Token is missing" };
    }
  } catch (error) {
    console.error("Error during login:", error);
    return { error: true, message: error.message };
  }
}

export async function create(data) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch("http://192.168.100.13:5000/shoplist/create", {
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

    const response = await fetch("http://192.168.100.13:5000/shoplist/list", {
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
