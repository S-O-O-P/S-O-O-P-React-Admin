package com.soop.pages.mypage.model.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ParticipatingHoneypotDTO {

    private int applicationCode;
    private int honeypotCode;
    private String honeypotTitle;
    private Date eventDate;
    private String region;
    private int approvedCount;
    private int totalMember;
    private int userCode;
    private String nickname;
    private String decisionStatus;
    private Date decisionDate;

}
