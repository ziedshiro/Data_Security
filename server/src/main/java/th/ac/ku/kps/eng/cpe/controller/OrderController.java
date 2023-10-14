package th.ac.ku.kps.eng.cpe.controller;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Claims;
import th.ac.ku.kps.eng.cpe.auth.JwtUtil;
import th.ac.ku.kps.eng.cpe.model.Favourite;
import th.ac.ku.kps.eng.cpe.model.Orders;
import th.ac.ku.kps.eng.cpe.model.User;
import th.ac.ku.kps.eng.cpe.response.OrderResponse;
import th.ac.ku.kps.eng.cpe.response.Response;
import th.ac.ku.kps.eng.cpe.service.EncryptionServices;
import th.ac.ku.kps.eng.cpe.service.OrderitemServices;
import th.ac.ku.kps.eng.cpe.service.OrdersServices;
import th.ac.ku.kps.eng.cpe.service.UserServices;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class OrderController {
	
	@Autowired
    private JwtUtil jwtUtil;
	
	@Autowired
	private UserServices userservice;
	
	@Autowired
	private OrdersServices orderservice;
	
	@Autowired
	private EncryptionServices encryptionservice;
	
	@GetMapping("/auth/order")
	public List<Orders> getByUser(@RequestHeader("Authorization") String token) throws Exception {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(encryptionservice.encrypt(username));
		if(user!=null) {
			return orderservice.findByUser(user);
		}
		return null;
	}
	
	@PostMapping("/auth/order/{id}")
	public Response create(@RequestHeader("Authorization") String token,@RequestBody Favourite favourite) {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(username);
		if(user!=null) {
			favourite.setFavouriteId(UUID.randomUUID().toString());
			favourite.setCreatedate(new Date());
//			favouriteservice.save(favourite);		
			return new Response(HttpStatus.OK,"Favourite!");
		}
		return new Response(HttpStatus.UNAUTHORIZED,"Unauthorized!");
	}
	
	@PutMapping("/auth/order/{id}")
	public Response check(@RequestHeader("Authorization") String token,@RequestBody Favourite favourite) {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(username);
		if(user!=null) {
			favourite.setFavouriteId(UUID.randomUUID().toString());
			favourite.setCreatedate(new Date());
//			favouriteservice.save(favourite);		
			return new Response(HttpStatus.OK,"Favourite!");
		}
		return new Response(HttpStatus.UNAUTHORIZED,"Unauthorized!");
	}
	
	@PutMapping("/auth/pay/{id}")
	public Response pay(@RequestHeader("Authorization") String token,@RequestBody Favourite favourite) {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(username);
		if(user!=null) {
			favourite.setFavouriteId(UUID.randomUUID().toString());
			favourite.setCreatedate(new Date());
//			favouriteservice.save(favourite);		
			return new Response(HttpStatus.OK,"Favourite!");
		}
		return new Response(HttpStatus.UNAUTHORIZED,"Unauthorized!");
	}
	
	@PutMapping("/auth/pay/approve/{id}")
	public Response payApprove(@RequestHeader("Authorization") String token,@RequestBody Favourite favourite) {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(username);
		if(user!=null) {
			favourite.setFavouriteId(UUID.randomUUID().toString());
			favourite.setCreatedate(new Date());
//			favouriteservice.save(favourite);		
			return new Response(HttpStatus.OK,"Favourite!");
		}
		return new Response(HttpStatus.UNAUTHORIZED,"Unauthorized!");
	}
	
	@PutMapping("/auth/pickup/{id}")
	public Response pickup(@RequestHeader("Authorization") String token,@RequestBody Favourite favourite) {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(username);
		if(user!=null) {
			favourite.setFavouriteId(UUID.randomUUID().toString());
			favourite.setCreatedate(new Date());
//			favouriteservice.save(favourite);		
			return new Response(HttpStatus.OK,"Favourite!");
		}
		return new Response(HttpStatus.UNAUTHORIZED,"Unauthorized!");
	}
	
	@PutMapping("/auth/pickup/approve/{id}")
	public Response pickupApprove(@RequestHeader("Authorization") String token,@RequestBody Favourite favourite) {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(username);
		if(user!=null) {
			favourite.setFavouriteId(UUID.randomUUID().toString());
			favourite.setCreatedate(new Date());
//			favouriteservice.save(favourite);		
			return new Response(HttpStatus.OK,"Favourite!");
		}
		return new Response(HttpStatus.UNAUTHORIZED,"Unauthorized!");
	}
	
}
