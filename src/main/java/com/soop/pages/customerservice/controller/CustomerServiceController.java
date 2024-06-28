package com.soop.pages.customerservice.controller;

import com.soop.pages.customerservice.model.dto.NoticeDTO;
import com.soop.pages.customerservice.model.dto.NoticeMemberDTO;
import com.soop.pages.customerservice.model.service.CustomerServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class CustomerServiceController {

    @Autowired
    private CustomerServiceService customerServiceService;

    @GetMapping("/help")
    public ResponseEntity<Map<String, Object>> csMainNoticeList() {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        List<NoticeMemberDTO> mainNoticeList = customerServiceService.csMainNoticeList();

        Map<String, Object> result = new HashMap<>();
        result.put("mainNoticeList", mainNoticeList);
        System.out.println("result = " + result);
        System.out.println("mainNoticeList = " + mainNoticeList);
        System.out.println("headers = " + headers);

        return new ResponseEntity<>(result, headers, HttpStatus.OK);
    }
}
