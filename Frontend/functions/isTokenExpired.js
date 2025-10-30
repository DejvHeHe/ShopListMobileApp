import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from 'jwt-decode';

export default async function isTokenExpired() {
  const token=await AsyncStorage.getItem("token")
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.expiresIn < now;
  } catch (e) {
    return true;
  }
}

