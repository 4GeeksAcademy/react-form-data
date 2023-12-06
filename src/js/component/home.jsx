import React, { useState, useRef } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  // We make a ref that will point to the file input element.
  const fileInput = useRef(null);
  const [resp, setResp] = useState({});

  const sendFormData = async (e) => {
    // We need to prevent the form from reloading the page.
    // Because I was too lazy to use onClick on the button.
    e.preventDefault();

    // We make a new FormData() object to store the form data.
    const form = new FormData();

    // Then we append the files from the input element.
    form.append("file", fileInput.current.files[0]);

    // Then we can send the files along with the form data.
    const r = await fetch("https://httpbin.org/anything", {
      method: "POST",
      Accept: "application/json",
      // "Content-Type": "multipart/form-data",
      body: form,
    });

    setResp(await r.json());
  };

  return (
    <div className="container">
      {/* This onSubmit just handles the interaction. */}
      <form onSubmit={sendFormData}>
        {/* The ref we made earlier points to this input with the ref prop: */}
        <input type="file" name="media" accept="image/*" ref={fileInput} />
        <button className="btn btn-primary">Submit</button>
      </form>
      <code>{JSON.stringify(resp)}</code>
    </div>
  );
};

export default Home;
