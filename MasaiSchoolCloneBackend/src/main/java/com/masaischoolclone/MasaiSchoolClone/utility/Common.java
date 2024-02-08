package com.masaischoolclone.MasaiSchoolClone.utility;

import com.masaischoolclone.MasaiSchoolClone.security.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;

public class Common {

    public static String getUserNameFromRequest(HttpServletRequest request, JwtTokenProvider jwtTokenProvider){
        String jwtToken = request.getHeader("Authorization");
        if(jwtToken != null && jwtToken.startsWith("Bearer")){

            jwtToken = jwtToken.substring(7);

            return jwtTokenProvider.getEmailFromJwtToken(jwtToken);


        }else{
            return null;
        }
    }
}
