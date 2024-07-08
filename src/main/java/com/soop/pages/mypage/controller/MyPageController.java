package com.soop.pages.mypage.controller;

import com.soop.pages.mypage.model.dto.*;
import com.soop.pages.mypage.model.service.MyPageService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
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
    @GetMapping("/rating/{userCode}")
    public ResponseEntity<List<UserRatingDTO>> getLoggedInUserRating(@PathVariable int userCode) {
        List<UserRatingDTO> loggedInUserRatingList = myPageService.getLoggedInUserRating(userCode);
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
    @GetMapping("/{userCode}")
    public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable Integer userCode) {
//        try {
            UserProfileDTO userProfile = myPageService.getUserProfile(userCode);
            return ResponseEntity.ok(userProfile);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
    }
    // 유저 프로필 수정(닉네임, 사진, 자기소개, 관심사)
    @PutMapping("/{userCode}")
    public ResponseEntity<String> updateUserProfile(@PathVariable Integer userCode, @RequestBody UserProfileUpdateDTO dto) {
        try {
            myPageService.updateUserProfile(userCode, dto);
            return ResponseEntity.ok("프로필이 업데이트되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("프로필 업데이트에 실패했습니다.");
        }
    }


    // 관심사 항목 조회
    @GetMapping("/interest")
    public ResponseEntity<List<InterestDTO>> getInterest() {
        List<InterestDTO> interestList = myPageService.getInterest();
        return ResponseEntity.ok(interestList);
    }

    // 댓글 조회
    @GetMapping("/mycomment")
    public ResponseEntity<List<MyCommentDTO>> getMyComments() {
        List<MyCommentDTO> myCommentList = myPageService.getMyComments();
        return ResponseEntity.ok(myCommentList);
    }

    // 문의 내역 조회
    @GetMapping("/myinquiry")
    public ResponseEntity<List<MyInquiryDTO>> getMyInquiry() {
        List<MyInquiryDTO> myInquiryList = myPageService.getMyInquiry();
        return ResponseEntity.ok(myInquiryList);
    }

    // 진행완료된 허니팟 조회(유저평가멤버조회)
    @GetMapping("/finished")
    public ResponseEntity<List<FinishedHoneypotDTO>> getFinishedHoneypot() {
        List<FinishedHoneypotDTO> finishedHoneypotList = myPageService.getFinishedHoneypot();
        return ResponseEntity.ok(finishedHoneypotList);
    }

    // 로그인 유저 리프레쉬 조회
    @GetMapping("logincheck")
    public ResponseEntity<List<RefreshDTO>> getUserRef() {
        List<RefreshDTO> refreshInfo = myPageService.getUserRef();
        System.out.println("컨트롤러" + refreshInfo);
        return ResponseEntity.ok(refreshInfo);
    }





}
