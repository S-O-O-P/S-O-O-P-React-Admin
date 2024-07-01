package com.soop.pages.honeypot.controller;

import com.soop.pages.honeypot.model.dto.HoneypotAndInterestAndLinkBeeUserDTO;
import com.soop.pages.honeypot.model.dto.HoneypotDTO;
import com.soop.pages.honeypot.model.service.HoneyPotService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/honeypot")
public class HoneyPotController {

    private HoneyPotService honeyPotService;

    public HoneyPotController(HoneyPotService honeyPotService) {
        this.honeyPotService = honeyPotService;
    }

    //허니팟 등록
    @PostMapping("/regist")
    public ResponseEntity<HoneypotDTO> registerHoneypot(@RequestBody HoneypotDTO honeypotDTO) {
        HoneypotDTO savedHoneypot = honeyPotService.saveHoneypot(honeypotDTO);
        return ResponseEntity.ok(savedHoneypot);
    }

}
