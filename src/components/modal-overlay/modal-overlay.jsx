import React from 'react';
import PropTypes from 'prop-types';
import style from "./modal-overlay.module.css"

export default function ModalOverlay({ onCloseHandle }) {
    return (
        <div onClick={() => onCloseHandle()} className={style.back}>
        </div>
    )
}

ModalOverlay.propTypes = {
    onCloseHandle: PropTypes.func.isRequired
}