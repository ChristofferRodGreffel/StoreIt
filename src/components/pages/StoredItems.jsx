import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

export const StoredItems = () => {
  const [sections, setSections] = useState([]);
  const [storageEmpty, setStorageEmpty] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [sectionId, setSectionId] = useState("");

  const db = getDatabase();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    const getUserData = (user) => {
      const userId = user.uid;
      const userSectionsRef = ref(db, `${userId}/`);
      onValue(userSectionsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const sectionsArray = Object.values(data); // Convert the object to an array
          setSections(sectionsArray);
        } else {
          setSections([]); // Set to an empty array if there are no sections
          setStorageEmpty(true);
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
  }, [db]);

  const handleClick = () => {
    navigate("/add");
  };

  const handleDelete = (id) => {
    setShowDialog(true);
    setSectionId(id);
  };

  const deleteSection = () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const nodeRef = ref(db, `${userId}/${sectionId}/`);
    setShowDialog(false);

    remove(nodeRef)
      .then(() => {
        console.log("Node deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting node:", error);
      });
  };

  const removeDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className="user-sections">
      <h1>Storage Overview</h1>
      <button onClick={handleClick} className="add-section-btn">
        Add section <i className="fa-solid fa-plus"></i>
      </button>
      {/* <form>
        <input type="text" placeholder="Search for item" />
        <input type="submit" value="Search" />
      </form>
      <form>
        <select placeholder="Section">
          <option value="">Section 1</option>
          <option value="">Section 2</option>
          <option value="">Section 3</option>
          <option value="">Section 4</option>
          <option value="">Section 5</option>
        </select>
      </form> */}
      <div className="all-sections">
        {!storageEmpty ? (
          <>
            {sections.map((section, key) => (
              <div key={key} className="section">
                <h2>{section.sectionName}</h2>
                <div>
                  <ul>
                    {section.content.map((item, key) => {
                      return <li key={key}>{item.content}</li>;
                    })}
                  </ul>
                </div>
                <div className="buttons">
                  <button className="section-btn">
                    Edit <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    className="section-btn delete"
                    id={section.sectionId}
                    onClick={(e) => handleDelete(e.target.id)}
                  >
                    Delete <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="no-sections">
            Ohh noo... Everything is a mess...
            <br />
            <br />
            Add a new section to start organizing!
          </p>
        )}
      </div>
      {showDialog && (
        <div className="delete-confirm">
          <h2>Are you sure you want to delete this section?</h2>
          <div>
            <button onClick={deleteSection}>Yes</button>
            <button onClick={removeDialog}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};
