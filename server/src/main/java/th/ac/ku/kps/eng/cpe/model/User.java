package th.ac.ku.kps.eng.cpe.model;
// Generated Oct 14, 2023, 12:18:28 AM by Hibernate Tools 6.1.7.Final

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * User generated by hbm2java
 */
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User implements java.io.Serializable {

	private String userId;
	private String firstname;
	private String lastname;
	private String password;
	private String salt;
	private String role;
	private Date lastLoginTimestamp;
	private Boolean accountLockStatus;
	private Integer attemptLogin;
	private Date attemptTimeLogin;
	private Boolean twoFactorAuthenticationEnabled;
	private String codeTwoFactorAuthentication;
	@JsonIgnore private Set orderses = new HashSet(0);
	@JsonIgnore private Set favourites = new HashSet(0);
	@JsonIgnore private Set stores = new HashSet(0);

	public User() {
	}

	public User(String userId, String firstname, String lastname, String password, String salt, String role) {
		this.userId = userId;
		this.firstname = firstname;
		this.lastname = lastname;
		this.password = password;
		this.salt = salt;
		this.role = role;
	}

	public User(String userId, String firstname, String lastname, String password, String salt, String role,
			Date lastLoginTimestamp, Boolean accountLockStatus, Integer attemptLogin, Date attemptTimeLogin,
			Boolean twoFactorAuthenticationEnabled, String codeTwoFactorAuthentication) {
		super();
		this.userId = userId;
		this.firstname = firstname;
		this.lastname = lastname;
		this.password = password;
		this.salt = salt;
		this.role = role;
		this.lastLoginTimestamp = lastLoginTimestamp;
		this.accountLockStatus = accountLockStatus;
		this.attemptLogin = attemptLogin;
		this.attemptTimeLogin = attemptTimeLogin;
		this.twoFactorAuthenticationEnabled = twoFactorAuthenticationEnabled;
		this.codeTwoFactorAuthentication = codeTwoFactorAuthentication;
	}

	public User(String userId, String firstname, String lastname, String password, String salt, String role,
			Date lastLoginTimestamp, Boolean accountLockStatus, Integer attemptLogin, Date attemptTimeLogin,
			Boolean twoFactorAuthenticationEnabled, String codeTwoFactorAuthentication, Set orderses, Set favourites,
			Set stores) {
		this.userId = userId;
		this.firstname = firstname;
		this.lastname = lastname;
		this.password = password;
		this.salt = salt;
		this.role = role;
		this.lastLoginTimestamp = lastLoginTimestamp;
		this.accountLockStatus = accountLockStatus;
		this.attemptLogin = attemptLogin;
		this.attemptTimeLogin = attemptTimeLogin;
		this.twoFactorAuthenticationEnabled = twoFactorAuthenticationEnabled;
		this.codeTwoFactorAuthentication = codeTwoFactorAuthentication;
		this.orderses = orderses;
		this.favourites = favourites;
		this.stores = stores;
	}

	public String getUserId() {
		return this.userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getFirstname() {
		return this.firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return this.lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSalt() {
		return this.salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	public String getRole() {
		return this.role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Date getLastLoginTimestamp() {
		return this.lastLoginTimestamp;
	}

	public void setLastLoginTimestamp(Date lastLoginTimestamp) {
		this.lastLoginTimestamp = lastLoginTimestamp;
	}

	public Boolean getAccountLockStatus() {
		return this.accountLockStatus;
	}

	public void setAccountLockStatus(Boolean accountLockStatus) {
		this.accountLockStatus = accountLockStatus;
	}

	public Integer getAttemptLogin() {
		return this.attemptLogin;
	}

	public void setAttemptLogin(Integer attemptLogin) {
		this.attemptLogin = attemptLogin;
	}

	public Date getAttemptTimeLogin() {
		return this.attemptTimeLogin;
	}

	public void setAttemptTimeLogin(Date attemptTimeLogin) {
		this.attemptTimeLogin = attemptTimeLogin;
	}

	public Boolean getTwoFactorAuthenticationEnabled() {
		return this.twoFactorAuthenticationEnabled;
	}

	public void setTwoFactorAuthenticationEnabled(Boolean twoFactorAuthenticationEnabled) {
		this.twoFactorAuthenticationEnabled = twoFactorAuthenticationEnabled;
	}

	public String getCodeTwoFactorAuthentication() {
		return this.codeTwoFactorAuthentication;
	}

	public void setCodeTwoFactorAuthentication(String codeTwoFactorAuthentication) {
		this.codeTwoFactorAuthentication = codeTwoFactorAuthentication;
	}

	public Set getOrderses() {
		return this.orderses;
	}

	public void setOrderses(Set orderses) {
		this.orderses = orderses;
	}

	public Set getFavourites() {
		return this.favourites;
	}

	public void setFavourites(Set favourites) {
		this.favourites = favourites;
	}

	public Set getStores() {
		return this.stores;
	}

	public void setStores(Set stores) {
		this.stores = stores;
	}

}
