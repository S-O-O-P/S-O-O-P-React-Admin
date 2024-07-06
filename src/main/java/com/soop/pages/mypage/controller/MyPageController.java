package com.soop.pages.mypage.controller;

import com.soop.pages.mypage.model.dto.*;
import com.soop.pages.mypage.model.service.MyPageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mypage")
public class MyPageController {

    private MyPageService myPageService;

    public MyPageController(MyPageService myPageService) {
        this.myPageService = myPageService;
    }

    // 유저평가 조회
    @GetMapping("/userratring")
    public ResponseEntity<List<UserRatingDTO>> getLoggedInUserRating() {
        List<UserRatingDTO> loggedInUserRatingList = myPageService.getLoggedInUserRating();

        return ResponseEntity.ok(loggedInUserRatingList);

    }

    // 평점 항목 조회
    @GetMapping("/rating")
    public ResponseEntity<List<RatingDTO>> getRatingList() {
        List<RatingDTO> ratingList = myPageService.getRatingList();
        return ResponseEntity.ok(ratingList);
    }

    // 유저평점 등록(평가하기)
    @PostMapping("/userrating")
    public ResponseEntity<EvaluateUserRatingDTO> evaluateUserRating(@RequestBody EvaluateUserRatingDTO newEvaluate) {
        EvaluateUserRatingDTO evaluateUserRating = myPageService.evaluateUserRating(newEvaluate);
        return ResponseEntity.ok(evaluateUserRating);
    }

    // 내가 만든 허니팟 조회
    @GetMapping("/myhoneypots")
    public ResponseEntity<List<MyHoneypotDTO>> getMyHoneypotsList() {
        List<MyHoneypotDTO> myHoneypotList = myPageService.getMyHoneypotList();
        return ResponseEntity.ok(myHoneypotList);
    }

    // 참여중인 허니팟 조회

    @GetMapping("/participated")
    public ResponseEntity<List<ParticipatingHoneypotDTO>> getParticipatingHoneypotList() {
        List<ParticipatingHoneypotDTO> participatingHoneypotList = myPageService.getParticipatingHoneypotList();
        return ResponseEntity.ok(participatingHoneypotList);
    }

    // 유저 프로필 조회(닉네임, 사진, 자기소개, 관심사)
    @GetMapping("/profile")
    public ResponseEntity<List<UserProfileDTO>> getUserProfile() {
        List<UserProfileDTO> userProfileList = myPageService.getUserProfile();
        return ResponseEntity.ok(userProfileList);
    }




}
