import { useState, navigater } from 'react';
import style from './NoticeRegist.module.css';
import axios from 'axios';

function NoticeRegistPage() {

    const [selected, setSelected] = useState("공지사항");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [inputCount, setInputCount] = useState(0);
    const [postImg, setPostImg] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [writerModal, setWriterModal] = useState(false);
    const [checkModal, setCheckModal] = useState(false);

    const handleSelect = (e) => {
        setSelected(e.target.value);
    };
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleCount = (e) => {
        setContent(e.target.value);
        setInputCount(e.target.value.length);
    }

    const saveImgFile = (e) => {
        setPostImg(URL.createObjectURL(e.target.files[0]))
    }

    const clearImg = () => {
        setPostImg(null);
    }

    const closeBtn = () => {
        setModalOpen(false);
        setWriterModal(false);
    }

    const handleCancel = () => {
        if (title !== "" || content !== "") {
            setCheckModal(true);
            console.log("유형", selected);
            console.log("제목:", title);
            console.log("내용:", content);
        } else {
            navigater(-1);
        }
    }

    const handleSubmit = () => {
        const today = new Date();

        if (title !== "" && content !== "") {
            const data = {
            }

            console.log("유형", selected);
            console.log("제목:", title);
            console.log("내용:", content);
            setModalOpen(true);

            // axios.post('http://localhost:8081/notice', data)
            //     .then(response => {
            //         console.log("response", response);
            //     })

        } else {
            setWriterModal(true);
        }
    };

    return (
        <div className={style.wapper}>
            <div className={style.content}>
                <p className={style.pageTitle}>공지사항 등록</p>
                <select className={style.customSelect} onChange={handleSelect} value={selected}>
                    <option value="공지사항">공지사항</option>
                    <option value="이벤트">이벤트</option>
                </select>

                <input className={style.titleInput} onChange={handleTitleChange} placeholder='제목을 입력해주세요.'></input>

                <div className={style.contextInputBox}>
                    <textarea className={style.contextInput} onChange={handleCount} placeholder='내용을 입력해주세요.' maxLength={500}></textarea>
                    <p className={style.inputCount} >{inputCount}/500</p>
                </div>

                <div className={style.preview_box}>
                    <p className={style.attached_file_count}>이미지 파일</p>
                    <ul className={style.preview_list}>
                        {postImg &&
                            (<li className={style.preview_img}>
                                <img src={postImg} alt="preview image" />
                                <span className={style.remove_preview_btn} onClick={clearImg} >×</span>
                            </li>)
                        }

                        {!postImg &&
                            (<li className={style.upload_img_btn}>
                                <label className={style.file_upload_box} name="upload">
                                    <span className={style.upload_btn}>＋</span>
                                    <input type="file" accept="image/*" onChange={saveImgFile} name="upload" className={style.file_upload_input} />
                                </label>
                            </li>)
                        }
                    </ul>
                </div>
                <div className={style.buttons}>
                    <a>
                        <button type='button' className={style.cancelButton} onClick={() => { handleCancel() }}>취소</button>
                    </a>
                    <button type='submit' className={style.submitButton} onClick={() => { handleSubmit() }}>등록</button>
                </div>


                {modalOpen && (
                    <div className={style.back}>
                        <div className={style.modal}>
                            <img src='/images/serviceCenter/check.png' alt='확인' width={45} />
                            <p className={style.modalTitle}>1:1문의가 접수 되었습니다.</p>
                            <p className={style.modalContext}>문의 내용에 따라 답변이 늦어질 수 있습니다.</p>
                            <a href="/notice">
                                <button className={style.modalButton} onClick={closeBtn}>확인</button>
                            </a>
                        </div>
                    </div>
                )}
                {writerModal && (
                    <div className={style.back}>
                        <div className={style.modal}>
                            <img src='/images/commons/icon_alert.png' alt='경고' width={45} />
                            <p className={style.modalTitle}>제목과 내용을 모두 작성해주세요.</p>
                            <button className={style.modalButton} onClick={closeBtn}>확인</button>
                        </div>
                    </div>
                )}
                {checkModal && (
                    <div className={style.back}>
                        <div className={style.modal}>
                            <img src='/images/commons/icon_alert.png' alt='경고' width={45} />
                            <p className={style.modalTitle}>공지사항 등록을 취소하시겠습니까?</p>
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
    )

}

export default NoticeRegistPage;