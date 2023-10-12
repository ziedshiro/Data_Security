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
import javax.crypto.spec.IvParameterSpec;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.Security;

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

        byte[] encryptedDataBytes = Base64.getDecoder().decode(data);

        byte[] iv = Base64.getDecoder().decode("16");

        Cipher cipher = Cipher.getInstance("AES/CFB/PKCS5Padding", "BC");
        SecretKeySpec keySpec = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");
        IvParameterSpec ivSpec = new IvParameterSpec(iv);
        cipher.init(Cipher.DECRYPT_MODE, keySpec, ivSpec);

        byte[] decryptedDataBytes = cipher.doFinal(encryptedDataBytes);

        String decryptedData = new String(decryptedDataBytes, "UTF-8");
        return decryptedData;

	}
	
	
}
