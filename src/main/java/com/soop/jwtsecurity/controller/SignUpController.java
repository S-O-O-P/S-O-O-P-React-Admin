package com.soop.jwtsecurity.controller;

import com.soop.jwtsecurity.dto.UserSignUpDTO;
import com.soop.jwtsecurity.jwt.JWTUtil;
import com.soop.jwtsecurity.mapper.UserMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<String> signUp(@RequestBody UserSignUpDTO userSignUpDTO) {
        userMapper.saveAboutMe(userSignUpDTO.getAboutMe(), userSignUpDTO.getSignupPlatform(), userSignUpDTO.getNickName());
        int userCode = userMapper.findBySignupPlatform(userSignUpDTO.getSignupPlatform()).getUserCode();

        // Save interests
        List<Integer> interestCodes = userSignUpDTO.getSelectedInterests();
        for (Integer interestCode : interestCodes) {
            userMapper.saveUserInterest(userCode, interestCode);
        }

        System.out.println("userCode: "+ userCode);
        System.out.println("Received aboutMe: " + userSignUpDTO.getAboutMe());
        System.out.println("Received signupPlatform: " + userSignUpDTO.getSignupPlatform());
        System.out.println("Received nickName: " + userSignUpDTO.getNickName());
        System.out.println("Received selectedInterests: " + userSignUpDTO.getSelectedInterests());

        return ResponseEntity.ok("Sign up successful");
    }
}
