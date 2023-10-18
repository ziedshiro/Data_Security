package th.ac.ku.kps.eng.cpe.controller;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	
	@Autowired
	private OrdersServices orderservice;
	
	@Autowired
	private ProductServices productservice;
	
	@GetMapping("/auth/orderitem")
	public List<Orderitem> getByUser(@RequestHeader("Authorization") String token) throws Exception {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(encryptionservice.encrypt(username));
		if(user!=null && user.getRole().equals("customer")) {
			return orderitemservice.findByUser(user);
		}
		return null;
	}
	
	@GetMapping("/auth/orderitem/{id}")
	public Orderitem getById(@RequestHeader("Authorization") String token,@PathVariable("id") String id) throws Exception {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(encryptionservice.encrypt(username));
		if(user!=null && user.getRole().equals("customer")) {
			return orderitemservice.findById(id);
		}
		return null;
	}
	
	@GetMapping("/auth/orderitem/order/{id}")
	public List<Orderitem> getByOrderId(@RequestHeader("Authorization") String token,@PathVariable("id") String id) throws Exception {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(encryptionservice.encrypt(username));
		if(user!=null && user.getRole().equals("customer")) {
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
		if(user!=null && user.getRole().equals("customer")) {
			return orderitemservice.findCartByUser(user);
		}
		return null;
	}
	
	@PostMapping("/auth/orderitem/{id}")
	public Response addeOrderItem(@RequestHeader("Authorization") String token,@RequestBody Orderitem orderitem,@PathVariable("id") String id) throws Exception {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(encryptionservice.encrypt(username));
		if(user!=null && user.getRole().equals("customer")) {
			Orders order = orderservice.findCartByUser(user);
			Product product = productservice.findById(id);
			BigDecimal subTotal = new BigDecimal(0);
			
			Date storeOpenDate = product.getStore().getStoreOpen();
			Date storeCloseDate = product.getStore().getStoreClose();
			LocalTime storeOpenTime = storeOpenDate.toInstant().atZone(ZoneId.systemDefault()).toLocalTime();
			LocalTime storeCloseTime = storeCloseDate.toInstant().atZone(ZoneId.systemDefault()).toLocalTime();
			LocalTime currentTime = LocalTime.now();
			LocalTime oneHourBeforeClose = storeCloseTime.minusHours(1);
			
			if(currentTime.isAfter(storeOpenTime) && currentTime.isBefore(storeCloseTime)) {
				if(orderitem.getQuantity()<=product.getQuantityAvailable() && orderitem.getQuantity()!=0) {
					if (currentTime.isBefore(storeCloseTime) && currentTime.isAfter(oneHourBeforeClose)) {
						subTotal = product.getDiscountPrice().multiply(new BigDecimal(orderitem.getQuantity()));
					} else {
						subTotal = product.getPrice().multiply(new BigDecimal(orderitem.getQuantity()));				
					}
					
					if(order != null) {
						order.setTotalAmount(order.getTotalAmount().add(subTotal));
						order.setUpdatedate(new Date());
						
						orderservice.save(order);
						
						orderitem.setOrders(order);
					}else {
						Orders o = new Orders(UUID.randomUUID().toString(),
								user,
								new Date(),
								"Cart",
								subTotal,null,null,null,null,null,null,
								new Date(),null	
								);
						orderservice.save(o);
						
						orderitem.setOrders(o);
					}
					
					orderitem.setOrderItemId(UUID.randomUUID().toString());
					orderitem.setProduct(product);
					orderitem.setOrders(order);
					orderitem.setSubtotal(subTotal);
					orderitem.setCreatedate(new Date());
					
					orderitemservice.save(orderitem);
					return new Response(HttpStatus.OK,"Created");
				}
				else {
					return new Response(HttpStatus.INTERNAL_SERVER_ERROR,"QuantityAvailable not enough");
				}
			}
			else {
				return new Response(HttpStatus.INTERNAL_SERVER_ERROR,"Time not order!");
			}
		}
		return new Response(HttpStatus.UNAUTHORIZED,"UNAUTHORIZED");	
	}
	
	@PutMapping("/auth/orderitem/{id}")
	public Response updateOrderItem(@RequestHeader("Authorization") String token,@RequestBody Orderitem orderitemBody,@PathVariable("id") String id) throws Exception {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(encryptionservice.encrypt(username));
		if(user!=null && user.getRole().equals("customer")) {
			Orders order = orderservice.findCartByUser(user);
			BigDecimal subTotal = new BigDecimal(0);
			Orderitem orderitem = orderitemservice.findById(id);
			
			if(orderitem!=null) {
				Product product = orderitem.getProduct();
				
				Date storeOpenDate = product.getStore().getStoreOpen();
				Date storeCloseDate = product.getStore().getStoreClose();
				LocalTime storeOpenTime = storeOpenDate.toInstant().atZone(ZoneId.systemDefault()).toLocalTime();
				LocalTime storeCloseTime = storeCloseDate.toInstant().atZone(ZoneId.systemDefault()).toLocalTime();
				LocalTime currentTime = LocalTime.now();
				LocalTime oneHourBeforeClose = storeCloseTime.minusHours(1);
				
				if(currentTime.isAfter(storeOpenTime) && currentTime.isBefore(storeCloseTime)) {
					if(orderitemBody.getQuantity()<=product.getQuantityAvailable() && orderitemBody.getQuantity()!=0) {
						if (currentTime.isBefore(storeCloseTime) && currentTime.isAfter(oneHourBeforeClose)) {
							subTotal = product.getDiscountPrice().multiply(new BigDecimal(orderitemBody.getQuantity()));
						} else {
							subTotal = product.getPrice().multiply(new BigDecimal(orderitemBody.getQuantity()));				
						}
						
						order.setTotalAmount(order.getTotalAmount().subtract(orderitem.getSubtotal()));
						order.setTotalAmount(order.getTotalAmount().add(subTotal));
						order.setUpdatedate(new Date());
						orderservice.save(order);
						
						orderitem.setOrders(order);
						orderitem.setSubtotal(subTotal);
						orderitem.setUpdatedate(new Date());
						
						orderitemservice.save(orderitem);
						return new Response(HttpStatus.OK,"Update");
					}
					else {
						return new Response(HttpStatus.INTERNAL_SERVER_ERROR,"QuantityAvailable not enough");
					}
				}
				else {
					return new Response(HttpStatus.INTERNAL_SERVER_ERROR,"Time not order!");
				
				}
			}
			else {
				return new Response(HttpStatus.INTERNAL_SERVER_ERROR,"Orderitem not found!");
			}
		}
		return new Response(HttpStatus.UNAUTHORIZED,"UNAUTHORIZED");
		
	}
	
	@DeleteMapping("/auth/orderitem/{id}")
	public Response deleteOrderItem(@RequestHeader("Authorization") String token,@PathVariable("id") String id) throws Exception {
		String jwtToken = token.replace("Bearer ", "");
		Claims claims = jwtUtil.parseJwtClaims(jwtToken);
		String username = (String) claims.get("username");
		User user = userservice.findByUserId(encryptionservice.encrypt(username));
		if(user!=null && user.getRole().equals("customer")) {
			Orders order = orderservice.findCartByUser(user);
			List<Orderitem> list = orderitemservice.findByUser(user);
			Orderitem orderitem = orderitemservice.findById(id);
			if(list.size() == 1) {
				orderitemservice.deleteById(orderitem);
				orderservice.deleteById(order);
			}
			else {
				order.setTotalAmount(order.getTotalAmount().subtract(orderitem.getSubtotal()));
				order.setUpdatedate(new Date());
				orderservice.save(order);				
				orderitemservice.deleteById(orderitem);
			}			
			return new Response(HttpStatus.OK,"Delted");
		}
		return new Response(HttpStatus.UNAUTHORIZED,"UNAUTHORIZED");
		
	}
}
