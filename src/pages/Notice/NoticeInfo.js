import axios from 'axios';
import style from './NoticeInfo.module.css'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function NoticeInfo() {

    const navigate = useNavigate();
    const [notice, setNotice] = useState({});
    const [file, setFile] = useState(null);
    const { id } = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const [checkModal, setCheckModal] = useState(false);

    useEffect(() => {
        async function fetchNotice() {
            try {
                const res = await axios.get(`http://localhost:8080/notice/${id}`);
                setNotice(res.data.noticeDTO);
                setFile(res.data.fileDTO);
                console.log(res.data.fileDTO);
            } catch (error) {
                console.error('공지사항 불러오기 실패.', error);
            }
        }
        fetchNotice();
    }, [id]);

    const handleDeleteBtn = () => {
        setCheckModal(true);
    }

    const handleNotice = () => {
        navigate("/notice");
    }

    const handleRegisterClick = (id, type) => {
        navigate(`/notice/${id}`, { state: { type } });
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8080/notice/${id}`, {
            data: file ? { fileName: file.name } : { fileName: null }
        })
        setCheckModal(false);
        setModalOpen(true);
    }

    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                <p className={style.pageTitle}>공지사항</p>
                <p className={style.categoryBox}>{notice.category}</p>
                <p className={style.noticeTitle}>{notice.title}</p>
                <p className={style.noticeContext}>{notice.content}</p>

                {file && file.name && (
                    <div className={style.preview_box}>
                        <p className={style.attached_file_count}>이미지 파일</p>
                        <ul className={style.preview_list}>
                            <li className={style.preview_img}>
                                <img src={`${file.name}`} alt="사진" />
                            </li>
                        </ul>
                    </div>
                )}

                <div className={style.buttons}>
                    <button type="button" onClick={handleNotice} className={style.backBtn}>목록으로</button>
                    <div>
                        <button type="button" onClick={handleDeleteBtn} className={style.backBtn}>삭제</button>
                        <button type="button" className={style.editBtn} onClick={() => handleRegisterClick(notice.noticeCode, "edit")}>수정</button>
                    </div>
                </div>

                {checkModal && (
                    <div className={style.back}>
                        <div className={style.modal}>
                            <img src='/images/commons/icon_alert.png' alt='경고' width={45} />
                            <p className={style.modalTitle}>공지사항을 삭제하시겠습니까?</p>
                            <p className={style.modalContext}>삭제된 공지사항은 되돌릴 수 없습니다.</p>
                            <div className={style.modalButtonBox}>
                                <button className={style.modalButton} onClick={() => setCheckModal(false)}>취소</button>
                                <button className={style.modalButton} onClick={handleDelete}>확인</button>
                            </div>
                        </div>
                    </div>
                )}

                {modalOpen && (
                    <div className={style.back}>
                        <div className={style.modal}>
                            <img src='/images/commons/icon_confirm.png' alt='확인' width={45} />
                            <p className={style.modalTitle}>공지사항이 삭제되었습니다.</p>
                            <button className={style.modalButton} onClick={handleNotice}>확인</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default NoticeInfo;
