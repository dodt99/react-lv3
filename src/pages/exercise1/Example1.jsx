import { useStorageDispatch, useStorageSelector } from "../../hooks";
import { STORAGE_KEY } from "./constants";

export const Example1 = () => {
  return (
    <>
      <h4>Example 1: Controlled Input</h4>

      <div className="flex">
        <div className="flex-1 min-w-0">
          <UserForm />
        </div>
        <hr className="mx-3" />
        <div className="flex-1 min-w-0">
          <UserResult />
        </div>
      </div>
    </>
  );
};

const UserForm = () => {
  const dispatch = useStorageDispatch();
  const username = useStorageSelector(STORAGE_KEY.USER);

  const handleChange = (e) => {
    dispatch(STORAGE_KEY.USER, e.target.value);
  };

  return (
    <>
      <label className="d-block mb-1">Username: </label>
      <input
        value={username || ""}
        onChange={handleChange}
        className="input-text"
      />
    </>
  );
};

const UserResult = () => {
  const username = useStorageSelector(STORAGE_KEY.USER);

  return (
    <div>
      Storage:
      <div className="mt-1">{username}</div>
    </div>
  );
};
