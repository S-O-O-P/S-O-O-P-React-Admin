import axios from 'axios';
import style from './NoticeInfo.module.css'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function NoticeInfo() {

    const [notice, setNotice] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        async function fetchNotice() {
            try {

                const res = await axios.get(`http://localhost:8080/notice/${id}`);

                console.log(res)
                setNotice(res.data.noticeFileDTO);
                console.log(res.data.noticeFileDTO);
            } catch (error) {
                console.error('공지사항 불러오기 실패.', error);
            }
        }
        fetchNotice();
    }, []);

    const handleNotice = () => {
        navigate("/notice");
    }

    const handleRegisterClick = (id, type) => {
        navigate(`/notice/${id}`, { state: { type } });
    };

    return (
        <div className={style.wapper}>
            <div className={style.content}>
                <p className={style.pageTitle}>공지사항</p>
                <p className={style.categoryBox}>{notice.category}</p>
                <p className={style.noticeTitle}>{notice.title}</p>
                <p className={style.noticeContext}>{notice.content}</p>
                <p>이미지 구현</p>

                <div className={style.buttons}>
                    <button type="button" onClick={handleNotice} className={style.backBtn}>목록으로</button>
                    <button type="button" className={style.editBtn} onClick={() => handleRegisterClick(notice.noticeCode, "edit")}>수정</button>
                </div>
            </div>
        </div>
    )
}

export default NoticeInfo;