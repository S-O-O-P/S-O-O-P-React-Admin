import { useState } from "react";
import style from "../Customer/InquiryAnswer.module.css";
import { useNavigate } from 'react-router-dom';

function InquiryAnswer() {

    const navigater = useNavigate();

    const [answer, setAnswer] = useState("");
    const handleAnswer = (e) => {
        setAnswer(e.target.value);
    }

    const [modalOpen, setModalOpen] = useState(false);
    const [writerModal, setWriterModal] = useState(false);

    const handleSubmit = () => {

        if (answer !== "") {
            console.log("답변:", answer);
            setModalOpen(true);
        } else {
            setWriterModal(true);
        }
    }

    const closeBtn = () => {
        setModalOpen(false);
        setWriterModal(false);
    }

    const [checkModal, setCheckModal] = useState(false);

    const handleCancel = () => {
        if (answer !== "") {
            setCheckModal(true);
        } else {
            navigater(-1);
        }
    }

    return (
        <>
            <div className={style.wrapper}>
                <div className={style.contentBox}>
                    <p className={style.pageTitle}>1:1문의 답변</p>

                    <p className={style.categoryBox}>유형</p>
                    <p className={style.titleBox}>제목</p>
                    <p className={style.contextBox}>내용</p>

                    <textarea className={style.answerBox} type="text" name="answer" placeholder="답변을 입력해주세요." value={answer} onChange={handleAnswer}></textarea>
                    <div className={style.buttons}>
                        <a>
                            <button type='button' className={style.cancelButton} onClick={() => { handleCancel() }}>취소</button>
                        </a>
                        <button type='submit' className={style.submitButton} onClick={() => { handleSubmit() }}>등록</button>
                    </div>

                    {modalOpen && (
                        <div className={style.back}>
                            <div className={style.modal}>
                                <img src='/images/commons/icon_confirm.png' alt='확인' width={45} />
                                <p className={style.modalTitle}>1:1 문의 답변 등록 완료</p>
                                <a href="/help">
                                    <button className={style.modalButton} onClick={closeBtn}>확인</button>
                                </a>
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
                                    <button className={style.modalButton} onClick={() => navigater(-1)}>확인</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>

    )


}

export default InquiryAnswer;