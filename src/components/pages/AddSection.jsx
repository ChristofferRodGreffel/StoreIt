import React, { useState } from "react";
import { getDatabase, ref, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

export const AddSection = () => {
  const [sectionName, setSectionName] = useState("");
  const [content, setContent] = useState("");
  const [contentList, setContentList] = useState([]);

  const db = getDatabase();
  const navigate = useNavigate();

  const saveSection = (e) => {
    e.preventDefault();
    createNewSection(sectionName, content);
    navigate("/storage");
  };

  const createNewSection = () => {
    // Create a new post reference with an auto-generated id
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const postListRef = ref(db, `${userId}`);
    const newPostRef = push(postListRef);

    // Get the auto-generated Firebase ID of the new section
    const secId = newPostRef.key;

    if (contentList.length == 0) {
      contentList.push("");
    }
    set(newPostRef, {
      sectionName: sectionName,
      content: [...contentList],
      sectionId: secId,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newItem = {
      id: uuidv4(),
      content: content,
    };

    setContentList([...contentList, newItem]);

    toast.dismiss();
    toast.success(`[${newItem.content}] was added to ${sectionName}`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setContent("");
  };

  const handleDelete = (id, content) => {
    const newList = contentList.filter((item) => item.id !== id);
    setContentList(newList);

    toast.success(`[${content}] was removed from ${sectionName}`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setContent("");
  };

  return (
    <div className="create-new-section">
      <h1>Create new section</h1>
      <div className="form">
        <div>
          <label>
            Section name <i className="fa-solid fa-circle-question" content="The name of your storage location"></i>
          </label>
          <input type="text" name="sectionName" placeholder="What is the section name?" value={sectionName} onChange={(e) => setSectionName(e.target.value)} required />
        </div>
        <div>
          <label>
            What are you storing? <i className="fa-solid fa-circle-question" content="Items stored at this location"></i>
          </label>
          <form>
            <div className="addItem">
              <input type="text" name="sectionName" placeholder="What is in this section?" value={content} onChange={(e) => setContent(e.target.value)} />
              <button type="submit" onClick={handleAdd} className="addBtn">
                Add item
              </button>
            </div>
          </form>
        </div>
        <div className="section-summary">
          <h3>Section Summary</h3>
          <hr />
          <p>Section name:</p>
          <p>{sectionName}</p>
          <hr />
          <div>
            <p>Section items:</p>
            <ul className="itemList">
              {contentList.map((listItem) => (
                <li key={listItem.id}>
                  {listItem.content}
                  <button onClick={() => handleDelete(listItem.id, listItem.content)} className="deleteItem">
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <hr />
        </div>
        <p className="info">
          <i className="fa-solid fa-circle-info"></i> You can always add more items after the section has been created
        </p>
        <Button content="Add Section To Storage" function={saveSection} />
      </div>
    </div>
  );
};
