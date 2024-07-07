package com.soop.pages.mypage.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FinishedHoneypotDTO {

    private int honeypotCode;
    private String hostNickname;
    private String hostProfilePic;
    private String interestName;
    private String honeypotTitle;
    private int hostCode;
    private String poster;
    private String approvalCount;
    private int totalMember;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date regDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date eventDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endDate;
    private String closureStatus;
    private int memberCode;
    private String memberNickname;
    private String memberProfilePic;

}
