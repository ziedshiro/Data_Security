package th.ac.ku.kps.eng.cpe.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import th.ac.ku.kps.eng.cpe.model.Orders;
import th.ac.ku.kps.eng.cpe.repository.OrdersRepository;

@Service
public class OrdersServices {
	@Autowired
	private OrdersRepository ordersrepository;
	
	public List<Orders> findAll(){
		return (List<Orders>) ordersrepository.findAll();
	}
	
	public Orders findById(int id) {
		return ordersrepository.findById(id).orElse(null);
	}
	
	public Orders findById(String id) {
		return ordersrepository.findById(id);
	}
	
	public Orders save(Orders orders) {
		return ordersrepository.save(orders);
	}
	
	public void deleteById(int id) {
		ordersrepository.deleteById(id);
	}
}
