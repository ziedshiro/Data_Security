package th.ac.ku.kps.eng.cpe.model;
// Generated Oct 14, 2023, 12:18:28 AM by Hibernate Tools 6.1.7.Final

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Provinces generated by hbm2java
 */
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Provinces implements java.io.Serializable {

	private Integer id;
	private int code;
	private String nameInThai;
	private String nameInEnglish;
	@JsonIgnore private Set stores = new HashSet(0);
	@JsonIgnore private Set districtses = new HashSet(0);

	public Provinces() {
	}

	public Provinces(int code, String nameInThai, String nameInEnglish) {
		this.code = code;
		this.nameInThai = nameInThai;
		this.nameInEnglish = nameInEnglish;
	}

	public Provinces(int code, String nameInThai, String nameInEnglish, Set stores, Set districtses) {
		this.code = code;
		this.nameInThai = nameInThai;
		this.nameInEnglish = nameInEnglish;
		this.stores = stores;
		this.districtses = districtses;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getCode() {
		return this.code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getNameInThai() {
		return this.nameInThai;
	}

	public void setNameInThai(String nameInThai) {
		this.nameInThai = nameInThai;
	}

	public String getNameInEnglish() {
		return this.nameInEnglish;
	}

	public void setNameInEnglish(String nameInEnglish) {
		this.nameInEnglish = nameInEnglish;
	}

	public Set getStores() {
		return this.stores;
	}

	public void setStores(Set stores) {
		this.stores = stores;
	}

	public Set getDistrictses() {
		return this.districtses;
	}

	public void setDistrictses(Set districtses) {
		this.districtses = districtses;
	}

}
