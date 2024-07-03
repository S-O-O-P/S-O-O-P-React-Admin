package com.soop.jwtsecurity.service;

import com.soop.jwtsecurity.dto.*;
import com.soop.jwtsecurity.entityDTO.UserEntity;
import com.soop.jwtsecurity.mapper.UserMapper;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserMapper userMapper;

    public CustomOAuth2UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;

        if (registrationId.equals("naver")) {
            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        } else if (registrationId.equals("google")) {
            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
        } else if (registrationId.equals("kakao")) {
            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());
        } else {
            return null;
        }

        String signupPlatform = oAuth2Response.getProvider() + " " + oAuth2Response.getProviderId();
        System.out.println("signupPlatform = " + signupPlatform);
        UserEntity existData = userMapper.findBySignupPlatform(signupPlatform);

        if (existData == null) {
            UserEntity userEntity = new UserEntity();
            userEntity.setSignupPlatform(signupPlatform);
            userEntity.setEmail(oAuth2Response.getEmail());
            userEntity.setNickName(oAuth2Response.getNickName());
            userEntity.setUserRole("ROLE_USER");
            userEntity.setAboutMe(" ");
            userEntity.setGender(oAuth2Response.getGender() != null ? oAuth2Response.getGender() : "");
            userEntity.setProfilePic(oAuth2Response.getProfileImage() != null ? oAuth2Response.getProfileImage() : "default_profile_image_url"); // 기본 프로필 이미지 URL 설정
            userEntity.setSignupDate(new Date());

            userMapper.saveUserEntity(userEntity);

            UserDTO userDTO = new UserDTO();
            userDTO.setSignupPlatform(signupPlatform);
            userDTO.setNickName(oAuth2Response.getNickName());
            userDTO.setUserRole("ROLE_USER");

            return new CustomOAuth2User(userDTO);
        } else {
            existData.setEmail(oAuth2Response.getEmail());
            existData.setNickName(oAuth2Response.getNickName());
            UserDTO userDTO = new UserDTO();

            userDTO.setEmail(existData.getEmail());
            userDTO.setNickName(existData.getNickName());
            userDTO.setSignupPlatform(existData.getSignupPlatform());
            userDTO.setUserRole(existData.getUserRole());

            return new CustomOAuth2User(userDTO);
        }
    }
}
