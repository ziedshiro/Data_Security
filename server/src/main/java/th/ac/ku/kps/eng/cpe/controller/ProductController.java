package th.ac.ku.kps.eng.cpe.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import th.ac.ku.kps.eng.cpe.auth.JwtUtil;
import th.ac.ku.kps.eng.cpe.model.Product;
import th.ac.ku.kps.eng.cpe.service.ProductServices;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class ProductController {
	@Autowired
	private ProductServices productservice;
	
	@Autowired
    private JwtUtil jwtUtil;
	
	@GetMapping("/product")
	public List<Product> getAll(){
		return productservice.findAll();
	}
	
	@GetMapping("/product/{id}")
	public Product getById(@PathVariable("id")String id) {
		return productservice.findById(id);
	}
	
	@PostMapping("/product")
	public void create() {
		
	}
	
	@PutMapping("/product/{id}")
	public void update() {
		
	}
	
	@DeleteMapping("/product/{id}")
	public void delete() {
		
	}
}
