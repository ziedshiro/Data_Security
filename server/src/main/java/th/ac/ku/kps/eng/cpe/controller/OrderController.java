package th.ac.ku.kps.eng.cpe.controller;

import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mysql.cj.x.protobuf.MysqlxCrud.Order;

import io.jsonwebtoken.Claims;
import th.ac.ku.kps.eng.cpe.auth.JwtUtil;
import th.ac.ku.kps.eng.cpe.model.Orderitem;
import th.ac.ku.kps.eng.cpe.model.Orders;
import th.ac.ku.kps.eng.cpe.model.Product;
import th.ac.ku.kps.eng.cpe.model.User;
import th.ac.ku.kps.eng.cpe.response.Response;
import th.ac.ku.kps.eng.cpe.service.EncryptionServices;
import th.ac.ku.kps.eng.cpe.service.OrderitemServices;
import th.ac.ku.kps.eng.cpe.service.OrdersServices;
import th.ac.ku.kps.eng.cpe.service.ProductServices;
import th.ac.ku.kps.eng.cpe.service.UserServices;
import th.ac.ku.kps.eng.cpe.util.FileUploadUtil;

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
	private OrderitemServices orderitemservice;
	
	@Autowired
	private ProductServices productservice;
	
	@Autowired
	private EncryptionServices encryptionservice;
	
	@GetMapping("/auth/order")
	public List<Orders> getByUser(@RequestHeader("Authorization") String token) throws Exception {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(encryptionservice.encrypt(username));
		if(user!=null && user.getRole().equals("customer")) {
			return orderservice.findByUser(user);
		}
		return null;
	}
	
	@GetMapping("/auth/payment")
	public List<Orders> getPayment(@RequestHeader("Authorization") String token) throws Exception {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(encryptionservice.encrypt(username));
		if(user!=null && user.getRole().equals("administrator")) {
			return orderservice.findPayment();
		}
		return null;
	}
	
	@GetMapping("/auth/pickup")
	public List<Orders> getPickup(@RequestHeader("Authorization") String token) throws Exception {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(encryptionservice.encrypt(username));
		if(user!=null && user.getRole().equals("store owner")) {
			return orderservice.findPickup();
		}
		return null;
	}
	
	@PostMapping("/auth/payment/{id}")
	public Response pay(@RequestHeader("Authorization") String token,@PathVariable("id")String id,@RequestPart("file") MultipartFile file) throws Exception {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(encryptionservice.encrypt(username));
		if(user!=null && user.getRole().equals("customer")) {
			Orders order = orderservice.findById(id);
			String fileName = StringUtils.cleanPath(file.getOriginalFilename());
			
			if (fileName != null && fileName.matches(".*\\.(jpg|jpeg|png|gif|bmp|svg)$")) {
				order.setOrderDate(new Date());
				order.setOrderStatus("Pending");
				String img = FileUploadUtil.saveFile(fileName, file);
				order.setFilepath(img);
				order.setPaymentDate(new Date());
				order.setPaymentStatus("Pending");
				order.setUpdatedate(new Date());
				List<Orderitem> orderItems = orderitemservice.findByOrderId(id);
				for (Orderitem orderItem : orderItems) {
					Product product = orderItem.getProduct();
					int quantityAvailable = product.getQuantityAvailable();
		            int orderedQuantity = orderItem.getQuantity();
		            if (quantityAvailable >= orderedQuantity) {
		            	product.setQuantityAvailable(quantityAvailable - orderedQuantity);
		            	productservice.save(product);		            	
		            } else {
		            	return new Response(HttpStatus.INTERNAL_SERVER_ERROR,"Error quantityAvailable not enough");
		            }
				}
				orderservice.save(order);
				return new Response(HttpStatus.OK,"Success!");
			}
			else {
				return new Response(HttpStatus.INTERNAL_SERVER_ERROR,"Error img Type!");
			}
		}
		return new Response(HttpStatus.UNAUTHORIZED,"Unauthorized!");
	}
	
	@PutMapping("/auth/payment/{id}")
	public Response payApprove(@RequestHeader("Authorization") String token,@RequestBody Orders orderBody,@PathVariable("id")String id) throws Exception {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(encryptionservice.encrypt(username));
		if(user!=null && user.getRole().equals("administrator")) {
			Orders order = orderservice.findById(id);
			if(orderBody.getPaymentStatus().equals("Approve")) {
				order.setPaymentStatus("Approve");
				order.setPickupCode(UUID.randomUUID().toString());
				order.setPickupStatus("Pending");
			}
			else if(orderBody.getPaymentStatus().equals("Reject")) {
				order.setOrderStatus("Failed");
				order.setPaymentStatus("Reject");
				List<Orderitem> orderItems = orderitemservice.findByOrderId(id);
				for (Orderitem orderItem : orderItems) {
	                Product product = orderItem.getProduct();
	                int orderedQuantity = orderItem.getQuantity();
	                product.setQuantityAvailable(product.getQuantityAvailable() + orderedQuantity);
	                productservice.save(product);
	            }
			}
			order.setUpdatedate(new Date());
			orderservice.save(order);
			
			return new Response(HttpStatus.OK,"Updated!");
		}
		return new Response(HttpStatus.UNAUTHORIZED,"Unauthorized!");
	}
	
	@GetMapping("/auth/pickup/check")
	public Orders findByCode(@RequestHeader("Authorization") String token,@RequestBody Orders orderBody) throws Exception {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(encryptionservice.encrypt(username));
		if(user!=null && user.getRole().equals("store owner")) {
			Orders order = orderservice.findPickupCode(orderBody.getPickupCode());
			if(order!=null) {
				return order;
			}
		}
		return null;
	}
	
	@PutMapping("/auth/pickup")
	public Response pickup(@RequestHeader("Authorization") String token,@RequestBody Orders orderBody) throws Exception {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(encryptionservice.encrypt(username));
		if(user!=null && user.getRole().equals("store owner")) {
			Orders order = orderservice.findPickupCode(orderBody.getPickupCode());
			if(order!=null && !order.getOrderStatus().equals("Success") && !order.getPickupStatus().equals("Received")) {
				order.setOrderStatus("Success");
				order.setPickupDate(new Date());
				order.setPickupStatus("Received");
				order.setUpdatedate(new Date());
				orderservice.save(order);
				return new Response(HttpStatus.OK,"Pick up!");
			}
			return new Response(HttpStatus.OK,"Code not match!");
		}
		return new Response(HttpStatus.UNAUTHORIZED,"Unauthorized!");
	}
	
}
