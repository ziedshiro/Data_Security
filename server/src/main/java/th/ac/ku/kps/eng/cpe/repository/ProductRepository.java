package th.ac.ku.kps.eng.cpe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import th.ac.ku.kps.eng.cpe.model.Product;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer> {
	@Query("from Product as p where p.productId = :productId")
	public Product findBytId(@Param("productId") String id);
	@Query("from Product as p where p.type.typeId = :typeId")
	public List<Product> findBytTypeId(@Param("typeId") int id);
}
