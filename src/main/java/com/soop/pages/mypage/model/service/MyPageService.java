package com.soop.pages.mypage.model.service;

import com.soop.pages.mypage.model.dao.MyPageMapper;
import com.soop.pages.mypage.model.dto.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyPageService {

    private MyPageMapper myPageMapper;

    public MyPageService(MyPageMapper myPageMapper) {
        this.myPageMapper = myPageMapper;
    }

    public List<UserRatingDTO> getLoggedInUserRating() {
        return myPageMapper.getLoggedInUserRating();
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

    public List<UserProfileDTO> getUserProfile() {
        return myPageMapper.getUserProfile();
    }
}
