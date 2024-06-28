package com.soop.pages.customerservice.model.dao;

import com.soop.pages.customerservice.model.dto.NoticeMemberDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CustomerServiceMapper {

    List<NoticeMemberDTO> csMainNoticeListAll();
}
