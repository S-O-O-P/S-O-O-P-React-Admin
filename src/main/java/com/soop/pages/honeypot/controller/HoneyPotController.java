package com.soop.pages.honeypot.controller;

import com.soop.pages.honeypot.model.dto.HoneypotAndInterestAndLinkBeeUserDTO;
import com.soop.pages.honeypot.model.dto.HoneypotDTO;
import com.soop.pages.honeypot.model.service.HoneyPotService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.Media;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/honeypot")
public class HoneyPotController {

    private HoneyPotService honeyPotService;
    private HoneypotDTO honeypots;

    public HoneyPotController(HoneyPotService honeyPotService) {
        this.honeyPotService = honeyPotService;
    }

    //허니팟 등록
    @PostMapping("/regist")
    public ResponseEntity<HoneypotDTO> registerHoneypot(@RequestBody HoneypotDTO honeypotDTO) {
        HoneypotDTO savedHoneypot = honeyPotService.saveHoneypot(honeypotDTO);
        return ResponseEntity.ok(savedHoneypot);
    }

    // 허니팟 전체 조회
    @GetMapping("/list")
    public ResponseEntity<HoneypotResponseMessage> findAllHoneypot() {

        // 응답 헤더 설정
        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        // 응답 데이터 설정
        List<HoneypotDTO> honeypots = honeyPotService.findAllHoneypots();
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("honeypots", honeypots);

        HoneypotResponseMessage responseMessage = new HoneypotResponseMessage(200, "조회 성공", responseMap);

        return new ResponseEntity<>(responseMessage, headers, HttpStatus.OK);

    }

//     허니팟 상세페이지 조회 (허니팟 코드로 조회)
    @GetMapping("/detail/{honeypotCode}")
    public ResponseEntity<HoneypotResponseMessage> findByHoneypotCode(@PathVariable int honeypotCode) {

        // 응답 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        // 응답 데이터 설정
        HoneypotAndInterestAndLinkBeeUserDTO foundHoneypot = honeyPotService.findByHoneypotCode(honeypotCode);

        System.out.println(foundHoneypot);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("honeypot", foundHoneypot);

        // ResponseEntity로 응답 반환
        return ResponseEntity
                .ok()
                .headers(headers)
                .body(new HoneypotResponseMessage(200, "조회 성공", responseMap));

    }

}
