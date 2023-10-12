import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl,secretKey } from "../../env/utils";
import { LoginUser } from "../../Model/User";
import CryptoJS from "crypto-js";

const userLogin = createAsyncThunk('login', async (user:LoginUser) => {
    
    const iv = CryptoJS.lib.WordArray.random(16); 
    const userId = CryptoJS.AES.encrypt(user.userId, secretKey, { 
        iv,
        mode: CryptoJS.mode.CFB, 
        padding: CryptoJS.pad.Pkcs7, 
    });
    const password = CryptoJS.AES.encrypt(user.password, secretKey, { 
        iv,
        mode: CryptoJS.mode.CFB, 
        padding: CryptoJS.pad.Pkcs7, 
    });



    const data = {
        username:userId.toString(),
        password:password.toString(),
        secretkey:user.secretcode
    }
    
    console.log(data);
    
    const response = await axios.post(`${baseUrl}/login`, data);
    return response.data;
});

export { userLogin }