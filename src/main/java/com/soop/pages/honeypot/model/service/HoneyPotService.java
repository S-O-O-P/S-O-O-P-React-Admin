package com.soop.pages.honeypot.model.service;

import com.soop.pages.honeypot.model.dao.HoneyPotMapper;
import com.soop.pages.honeypot.model.dto.HoneypotAndInterestAndLinkBeeUserDTO;
import com.soop.pages.honeypot.model.dto.HoneypotDTO;
import org.springframework.stereotype.Service;

@Service
public class HoneyPotService {

    private HoneyPotMapper honeyPotMapper;

    public HoneyPotService(HoneyPotMapper honeyPotMapper) {
        this.honeyPotMapper = honeyPotMapper;
    }

    public HoneypotDTO saveHoneypot(HoneypotDTO honeypotDTO) {
        honeyPotMapper.insertHoneypot(honeypotDTO);
        return honeypotDTO;
    }
}
