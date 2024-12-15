import { useEffect, useState } from "react";

import { AutoFilterDropdown } from "../../components/autoFilterDropdown";

const Example2 = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");

  const handleChange = (item) => {
    setSelected(item.title);
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);

      const url = "https://jsonplaceholder.typicode.com/albums";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        setAlbums(json);
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
      <h4>Select Album</h4>

      <div className="flex gap-5">
        <AutoFilterDropdown
          valueChange={handleChange}
          suggestions={albums}
          loading={loading}
          optionLabel="title"
          clearOnSelect
          dataKey="id"
          placeholder="Enter album title"
          inputClass="w-20rem"
        />

        <div>Selected: {selected}</div>
      </div>
    </>
  );
};

export default Example2;
