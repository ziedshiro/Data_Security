package th.ac.ku.kps.eng.cpe.controller;

import java.io.IOException;
import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.pheerathach.ThaiQRPromptPay;
import com.google.zxing.WriterException;

import io.jsonwebtoken.Claims;
import th.ac.ku.kps.eng.cpe.auth.JwtUtil;
import th.ac.ku.kps.eng.cpe.response.QRCodeResponse;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class QRCodeController {
	
	@Autowired
    private JwtUtil jwtUtil;
	
	
	@PostMapping("auth/createqrcode/{id}")
	public QRCodeResponse createQRCode(@RequestHeader("Authorization") String token,@PathVariable("id")int id) throws IOException, WriterException {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		QRCodeResponse reps = new QRCodeResponse();
		if (username != null) {
			ThaiQRPromptPay qrcode = new ThaiQRPromptPay.Builder().dynamicQR().creditTransfer().mobileNumber("0955523541").amount(new BigDecimal(5)).build();
			reps.setResults("data:image/png;base64,"+qrcode.drawToBase64(300, 300));
			reps.setMsg("create");
			reps.setStatus(HttpStatus.CREATED);
		}
		else {
			reps.setMsg("Unauthorized");
			reps.setStatus(HttpStatus.UNAUTHORIZED);
		}
		return reps;
		
	}
}
