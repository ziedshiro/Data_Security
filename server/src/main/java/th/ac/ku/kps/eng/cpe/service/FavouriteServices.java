package th.ac.ku.kps.eng.cpe.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import th.ac.ku.kps.eng.cpe.model.Favourite;
import th.ac.ku.kps.eng.cpe.repository.FavouriteRepository;

@Service
public class FavouriteServices {
	@Autowired
	private FavouriteRepository favouriterepository;
	
	public List<Favourite> findAll(){
		return (List<Favourite>) favouriterepository.findAll();
	}
	
	public Favourite findById(int id) {
		return favouriterepository.findById(id).orElse(null);
	}
	
	public Favourite save(Favourite favourite) {
		return favouriterepository.save(favourite);
	}
	
	public void deleteById(int id) {
		favouriterepository.deleteById(id);
	}
}
