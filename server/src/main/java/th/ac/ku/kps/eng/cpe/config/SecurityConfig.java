//package th.ac.ku.kps.eng.cpe.config;
//
//import javax.servlet.http.HttpServletResponse;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.password.NoOpPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig extends WebSecurityConfigurerAdapter{
//	
//	@Bean
//    public PasswordEncoder passwordEncoder() {
//        return NoOpPasswordEncoder.getInstance(); // Note: This is not recommended for production use.
//    }
//	
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//		http
//        .exceptionHandling()
//            .authenticationEntryPoint((request, response, authException) -> {
//                // Customize the error response when authentication fails
//                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Custom Error Message");
//            })
//            .accessDeniedHandler((request, response, accessDeniedException) -> {
//                // Customize the error response when access is denied
//                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Custom Access Denied Message");
//            })
//        .and()
//        .authorizeRequests()
//            .antMatchers("/**").permitAll(); // Allow access to public endpoints
//    }
//	
//	@Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(userDetailsService())
//            .passwordEncoder(passwordEncoder());
//    }
//	
//}
