package com.soop.jwtsecurity.entityDTO;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
public class UserEntity {


//    private Long id;
//    private String username;
//    private String name;
//    private String email;
//    private String role;
//    private String test;

    private int userCode;
    private String nickName;
    private String email;
    private String gender;
    private String profilePic;
    private String aboutMe;
    private String userRole;
    private Date signupDate;
    private String signupPlatform;

}