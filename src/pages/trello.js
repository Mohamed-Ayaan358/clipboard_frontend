import React from "react";
import ReactDOM from "react-dom";
import Board from "react-trello";
import Box from "@mui/material/Box";
import "./trello.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, gql, useMutation } from "@apollo/client";
const getTrello = gql`
  query Query($authId: String!) {
    getTrello(authID: $authId)
  }
`;

function Trello() {
  let testdata;
  const [datastate, setData] = React.useState({});
  let setdat = async (data) => {
    let obj = await JSON.parse(data);
    console.log(obj);
    await setData(obj);
  };
  const { loading, data, error } = useQuery(getTrello, {
    variables: {
      authId: useAuth0().user.sub,
    },
    fetchPolicy: "no-cache",
    onCompleted: async (data) => {
      console.log(JSON.stringify(JSON.parse(data.getTrello)));
      await setdat(data.getTrello);
      console.log(datastate);
      console.log(JSON.parse(data.getTrello));
    },
  });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <Box class="trellobox">
        <Board
          data={datastate}
          class="trello"
          cardStyle={{
            backgroundColor: "white",
            width: "280px",
            borderRadius: "15px",
            border: "2px solid #E42346",
          }}
          laneStyle={{
            backgroundColor: "#0D0C1D",
            color: "#E42346",
            borderRadius: "20px",
          }}
          style={{ backgroundColor: "white", color: "#E42346" }}
          editLaneTitle
          draggable
          editable
          canAddLanes
          addLaneTitle="Add Column"
          addCardTitle="Add Item"
        />
      </Box>
    </div>
  );
}
export default Trello;
