package th.ac.ku.kps.eng.cpe.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import th.ac.ku.kps.eng.cpe.model.Orders;

@Repository
public interface OrdersRepository extends CrudRepository<Orders, Integer> {
	@Query("from Orders as o where o.orderId = :orderId")
	public Orders findById(@Param("orderId") String orderId);
}
