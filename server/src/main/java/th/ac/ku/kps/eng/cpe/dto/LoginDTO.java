package th.ac.ku.kps.eng.cpe.dto;

public class LoginDTO {
	private String username;
	private String password;
	private String codeTwoFactorAuthentication;
	
	public LoginDTO() {}

	public LoginDTO(String username, String password, String codeTwoFactorAuthentication) {
		super();
		this.username = username;
		this.password = password;
		this.codeTwoFactorAuthentication = codeTwoFactorAuthentication;
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

	public String getCodeTwoFactorAuthentication() {
		return codeTwoFactorAuthentication;
	}

	public void setCodeTwoFactorAuthentication(String codeTwoFactorAuthentication) {
		this.codeTwoFactorAuthentication = codeTwoFactorAuthentication;
	}
	
}
