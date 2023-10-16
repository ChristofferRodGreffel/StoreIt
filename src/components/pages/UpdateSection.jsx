import { getAuth, onAuthStateChanged } from "firebase/auth";
import { child, getDatabase, onValue, push, ref, set, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { database } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "../Button";

export const UpdateSection = () => {
  const [sections, setSections] = useState({});
  const [dataPresent, setDataPresent] = useState(false);
  const [content, setContent] = useState("");
  const [contentList, setContentList] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const { id } = useParams();

  useEffect(() => {
    const getUserData = (user) => {
      const userId = user.uid;
      const userSectionsRef = ref(database, `${userId}/${id}`);
      onValue(userSectionsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setDataPresent(true);
          setSections(data);
          setContentList(data.content);
        } else {
          setSections({}); // Set to an empty array if there are no sections
          setDataPresent(false);
        }
      });
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserData(user);
      } else {
        navigate("/signin");
      }
    });

    // Clean up the auth state listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [database]);

  // Update the current section with the new content
  const updateItems = async () => {
    const userId = auth.currentUser.uid;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates[`/${userId}/${id}/content`] = contentList;

    return update(ref(database), updates)
      .then(() => {
        toast.success(`${sections.sectionName} was updated!`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Add new item to list
  const handleAdd = (e) => {
    e.preventDefault();
    const newItem = {
      id: uuidv4(),
      content: content,
    };

    setContentList([...contentList, newItem]);

    toast.dismiss();
    toast.success(`[${newItem.content}] was added to ${sections.sectionName}`, {
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

  // Remove item from list
  const handleDelete = (id, content) => {
    const newList = contentList.filter((item) => item.id !== id);
    setContentList(newList);

    toast.success(`[${content}] was removed from ${sections.sectionName}`, {
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
    <>
      {dataPresent && (
        <div className="edit-section">
          <div>
            <h1>Edit section</h1>
            <div>
              <label>
                Add more items <i className="fa-solid fa-circle-question" content="Here you can add additional items to the section"></i>
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
            <div className="edit-summary">
              <h2>{sections.sectionName}</h2>
              <hr />
              <div>
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
          </div>
          <div className="edit-buttons">
            <Button content="Confirm changes" function={updateItems} />
            <Link to="/storage">
              <i className="fa-solid fa-arrow-left"></i> Back to storage
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
