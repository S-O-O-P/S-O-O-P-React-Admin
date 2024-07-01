package com.soop.pages.honeypot.model.dao;

import com.soop.pages.honeypot.model.dto.HoneypotAndInterestAndLinkBeeUserDTO;
import com.soop.pages.honeypot.model.dto.HoneypotDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface HoneyPotMapper {
    void insertHoneypot(HoneypotDTO honeypotDTO);
}
