package com.soop.jwtsecurity.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {

        corsRegistry.addMapping("/**") // "/" 경로에 대해 CORS 설정을 추가
                .exposedHeaders("Set-Cookie") // 응답 헤더에 "Set-Cookie" 헤더를 노출
                .allowedOrigins("http://localhost:3000/"); // 허용할 출처를 설정

    }
}