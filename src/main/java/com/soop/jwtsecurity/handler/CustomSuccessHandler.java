package com.soop.jwtsecurity.handler;


import com.soop.jwtsecurity.dto.CustomOAuth2User;
import com.soop.jwtsecurity.entityDTO.RefreshEntity;
import com.soop.jwtsecurity.jwt.JWTUtil;
import com.soop.jwtsecurity.mapper.UserMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;

@Component
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;
    private UserMapper userMapper;

    public CustomSuccessHandler(JWTUtil jwtUtil,UserMapper userMapper) {

        this.jwtUtil = jwtUtil;
        this.userMapper = userMapper;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        //OAuth2User
        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();

        String username = customUserDetails.getUsername();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        // Access 토큰 생성
        String access = jwtUtil.createJwt("access", username, role, 600L);


        // 토큰 정보 가져오기
        String existingRefreshToken = userMapper.searchRefreshEntity(username);

        if (existingRefreshToken != null) {
            // 기존 Refresh 토큰 삭제
            userMapper.deleteByRefresh(existingRefreshToken);
        }

        // 새로운 Refresh 토큰 생성
        String refresh = jwtUtil.createJwt("refresh", username, role, 86400000L);

        // 새로운 Refresh 토큰 저장
        addRefreshEntity(username, refresh, 86400000L);

        // Refresh 토큰을 쿠키에 추가
        response.addCookie(createCookie("refresh", refresh));


        //응답 설정
        response.setHeader("access", access);
        response.setStatus(HttpStatus.OK.value());

//        response.addCookie(createCookie("access", access));
        response.sendRedirect("http://localhost:3000/"); //프론트 url
    }


    private void addRefreshEntity(String username, String refresh, Long expiredMs) {

        Date date = new Date(System.currentTimeMillis() + expiredMs);

        RefreshEntity refreshEntity = new RefreshEntity();
        refreshEntity.setUsername(username);
        refreshEntity.setRefresh(refresh);
        refreshEntity.setExpiration(date.toString());
        userMapper.saveRefreshEntity(refreshEntity);

    }

    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60);
        //cookie.setSecure(true); //https 일 경우
        cookie.setDomain("localhost");
        cookie.setHttpOnly(true);

        return cookie;
    }
}
