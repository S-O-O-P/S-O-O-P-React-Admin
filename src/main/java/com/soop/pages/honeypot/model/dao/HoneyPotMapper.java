package com.soop.pages.honeypot.model.dao;

import com.soop.pages.honeypot.model.dto.HoneypotAndInterestAndLinkBeeUserDTO;
import com.soop.pages.honeypot.model.dto.HoneypotDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface HoneyPotMapper {

    // 허니팟 등록하기
    void insertHoneypot(HoneypotDTO honeypotDTO);

    // 허니팟 전체 조회
    List<HoneypotDTO> findAllHoneypots();
}
