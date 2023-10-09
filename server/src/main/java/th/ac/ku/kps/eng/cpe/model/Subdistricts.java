package th.ac.ku.kps.eng.cpe.model;
// Generated Oct 10, 2023, 1:16:06 AM by Hibernate Tools 6.1.7.Final

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Subdistricts generated by hbm2java
 */
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Subdistricts implements java.io.Serializable {

	private Integer id;
	private Districts districts;
	private int code;
	private String nameInThai;
	private String nameInEnglish;
	private BigDecimal latitude;
	private BigDecimal longitude;
	private Integer zipCode;
	@JsonIgnore private Set stores = new HashSet(0);

	public Subdistricts() {
	}

	public Subdistricts(Districts districts, int code, String nameInThai, BigDecimal latitude, BigDecimal longitude) {
		this.districts = districts;
		this.code = code;
		this.nameInThai = nameInThai;
		this.latitude = latitude;
		this.longitude = longitude;
	}

	public Subdistricts(Districts districts, int code, String nameInThai, String nameInEnglish, BigDecimal latitude,
			BigDecimal longitude, Integer zipCode, Set stores) {
		this.districts = districts;
		this.code = code;
		this.nameInThai = nameInThai;
		this.nameInEnglish = nameInEnglish;
		this.latitude = latitude;
		this.longitude = longitude;
		this.zipCode = zipCode;
		this.stores = stores;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Districts getDistricts() {
		return this.districts;
	}

	public void setDistricts(Districts districts) {
		this.districts = districts;
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

	public BigDecimal getLatitude() {
		return this.latitude;
	}

	public void setLatitude(BigDecimal latitude) {
		this.latitude = latitude;
	}

	public BigDecimal getLongitude() {
		return this.longitude;
	}

	public void setLongitude(BigDecimal longitude) {
		this.longitude = longitude;
	}

	public Integer getZipCode() {
		return this.zipCode;
	}

	public void setZipCode(Integer zipCode) {
		this.zipCode = zipCode;
	}

	public Set getStores() {
		return this.stores;
	}

	public void setStores(Set stores) {
		this.stores = stores;
	}

}
