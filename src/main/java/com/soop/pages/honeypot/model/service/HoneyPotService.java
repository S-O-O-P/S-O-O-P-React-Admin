package com.soop.pages.honeypot.model.service;

import com.soop.pages.honeypot.model.dao.HoneyPotMapper;
import com.soop.pages.honeypot.model.dto.HoneypotAndInterestAndLinkBeeUserDTO;
import com.soop.pages.honeypot.model.dto.HoneypotDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoneyPotService {

    private HoneyPotMapper honeyPotMapper;

    public HoneyPotService(HoneyPotMapper honeyPotMapper) {
        this.honeyPotMapper = honeyPotMapper;
    }

    // 허니팟 등록하기
    public HoneypotDTO saveHoneypot(HoneypotDTO honeypotDTO) {
        honeyPotMapper.insertHoneypot(honeypotDTO);
        return honeypotDTO;
    }

    // 허니팟 전체 조회
    public List<HoneypotDTO> findAllHoneypots() {
        return honeyPotMapper.findAllHoneypots();
    }
}
