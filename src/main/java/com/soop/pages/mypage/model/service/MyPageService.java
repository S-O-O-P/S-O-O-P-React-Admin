package com.soop.pages.mypage.model.service;

import com.soop.pages.mypage.model.dao.MyPageMapper;
import com.soop.pages.mypage.model.dto.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MyPageService {

    private MyPageMapper myPageMapper;

    public MyPageService(MyPageMapper myPageMapper) {
        this.myPageMapper = myPageMapper;
    }

    public List<UserRatingDTO> getLoggedInUserRating(int userCode) {
        return myPageMapper.getLoggedInUserRating(userCode);
    }

    public EvaluateUserRatingDTO evaluateUserRating(EvaluateUserRatingDTO newEvaluate) {

        myPageMapper.evaluateUserRating(newEvaluate);
        return newEvaluate;
    }

    public List<RatingDTO> getRatingList() {
        return myPageMapper.getRatingList();
    }

    public List<MyHoneypotDTO> getMyHoneypotList() {
        return myPageMapper.getMyHoneypotList();
    }

    public List<ParticipatingHoneypotDTO> getParticipatingHoneypotList() {
        return myPageMapper.getParticipatingHoneypotList();
    }

    public List<MyCommentDTO> getMyComments() {
        return myPageMapper.getMyComments();
    }

    public List<MyInquiryDTO> getMyInquiry() {
        return myPageMapper.getMyInquiry();
    }

    public List<FinishedHoneypotDTO> getFinishedHoneypot() {
        return myPageMapper.getFinishedHoneypot();
    }

    public List<InterestDTO> getInterest() {
        return myPageMapper.getInterest();
    }

    public UserProfileDTO getUserProfile(Integer userCode) {
        return myPageMapper.getUserProfile(userCode);
    }

    @Transactional
    public void updateUserProfile(Integer userCode, UserProfileUpdateDTO dto) {
        // 사용자 정보 업데이트
        myPageMapper.updateUserProfile(userCode, dto.getNickname(), dto.getAboutme(), dto.getProfilePic());

        // 기존 관심사 삭제
        myPageMapper.deleteUserInterests(userCode);

        // 새 관심사 추가
        if (dto.getInterests() != null && !dto.getInterests().isEmpty()) {
            myPageMapper.insertUserInterests(userCode, dto.getInterests());
        }
    }

}
