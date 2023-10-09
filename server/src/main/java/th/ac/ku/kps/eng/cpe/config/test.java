package th.ac.ku.kps.eng.cpe.config;

import static dev.samstevens.totp.util.Utils.getDataUriForImage;

import java.net.UnknownHostException;

import dev.samstevens.totp.code.CodeGenerator;
import dev.samstevens.totp.code.CodeVerifier;
import dev.samstevens.totp.code.DefaultCodeGenerator;
import dev.samstevens.totp.code.DefaultCodeVerifier;
import dev.samstevens.totp.code.HashingAlgorithm;
import dev.samstevens.totp.exceptions.QrGenerationException;
import dev.samstevens.totp.qr.QrData;
import dev.samstevens.totp.qr.QrGenerator;
import dev.samstevens.totp.qr.ZxingPngQrGenerator;
import dev.samstevens.totp.secret.DefaultSecretGenerator;
import dev.samstevens.totp.secret.SecretGenerator;
import dev.samstevens.totp.time.NtpTimeProvider;
import dev.samstevens.totp.time.SystemTimeProvider;
import dev.samstevens.totp.time.TimeProvider;

public class test {

	public static void main(String[] args) throws UnknownHostException, QrGenerationException {
		// TODO Auto-generated method stub
//		SecretGenerator secretGenerator = new DefaultSecretGenerator(64);
//		String secret = secretGenerator.generate();
//		System.out.print(secret);
//		QrData data = new QrData.Builder()
//				   .label("krirk.k@ku.t")
//				   .secret(secret)
//				   .issuer("DS")
//				   .algorithm(HashingAlgorithm.SHA1) // More on this below
//				   .digits(6)
//				   .period(30)
//				   .build();
//		QrGenerator generator = new ZxingPngQrGenerator();
//		byte[] imageData = generator.generate(data);
//		String mimeType = generator.getImageMimeType();
//		String dataUri = getDataUriForImage(imageData, mimeType);
//		System.out.print(dataUri);
		
//		TimeProvider timeProvider = new NtpTimeProvider("pool.ntp.org", 5000);
//		CodeGenerator codeGenerator = new DefaultCodeGenerator(HashingAlgorithm.SHA1, 4);
//		CodeVerifier verifier = new DefaultCodeVerifier(codeGenerator, timeProvider);
//		((DefaultCodeVerifier) verifier).setTimePeriod(60);
//
//		// allow codes valid for 2 time periods before/after to pass as valid
//		((DefaultCodeVerifier) verifier).setAllowedTimePeriodDiscrepancy(2);
		TimeProvider timeProvider = new SystemTimeProvider();
		CodeGenerator codeGenerator = new DefaultCodeGenerator();
		CodeVerifier verifier = new DefaultCodeVerifier(codeGenerator, timeProvider);
//		((DefaultCodeVerifier) verifier).setTimePeriod(60);

		// allow codes valid for 2 time periods before/after to pass as valid
		((DefaultCodeVerifier) verifier).setAllowedTimePeriodDiscrepancy(2);

		boolean successful = verifier.isValidCode("T5JDCOA5B5B6NPEUPC5V3RXCWSLKWBZ2I4MRYMXSERNW7I6E27YH7J6WMLTIBDQD", "298708");
		System.out.print(successful);
	}

}
