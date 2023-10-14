package th.ac.ku.kps.eng.cpe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import th.ac.ku.kps.eng.cpe.model.Orderitem;
import th.ac.ku.kps.eng.cpe.model.User;

@Repository
public interface OrderitemRepository extends CrudRepository<Orderitem, Integer> {
	@Query("from Orderitem as o where o.orders.orderId = :orderId")
	public List<Orderitem> findByOrderId(@Param("orderId") String orderId);
	
	@Query("from Orderitem as o where o.orders.user = :user")
	public List<Orderitem> findByUser(@Param("user") User user);
	
	@Query("from Orderitem as o where o.orders.user = :user and o.orders.status = 'Cart'")
	public List<Orderitem> findCartByUser(@Param("user")User user);
	
}
