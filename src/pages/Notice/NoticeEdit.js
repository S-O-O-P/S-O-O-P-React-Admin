import { useState, useEffect } from 'react';
import style from './NoticeRegist.module.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
function NoticeEdit() {
    const [notice, setNotice] = useState({});
    const [selected, setSelected] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [postImg, setPostImg] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [writerModal, setWriterModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [checkModal, setCheckModal] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [inputCount, setInputCount] = useState(0);
    const [previewImg, setPreviewImg] = useState(false);
    const [file, setFile] = useState({});
    const [img, setImg] = useState({});
    const [initialFile, setInitialFile] = useState({});

    useEffect(() => {
        async function fetchNotice() {
            try {
                const res = await axios.get(`http://localhost:8080/notice/${id}`);
                setNotice(res.data.noticeDTO);
                setFile(res.data.fileDTO);
                setInitialFile(res.data.fileDTO)
                if (res.data.fileDTO) {
                    setImg(res.data.fileDTO.name);
                    setPreviewImg(true);
                }

            } catch (error) {
                console.error('공지사항 불러오기 실패.', error);
            }
        }
        fetchNotice();
    }, [id]);

    useEffect(() => {
        setSelected(notice.category || '');
        setTitle(notice.title || '');
        setContent(notice.content || '');
    }, [notice]);

    useEffect(() => {
        if (notice && notice.content) {
            setInputCount(notice.content.length);
        }
    }, [notice]);


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

        const uploadedFile = e.target.files[0];
        setPostImg(URL.createObjectURL(uploadedFile));

        console.log(postImg);
        setFile(uploadedFile);
        setPreviewImg(true);
    };

    const clearImg = () => {
        setPostImg(null);
        setFile(null);
        setPreviewImg(false);
    }

    const closeBtn = () => {
        setModalOpen(false);
        setWriterModal(false);
        setEditModal(false);
    }

    const goNotice = () => {
        setModalOpen(false);
        setWriterModal(false);
        navigate("/notice");
    }

    const handleCancel = () => {
        if (title === notice.title && content === notice.content && selected === notice.category) {
            navigate("/notice");
        } else {
            setCheckModal(true);
        }
    };

    const handleSubmit = () => {

        const formData = new FormData();

        console.log(img);
        // console.log(file);

        if (title !== "" && content !== "") {
            if (title !== notice.title || content !== notice.content || selected !== notice.category || file !== initialFile) {
                formData.append('category', selected);
                formData.append('title', title);
                formData.append('content', content);
                formData.append('userCode', 7);
                formData.append('file', file);

                axios.put(`http://localhost:8080/notice/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        console.log("response", response);
                    })

                setModalOpen(true);
            } else {
                setEditModal(true);
            }
        } else {
            setWriterModal(true);
        }
    };

    return (
        <div className={style.wapper}>
            <div className={style.content}>
                <p className={style.pageTitle}>공지사항 수정</p>
                <select className={style.customSelect} onChange={handleSelect} defaultValue={notice.category}>
                    <option value="공지사항">공지사항</option>
                    <option value="이벤트">이벤트</option>
                </select>

                <input className={style.titleInput} onChange={handleTitleChange} placeholder='제목을 입력해주세요.' defaultValue={notice.title}></input>

                <div className={style.contextInputBox}>
                    <textarea className={style.contextInput} onChange={handleCount} placeholder='내용을 입력해주세요.' maxLength={500} defaultValue={notice.content}></textarea>
                    <p className={style.inputCount} >{inputCount}/500</p>
                </div>

                {/* 이미지 업로드 */}
                <div className={style.preview_box}>
                    <p className={style.attached_file_count}>이미지 파일</p>
                    <ul className={style.preview_list}>
                        {previewImg ?
                            (<li className={style.preview_img}>
                                {postImg ?
                                    (<img src={postImg} alt="preview image" />)
                                    : (<img src={`http://localhost:8080/notice/image?name=${img}`} alt="preview image" />)}
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
                    <button type='submit' className={style.submitButton} onClick={() => { handleSubmit() }}>수정</button>
                </div>


                {modalOpen && (
                    <div className={style.back}>
                        <div className={style.modal}>
                            <img src='/images/commons/icon_confirm.png' alt='확인' width={45} />
                            <p className={style.modalTitle}>공지사항이 수정되었습니다.</p>

                            <button className={style.modalButton} onClick={goNotice}>확인</button>

                        </div>
                    </div>
                )}
                {editModal && (
                    <div className={style.back}>
                        <div className={style.modal}>
                            <img src='/images/commons/icon_alert.png' alt='경고' width={45} />
                            <p className={style.modalTitle}>수정된 내용이 없습니다.</p>
                            <button className={style.modalButton} onClick={closeBtn}>확인</button>
                        </div>
                    </div>
                )}
                {checkModal && (
                    <div className={style.back}>
                        <div className={style.modal}>
                            <img src='/images/commons/icon_alert.png' alt='경고' width={45} />
                            <p className={style.modalTitle}>공지사항 수정을 취소하시겠습니까?</p>
                            <p className={style.modalContext}>작성 취소된 내용은 되돌릴 수 없습니다.</p>
                            <div className={style.modalButtonBox}>
                                <button className={style.modalButton} onClick={() => setCheckModal(false)}>취소</button>

                                <button className={style.modalButton} onClick={goNotice}>확인</button>

                            </div>
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

            </div>
        </div>
    )

}

export default NoticeEdit;