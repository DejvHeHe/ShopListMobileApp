import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from 'jwt-decode';
import { decodeJWT } from "./decode";

export default async function isTokenExpired() {
  const token=await AsyncStorage.getItem("token")
  if (!token) return true;
  try {
    const decoded = decodeJWT(token);
    const now = Date.now() / 1000;
    console.log("Je expired",decoded.expiresIn < now)
    return decoded.expiresIn < now;
  } catch (e) {
    return true;
  }
}

