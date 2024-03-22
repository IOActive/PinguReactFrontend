import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";
import cx from "classnames";
import s from "./CloseButton.module.scss";


export const CloseButton = (props) => {

    const { closeConstant } = props;


    function closeWindows(){
        closeConstant(false);
      }

    return (
        <Button className={cx(s.CloseButton)} onClick={closeWindows}><FontAwesomeIcon icon={faXmark} /></Button>
);
}