package th.ac.ku.kps.eng.cpe.response;

import org.springframework.http.HttpStatus;

public class ErrorResponse {
	private HttpStatus status;
    private String message;
    private String error;

    public ErrorResponse() {}

	public ErrorResponse(HttpStatus status, String message, String error) {
        this.setStatus(status);
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}
}
