package com.soop.jwtsecurity.controller;

import com.soop.jwtsecurity.entityDTO.RefreshEntity;
import com.soop.jwtsecurity.jwt.JWTUtil;
import com.soop.jwtsecurity.mapper.UserMapper;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;

@Controller
@ResponseBody
public class ReissueController {

    private final JWTUtil jwtUtil;

    private UserMapper userMapper;

    public ReissueController(JWTUtil jwtUtil, UserMapper userMapper) {

        this.jwtUtil = jwtUtil;
        this.userMapper = userMapper;
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {

        //get refresh token
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {

            if (cookie.getName().equals("refresh")) {

                refresh = cookie.getValue();
            }
        }

        if (refresh == null) {

            //response status code
            return new ResponseEntity<>("refresh token null", HttpStatus.BAD_REQUEST);
        }

        //expired check
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {

            //response status code
            return new ResponseEntity<>("refresh token expired", HttpStatus.BAD_REQUEST);
        }

        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(refresh);

        if (!category.equals("refresh")) {

            //response status code
            return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
        }

        //DB에 저장되어 있는지 확인
        Boolean isExist = userMapper.existsByRefresh(refresh);
        if (!isExist) {

            //response body
            return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
        }

        String username = jwtUtil.getUsername(refresh);
        String role = jwtUtil.getRole(refresh);

        //새로운 토큰 발급
        String newAccess = jwtUtil.createJwt("access", username, role, 600L);

        String existingRefreshToken = userMapper.searchRefreshEntity(username);

        if (existingRefreshToken != null) {
            // 기존 Refresh 토큰 삭제
            userMapper.deleteByRefresh(existingRefreshToken);
        }

        // 새로운 Refresh 토큰 생성
        String newRefresh = jwtUtil.createJwt("refresh", username, role, 86400000L);

        // 새로운 Refresh 토큰 저장
        addRefreshEntity(username, newRefresh, 86400000L);

        // Refresh 토큰을 쿠키에 추가
        response.addCookie(createCookie("refresh", newRefresh));

        //response
        response.setHeader("access", newAccess);
        response.addCookie(createCookie("refresh", newRefresh));

        return new ResponseEntity<>(HttpStatus.OK);
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
        //cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setDomain("localhost");
        cookie.setHttpOnly(true);

        return cookie;
    }
}