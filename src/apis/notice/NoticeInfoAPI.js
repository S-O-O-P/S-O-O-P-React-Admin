import axios from 'axios';

export const noticeInfoAPI = async (id) => {
    try {
        const res = await axios.get(`http://localhost:8080/notice/${id}`);
        return res.data;
    } catch (error) {
        console.error('공지사항 불러오기 실패.', error);
        throw error;
    }
};

export const deleteNotice = async (id, fileName) => {
    try {
        await axios.delete(`http://localhost:8080/notice/${id}`, {
            data: { fileName }
        });
    } catch (error) {
        console.error('공지사항 삭제 실패.', error);
        throw error;
    }
};
