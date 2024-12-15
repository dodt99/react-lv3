import { useStorageDispatch, useStorageSelector } from "../../hooks";
import { STORAGE_KEY } from "./constants";

export const Example2 = () => {
  return (
    <>
      <h4>Example 2: Form</h4>

      <div className="flex">
        <div className="flex-1 min-w-0">
          <ProductForm />
        </div>
        <hr className="mx-3" />
        <div className="flex-1 min-w-0">
          <ProductResult />
        </div>
      </div>
    </>
  );
};

const ProductForm = () => {
  const dispatch = useStorageDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const submitData = Object.fromEntries(formData);
    dispatch(STORAGE_KEY.PRODUCT, submitData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between">
        <div>
          <label className="d-block mb-1" htmlFor="productName">
            Product name:
          </label>
          <input type="text" name="productName" className="input-text" />
        </div>

        <div>
          <label className="d-block mb-1" htmlFor="quantity">
            Quantity:
          </label>
          <input type="number" name="quantity" className="input-text" />
        </div>
      </div>

      <button type="submit" className="button mt-2">
        Submit
      </button>
    </form>
  );
};

const ProductResult = () => {
  const result = useStorageSelector(STORAGE_KEY.PRODUCT);

  return (
    <div>
      Storage:
      <div className="mt-1">{JSON.stringify(result)}</div>
    </div>
  );
};
