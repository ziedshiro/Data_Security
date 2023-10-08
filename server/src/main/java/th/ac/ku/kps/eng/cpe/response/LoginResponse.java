package th.ac.ku.kps.eng.cpe.response;

import org.springframework.http.HttpStatus;

import th.ac.ku.kps.eng.cpe.dto.UserDTO;

public class LoginResponse {
	private HttpStatus status;
	private UserDTO user;
    private String accessToken;
    
    public LoginResponse() {}

    public LoginResponse(HttpStatus status, UserDTO user, String accessToken) {
		super();
		this.status = status;
		this.user = user;
		this.accessToken = accessToken;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}
}
