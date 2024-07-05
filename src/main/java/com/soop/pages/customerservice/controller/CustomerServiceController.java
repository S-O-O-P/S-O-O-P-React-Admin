package com.soop.pages.customerservice.controller;

import com.soop.pages.customerservice.model.dto.InquiryDTO;
import com.soop.pages.customerservice.model.dto.NoticeMemberDTO;
import com.soop.pages.customerservice.model.service.CustomerServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.nio.charset.Charset;
import java.util.Date;
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

        return new ResponseEntity<>(result, headers, HttpStatus.OK);
    }

    @GetMapping("/notice")
    public ResponseEntity<Map<String, Object>> noticeList() {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        List<NoticeMemberDTO> mainNoticeList = customerServiceService.noticeList();

        Map<String, Object> result = new HashMap<>();
        result.put("mainNoticeList", mainNoticeList);

        return new ResponseEntity<>(result, headers, HttpStatus.OK);
    }

    @GetMapping("/notice/{code}")
    public ResponseEntity<Map<String, Object>> noticeDetail(@PathVariable("code") String code) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));


        NoticeMemberDTO mainNoticeList = customerServiceService.noticeDetail(code);

        Map<String, Object> result = new HashMap<>();

        result.put("mainNoticeList", mainNoticeList);

        return new ResponseEntity<>(result, headers, HttpStatus.OK);
    }

    @PostMapping("/inquiry")
    public ResponseEntity<?> inquiry(@RequestBody InquiryDTO newInquiry) {

        System.out.println("newInquiry = " + newInquiry);
        customerServiceService.inquiry(newInquiry);

        return ResponseEntity
                .created(URI.create("inquity"))
                .build();
    }

}
