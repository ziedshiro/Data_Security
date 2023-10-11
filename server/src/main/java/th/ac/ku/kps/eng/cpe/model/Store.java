package th.ac.ku.kps.eng.cpe.model;
// Generated Oct 11, 2023, 2:55:47 PM by Hibernate Tools 6.1.7.Final

import java.sql.Time;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Store generated by hbm2java
 */
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Store implements java.io.Serializable {

	private String storeId;
	@JsonIgnore private User user;
	private Districts districts;
	private Provinces provinces;
	private Subdistricts subdistricts;
	private String name;
	private String address;
	private Integer latitude;
	private Integer longitude;
	private String imgStore;
	private Time storeOpen;
	private Time storeClose;
	@JsonIgnore private Set favourites = new HashSet(0);
	@JsonIgnore private Set products = new HashSet(0);
	@JsonIgnore private Set reviews = new HashSet(0);

	public Store() {
	}

	public Store(String storeId, User user, Districts districts, Provinces provinces, Subdistricts subdistricts,
			String name, String address, String imgStore, Time storeOpen, Time storeClose) {
		this.storeId = storeId;
		this.user = user;
		this.districts = districts;
		this.provinces = provinces;
		this.subdistricts = subdistricts;
		this.name = name;
		this.address = address;
		this.imgStore = imgStore;
		this.storeOpen = storeOpen;
		this.storeClose = storeClose;
	}

	public Store(String storeId, User user, Districts districts, Provinces provinces, Subdistricts subdistricts,
			String name, String address, Integer latitude, Integer longitude, String imgStore, Time storeOpen,
			Time storeClose, Set favourites, Set products, Set reviews) {
		this.storeId = storeId;
		this.user = user;
		this.districts = districts;
		this.provinces = provinces;
		this.subdistricts = subdistricts;
		this.name = name;
		this.address = address;
		this.latitude = latitude;
		this.longitude = longitude;
		this.imgStore = imgStore;
		this.storeOpen = storeOpen;
		this.storeClose = storeClose;
		this.favourites = favourites;
		this.products = products;
		this.reviews = reviews;
	}

	public String getStoreId() {
		return this.storeId;
	}

	public void setStoreId(String storeId) {
		this.storeId = storeId;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Districts getDistricts() {
		return this.districts;
	}

	public void setDistricts(Districts districts) {
		this.districts = districts;
	}

	public Provinces getProvinces() {
		return this.provinces;
	}

	public void setProvinces(Provinces provinces) {
		this.provinces = provinces;
	}

	public Subdistricts getSubdistricts() {
		return this.subdistricts;
	}

	public void setSubdistricts(Subdistricts subdistricts) {
		this.subdistricts = subdistricts;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Integer getLatitude() {
		return this.latitude;
	}

	public void setLatitude(Integer latitude) {
		this.latitude = latitude;
	}

	public Integer getLongitude() {
		return this.longitude;
	}

	public void setLongitude(Integer longitude) {
		this.longitude = longitude;
	}

	public String getImgStore() {
		return this.imgStore;
	}

	public void setImgStore(String imgStore) {
		this.imgStore = imgStore;
	}

	public Time getStoreOpen() {
		return this.storeOpen;
	}

	public void setStoreOpen(Time storeOpen) {
		this.storeOpen = storeOpen;
	}

	public Time getStoreClose() {
		return this.storeClose;
	}

	public void setStoreClose(Time storeClose) {
		this.storeClose = storeClose;
	}

	public Set getFavourites() {
		return this.favourites;
	}

	public void setFavourites(Set favourites) {
		this.favourites = favourites;
	}

	public Set getProducts() {
		return this.products;
	}

	public void setProducts(Set products) {
		this.products = products;
	}

	public Set getReviews() {
		return this.reviews;
	}

	public void setReviews(Set reviews) {
		this.reviews = reviews;
	}

}
