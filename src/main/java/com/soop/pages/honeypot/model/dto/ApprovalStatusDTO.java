package com.soop.pages.honeypot.model.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ApprovalStatusDTO {

    private ApplicationDTO applicationCategory;     // 참가신청 코드
    private String decisionStatus;                  // 승인여부
    private Date decisionDate;                      // 결정일자

}
