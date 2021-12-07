import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";

const FilesQuery = gql`
  query GetFiles($authID: String!) {
    getFiles(authID: $authID) {
      id
      username
      authID
      files
    }
  }
`;

const AddFile = gql`
mutation AddFile($username: String!, $authId: String!, $files: fileInput) {
  AddFile(username: $username, authID: $authId, files: $files) {
    id
    username
    authID
    files {
      name
      size
      type
      lastModified
    }
  }
}
`;

async function uploadFile(username, authID, files, addFile) {
  await AddFile({
    variables: {
      username: username,
      authID: authID,
    },
  });
}




// class FileInput extends React.Component {
function FileInput() {

  let [file, setFile] = useState({});


  let [globdata, updateGlob] = useState([]);
  let [len, setLen] = useState(0);
  const { user } = useAuth0();
  // eslint-disable-next-line no-unused-vars
  // const { loading, data, error } = useQuery(FilesQuery, {
  //   variables: {
  //     authID: user.sub
  //   },
  //   fetchPolicy: "no-cache",
  //   onCompleted: async (data) => {
  //     await updateGlob(data.getFiles);
  //     await setLen(data.getFiles.length);
  //     if (data.getFiles.length === 0) setLen(0);
  //     else setLen(data.getFiles.length);
  //   },
  //   onError: err => console.log(err)
  // });
  async function updatelist(data) {
    updateGlob(data);
    setLen(globdata.length + 1);
  }

  const [addFile, { dat }] = useMutation(AddFile, {
    onCompleted: async (dat) => {
      let newglob = [...globdata];
      await newglob.push(dat.AddTodo);
      await updatelist(newglob);
    },
  });

  const handleFileChange = event => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = (e) => {

    if (!file || !file.name) {
      return alert("Please fill all the fields");
    } else {
      // const variables = {
      //   authID: user.sub.toString(),
      //   username: user.name.toString(),
      //   file: {
      //     name: file.name,
      //     size: file.size,
      //     type: file.type,
      //     lastModified: file.lastModifiedDate
      //   }
      // }
      addFile({
        variables: {
          authID: user.sub.toString(),
          username: user.name.toString(),
          file: {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModifiedDate
          }
        },
      });
      e.preventDefault();
    }

    console.log(file);
  };

  return (
    <div>
      <input class="btn btn-dark bg-black" type="file" onChange={handleFileChange} />
      &nbsp;
      <button class="btn btn-dark bg-black" style={{ color: "#E42346" }} onClick={handleFileUpload} >
        Upload!
      </button>
    </div>
  );

}

function File(props) {
  return (
    <div
      class="card text-center clean-card shadow mx-3 my-3"
      style={{
        textDecoration: "none",
        borderRadius: "30px",
        minWidth: "200px"
      }}
    >
      <div class="card-body info">
        <h4 class="card-title" style={{ color: "#E42346" }}>
          {props.name}
        </h4>
        <p class="card-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
}

function Folders() {
  return (
    <div style={{ paddingLeft: "100px" }} >
      <br />
      <h1 >Files</h1>
      <br />

      <div
        class="card text-center clean-card shadow my-3 g-0"
        style={{ borderRadius: "30px", width: "99%", height: "60vh", minWidth: "300px" }}
      >

        <div class="card shadow mx-4 my-2 "
          style={{
            borderRadius: "15px",
            padding: "10px",
            width: "450px",
            minWidth: "100px"
          }}
        >
          <FileInput />
        </div>

      </div>
    </div>
  );
}

export default Folders;

