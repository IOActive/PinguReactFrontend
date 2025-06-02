import { useNavigate } from 'react-router-dom';
import s from "./BackButton.module.scss";
import cx from "classnames";

export const BackButton = (props) => {

    const navigate = useNavigate();

    return (
        <button className={cx("mb-0", s.BackButton)} onClick={() => navigate(-1)}>
        </button>
    );
} 