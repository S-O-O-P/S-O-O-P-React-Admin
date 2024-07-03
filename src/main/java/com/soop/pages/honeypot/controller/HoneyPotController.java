package com.soop.pages.honeypot.controller;

import com.soop.pages.honeypot.model.dto.CommentAndLinkBeeUserDTO;
import com.soop.pages.honeypot.model.dto.CommentDTO;
import com.soop.pages.honeypot.model.dto.HoneypotAndInterestAndLinkBeeUserDTO;
import com.soop.pages.honeypot.model.dto.HoneypotDTO;
import com.soop.pages.honeypot.model.service.HoneyPotService;
import org.apache.ibatis.annotations.Delete;
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

    // 허니팟 상세페이지 조회 (허니팟 코드로 조회)
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
    // 상세페이지 내용 수정용 상세페이지 조회
    @GetMapping("/detail/temporary/{honeypotCode}")
    public ResponseEntity<HoneypotResponseMessage> temporaryFindByHoneypotCode(@PathVariable int honeypotCode) {

        // 응답 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        // 응답 데이터 설정
        HoneypotDTO temporaryFoundHoneypot = honeyPotService.temporaryFindByHoneypotCode(honeypotCode);

        System.out.println(temporaryFoundHoneypot);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("honeypot", temporaryFoundHoneypot);

        // ResponseEntity로 응답 반환
        return ResponseEntity
                .ok()
                .headers(headers)
                .body(new HoneypotResponseMessage(200, "조회 성공", responseMap));

    }

    // 상세페이지 내용 수정하기
    @PutMapping("/modify/{honeypotCode}")
    public ResponseEntity<HoneypotResponseMessage> modifyHoneypot(@PathVariable int honeypotCode, @RequestBody HoneypotDTO honeypotDTO) {
        // 응답 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        // 허니팟 정보 수정
        HoneypotDTO updatedHoneypot = honeyPotService.modifyHoneypot(honeypotCode, honeypotDTO);

        // 응답 데이터 설정
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("honeypot", updatedHoneypot);

        // ResponseEntity로 응답 반환
        return ResponseEntity
                .ok()
                .headers(headers)
                .body(new HoneypotResponseMessage(200, "수정 성공", responseMap));

    }

    //댓글 등록
//    @PostMapping("/comment")
//    public ResponseEntity<CommentDTO> registerComment(@RequestBody CommentDTO comment) {
//        CommentDTO savedComment = honeyPotService.insertComment(comment);
//        return ResponseEntity.ok(savedComment);
//    }

    // 댓글 등록 테스트
    @PostMapping("/comment")
    public ResponseEntity<CommentAndLinkBeeUserDTO> registComment(@RequestBody CommentAndLinkBeeUserDTO newComment) {
        CommentAndLinkBeeUserDTO registComment = honeyPotService.registComment(newComment);
        return ResponseEntity.ok(registComment);
    }

    // 댓글 전체 조회
    @GetMapping("/comment")
    public ResponseEntity<HoneypotResponseMessage> findAllComment() {
        // 응답 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        // 응답 데이터 설정
        List<CommentAndLinkBeeUserDTO> comments = honeyPotService.findAllComments();
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("comments", comments);

        HoneypotResponseMessage responseMessage = new HoneypotResponseMessage(200, "조회 성공", responseMap);

        return new ResponseEntity<>(responseMessage, headers, HttpStatus.OK);
    }

    // 댓글코드로 조회(임시)
    @GetMapping("/comment/temporary/{commentCode}")
    public ResponseEntity<HoneypotResponseMessage> temporaryFindCommentByCommentCode(@PathVariable int commentCode) {

        // 응답 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        // 응답 데이터 설정
        CommentDTO temporaryFoundComment = honeyPotService.temporaryFindCommentByCommentCode(commentCode);

        System.out.println(temporaryFoundComment);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("comment", temporaryFoundComment);

        // ResponseEntity로 응답 반환
        return ResponseEntity
                .ok()
                .headers(headers)
                .body(new HoneypotResponseMessage(200, "조회 성공", responseMap));

    }

    // 댓글코드로 조회
    @GetMapping("/comment/{commentCode}")
    public ResponseEntity<HoneypotResponseMessage> findCommentByCommentCode(@PathVariable int commentCode) {

        // 응답 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        // 응답 데이터 설정
        CommentAndLinkBeeUserDTO foundComment = honeyPotService.findCommentByCommentCode(commentCode);

        System.out.println(foundComment);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("comment", foundComment);

        // ResponseEntity로 응답 반환
        return ResponseEntity
                .ok()
                .headers(headers)
                .body(new HoneypotResponseMessage(200, "조회 성공", responseMap));

    }

    // 댓글 수정하기
    @PutMapping("/comment/{commentCode}")
    public ResponseEntity<HoneypotResponseMessage> modifyComment(@PathVariable int commentCode, @RequestBody CommentDTO commentDTO) {
        // 응답 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        // 댓글 정보 수정
        CommentDTO updatedComment = honeyPotService.modifyComment(commentCode, commentDTO);

        // 응답 데이터 설정
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("comment", updatedComment);

        // ResponseEntity로 응답 반환
        return ResponseEntity
                .ok()
                .headers(headers)
                .body(new HoneypotResponseMessage(200, "수정 성공", responseMap));

    }

    // 댓글 삭제
    @DeleteMapping("/comment/{commentCode}")
    public ResponseEntity<HoneypotResponseMessage> deleteCommentByCommentCode(@PathVariable int commentCode) {

        // 응답 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        // 응답 데이터 설정
        honeyPotService.deleteCommentByCommentCode(commentCode);
        Map<String, Object> reponseMap = new HashMap<>();
        reponseMap.put("message", "댓글 삭제 성공");

        return ResponseEntity.ok().headers(headers).body(new HoneypotResponseMessage(200, "댓글 삭제 성공", reponseMap));
    }







}
