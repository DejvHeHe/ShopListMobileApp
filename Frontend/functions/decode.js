/**
 * Dekóduje JWT token bez použití externí knihovny
 * @param {string} token - JWT token (header.payload.signature)
 * @returns {Object|null} - Vrátí payload jako objekt, nebo null při chybě
 */
export function decodeJWT(token) {
  try {
    // Rozděl token na části: header.payload.signature
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) throw new Error("Invalid token");

    // Uprava Base64 URL -> standard Base64
    const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    
    // Dekóduj Base64 a parse JSON
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error('Failed to decode JWT:', err);
    return null;
  }
}
