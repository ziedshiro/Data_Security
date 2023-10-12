package th.ac.ku.kps.eng.cpe.service;

import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

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
		Cipher cipher = Cipher.getInstance("AES/CFB/NoPadding"); // Use AES-CFB mode

	    SecretKeySpec secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");
	    cipher.init(Cipher.ENCRYPT_MODE, secretKey, new IvParameterSpec(new byte[16])); // Use an IV
	    byte[] encryptedBytes = cipher.doFinal(data.getBytes("UTF-8"));
	    return Base64.getEncoder().encodeToString(encryptedBytes);
	}
	
	
}
