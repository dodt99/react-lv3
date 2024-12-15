import { useState } from "react";

import ConfirmModal from "../../components/modal/ConfirmModal";

export const Example2 = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    console.log("Confirm Delete");
    setOpen(false);
  };

  return (
    <>
      <h4>Modal Example</h4>

      <button onClick={handleOpen} className="button danger">
        Confirm Delete
      </button>

      <ConfirmModal
        open={open}
        onCancel={handleClose}
        onConfirm={handleConfirm}
        header="Confirmation"
        message={"Are you sure you want to proceed?"}
      />
    </>
  );
};
