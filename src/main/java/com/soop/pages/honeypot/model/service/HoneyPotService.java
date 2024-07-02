package com.soop.pages.honeypot.model.service;

import com.soop.pages.honeypot.model.dao.HoneyPotMapper;
import com.soop.pages.honeypot.model.dto.CommentAndLinkBeeUserDTO;
import com.soop.pages.honeypot.model.dto.CommentDTO;
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

    // 허니팟 상세조회(허니팟코드)
    public HoneypotAndInterestAndLinkBeeUserDTO findByHoneypotCode(int honeypotCode) {
        return honeyPotMapper.findByHoneypotCode(honeypotCode);
    }

    // 상세페이지 수정용 임시 상세조회
    public HoneypotDTO temporaryFindByHoneypotCode(int honeypotCode) {
        return honeyPotMapper.temporaryFindByHoneypotCode(honeypotCode);
    }

    // 상세페이지 수정
    public HoneypotDTO modifyHoneypot(int honeypotCode, HoneypotDTO honeypotDTO) {

        // 기존 허니팟 정보 가져오기
        HoneypotDTO modifyHoneypot = temporaryFindByHoneypotCode(honeypotCode);

        // 수정할 항목들
        modifyHoneypot.setHoneypotTitle(honeypotDTO.getHoneypotTitle());
        modifyHoneypot.setHoneypotContent(honeypotDTO.getHoneypotContent());
        modifyHoneypot.setEventDate(honeypotDTO.getEventDate());
        modifyHoneypot.setEndDate(honeypotDTO.getEndDate());
        modifyHoneypot.setTotalMember(honeypotDTO.getTotalMember());

        honeyPotMapper.modifyHoneypot(modifyHoneypot);

        return modifyHoneypot;
    }

    // 댓글 전체 조회
    public List<CommentAndLinkBeeUserDTO> findAllComments() {
        return honeyPotMapper.findAllComments();
    }

    // 댓글 코드로 조회
    public CommentAndLinkBeeUserDTO findCommentByCommentCode(int commentCode) {
        return honeyPotMapper.findCommentByCommentCode(commentCode);
    }
    // 댓글 코드로 조회(임시)
    public CommentDTO temporaryFindCommentByCommentCode(int commentCode) {
        return honeyPotMapper.temporaryFindCommentByCommentCode(commentCode);
    }


    public CommentDTO modifyComment(int commentCode, CommentDTO commentDTO) {

        // 기존 댓글 정보 가져오기
        CommentDTO modifyComment = temporaryFindCommentByCommentCode(commentCode);

        // 수정할 항목들
        modifyComment.setContent(commentDTO.getContent());
        modifyComment.setUpdateTime(commentDTO.getUpdateTime());

        honeyPotMapper.modifyComment(modifyComment);

        return modifyComment;

    }

    public void deleteCommentByCommentCode(int commentCode) {
        honeyPotMapper.deleteCommentByCommentCode(commentCode);
    }
}
