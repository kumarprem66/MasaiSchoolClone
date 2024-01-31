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
                                    "/category**","/depart/**","/instructor/**")
                            .permitAll()
//                            .requestMatchers(HttpMethod.GET,"/user/**","/announce/**","/assignment/**",
//                                    "/lecture/**","/enrollment/**","/submission/fetch-all",
//                                    "/student/fetch-all").hasAnyRole("STUDENT","INSTRUCTOR")
                            .requestMatchers("/enrollment/**","/submission/**","/student/update/**",
                                    "/student/fetch/**","/student/enroll/**","/student/fetch-by-user-id/**"
                                    ,"/student/fetch-all-courses/**","/lecture/lecture-of-course/**",
                                    "/assignment/fetch-all/**","/assignment/create/**").hasRole("STUDENT")

                            .requestMatchers("/student/create","/submission/**").hasRole("USER")

                            .requestMatchers("/enrollment/**","/submission/**","/student/fetch-all")
                            .hasAnyRole("INSTRUCTOR","ADMIN")

//                            .requestMatchers("/assignment/**","/lecture/**").hasAnyRole("INSTRUCTOR","ADMIN")
                            .requestMatchers("/user/**","/announce/**","/category/**","/course/**","/depart/**","/instructor/**","/student/**","/lecture/**").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.GET,"/auth/signin").authenticated()
//                            .requestMatchers(HttpMethod.OPTIONS).permitAll()
                            .requestMatchers("/user/register","/swagger-ui*/**","/v3/api-docs/**")
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


}
