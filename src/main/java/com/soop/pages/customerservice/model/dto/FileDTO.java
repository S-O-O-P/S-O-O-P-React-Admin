package com.soop.pages.customerservice.model.dto;

import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class FileDTO {

    private int fileCode;
    private String name;
    private int noticeCode;

}
