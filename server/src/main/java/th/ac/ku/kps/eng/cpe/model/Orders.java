package th.ac.ku.kps.eng.cpe.model;
// Generated Oct 10, 2023, 7:19:20 PM by Hibernate Tools 6.1.7.Final

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Orders generated by hbm2java
 */
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Orders implements java.io.Serializable {

	private String orderId;
	private User user;
	private Timestamp orderDate;
	private String orderStatus;
	private String filepath;
	private Timestamp paymentDate;
	private String paymentStatus;
	private Timestamp pickupDate;
	private String pickupStatus;
	private Timestamp createdate;
	private Timestamp updatedate;
	@JsonIgnore private Set orderitems = new HashSet(0);

	public Orders() {
	}

	public Orders(String orderId, User user, String orderStatus, Timestamp createdate) {
		this.orderId = orderId;
		this.user = user;
		this.orderStatus = orderStatus;
		this.createdate = createdate;
	}

	public Orders(String orderId, User user, Timestamp orderDate, String orderStatus, String filepath,
			Timestamp paymentDate, String paymentStatus, Timestamp pickupDate, String pickupStatus,
			Timestamp createdate, Timestamp updatedate, Set orderitems) {
		this.orderId = orderId;
		this.user = user;
		this.orderDate = orderDate;
		this.orderStatus = orderStatus;
		this.filepath = filepath;
		this.paymentDate = paymentDate;
		this.paymentStatus = paymentStatus;
		this.pickupDate = pickupDate;
		this.pickupStatus = pickupStatus;
		this.createdate = createdate;
		this.updatedate = updatedate;
		this.orderitems = orderitems;
	}

	public String getOrderId() {
		return this.orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Timestamp getOrderDate() {
		return this.orderDate;
	}

	public void setOrderDate(Timestamp orderDate) {
		this.orderDate = orderDate;
	}

	public String getOrderStatus() {
		return this.orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public String getFilepath() {
		return this.filepath;
	}

	public void setFilepath(String filepath) {
		this.filepath = filepath;
	}

	public Timestamp getPaymentDate() {
		return this.paymentDate;
	}

	public void setPaymentDate(Timestamp paymentDate) {
		this.paymentDate = paymentDate;
	}

	public String getPaymentStatus() {
		return this.paymentStatus;
	}

	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public Timestamp getPickupDate() {
		return this.pickupDate;
	}

	public void setPickupDate(Timestamp pickupDate) {
		this.pickupDate = pickupDate;
	}

	public String getPickupStatus() {
		return this.pickupStatus;
	}

	public void setPickupStatus(String pickupStatus) {
		this.pickupStatus = pickupStatus;
	}

	public Timestamp getCreatedate() {
		return this.createdate;
	}

	public void setCreatedate(Timestamp createdate) {
		this.createdate = createdate;
	}

	public Timestamp getUpdatedate() {
		return this.updatedate;
	}

	public void setUpdatedate(Timestamp updatedate) {
		this.updatedate = updatedate;
	}

	public Set getOrderitems() {
		return this.orderitems;
	}

	public void setOrderitems(Set orderitems) {
		this.orderitems = orderitems;
	}

}
