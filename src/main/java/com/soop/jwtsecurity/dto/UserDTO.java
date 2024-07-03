package com.soop.jwtsecurity.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UserDTO {

    private Long userCode;
    private String nickName;
    private String email;
    private String gender;
    private String profilePic;
    private String aboutMe;
    private String userRole;
    private Date signupDate;
    private String signupPlatform;
}