import React, { useEffect, useState } from "react";
import {
  useDeleteDataMutation,
  useEditDataMutation,
  useGetDataQuery,
  usePostDataMutation,
} from "./Redux/apiSlice";
import { useDispatch } from "react-redux";
import { getUser } from "./Redux/userSlice";

const MyComponent = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [editMode, setEditMode] = useState(false);
  // Functions from apiSlice
  const { data, refetch } = useGetDataQuery();
  const [deleteData] = useDeleteDataMutation();
  const [postData] = usePostDataMutation();
  const [editData] = useEditDataMutation();

  // Use Dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(getUser(data));
    }
  }, [data, dispatch]);

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
      setName("");
      setId("");
      refetch();
      console.log("Response:", response);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handlePatch = async () => {
    const response = await editData({ name, id }).unwrap();
    setName("");
    setId("");
    setEditMode(false);
    refetch();
  };

  const handleEditMode = (user) => {
    setEditMode(true);
    setName(user.name);
    setId(user.id);
  };

  return (
    <div>
      <div>
        <input onChange={handleNameChange} type="text" value={name} />
        <input onChange={handleIdChange} type="number" value={id} />
        {editMode ? (
          <button onClick={handlePatch}>Update</button>
        ) : (
          <button onClick={handlePost}>Add</button>
        )}
      </div>
      {data?.map((user) => (
        <div
          key={user.id}
          style={{ display: "flex", gap: "8px", marginTop: "4px" }}
        >
          <h2>{user.name}</h2>
          <button onClick={() => handleEditMode(user)}>Edit</button>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
