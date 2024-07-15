import { useState } from 'react';
import style from './NoticeRegist.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebaseConfig';

function NoticeRegistPage() {

    const [selected, setSelected] = useState("공지사항");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [inputCount, setInputCount] = useState(0);
    const [postImg, setPostImg] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [writerModal, setWriterModal] = useState(false);
    const [checkModal, setCheckModal] = useState(false);
    const navigate = useNavigate();


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
        setPostImg(e.target.files[0]);
        setPreviewImg(URL.createObjectURL(e.target.files[0]))

    }

    const clearImg = () => {
        setPostImg(null);
    }

    const closeBtn = () => {
        setModalOpen(false);
        setWriterModal(false);
    }

    const goNotice = () => {
        setModalOpen(false);
        setWriterModal(false);
        navigate("/notice");
    }

    const handleCancel = () => {
        if (title !== "" || content !== "") {
            setCheckModal(true);
        } else {
            navigate("/notice")
        }
    }

    const handleSubmit = () => {
        const formData = new FormData();

        if (title !== "" && content !== "") {

            if (postImg) {
                // Firebase Storage에 파일 업로드
                const storage = getStorage();
                const storageRef = ref(storage, `files/${postImg.name}`);

                uploadBytes(storageRef, postImg).then((snapshot) => {
                    console.log('Uploaded a blob or file!');

                    // 파일의 다운로드 URL 가져오기
                    getDownloadURL(snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);

                        // 폼 데이터에 다운로드 URL 포함
                        formData.append('category', selected);
                        formData.append('title', title);
                        formData.append('content', content);
                        formData.append('userCode', 1);
                        formData.append('fileURL', downloadURL); // 다운로드 URL 추가

                        // 서버에 폼 데이터 전송
                        axios.post(`http://localhost:8082/notice/new`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                            .then(response => {
                                console.log("response", response);
                            });

                        setModalOpen(true);
                    });
                }).catch((error) => {
                    console.error('Error uploading file:', error);
                });
            } else {
                formData.append('category', selected);
                formData.append('title', title);
                formData.append('content', content);
                formData.append('userCode', 1);

                axios.post(`http://localhost:8082/notice/new`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        console.log("response", response);
                    });

                setModalOpen(true);
            }
        } else {
            setWriterModal(true);
        }
    };


    return (
        <div className={style.wrapper}>
            <div className={style.contentBox}>
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

                {/* 이미지 업로드 */}
                <div className={style.preview_box}>
                    <p className={style.attached_file_count}>이미지 파일</p>
                    <ul className={style.preview_list}>
                        {postImg ?
                            (<li className={style.preview_img}>
                                <img src={previewImg} alt="preview image" />
                                <span className={style.remove_preview_btn} onClick={clearImg} >×</span>
                            </li>) : (<li className={style.upload_img_btn}>
                                <label className={style.file_upload_box} name="upload">
                                    <span className={style.upload_btn}>＋</span>
                                    <input type="file" accept="image/*" onChange={saveImgFile} name="upload" className={style.file_upload_input} />
                                </label>
                            </li>)
                        }
                    </ul>
                </div>
                <div className={style.buttons}>
                    <button type='button' className={style.cancelButton} onClick={() => { handleCancel() }}>목록으로</button>
                    <button type='submit' className={style.submitButton} onClick={() => { handleSubmit() }}>등록</button>
                </div>


                {modalOpen && (
                    <div className={style.back}>
                        <div className={style.modal}>
                            <img src='/images/commons/icon_confirm.png' alt='확인' width={45} />
                            <p className={style.modalTitle}>공지사항이 등록되었습니다.</p>
                            <button className={style.modalButton} onClick={goNotice}>확인</button>
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
                                <button className={style.modalButton} onClick={goNotice}>확인</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )

}

export default NoticeRegistPage;