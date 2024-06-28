package com.soop.jwtsecurity.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {
        corsRegistry.addMapping("/**") // 모든 경로에 대해 CORS 설정을 추가
                .exposedHeaders("Set-Cookie","Authorization") // 응답 헤더에 헤더를 노출
                .allowedOrigins("http://localhost:3000") // 허용할 출처를 설정
                .allowedHeaders(
                        "Access-Control-Allow-Origin", "Access-Control-Allow-Headers",
                        "Content-Type", "Authorization", "X-Requested-With", "Access-Token", "Refresh-Token")
                .allowCredentials(true)
                .allowedMethods("GET","PUT","POST","DELETE"); // 모든 HTTP 메서드를 허용
    }
}