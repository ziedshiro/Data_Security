package th.ac.ku.kps.eng.cpe.auth;

import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.util.Date;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class test {
	@Value("${secret.pepper}")
	private static String pepper;
	
	public static void main(String[] args) throws Exception {
//        byte[] pepperBytes = new byte[32];
//        SecureRandom random = new SecureRandom();
//        random.nextBytes(pepperBytes);
//		System.out.print(DigestUtils.sha256Hex("5yMC5Uq2T8x3M+i71kJPoQ=="+"ILzwnx/f2+JBioRB8ZDdSZmMRNewwSsc8sRob9G8mBU="+"12345678"));
	
//		System.out.print(encryptionservice.encrypt("EoQvbrGqRB2QsRrHk1xPTg=="));
		
        
        // Retrieve the KeyPair from the Keystore
//        try (FileInputStream fis = new FileInputStream("keystore.jks")) {
//            keyStore.load(fis, keystorePassword);
//
//            KeyPair retrievedKeyPair = new KeyPair(
//                keyStore.getCertificate(alias).getPublicKey(),
//                (PrivateKey) keyStore.getKey(alias, keystorePassword)
//            );
//
//            // Use the retrieved KeyPair for encryption/decryption
//            PublicKey publicKey = retrievedKeyPair.getPublic();
//            PrivateKey privateKey = retrievedKeyPair.getPrivate();
//        }
		
//		try {
//
//            KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
//
//            keyGenerator.init(128);
//
//            SecretKey secretKey = keyGenerator.generateKey();
//
//            byte[] keyBytes = secretKey.getEncoded();
//
//            System.out.println("Generated AES Key: " + bytesToHex(keyBytes));
//        } catch (NoSuchAlgorithmException e) {
//            e.printStackTrace();
//        }
		Date date = new Date(2023,9,11,16,39,22);
		Date now = new Date();
		System.out.print(now.getDay());

	}
//	public static String bytesToHex(byte[] bytes) {
//        StringBuilder hexString = new StringBuilder();
//        for (byte b : bytes) {
//            hexString.append(String.format("%02X", b));
//        }
//        return hexString.toString();
//    }

}
