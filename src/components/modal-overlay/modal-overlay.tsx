import React, {FC} from 'react';
import PropTypes from 'prop-types';
import style from "./modal-overlay.module.css";

type TModalOverlay = {
    onCloseHandle: () => void
}

export const ModalOverlay : FC<TModalOverlay> = ({ onCloseHandle }) => {
    return (
        <div onClick={() => onCloseHandle()} className={style.back}>
        </div>
    )
}

// ModalOverlay.propTypes = {
//     onCloseHandle: PropTypes.func.isRequired
// }