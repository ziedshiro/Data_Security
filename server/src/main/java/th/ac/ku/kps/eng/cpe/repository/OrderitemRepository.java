package th.ac.ku.kps.eng.cpe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import th.ac.ku.kps.eng.cpe.model.Orderitem;

@Repository
public interface OrderitemRepository extends CrudRepository<Orderitem, Integer> {
	@Query("from Orderitem as o where o.orders.orderId = :orderId")
	public List<Orderitem> findByOrderId(@Param("orderId") String orderId);
}
