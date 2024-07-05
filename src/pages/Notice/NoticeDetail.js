import { useLocation, useParams } from "react-router-dom";
import NoticeRegistPage from "./NoticeRegist";
import NoticeEdit from "./NoticeEdit";
import NoticeInfo from "./NoticeInfo";

function NoticeDetail() {

    const { id } = useParams();
    const location = useLocation();
    const { type } = location.state;

    return (
        <>
            {type === "detail" && <NoticeInfo id={id} />}
            {type === "edit" && <NoticeEdit id={id} />}
            {type === "register" && <NoticeRegistPage />}
        </>
    )


}

export default NoticeDetail;