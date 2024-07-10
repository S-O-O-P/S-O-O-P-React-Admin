package com.soop.jwtsecurity.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserSignUpDTO {
    private String aboutMe;
    private String nickName;
    private String signupPlatform;
    private List<Integer> selectedInterests;
}
