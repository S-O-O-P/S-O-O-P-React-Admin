package com.soop.pages.customerservice.model.service;

import com.soop.pages.customerservice.model.dao.CustomerServiceMapper;
import com.soop.pages.customerservice.model.dto.NoticeMemberDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceService {

    @Autowired
    private CustomerServiceMapper customerServiceMapper;

    public List<NoticeMemberDTO> csMainNoticeList() {

        return customerServiceMapper.csMainNoticeListAll();
    }

    public List<NoticeMemberDTO> noticeList() {

        return customerServiceMapper.noticeListAll();
    }
}
