package th.ac.ku.kps.eng.cpe.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import th.ac.ku.kps.eng.cpe.model.Orderitem;
import th.ac.ku.kps.eng.cpe.repository.OrderitemRepository;

@Service
public class OrderitemServices {
	@Autowired
	private OrderitemRepository orderitemrepository;
	
	public List<Orderitem> findAll(){
		return (List<Orderitem>) orderitemrepository.findAll();
	}
	
	public List<Orderitem> findByOrderId(String id){
		return (List<Orderitem>) orderitemrepository.findByOrderId(id);
	}
	
	public Orderitem findById(int id) {
		return orderitemrepository.findById(id).orElse(null);
	}
	
	public Orderitem save(Orderitem orderitem) {
		return orderitemrepository.save(orderitem);
	}
	
	public void deleteById(int id) {
		orderitemrepository.deleteById(id);
	}
}
