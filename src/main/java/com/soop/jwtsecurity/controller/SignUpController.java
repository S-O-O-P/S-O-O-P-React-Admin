package com.soop.jwtsecurity.controller;

import com.soop.jwtsecurity.entityDTO.UserEntity;
import com.soop.jwtsecurity.jwt.JWTUtil;
import com.soop.jwtsecurity.mapper.UserMapper;
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
    public UserEntity signUp(@RequestBody UserEntity userSignUpDTO,String token) {

        userMapper.saveAboutMe(userSignUpDTO.getAboutMe(), userSignUpDTO.getSignupPlatform(), userSignUpDTO.getNickName());
        System.out.println("Received aboutMe: " + userSignUpDTO.getAboutMe());
        System.out.println("Received signupPlatform: " + userSignUpDTO.getSignupPlatform());
        System.out.println("Received nickName: " + userSignUpDTO.getNickName());
//        System.out.println("Received selectedInterests: " + userSignUpDTO.getSelectedInterests());
        userMapper.saveAboutMe(userSignUpDTO.getAboutMe(), userSignUpDTO.getSignupPlatform(), userSignUpDTO.getNickName());
        return userSignUpDTO;
    }

//    @GetMapping("/getSignupPlatform")
//    public String signupPlatform(UserEntity userSignUpDTO){
//
//        return "/signups";
//    }
}
