package th.ac.ku.kps.eng.cpe.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Claims;
import th.ac.ku.kps.eng.cpe.auth.JwtUtil;
import th.ac.ku.kps.eng.cpe.model.Orderitem;
import th.ac.ku.kps.eng.cpe.model.User;
import th.ac.ku.kps.eng.cpe.service.EncryptionServices;
import th.ac.ku.kps.eng.cpe.service.OrderitemServices;
import th.ac.ku.kps.eng.cpe.service.UserServices;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class OrderitemController {
	
	@Autowired
    private JwtUtil jwtUtil;
	
	@Autowired
	private UserServices userservice;
	
	@Autowired
	private OrderitemServices orderitemservice;
	
	@Autowired
	private EncryptionServices encryptionservice;
	
	@GetMapping("/auth/orderitem")
	public List<Orderitem> getByUser(@RequestHeader("Authorization") String token) throws Exception {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(encryptionservice.encrypt(username));
		if(user!=null) {
			return orderitemservice.findByUser(user);
		}
		return null;
	}
	
	@GetMapping("/auth/orderitem/order/{id}")
	public List<Orderitem> getByOrderId(@RequestHeader("Authorization") String token,@PathVariable("id") String id) throws Exception {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(encryptionservice.encrypt(username));
		if(user!=null) {
			return orderitemservice.findByOrderId(id);
		}
		return null;
	}
	
	@GetMapping("/auth/cart")
	public List<Orderitem> getCartByUser(@RequestHeader("Authorization") String token) throws Exception {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(encryptionservice.encrypt(username));
		if(user!=null) {
			return orderitemservice.findCartByUser(user);
		}
		return null;
	}
}
