package th.ac.ku.kps.eng.cpe.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class LoginDTO {
	@Email(message = "Invalid Email")
	@NotBlank(message = "Invalid Email: Empty Email")
	private String username;
	@NotBlank(message = "Invalid Password: Empty Password")
    @Size(min = 8, max = 20, message = "Invalid Password: Must be of 8 - 15 characters")
	private String password;
	@NotBlank(message = "Invalid Code: Empty Code")
	private String secretcode;
	
	public LoginDTO() {}

	public LoginDTO(String username, String password, String secretcode) {
		super();
		this.username = username;
		this.password = password;
		this.setSecretcode(secretcode);
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSecretcode() {
		return secretcode;
	}

	public void setSecretcode(String secretcode) {
		this.secretcode = secretcode;
	}
	
}
