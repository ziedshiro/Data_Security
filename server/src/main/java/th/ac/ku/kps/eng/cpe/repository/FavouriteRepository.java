package th.ac.ku.kps.eng.cpe.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import th.ac.ku.kps.eng.cpe.model.Favourite;

@Repository
public interface FavouriteRepository extends CrudRepository<Favourite, Integer> {
	@Query("from Favourite as f where f.favouriteId = :favouriteId")
	public Favourite findById(@Param("favouriteId") String favouriteId);
}
