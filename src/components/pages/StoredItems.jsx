import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

export const StoredItems = () => {
  const [sections, setSections] = useState([]);
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
          navigate("/add");
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

  const handleDelete = () => {};

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
              <button className="section-btn delete" onClick={handleDelete}>
                Delete <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
