import React, { useEffect, useState } from "react";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { v4 as uuidv4 } from "uuid";

export const AddSection = () => {
  // const [sections, setSections] = useState([]);
  const [sectionName, setSectionName] = useState("");
  const [content, setContent] = useState("");
  const [contentList, setContentList] = useState([]);

  const db = getDatabase();
  const navigate = useNavigate();

  const saveSection = (e) => {
    e.preventDefault();
    createNewSection(sectionName, content);
    setHasSections(true);
  };

  const createNewSection = () => {
    // Create a new post reference with an auto-generated id
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const postListRef = ref(db, `${userId}`);
    const newPostRef = push(postListRef);
    set(newPostRef, {
      sectionName: sectionName,
      content: [...contentList],
    });
  };

  const handleAdd = () => {
    const newItem = {
      id: uuidv4(),
      content: content,
    };

    setContentList([...contentList, newItem]);
    setContent("");
  };

  const handleDelete = (id) => {
    const newList = contentList.filter((item) => item.id !== id);
    setContentList(newList);
  };

  return (
    <div className="create-new-section">
      <h1>Create new section</h1>
      <form onSubmit={saveSection}>
        <div>
          <label htmlFor="sectionName">
            Section name <i className="fa-solid fa-circle-question" content="The name of your storage location"></i>
          </label>
          <input type="text" name="sectionName" placeholder="What is the section name?" value={sectionName} onChange={(e) => setSectionName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="sectionName">
            What are you storing? <i className="fa-solid fa-circle-question" content="What is stored at this location?"></i>
          </label>
          <div className="addItem">
            <input type="text" name="sectionName" placeholder="What is in this section?" value={content} onChange={(e) => setContent(e.target.value)} />
            <button onClick={handleAdd} className="addBtn">
              Add item
            </button>
          </div>
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
                  <button onClick={() => handleDelete(listItem.id)} className="deleteItem">
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <hr />
        </div>
        <Button content="Create Section" />
      </form>
    </div>
  );
};