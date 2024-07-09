import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { fetchInquiryDetails, postInquiryAnswer, updateInquiryStatus } from '../../apis/InquiryAnswerAPI'; // API 호출 함수 임포트
import style from "../Inquiry/InquiryAnswer.module.css";

function InquiryAnswer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { inquiryCode } = useParams();

  const [inquiry, setInquiry] = useState({
    category: '',
    title: '',
    content: '',
    answer: '' // Add the answer to the initial state
  });

  const [answer, setAnswer] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [writerModal, setWriterModal] = useState(false);
  const [checkModal, setCheckModal] = useState(false);
  const [alreadyAnsweredModal, setAlreadyAnsweredModal] = useState(false);

  const currentPage = location.state?.page || 1;
  const searchTerm = location.state?.searchTerm || '';

  useEffect(() => {
    fetchInquiryDetails(inquiryCode)
      .then(data => {
        setInquiry(data);
        setAnswer(data.answer || ""); // Set existing answer if any
      })
      .catch(error => console.error('There was an error fetching the inquiry details!', error));
  }, [inquiryCode]);

  const handleAnswer = (e) => {
    setAnswer(e.target.value);
  }

  const handleSubmit = async () => {
    if (answer.trim() !== "") {
      if (inquiry.answer && answer === inquiry.answer) {
        setAlreadyAnsweredModal(true);
      } else {
        try {
          await postInquiryAnswer(inquiryCode, answer);
          setInquiry(prevInquiry => ({ ...prevInquiry, answer })); // Update inquiry state with the new answer and status
          setModalOpen(true);
        } catch (error) {
          console.error("There was an error posting the answer!", error);
        }
      }
    } else {
      setWriterModal(true);
    }
  }

  const confirmBtn = async () => {
    try {
      await updateInquiryStatus(inquiryCode, "답변완료");
      navigate('/inquiry', { state: { page: currentPage, searchTerm, updatedInquiry: { answerStatus: "답변완료" } } });
    } catch (error) {
      console.error("There was an error updating the answer status!", error);
    }
  }

  const closeBtn = () => {
    setModalOpen(false);
    setWriterModal(false);
    setAlreadyAnsweredModal(false);
  }

  const handleCancel = () => {
    const currentAnswer = inquiry.answer || ""; // Fallback to an empty string if inquiry.answer is null or undefined
    if (answer.trim() === "" || currentAnswer.trim() === "") {
      setCheckModal(true);
    } else {
      navigate('/inquiry', { state: { page: currentPage, searchTerm } }); // Navigate back to the list page with state
    }
  }

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.contentBox}>
          <p className={style.pageTitle}>1:1문의 답변</p>

          <p className={style.categoryBox}>{inquiry.category}</p>
          <p className={style.titleBox}>{inquiry.title}</p>
          <p className={style.contextBox}>{inquiry.content}</p>

          <textarea className={style.answerBox} type="text" name="answer" placeholder="답변을 입력해주세요." value={answer} onChange={handleAnswer} />
          <div className={style.buttons}>
            <a>
              <button type='button' className={style.cancelButton} onClick={handleCancel}>취소</button>
            </a>
            <button type='submit' className={style.submitButton} onClick={handleSubmit}>등록</button>
          </div>

          {modalOpen && (
            <div className={style.back}>
              <div className={style.modal}>
                <img src='/images/commons/icon_confirm.png' alt='확인' width={45} />
                <p className={style.modalTitle}>1:1 문의 답변 등록 완료</p>
                <button className={style.modalButton} onClick={confirmBtn}>확인</button>
              </div>
            </div>
          )}
          {writerModal && (
            <div className={style.back}>
              <div className={style.modal}>
                <img src='/images/commons/icon_alert.png' alt='경고' width={45} />
                <p className={style.modalTitle}>답변을 작성해주세요.</p>
                <button className={style.modalButton} onClick={closeBtn}>확인</button>
              </div>
            </div>
          )}
          {checkModal && (
            <div className={style.back}>
              <div className={style.modal}>
                <img src='/images/commons/icon_alert.png' alt='경고' width={45} />
                <p className={style.modalTitle}>1:1문의 작성을 취소하시겠습니까?</p>
                <p className={style.modalContext}>작성 취소된 내용은 되돌릴 수 없습니다.</p>
                <div className={style.modalButtonBox}>
                  <button className={style.modalButton} onClick={() => setCheckModal(false)}>취소</button>
                  <button className={style.modalButton} onClick={() => navigate('/inquiry', { state: { page: currentPage, searchTerm } })}>확인</button>
                </div>
              </div>
            </div>
          )}
          {alreadyAnsweredModal && (
            <div className={style.back}>
              <div className={style.modal}>
                <img src='/images/commons/icon_alert.png' alt='경고' width={45} />
                <p className={style.modalTitle}>이미 등록된 답변입니다.</p>
                <button className={style.modalButton} onClick={closeBtn}>확인</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default InquiryAnswer;
