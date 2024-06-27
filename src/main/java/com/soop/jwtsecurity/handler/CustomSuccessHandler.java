package com.soop.jwtsecurity.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.util.HashMap;
import java.util.Map;

@Component
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;
    private final UserMapper userMapper;

    public CustomSuccessHandler(JWTUtil jwtUtil, UserMapper userMapper) {
        this.jwtUtil = jwtUtil;
        this.userMapper = userMapper;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();
        String username = customUserDetails.getUsername();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        String access = jwtUtil.createJwt("access", username, role, 600L);
        String existingRefreshToken = userMapper.searchRefreshEntity(username);

        if (existingRefreshToken != null) {
            userMapper.deleteByRefresh(existingRefreshToken);
        }

        String refresh = jwtUtil.createJwt("refresh", username, role, 86400000L);
        addRefreshEntity(username, refresh, 86400000L);

//        // JSON으로 응답
//        Map<String, String> tokenResponse = new HashMap<>();
//        tokenResponse.put("accessToken", access);
//        tokenResponse.put("redirectUrl", "http://localhost:3000/");
//        response.setContentType("application/json");
//        new ObjectMapper().writeValue(response.getWriter(), tokenResponse);
//
        response.addCookie(createCookie("refresh", refresh));
        response.setHeader("Authorization", "Bearer " + access);
        response.setStatus(HttpStatus.FOUND.value());
        response.setHeader("Location", "http://localhost:3000/");

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
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setDomain("localhost");
        cookie.setHttpOnly(true);
        return cookie;
    }
}
