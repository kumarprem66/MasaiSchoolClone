//package com.masaischoolclone.MasaiSchoolClone.security;
//
//import com.masaischoolclone.MasaiSchoolClone.entity.Admin;
//import com.masaischoolclone.MasaiSchoolClone.repository.AdminRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AuthenticationProvider;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//@Component
//public class CustomAdminAuthenticationProvider implements AuthenticationProvider {
//
//    @Autowired
//    private AdminRepo adminRepo;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Override
//    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
//        String username = authentication.getName();
//        String pwd = authentication.getCredentials().toString();
//        Optional<Admin> customer = adminRepo.findByEmail(username);
//        if (customer.isPresent()) {
//            if (passwordEncoder.matches(pwd, customer.get().getPassword())) {
//                List<GrantedAuthority> auth = new ArrayList<>();
//                auth.add(new SimpleGrantedAuthority(customer.get().getRole()));
//                return new UsernamePasswordAuthenticationToken(username, pwd, auth);
//            } else {
//                throw new BadCredentialsException("Invalid password!");
//            }
//        } else {
//            throw new BadCredentialsException("No user registered with this details!");
//        }
//    }
//
//
//    @Override
//    public boolean supports(Class<?> authentication) {
//        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
//    }
//}
