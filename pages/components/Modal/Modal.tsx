import React, {
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from "react";
import { createPortal } from "react-dom";
import { RemoveScroll } from "react-remove-scroll";
import { Close } from "../Icons/Close";
import { isMobile } from "../../utils/isMobile";

const stopPropagation: MouseEventHandler<unknown> = (event) =>
  event.stopPropagation();

interface ModalProps {
  open: boolean;
  onClose: () => void;
  modalTitle: string;
  children: ReactNode;
}

export function Modal({ open, onClose, modalTitle, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) =>
      open && event.key === "Escape" && onClose();

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  const [bodyScrollable, setBodyScrollable] = useState(false);

  useEffect(() => {
    setBodyScrollable(
      getComputedStyle(window.document.body).overflow !== "hidden"
    );
  }, []);

  const handleBackdropClick = useCallback(() => onClose(), [onClose]);

  const mobile = isMobile();

  return (
    <>
      {open
        ? createPortal(
            <RemoveScroll enabled={bodyScrollable}>
              <div
                className="overlay"
                style={{ justifyContent: mobile ? "flex-end" : "center" }}
                onClick={handleBackdropClick}
                role="dialog"
              >
                <div
                  className="modal"
                  style={{
                    width: mobile ? "100%" : "430px",
                    borderBottomLeftRadius: mobile ? "0px" : "20px",
                    borderBottomRightRadius: mobile ? "0px" : "20px"
                  }}
                  onClick={stopPropagation}
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      {modalTitle}
                      <div className="close-button" onClick={onClose}>
                        <Close />
                      </div>
                    </div>
                    {children}
                  </div>
                </div>
              </div>
            </RemoveScroll>,
            document.body
          )
        : null}
    </>
  );
}