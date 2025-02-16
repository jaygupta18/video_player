// import { useContext, useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Input,
//   Select,
//   Text,
//   Textarea,
// } from "@chakra-ui/react";
// import { initDetails } from "../Components/InitDetails";
// import { uploadYourVideo } from "../API/fetchData";
// import { useNavigate } from "react-router-dom";
// import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider";

// export default function UploadData() {
//   const [details, setDetails] = useState({ ...initDetails });
//   const [res, setRes] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const { email } = useContext(AuthenticationContext);

//   const navigate = useNavigate();

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setDetails({ ...details, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     let response = await uploadYourVideo({ ...details, email: email });
//     setRes(response);
//     setSubmitted(true);
//   };

//   useEffect(() => {
//     if (submitted)
//       setTimeout(() => {
//         setSubmitted(false);
//       }, 1500);
//   }, [submitted]);

//   return (
//     <div className="UploadVideo">
//       <form onSubmit={handleSubmit}>
//         <Box className="Form-Container">
//           {/* Email Input */}
//           <Box>
//             <Text as="label" htmlFor="email" fontWeight="bold">
//               Email Address
//             </Text>
//             <Input
//               onChange={handleChange}
//               name="title"
//               type="text"
//               placeholder="Title"
//               required
//             />
//           </Box>

//           {/* Thumbnail URL */}
//           <Box>
//             <Text as="label" htmlFor="thumbnailUrl" fontWeight="bold">
//               Thumbnail URL
//             </Text>
//             <Input
//               onChange={handleChange}
//               name="thumbnailUrl"
//               type="text"
//               placeholder="Thumbnail URL"
//               required
//             />
//           </Box>

//           {/* Author */}
//           <Box>
//             <Text as="label" htmlFor="author" fontWeight="bold">
//               Author
//             </Text>
//             <Input
//               onChange={handleChange}
//               name="author"
//               type="text"
//               placeholder="Author"
//               required
//             />
//           </Box>

//           {/* Description */}
//           <Box>
//             <Text as="label" htmlFor="description" fontWeight="bold">
//               Description
//             </Text>
//             <Textarea
//               onChange={handleChange}
//               name="description"
//               type="text"
//               placeholder="Description"
//               required
//             />
//           </Box>

//           {/* Video URL */}
//           <Box>
//             <Text as="label" htmlFor="videoUrl" fontWeight="bold">
//               Video URL
//             </Text>
//             <Input
//               onChange={handleChange}
//               name="videoUrl"
//               type="text"
//               placeholder="Video URL"
//               required
//             />
//           </Box>

//           {/* Is Live */}
//           <Box>
//             <Text as="label" htmlFor="isLive" fontWeight="bold">
//               Is Live
//             </Text>
//             <Select onChange={handleChange} name="isLive">
//               <option value={false}>No</option>
//               <option value={true}>Yes</option>
//             </Select>
//           </Box>
//         </Box>

//         <Button onClick={handleSubmit} colorScheme="green">
//           UPLOAD
//         </Button>

//         <Text className="error-text">{submitted ? res.data.message : null}</Text>
//       </form>
//     </div>
//   );
// }
import React, { useContext, useState, useEffect } from "react";
import { uploadYourVideo } from "../API/fetchData";
import "../style/Upload.css";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider";

const initialDetails = {
  title: "",
  thumbnailUrl: "",
  author: "",
  description: "",
  videoUrl: "",
  isLive: false,
};

export default function UploadData() {
  const [details, setDetails] = useState({ ...initialDetails });
  const [response, setResponse] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { email } = useContext(AuthenticationContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await uploadYourVideo({ ...details, email: email });
    setResponse(response);
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        setSubmitted(false);
      }, 1500);
    }
  }, [submitted]);

  return (
    <div className="upload-data">
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <label htmlFor="email">
            <b>Email Address</b>
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            readOnly
          />

          {/* Title Input */}
          <label htmlFor="title">
            <b>Title</b>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter video title"
            value={details.title}
            onChange={handleChange}
            required
          />

          {/* Thumbnail URL Input */}
          <label htmlFor="thumbnailUrl">
            <b>Thumbnail URL</b>
          </label>
          <input
            type="text"
            id="thumbnailUrl"
            name="thumbnailUrl"
            placeholder="Enter thumbnail URL"
            value={details.thumbnailUrl}
            onChange={handleChange}
            required
          />

          {/* Author Input */}
          <label htmlFor="author">
            <b>Author</b>
          </label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Enter author name"
            value={details.author}
            onChange={handleChange}
            required
          />

          {/* Description Input */}
          <label htmlFor="description">
            <b>Description</b>
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter video description"
            value={details.description}
            onChange={handleChange}
            required
          />

          {/* Video URL Input */}
          <label htmlFor="videoUrl">
            <b>Video URL</b>
          </label>
          <input
            type="text"
            id="videoUrl"
            name="videoUrl"
            placeholder="Enter video URL"
            value={details.videoUrl}
            onChange={handleChange}
            required
          />

          {/* Is Live Select */}
          <label htmlFor="isLive">
            <b>Is Live</b>
          </label>
          <select id="isLive" name="isLive" value={details.isLive} onChange={handleChange}>
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>

        <button type="submit" className="upload-btn">
          UPLOAD
        </button>

        <p className="error-text">{submitted ? response.data?.message : null}</p>
      </form>
    </div>
  );
}
