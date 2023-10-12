package th.ac.ku.kps.eng.cpe.service;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.Security;
import java.util.Base64;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

import org.bouncycastle.crypto.engines.AESEngine;
import org.bouncycastle.crypto.modes.CFBBlockCipher;
import org.bouncycastle.jce.provider.BouncyCastleProvider;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;
import org.bouncycastle.crypto.BufferedBlockCipher;
import org.bouncycastle.crypto.CipherParameters;
import org.bouncycastle.crypto.params.KeyParameter;
import org.bouncycastle.crypto.params.ParametersWithIV;

@Service
public class DecryptionServices {
	@Value("${secret.frontkey}")
	private String SECRET_KEY;
	
	public String decrypt(String encryptedData) throws Exception {
    	Cipher cipher = Cipher.getInstance("AES");
    	SecretKeySpec secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");
    	cipher.init(Cipher.DECRYPT_MODE, secretKey);
    	
        byte[] encryptedBytes = Base64.getDecoder().decode(encryptedData);
        byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
        return new String(decryptedBytes);
    }
	public String encrypt(String data) throws Exception {
		Cipher cipher = Cipher.getInstance("AES");
	    SecretKeySpec secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");
	    cipher.init(Cipher.ENCRYPT_MODE, secretKey);

	    byte[] encryptedBytes = cipher.doFinal(data.getBytes());
	    String encryptedData = Base64.getEncoder().encodeToString(encryptedBytes);
	    return encryptedData;
	}
	public String Decode(String data) throws UnsupportedEncodingException, IllegalBlockSizeException, BadPaddingException, NoSuchAlgorithmException, NoSuchProviderException, NoSuchPaddingException, InvalidKeyException, InvalidAlgorithmParameterException {
		
		byte[] secretKeyBytes = SECRET_KEY.getBytes(StandardCharsets.UTF_8);
        byte[] ciphertext = Base64.getDecoder().decode(data);

        byte[] iv = new byte[16];

        BufferedBlockCipher cipher = new BufferedBlockCipher(new CFBBlockCipher(new AESEngine(), 8));

        CipherParameters keyWithIV = new ParametersWithIV(new KeyParameter(secretKeyBytes), iv);
        cipher.init(false, keyWithIV);

        byte[] decryptedBytes = new byte[cipher.getOutputSize(ciphertext.length)];
        int processedBytes = cipher.processBytes(ciphertext, 0, ciphertext.length, decryptedBytes, 0);

        try {
            cipher.doFinal(decryptedBytes, processedBytes);
        } catch (Exception e) {
            e.printStackTrace();
        }

        String decryptedText = new String(decryptedBytes, StandardCharsets.UTF_8);

        System.out.println("Decrypted Text: " + decryptedText);
        return decryptedText;

	}
	public String De(String data) {
		try {
            byte[] decodedKey = Base64.getDecoder().decode(SECRET_KEY);
            SecretKeySpec secretKeySpec = new SecretKeySpec(decodedKey, "AES");
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");

            byte[] encryptedData = Base64.getDecoder().decode(data);
            byte[] iv = new byte[16]; // You need to determine the initialization vector (IV) used during encryption

            cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, new IvParameterSpec(iv));
            byte[] decrypted = cipher.doFinal(encryptedData);

            return new String(decrypted);
        } catch (Exception e) {
            // Handle decryption errors
            return null;
        }
	}
	
	
}
