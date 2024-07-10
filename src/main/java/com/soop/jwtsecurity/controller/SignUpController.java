package com.soop.jwtsecurity.controller;

import com.soop.jwtsecurity.entityDTO.UserEntity;
import com.soop.jwtsecurity.jwt.JWTUtil;
import com.soop.jwtsecurity.mapper.UserMapper;
import com.soop.pages.honeypot.model.dto.InterestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@ResponseBody
public class SignUpController {
    private final UserMapper userMapper;
    private final JWTUtil jwtUtil;

    public SignUpController(UserMapper userMapper,JWTUtil jwtUtil) {
        this.userMapper = userMapper;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    public UserEntity signUp(@RequestBody UserEntity userSignUpDTO, String token, InterestDTO interestDTO) {

        userMapper.saveAboutMe(userSignUpDTO.getAboutMe(), userSignUpDTO.getSignupPlatform(), userSignUpDTO.getNickName());
        int userCode = (userMapper.findBySignupPlatform(userSignUpDTO.getSignupPlatform()).getUserCode());
//        userMapper.saveInterestCode(interestDTO.getInterestCode(),interestDTO.getInterestName());
        System.out.println("userCode: "+ userCode);
        System.out.println("Received aboutMe: " + userSignUpDTO.getAboutMe());
        System.out.println("Received signupPlatform: " + userSignUpDTO.getSignupPlatform());
        System.out.println("Received nickName: " + userSignUpDTO.getNickName());
//        System.out.println("Received selectedInterests: " + interestDTO.getInterestCode());
//        System.out.println("Received selectedInterests: " + interestDTO.getInterestName());

        return userSignUpDTO;
    }

//    @GetMapping("/user")
//    public UserEntity getUser(@RequestHeader("Authorization") String token) {
//        String decodedToken = token.replace("Bearer ", "");
//        String signupPlatform = jwtUtil.getSignupPlatformFromToken(decodedToken);
//        System.out.println("Decoded signupPlatform from token: " + signupPlatform);  // 디버깅을 위해 추가
//        return userMapper.findBySignupPlatform(signupPlatform);
//    }




//    @GetMapping("/getSignupPlatform")
//    public String signupPlatform(UserEntity userSignUpDTO){
//
//        return "/signups";
//    }
}
