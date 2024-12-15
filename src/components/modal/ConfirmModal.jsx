import Dialog from "../dialog";

const ConfirmModal = ({
  open,
  header,
  message,
  onCancel,
  onConfirm,
  ...rest
}) => {
  return (
    <Dialog
      modal
      open={open}
      closable={false}
      header={header}
      content={message}
      footer={
        <div className="flex justify-end gap-1">
          <button type="button" onClick={onCancel} className="button secondary">
            Cancel
          </button>

          <button type="button" onClick={onConfirm} className="button">
            Confirm
          </button>
        </div>
      }
      {...rest}
    />
  );
};

export default ConfirmModal;
