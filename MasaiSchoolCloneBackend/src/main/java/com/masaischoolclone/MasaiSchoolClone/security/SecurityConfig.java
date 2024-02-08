package com.masaischoolclone.MasaiSchoolClone.security;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain springSecurityConfiguration(HttpSecurity http) throws Exception {

        http.sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                        .cors(new Customizer<CorsConfigurer<HttpSecurity>>() {
            @Override
            public void customize(CorsConfigurer<HttpSecurity> httpSecurityCorsConfigurer) {
                httpSecurityCorsConfigurer.configurationSource(new CorsConfigurationSource() {
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration cfg = new CorsConfiguration();
                        cfg.setAllowedOriginPatterns(Collections.singletonList("*"));
                        cfg.setAllowedMethods(Collections.singletonList("*"));
                        cfg.setAllowCredentials(true);
                        cfg.setAllowedHeaders(Collections.singletonList(("*")));
                        cfg.setExposedHeaders(Arrays.asList("Authorization"));
                        cfg.setMaxAge(36000000L);

                        return cfg;
                    }
                });
            }
        })        .csrf(csrf -> csrf.disable())
                .addFilterAfter(new JwtTokenGeneratorFilter(), BasicAuthenticationFilter.class)
                .addFilterBefore(new JwtTokenValidatorFilter(),BasicAuthenticationFilter.class)

                .authorizeHttpRequests(auth ->{

                    auth
                            .requestMatchers(HttpMethod.GET,"/course/**","/course**",
                                    "/category/**","/depart/**","/instructor/**","/user/get_user_id/**","/bot/chat/**")
                            .permitAll()
                            .requestMatchers(HttpMethod.GET,"/submission/fetch-all",
                                    "/student/fetch-all","/assignment/**").hasAnyRole("STUDENT","INSTRUCTOR")

                            .requestMatchers("/enrollment/**","/submission/**","/student/update/**",
                                    "/student/fetch/**","/student/enroll/**","/student/fetch-by-user-id/**"
                                    ,"/student/fetch-all-courses/**"
                                    ).hasRole("STUDENT")

                            .requestMatchers("/lecture/lecture-of-course/**","/announce/getAnnounce-list/**",
                                    "/announce/getAnnounce-list-of-course/**","/submission/fetch-all/**","/submission/fetch/**")
                            .hasAnyRole("STUDENT","INSTRUCTOR","ADMIN")

                            .requestMatchers(HttpMethod.PUT,"/student/update/**").hasRole("STUDENT")

                            .requestMatchers("/instructor/fetch-by-user/**","/submission/**").hasRole("INSTRUCTOR")


                            .requestMatchers("/instructor/create/**","/student/create").hasAnyRole("USER","ADMIN")

                            .requestMatchers("/enrollment/**","/submission/**","/student/fetch-all","/lecture/**")
                            .hasAnyRole("INSTRUCTOR","ADMIN")

//                            .requestMatchers("/assignment/**","/lecture/**").hasAnyRole("INSTRUCTOR","ADMIN")
                            .requestMatchers("/announce/**","/category/**","/course/**","/depart/**","/instructor/**",
                                    "/student/**","/lecture/**","/assignment/**","/announce/**","/enrollment/**",
                                    "/submission/**").hasRole("ADMIN")

                            .requestMatchers(HttpMethod.GET,"/auth/signin","/auth/signIn").authenticated()
//                            .requestMatchers(HttpMethod.OPTIONS).permitAll()
                            .requestMatchers("/admin/create","/user/register","/swagger-ui*/**","/v3/api-docs/**")
                            .permitAll()

                    ;
                })


                .formLogin(Customizer.withDefaults())

                 .httpBasic(Customizer.withDefaults());

        return http.build();

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();

    }

    private static final String key = "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";

    @Bean
    public RestTemplate restTemplate() {

        RestTemplate restTemplate= new RestTemplate();
        restTemplate.getInterceptors().add((request, body,execution)->{
            request.getHeaders().add("Authorization", "Bearer "+key);
            return execution.execute(request, body);
        });

        return restTemplate;
    }
}
