import { useSession } from "next-auth/client";
import React, { useState } from "react";
import Image from "next/image";
import { ThumbUpIcon, CameraIcon } from "@heroicons/react/solid";
import { useRef } from "react";
import { db, storage } from "../firebase";
import firebase from "firebase";

function InputBox() {
  const inputRef = useRef(null);
  const filepickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const [session, loading] = useSession();
  const sendPost = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;

    db.collection("posts")
      .add({
        message: inputRef.current.value,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imageToPost, "data_url");

          removeImage();

          uploadTask.on(
            "state_change",
            null,
            (error) => console.error(error),
            () => {
              storage
                .ref("posts")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("posts").doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });

    inputRef.current.value = "";
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div className="mt-2 ml-2 mr-2 rounded-xl shadow-md font-medium text-sm md:text-base text-gray-500 bg-white md:mt-6 md:ml-2 md:mr-5">
      <div className="flex space-x-4 p-6 items-center">
        <Image
          className="rounded-full"
          src={session.user.image}
          width={35}
          height={35}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            ref={inputRef}
            placeholder={`What's on your mind, ${session.user.name}?`}
          />
          <button hidden type="submit" onClick={sendPost}></button>
        </form>
        {/* if there is an image then render out some UI elements */}
      </div>
      {imageToPost && (
        <div
          onClick={removeImage}
          className="flex flex-col filter hover:brightness-110 
            transition duration-150 transform hover:scale-105 cursor-pointer"
        >
          <img
            className="h-32 sm:h-44 object-contain"
            src={imageToPost}
            alt=""
          />
          <p className="text-sm text-red-500 text-center">X</p>
        </div>
      )}
      <div className="flex justify-evenly p-3 border-t">
        <div
          onClick={() => filepickerRef.current.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-7 text-green-500 -mt-1" />
          <p className="text-xs sm:text-sm xl:text-base">Photo</p>
          <input
            ref={filepickerRef}
            onChange={addImageToPost}
            type="file"
            hidden
          />
        </div>
      </div>
    </div>
  );
}

export default InputBox;
