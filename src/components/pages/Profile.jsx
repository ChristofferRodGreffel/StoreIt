import React, { useEffect, useRef, useState } from "react";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import defaultphoto from "../../assets/defaultphoto.svg";
import { storage, useAuth } from "../../firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

export const Profile = () => {
  const [photoURL, setPhotoURL] = useState(defaultphoto);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputFile = useRef(null);
  const navigate = useNavigate();
  const currentUser = useAuth();

  const userLogut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const handleChange = async (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      const fileURL = await uploadImage(e.target.files[0], currentUser, setLoading);
      setPhotoURL(fileURL);
    }
  };

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  const uploadImage = async (file, currentUser, setLoading) => {
    const fileRef = ref(storage, "images/" + currentUser.uid + ".jpg");

    setLoading(true);

    const snapshot = await uploadBytes(fileRef, file);

    updateProfile(currentUser, { photoURL });
    setLoading(false);
    alert("Uploaded file!");
  };

  const openFileSelect = () => {
    inputFile.current.click();
  };

  return (
    <div className="profile">
      <h1>Your Profile</h1>
      <div>
        <div className="profile-picture">{!loading ? <img src={photoURL} alt="profile picture" /> : <h1>LOADING...</h1>}</div>
        <input ref={inputFile} hidden type="file" onChange={handleChange} accept="image/jpg" />
        <button onClick={openFileSelect}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <button onClick={userLogut}>Log Out</button>
    </div>
  );
};
