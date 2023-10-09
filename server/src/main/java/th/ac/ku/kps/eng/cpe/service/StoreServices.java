package th.ac.ku.kps.eng.cpe.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import th.ac.ku.kps.eng.cpe.model.Store;
import th.ac.ku.kps.eng.cpe.repository.StoreRepository;

@Service
public class StoreServices {
	@Autowired
	private StoreRepository storerepository;
	
	public List<Store> findAll(){
		return (List<Store>) storerepository.findAll();
	}
	
	public Store findById(int id) {
		return storerepository.findById(id).orElse(null);
	}
	
	public Store save(Store store) {
		return storerepository.save(store);
	}
	
	public void deleteById(int id) {
		storerepository.deleteById(id);
	}
}
