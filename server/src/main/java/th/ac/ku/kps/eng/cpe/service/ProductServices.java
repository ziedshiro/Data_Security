package th.ac.ku.kps.eng.cpe.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import th.ac.ku.kps.eng.cpe.model.Product;
import th.ac.ku.kps.eng.cpe.repository.ProductRepository;

@Service
public class ProductServices {
	@Autowired
	private ProductRepository productpository;
	
	public List<Product> findAll(){
		return (List<Product>) productpository.findAll();
	}
	
	public Product findById(String id) {
		return productpository.findBytId(id);
	}
	
	public Product save(Product product) {
		return productpository.save(product);
	}
	
	public void deleteById(int id) {
		productpository.deleteById(id);
	}
	
	public void delete(Product product) {
		productpository.delete(product);
	}
}
