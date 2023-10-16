import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onValue, ref, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../../firebase";
import { toast } from "react-toastify";

export const StoredItems = () => {
  const [sections, setSections] = useState([]);
  const [storageEmpty, setStorageEmpty] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [sectionName, setSectionName] = useState("");
  const [sectionId, setSectionId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    const getUserData = (user) => {
      const userId = user.uid;
      const userSectionsRef = ref(database, `${userId}/`);
      onValue(userSectionsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const sectionsArray = Object.values(data); // Convert the object to an array
          setSections(sectionsArray);
        } else {
          setSections([]); // Set to an empty array if there are no sections
          setStorageEmpty(true);
          navigate("/storage");
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

  const handleClick = () => {
    navigate("/add");
  };

  const handleDelete = (id, name) => {
    setShowDialog(true);
    setSectionName(name);
    setSectionId(id);
  };

  const handleEdit = (id) => {
    if (id) {
      navigate(`/update/${id}`);
    }
  };

  const deleteSection = () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const nodeRef = ref(database, `${userId}/${sectionId}/`);
    setShowDialog(false);

    remove(nodeRef)
      .then(() => {
        console.log("Node deleted successfully");
        toast.success(`${sectionName} deleted`, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
                  <button className="section-btn" onClick={() => handleEdit(section.sectionId)}>
                    Edit <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="section-btn delete" onClick={(e) => handleDelete(section.sectionId, section.sectionName)}>
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
