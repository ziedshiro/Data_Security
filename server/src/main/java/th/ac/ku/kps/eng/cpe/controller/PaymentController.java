package th.ac.ku.kps.eng.cpe.controller;

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

import io.jsonwebtoken.Claims;
import th.ac.ku.kps.eng.cpe.auth.JwtUtil;
import th.ac.ku.kps.eng.cpe.model.Orders;
import th.ac.ku.kps.eng.cpe.model.User;
import th.ac.ku.kps.eng.cpe.response.QRCodeResponse;
import th.ac.ku.kps.eng.cpe.service.EncryptionServices;
import th.ac.ku.kps.eng.cpe.service.OrdersServices;
import th.ac.ku.kps.eng.cpe.service.UserServices;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class PaymentController {
	
	@Autowired
    private JwtUtil jwtUtil;
	
	@Autowired
	private OrdersServices orderservice;
	
	@Autowired
	private EncryptionServices encryptionservice;
	
	@Autowired
	private UserServices userservice;
	
	@PostMapping("auth/generateqrcode/{id}")
	public QRCodeResponse generateQRCode(@RequestHeader("Authorization") String token,@PathVariable("id")String id) throws Exception {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(encryptionservice.encrypt(username));
		QRCodeResponse reps = new QRCodeResponse();
		if (user != null) {
			Orders order = orderservice.findById(id);
			ThaiQRPromptPay qrcode = new ThaiQRPromptPay.Builder().dynamicQR().creditTransfer().mobileNumber("0955523541").amount(order.getTotalAmount()).build();
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
