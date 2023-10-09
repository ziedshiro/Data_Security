package th.ac.ku.kps.eng.cpe.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import th.ac.ku.kps.eng.cpe.model.Review;
import th.ac.ku.kps.eng.cpe.repository.ReviewRepository;

@Service
public class ReviewServices {
	@Autowired
	private ReviewRepository reviewrepository;
	
	public List<Review> findAll(){
		return (List<Review>) reviewrepository.findAll();
	}
	
	public Review findById(int id) {
		return reviewrepository.findById(id).orElse(null);
	}
	
	public Review save(Review review) {
		return reviewrepository.save(review);
	}
	
	public void deleteById(int id) {
		reviewrepository.deleteById(id);
	}
}
