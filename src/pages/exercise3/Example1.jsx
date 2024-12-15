import { useEffect, useState } from "react";

import { AutoFilterDropdown } from "../../components/autoFilterDropdown";

const Example1 = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");

  const handleChange = (item) => {
    setSelected(item.name);
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);

      const url = "https://jsonplaceholder.typicode.com/users";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        setUsers(json);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  return (
    <>
      <h4>Select User</h4>

      <div className="flex gap-5">
        <AutoFilterDropdown
          valueChange={handleChange}
          suggestions={users}
          loading={loading}
          optionLabel="name"
          dataKey="id"
          emptyMessage="No users found."
          placeholder="Enter user name"
          inputClass="w-20rem"
        />

        <div>Selected: {selected}</div>
      </div>
    </>
  );
};

export default Example1;
