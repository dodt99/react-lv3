import { useState } from "react";
import Dialog from "../../components/dialog";

export const Example1 = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h4>Dialog Example</h4>

      <button onClick={handleOpen} className="button">
        Open Dialog
      </button>
      <br />
      <button onClick={handleClose} className="button secondary mt-1">
        Close Dialog
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        size="md"
        header={<span>Dialog</span>}
      >
        <p>{sampleText}</p>
        <img
          src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRq1TacLwDWo-dxCb4HgNdtbjJQZ0gEeA_i3Ll84mTcldVWmknc"
          alt="Italian Trulli"
        />
        <p>{sampleText}</p>
        <img
          src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRq1TacLwDWo-dxCb4HgNdtbjJQZ0gEeA_i3Ll84mTcldVWmknc"
          alt="Italian Trulli"
        />
        <p>{sampleText}</p>
      </Dialog>
    </>
  );
};

const sampleText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
