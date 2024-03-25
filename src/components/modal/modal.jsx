import React from "react";
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";

import ModalOverlay from "../modal-overlay/modal-overlay";

import style from "./modal.module.css"
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const modalRoot = document.getElementById("react-modals");

export default function Modal({ onCloseHandle, children, header }) {

    React.useEffect(() => {
        const close = (e) => {
          if(e.keyCode === 27){
            onCloseHandle()
          }
        }
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    },[])

    return createPortal(
        <>
            <div className={style.modal}>
                <div className={style.component}>
                    <div style={{ width: '640px', display: 'flex' }}>
                        <span className="text text_type_main-large pt-10">{header}</span>
                    </div>
                    <button onClick={() => onCloseHandle()} className={style.close}>
                        <CloseIcon type="primary" />
                    </button>
                    {children}
                </div>
                <ModalOverlay onCloseHandle={onCloseHandle} />
            </div>
        </>, modalRoot
    )
}

Modal.propTypes = {
    onCloseHandle: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    header: PropTypes.string,
}