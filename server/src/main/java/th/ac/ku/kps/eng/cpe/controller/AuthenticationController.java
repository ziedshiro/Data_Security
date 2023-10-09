package th.ac.ku.kps.eng.cpe.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;

import dev.samstevens.totp.code.CodeGenerator;
import dev.samstevens.totp.code.CodeVerifier;
import dev.samstevens.totp.code.DefaultCodeGenerator;
import dev.samstevens.totp.code.DefaultCodeVerifier;
import dev.samstevens.totp.code.HashingAlgorithm;
import dev.samstevens.totp.exceptions.QrGenerationException;
import dev.samstevens.totp.qr.QrData;
import dev.samstevens.totp.secret.DefaultSecretGenerator;
import dev.samstevens.totp.secret.SecretGenerator;
import dev.samstevens.totp.time.NtpTimeProvider;
import dev.samstevens.totp.time.SystemTimeProvider;
import dev.samstevens.totp.time.TimeProvider;
import dev.samstevens.totp.qr.ZxingPngQrGenerator;
import dev.samstevens.totp.recovery.RecoveryCodeGenerator;
import dev.samstevens.totp.qr.QrGenerator;
import static dev.samstevens.totp.util.Utils.getDataUriForImage;

import java.net.UnknownHostException;
import java.util.HashMap;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
//@RequestMapping("/api")
public class AuthenticationController {
//	private final GoogleAuthenticator googleAuthenticator;
	private final String secret = "T5JDCOA5B5B6NPEUPC5V3RXCWSLKWBZ2I4MRYMXSERNW7I6E27YH7J6WMLTIBDQD";
	
//	public AuthenticationController() {
//		this.googleAuthenticator = new GoogleAuthenticator();
//	}
	
	@GetMapping("/test")
	public String test() {
		return "test";
	}

	@PostMapping("/generateMFA")
	public String generateMFA() throws QrGenerationException {
		SecretGenerator secretGenerator = new DefaultSecretGenerator();
		String secret = secretGenerator.generate();
		QrData data = new QrData.Builder()
				   .label("Shop")
				   .secret(secret)
				   .issuer("DS")
				   .algorithm(HashingAlgorithm.SHA1) // More on this below
				   .digits(6)
				   .period(30)
				   .build();
		QrGenerator generator = new ZxingPngQrGenerator();
		byte[] imageData = generator.generate(data);
		String mimeType = generator.getImageMimeType();
		String dataUri = getDataUriForImage(imageData, mimeType);
		
		return dataUri;
	}
	@PostMapping("/check/{code}")
	public Boolean check(@PathVariable("code")String code) throws UnknownHostException  {
		TimeProvider timeProvider = new SystemTimeProvider();
		CodeGenerator codeGenerator = new DefaultCodeGenerator();
		CodeVerifier verifier = new DefaultCodeVerifier(codeGenerator, timeProvider);
		boolean successful = verifier.isValidCode(secret, code);
		return successful;
	}
	
	@PostMapping("/recovery")
	public String[] Recovery() {
		RecoveryCodeGenerator recoveryCodes = new RecoveryCodeGenerator();
		String[] codes = recoveryCodes.generateCodes(16);
		return codes;
	}
    
}
