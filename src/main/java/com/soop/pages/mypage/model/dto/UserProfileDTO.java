package com.soop.pages.mypage.model.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserProfileDTO {

    private int userCode;
    private String nickname;
    private String profilePic;
    private String aboutme;
    private int interestCode;
    private String interestName;

}
