import React from 'react';

function ModalMessage({ handleCancelModal, handleOkModal, showModal, title, message, cancelLabel, okLabel }) {
    return (
        <div className={showModal ? 'modal' : 'modal--hide'}>
            <div className="modal__main">
                <div className="modal__main__title">{title}</div>
                <div className="modal__main__body">
                    <div className="modal__main__body__msg">{message}</div>
                </div>
                <div className="modal__main__footer">
                    <div className="modal__main__footer__ctrl">
                        <button className="modal__main__footer__ctrl__btn-confirm" onClick={handleOkModal}>
                            {okLabel}
                        </button>
                        <button className="modal__main__footer__ctrl__btn-cancel" onClick={handleCancelModal}>
                            {cancelLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalMessage;
