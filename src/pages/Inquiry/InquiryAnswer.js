import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import style from "../Inquiry/InquiryAnswer.module.css";

function InquiryAnswer() {
    const navigate = useNavigate();
    const { id } = useParams();
    const inquiryId = parseInt(id, 10); // Convert ID to a number
    const location = useLocation();
    const { inquiry: initialInquiry, page, searchTerm } = location.state || {};

    const [inquiry, setInquiry] = useState(initialInquiry || null);
    const [answer, setAnswer] = useState(initialInquiry?.answer || ""); // Initialize answer state
    const [modalOpen, setModalOpen] = useState(false);
    const [writerModal, setWriterModal] = useState(false);
    const [checkModal, setCheckModal] = useState(false);

    useEffect(() => {
        if (!initialInquiry) {
            const inquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
            const foundInquiry = inquiries.find(inquiry => inquiry.id === inquiryId);
            setInquiry(foundInquiry);
            setAnswer(foundInquiry?.answer || ""); // Initialize answer state
        }
    }, [initialInquiry, inquiryId]);

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };

    const handleSubmit = () => {
        if (answer !== "") {
            setModalOpen(true);
        } else {
            setWriterModal(true);
        }
    };

    const closeBtn = () => {
        setModalOpen(false);
        setWriterModal(false);
    };

    const confirmBtn = () => {
        updateInquiryStatus(inquiryId, '답변완료', answer);
        navigate(`/inquiry?page=${page}`, { state: { searchTerm } });
    };

    const handleCancel = () => {
        if (answer !== "") {
            setCheckModal(true);
        } else {
            navigate(-1);
        }
    };

    const updateInquiryStatus = (id, status, answer) => {
        const inquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
        const updatedInquiries = inquiries.map(inquiry => 
            inquiry.id === id ? { ...inquiry, manage: status, answer: answer } : inquiry
        );
        localStorage.setItem('inquiries', JSON.stringify(updatedInquiries));
    };

    if (!inquiry) return <div>Loading...</div>;

    return (
        <>
            <div className={style.wrapper}>
                <div className={style.contentBox}>
                    <p className={style.pageTitle}>1:1문의 답변</p>
                    <p className={style.categoryBox}>{inquiry.category}</p>
                    <p className={style.titleBox}>{inquiry.title}</p>
                    <p className={style.contextBox}>{inquiry.content}</p>

                    <textarea 
                        className={style.answerBox} 
                        type="text" 
                        name="answer" 
                        placeholder="답변을 입력해주세요." 
                        value={answer} 
                        onChange={handleAnswerChange}
                    ></textarea>
                    <div className={style.buttons}>
                        <button type='button' className={style.cancelButton} onClick={handleCancel}>취소</button>
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
                                    <button className={style.modalButton} onClick={() => navigate(-1)}>확인</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default InquiryAnswer;
