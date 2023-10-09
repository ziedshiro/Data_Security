package th.ac.ku.kps.eng.cpe.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import th.ac.ku.kps.eng.cpe.model.Favourite;

@Repository
public interface FavouriteRepository extends CrudRepository<Favourite, Integer> {

}
