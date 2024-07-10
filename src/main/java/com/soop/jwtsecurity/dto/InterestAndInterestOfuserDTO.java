package com.soop.jwtsecurity.dto;

import com.soop.pages.honeypot.model.dto.InterestDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InterestAndInterestOfuserDTO {

    private InterestDTO interestDTO;
    private int interestCode;
    private int userCode;
}
