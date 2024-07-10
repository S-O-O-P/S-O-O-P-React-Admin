package com.soop.jwtsecurity.controller;

import com.soop.jwtsecurity.entityDTO.RefreshEntity;
import com.soop.jwtsecurity.jwt.JWTUtil;
import com.soop.jwtsecurity.mapper.UserMapper;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.Date;

@Controller
@ResponseBody
public class ReissueController {

    private final JWTUtil jwtUtil;
    private final UserMapper userMapper;

    public ReissueController(JWTUtil jwtUtil, UserMapper userMapper) {
        this.jwtUtil = jwtUtil;
        this.userMapper = userMapper;
    }

    @PostMapping("/reissue")
    public void reissue(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 클라이언트로부터 사용자 식별 정보를 가져옵니다. 보통은 엑세스 토큰이나 기타 정보를 사용합니다.
        String accessToken = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("access")) {
                    accessToken = cookie.getValue();
                    break;
                }
            }
        }



        String signupPlatform = null;
        try {
            signupPlatform = jwtUtil.getSignupPlatform(accessToken);
        } catch (ExpiredJwtException e) {
            response.sendRedirect("http://localhost:3001/login?error=access token expired");
            return;
        }

        if (signupPlatform == null) {
            response.sendRedirect("http://localhost:3001/login?error=invalid access token");
            return;
        }


        // 서버 DB에서 해당 사용자의 리프레시 토큰을 조회합니다.
        String refresh = userMapper.searchRefreshEntity(signupPlatform);

        if (refresh == null) {
            response.sendRedirect("http://localhost:3001/login?error=refresh token null");
            return;
        }

        // 토큰 만료 확인
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {
            response.sendRedirect("http://localhost:3001/login?error=refresh token expired");
            return;
        }

        // 리프레시 토큰인지 확인
        String category = jwtUtil.getCategory(refresh);
        if (!"refresh".equals(category)) {
            response.sendRedirect("http://localhost:3001/login?error=invalid refresh token");
            return;
        }

        // 새로운 액세스 토큰 발급
        String role = jwtUtil.getUserRole(refresh);
        int userCode = jwtUtil.getuserCode(refresh);
        String newAccess = jwtUtil.createJwt("access", signupPlatform, role, userCode, 600L * 1000);
        String newRefresh = jwtUtil.createJwt("refresh", signupPlatform, role, userCode, 86400L * 1000);

        if (accessToken == null) {
            response.sendRedirect("http://localhost:3001/login?error=access token null");
            return;
        }

        // DB에 리프레시 토큰 업데이트
        userMapper.deleteByRefresh(refresh);
        addRefreshEntity(signupPlatform, newRefresh, 86400L * 1000);

        // 새 리프레시 토큰을 HTTP-Only 쿠키에 추가
//        createAndAddCookie(response, "refresh", newRefresh);
        // 새 액세스 토큰을 HTTP-Only 쿠키에 추가
        createAndAddCookie(response, "access", newAccess);

        response.setStatus(HttpStatus.OK.value());
    }

    private void addRefreshEntity(String signupPlatform, String refresh, Long expiredMs) {
        Date date = new Date(System.currentTimeMillis() + expiredMs);

        RefreshEntity refreshEntity = new RefreshEntity();
        refreshEntity.setSignupPlatform(signupPlatform);
        refreshEntity.setRefresh(refresh);
        refreshEntity.setExpiration(date.toString());

        userMapper.saveRefreshEntity(refreshEntity);
    }

    private void createAndAddCookie(HttpServletResponse response, String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(10 * 60); // 10분
        cookie.setDomain("localhost");
        cookie.setHttpOnly(false); // JavaScript에서 접근 불가하도록 설정
        cookie.setPath("/");
        cookie.setSecure(false); // localhost 환경에서는 false, 실제 배포 시 true로 설정

        response.addCookie(cookie);
    }
}
