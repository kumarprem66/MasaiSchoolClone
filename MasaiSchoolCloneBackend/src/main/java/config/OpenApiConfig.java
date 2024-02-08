//package config;
//
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.client.RestTemplate;
//
//
//@Configuration
//public class OpenApiConfig {
//
//	private static final String key = "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";
//
//	@Bean
//	public RestTemplate restTemplate() {
//
//		RestTemplate restTemplate= new RestTemplate();
//		restTemplate.getInterceptors().add((request, body,execution)->{
//			request.getHeaders().add("Authorization", "Bearer "+key);
//			return execution.execute(request, body);
//		});
//
//		return restTemplate;
//	}
//
//}
