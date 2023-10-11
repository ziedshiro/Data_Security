package th.ac.ku.kps.eng.cpe.model;
// Generated Oct 11, 2023, 2:55:47 PM by Hibernate Tools 6.1.7.Final

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Type generated by hbm2java
 */
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Type implements java.io.Serializable {

	private Integer typeId;
	private String typeName;
	@JsonIgnore private Set products = new HashSet(0);

	public Type() {
	}

	public Type(String typeName) {
		this.typeName = typeName;
	}

	public Type(String typeName, Set products) {
		this.typeName = typeName;
		this.products = products;
	}

	public Integer getTypeId() {
		return this.typeId;
	}

	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}

	public String getTypeName() {
		return this.typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public Set getProducts() {
		return this.products;
	}

	public void setProducts(Set products) {
		this.products = products;
	}

}
