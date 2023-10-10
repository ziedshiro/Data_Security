package th.ac.ku.kps.eng.cpe.auth;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.util.Base64;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import th.ac.ku.kps.eng.cpe.service.EncryptionServices;

@Service
public class test {
	@Value("${secret.pepper}")
	private static String pepper;
	
	@Autowired
	private static EncryptionServices encryptionservice;
	
	public static void main(String[] args) throws Exception {
			
//        byte[] pepperBytes = new byte[32];
//        SecureRandom random = new SecureRandom();
//        random.nextBytes(pepperBytes);
//		System.out.print(DigestUtils.sha256Hex("5yMC5Uq2T8x3M+i71kJPoQ=="+"ILzwnx/f2+JBioRB8ZDdSZmMRNewwSsc8sRob9G8mBU="+"12345678"));
	
//		System.out.print(encryptionservice.encrypt("EoQvbrGqRB2QsRrHk1xPTg=="));

	}

}
