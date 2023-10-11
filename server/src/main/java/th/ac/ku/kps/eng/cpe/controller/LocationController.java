package th.ac.ku.kps.eng.cpe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import th.ac.ku.kps.eng.cpe.response.LocationResponse;
import th.ac.ku.kps.eng.cpe.service.DistrictsServices;
import th.ac.ku.kps.eng.cpe.service.ProvincesServices;
import th.ac.ku.kps.eng.cpe.service.SubdistrictsServices;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class LocationController {
	
	@Autowired
	private ProvincesServices provinceservice;
	
	@Autowired
	private DistrictsServices districtservice;
	
	@Autowired
	private SubdistrictsServices subdistrictservice;
	
	@GetMapping("/location")
	public LocationResponse all() {
		LocationResponse location = new LocationResponse();
		location.setProvinces(provinceservice.findAll());
		location.setDistricts(districtservice.findAll());
		location.setSubdistricts(subdistrictservice.findAll());
		
		return location;
	}
}
