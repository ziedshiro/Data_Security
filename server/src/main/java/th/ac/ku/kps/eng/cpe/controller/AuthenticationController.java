package th.ac.ku.kps.eng.cpe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

import th.ac.ku.kps.eng.cpe.dto.LoginDTO;
import th.ac.ku.kps.eng.cpe.dto.UserDTO;
import th.ac.ku.kps.eng.cpe.model.User;
import th.ac.ku.kps.eng.cpe.response.LoginResponse;
import th.ac.ku.kps.eng.cpe.response.MFAResponse;
import th.ac.ku.kps.eng.cpe.response.RegisterResponse;
import th.ac.ku.kps.eng.cpe.service.EncryptionServices;
import th.ac.ku.kps.eng.cpe.service.HashServices;
import th.ac.ku.kps.eng.cpe.service.UserServices;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class AuthenticationController {
	private final String secret = "T5JDCOA5B5B6NPEUPC5V3RXCWSLKWBZ2I4MRYMXSERNW7I6E27YH7J6WMLTIBDQD";

	@Autowired
	private UserServices userservice;
	
	@Autowired
    private HashServices hashservices;
	
	@Autowired
	private EncryptionServices encryptionservice;
	
	@GetMapping("/en")
	public String en(){
		try {
		return encryptionservice.encrypt("test");
		} catch (Exception e) {
            e.printStackTrace();
            return null;
        }
	}
	
	@GetMapping("/de/{userId}")
	public String de(@PathVariable("userId") String userId){
		try {
		return encryptionservice.decrypt(userId);
	 } catch (Exception e) {
         e.printStackTrace();
         return null;
     }
	}
	
	@PostMapping("/generateMFACode/{userId}")
	public MFAResponse generateMFA(@PathVariable("userId") String userId) throws QrGenerationException {
		MFAResponse resp = new MFAResponse();
		
		SecretGenerator secretGenerator = new DefaultSecretGenerator();
		String secret = secretGenerator.generate();
		
		QrData data = new QrData.Builder()
				   .label(userId)
				   .secret(secret)
				   .issuer("Yummy Hub")
				   .algorithm(HashingAlgorithm.SHA1) // More on this below
				   .digits(6)
				   .period(30)
				   .build();
		QrGenerator generator = new ZxingPngQrGenerator();
		byte[] imageData = generator.generate(data);
		String mimeType = generator.getImageMimeType();
		String dataUri = getDataUriForImage(imageData, mimeType);
		
		resp.setStatus(HttpStatus.CREATED);
		resp.setSecret(secret);
		resp.setUri(dataUri);
		
		return resp;
	}
	
	@PostMapping("/register")
	public RegisterResponse register(@Valid @RequestBody UserDTO user, BindingResult bindingResult) throws Exception {
		RegisterResponse resp = new RegisterResponse();
		if(bindingResult.hasErrors()||(userservice.findByUserId(user.getUserId())!=null)) {
			resp.setStatus(HttpStatus.BAD_REQUEST);
			List<String> errors = bindingResult.getAllErrors().stream()
		            .map(ObjectError::getDefaultMessage)
		            .collect(Collectors.toList());
			if(userservice.findByUserId(user.getUserId())!=null) {
				errors.add("Invalid USER ID: USER ID DUPLICATE");
			}
			resp.setMsg(errors);
			
			return resp;
		}
		else {
			TimeProvider timeProvider = new SystemTimeProvider();
			CodeGenerator codeGenerator = new DefaultCodeGenerator();
			CodeVerifier verifier = new DefaultCodeVerifier(codeGenerator, timeProvider);
			boolean successful = verifier.isValidCode(user.getSecretCode(), user.getCodeTwoFactorAuthentication());
			if(successful) {
				String userId = encryptionservice.encrypt(user.getUserId());
				String firstname = encryptionservice.encrypt(user.getFirstname());
				String lastname = encryptionservice.encrypt(user.getLastname());
				String salt = hashservices.generateSalt();
				String password = hashservices.hashPassword(user.getPassword(),salt);

				userservice.save(new User(userId,firstname,lastname,password,salt,"customer",null,false,0,null,true,user.getCodeTwoFactorAuthentication()));
				
				resp.setStatus(HttpStatus.CREATED);
				List<String> msg = new ArrayList<String>();
				msg.add("Register Success");
				
				
				return resp;				
			}
			else {
				resp.setStatus(HttpStatus.BAD_REQUEST);
				List<String> msg = new ArrayList<String>();
				msg.add("Code not Match!");
				resp.setMsg(msg);
				
				return resp;
			}
			
		}
	}
	
	@PostMapping("/login")
	public LoginResponse login(LoginDTO login) {
		LoginResponse loginresp = new LoginResponse();
		//decode and find user
		
//		TimeProvider timeProvider = new SystemTimeProvider();
//		CodeGenerator codeGenerator = new DefaultCodeGenerator();
//		CodeVerifier verifier = new DefaultCodeVerifier(codeGenerator, timeProvider);
//		boolean successful = verifier.isValidCode(secret, login.getCodeTwoFactorAuthentication());
		
		return loginresp;
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
