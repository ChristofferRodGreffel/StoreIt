import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";

export const UpdateSection = () => {
  const [sections, setSections] = useState([]);
  const db = getDatabase();

  useEffect(() => {
    const getSectionData = (id) => {
      const auth = getAuth();

      const getUserData = (user) => {
        const userId = user.uid;
        const userSectionsRef = ref(db, `${userId}/${id}`);
        onValue(userSectionsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            console.log(data);
            setSections(data);
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
    };
  }, [db]);

  const updateItems = () => {
    const db = getDatabase();
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    console.log(userId);

    const idRef = "-NgKgJPUE-X98vnxg2A3";

    const nodeRef = ref(db, `${userId}/${idRef}/`);

    const newContentArray = ["newItem1", "newItem2", "newItem3"];

    const contentRef = ref(nodeRef, "content");

    // Set the new content array to the database
    set(contentRef, newContentArray)
      .then(() => {
        console.log("Content array updated successfully");
      })
      .catch((error) => {
        console.error("Error updating content array:", error);
      });
  };

  return (
    <>
      <div className="section">
        <h2>{sections.sectionName}</h2>
        <div>
          <ul>
            {sections.content.map((item, key) => {
              return <li key={key}>{item.content}</li>;
            })}
          </ul>
        </div>
        {/* <div className="buttons">
            <button className="section-btn" id={section.sectionId} onClick={(e) => handleEdit(e.target.id)}>
              Edit <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button className="section-btn delete" id={section.sectionId} onClick={(e) => handleDelete(e.target.id)}>
              Delete <i className="fa-solid fa-trash-can"></i>
            </button>
          </div> */}
      </div>
    </>
  );
};
