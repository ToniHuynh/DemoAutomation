// crypto-utils.ts
import CryptoJS from "crypto-js"
import * as dotenv from "dotenv"

dotenv.config()

// Define your secret key (in a real-world scenario, store this securely)
//const secretKey = "mySecretKey12345";
const secretKey = process.env.SECRET_KEY;

// Encrypt function
export function encryptData(data: string): string {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
}

// Decrypt function
export function decryptData(encryptedData: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
