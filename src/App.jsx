import React, { useEffect, useState } from "react";
import {
  useDeleteDataMutation,
  useGetDataQuery,
  usePostDataMutation,
} from "./Redux/apiSlice";

const MyComponent = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const { data, refetch } = useGetDataQuery();
  const [deleteData] = useDeleteDataMutation();
  const [postData] = usePostDataMutation();

  const handleDelete = async (id) => {
    try {
      await deleteData(id);
      refetch();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePost = async () => {
    try {
      console.log("Sending:", name, id);
      const response = await postData({ name, id }).unwrap();
      refetch()
      console.log("Response:", response);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div>
      <div>
        <input onChange={handleNameChange} type="text" />
        <input onChange={handleIdChange} type="number" />
        <button onClick={handlePost}>Add</button>
      </div>
      {data?.map((user) => (
        <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
          <h2 key={user.id}>{user.name}</h2>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
