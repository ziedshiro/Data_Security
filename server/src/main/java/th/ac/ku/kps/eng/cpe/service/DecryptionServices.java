package th.ac.ku.kps.eng.cpe.service;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.Security;
import java.util.Base64;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import org.bouncycastle.jce.provider.BouncyCastleProvider;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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
		
		Security.addProvider(new BouncyCastleProvider());

        byte[] secretKey = SECRET_KEY.getBytes();

        byte[] encryptedBytes = Base64.getDecoder().decode(data);

        SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey, "AES");

        Cipher cipher = Cipher.getInstance("AES/CFB/NoPadding", "BC");
        
        cipher.init(Cipher.DECRYPT_MODE, secretKeySpec);

        byte[] decryptedBytes = cipher.doFinal(encryptedBytes);

        String decryptedData = new String(decryptedBytes, "UTF-8");

        return decryptedData;

	}
	
	
}
