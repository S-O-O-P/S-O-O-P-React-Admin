//package com.soop.jwtsecurity.controller;
//
//import com.soop.jwtsecurity.mapper.UserMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/user")
//public class UserController {
//
//    private final UserMapper userMapper;
//
//    @Autowired
//    public UserController(UserMapper userMapper) {
//        this.userMapper = userMapper;
//    }
//
//    @PostMapping("/updateProfile")
//    public ResponseEntity<String> updateProfile(@RequestBody Map<String, String> payload) {
//        String username = payload.get("username");
//        String nickName = payload.get("nickName");
//        String aboutMe = payload.get("aboutMe");
//
//        userMapper.updateUserProfile(username, nickName, aboutMe);
//        return ResponseEntity.ok("Profile updated successfully");
//    }
//}
