import { createPortal } from "react-dom";

import "./index.css";

const createDialog = (element) => createPortal(element, document.body);

const Dialog = ({
  open,
  onClose,
  modal = false,
  size = "md",
  showHeader = true,
  header = "",
  headerActions,
  closeIcon,
  closable = true,
  content,
  children,
  footer,
  dismissableMask = false,
  maskStyle,
  maskClass = "",
  dialogStyle,
  dialogClass = "",
  headerStyle,
  headerClass = "",
  contentStyle,
  contentClass = "",
  footerStyle,
  footerClass = "",
}) => {
  const onMaskClick = (e) => {
    if (
      e.target.classList.contains("dialog-mask") &&
      dismissableMask &&
      onClose
    ) {
      onClose();
    }
  };

  return (
    open &&
    createDialog(
      <div
        key={"dialog-mask"} // Add key to prevent other portals rerender
        onClick={onMaskClick}
        style={maskStyle}
        className={`dialog-mask ${modal ? "modal" : ""} ${maskClass}`}
      >
        <div style={dialogStyle} className={`dialog ${size} ${dialogClass}`}>
          {showHeader && (
            <div className="header">
              <div
                style={headerStyle}
                className={`header-title ${headerClass}`}
              >
                {header}
              </div>
              <div className="header-actions">
                {headerActions}
                {closable && (
                  <span className="pointer" onClick={onClose}>
                    {closeIcon ? closeIcon : <>&#10006;</>}
                  </span>
                )}
              </div>
            </div>
          )}

          <div style={contentStyle} className={`content ${contentClass}`}>
            {content}
            {children}
          </div>

          {footer && (
            <div style={footerStyle} className={`footer ${footerClass}`}>
              {footer}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Dialog;
