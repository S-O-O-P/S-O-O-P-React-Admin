package com.soop.pages.mypage.model.dao;

import com.soop.pages.mypage.model.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MyPageMapper {

    // 유저 평가 (평점 포함) 데이터 조회
    List<UserRatingDTO> getLoggedInUserRating();

    // 유저 평가하기
    void evaluateUserRating(EvaluateUserRatingDTO newEvaluate);

    // 유저평가 항목 조회
    List<RatingDTO> getRatingList();

    // 내가 만든 허니팟 조회
    List<MyHoneypotDTO> getMyHoneypotList();

    List<ParticipatingHoneypotDTO> getParticipatingHoneypotList();

    List<UserProfileDTO> getUserProfile();
}
