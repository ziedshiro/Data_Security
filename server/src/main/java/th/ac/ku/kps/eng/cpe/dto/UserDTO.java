package th.ac.ku.kps.eng.cpe.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UserDTO {
	@NotBlank(message = "Invalid User ID: Empty User ID")
	@Size(min = 3, max = 20, message = "Invalid User ID: Must be of 3 - 20 characters")
	private String userId;
	@NotBlank(message = "Invalid Firstname: Empty Firstname")
	@Size(min = 3, max = 20, message = "Invalid firstname: Must be of 3 - 20 characters")
	private String firstname;
	@NotBlank(message = "Invalid Lastname: Empty Lastname")
	@Size(min = 3, max = 20, message = "Invalid Lastname: Must be of 3 - 20 characters")
	private String lastname;
	@NotBlank(message = "Invalid Password: Empty Password")
    @Size(min = 8, max = 15, message = "Invalid Password: Must be of 8 - 15 characters")
	private String password;
	
	public UserDTO() {}
	
	public UserDTO(String userId,String firstname, String lastname, String password) {
		super();
		this.userId = userId;
		this.firstname = firstname;
		this.lastname = lastname;
		this.password = password;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	


}
