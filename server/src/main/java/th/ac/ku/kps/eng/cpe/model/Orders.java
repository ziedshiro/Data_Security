package th.ac.ku.kps.eng.cpe.model;
// Generated Oct 14, 2023, 12:18:28 AM by Hibernate Tools 6.1.7.Final

import java.sql.Timestamp;
import java.util.Date;
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
	@JsonIgnore private User user;
	private Date orderDate;
	private String orderStatus;
	private String filepath;
	private Date paymentDate;
	private String paymentStatus;
	private Date pickupDate;
	private String pickupStatus;
	private Date createdate;
	private Date updatedate;
	@JsonIgnore private Set orderitems = new HashSet(0);

	public Orders() {
	}

	public Orders(String orderId, User user, String orderStatus, Date createdate) {
		this.orderId = orderId;
		this.user = user;
		this.orderStatus = orderStatus;
		this.createdate = createdate;
	}

	public Orders(String orderId, User user, Date orderDate, String orderStatus, String filepath,
			Date paymentDate, String paymentStatus, Date pickupDate, String pickupStatus,
			Date createdate, Date updatedate, Set orderitems) {
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

	public Date getOrderDate() {
		return this.orderDate;
	}

	public void setOrderDate(Date orderDate) {
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

	public Date getPaymentDate() {
		return this.paymentDate;
	}

	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}

	public String getPaymentStatus() {
		return this.paymentStatus;
	}

	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public Date getPickupDate() {
		return this.pickupDate;
	}

	public void setPickupDate(Date pickupDate) {
		this.pickupDate = pickupDate;
	}

	public String getPickupStatus() {
		return this.pickupStatus;
	}

	public void setPickupStatus(String pickupStatus) {
		this.pickupStatus = pickupStatus;
	}

	public Date getCreatedate() {
		return this.createdate;
	}

	public void setCreatedate(Date createdate) {
		this.createdate = createdate;
	}

	public Date getUpdatedate() {
		return this.updatedate;
	}

	public void setUpdatedate(Date updatedate) {
		this.updatedate = updatedate;
	}

	public Set getOrderitems() {
		return this.orderitems;
	}

	public void setOrderitems(Set orderitems) {
		this.orderitems = orderitems;
	}

}
