import AsyncStorage from "@react-native-async-storage/async-storage";

export async function register(data) {
  try {
    const response = await fetch("http://192.168.0.45:5000/auth/register", {
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
    console.log("Dpošel jsem do get API")
    const response = await fetch("http://192.168.0.45:5000/auth/login", {
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
    if (typeof result.token === "string") {
      await AsyncStorage.setItem("token", result.token);
      return { error: false, token: result.token};
    } else {
      console.error("Login result.token is not a string:", result);
      return { error: true, message: "Token is missing" };
    }
  } catch (error) {
    console.error("Error during login:", error);
    return { error: true, message: error.message };
  }
}

