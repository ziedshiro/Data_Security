import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import forge from 'node-forge';
import { secretKey } from "../utils/secretKey";
import { LoginUser } from "../../Model/User";

const userLogin = createAsyncThunk('login', async (user:LoginUser) => {
    const loginData = JSON.stringify(user);
    const encrypt = forge.cipher.createCipher('AES-CBC', secretKey);
    encrypt.start({ iv: forge.random.getBytesSync(16) });
    encrypt.update(forge.util.createBuffer(loginData, 'utf8'));
    encrypt.finish();
    const response = await axios.post(`${baseUrl}/login`, loginData)
    return response.data;
})

export { userLogin }