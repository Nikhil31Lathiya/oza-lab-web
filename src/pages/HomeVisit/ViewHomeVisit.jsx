import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { styled } from "@mui/material/styles";
import viewPendingHomeVisit from "../../components/Actions/ViewPendingHomeVisit";
import ViewHomeVisitRequests from "../../components/BookSlot/ViewHomeVisitRequests";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${240}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);
const ViewHomeVisits = () => {
  const [open, setOpen] = useState(false);
  // const [userHomeVisit, setUserHomeVisit] = useState([]);
  // useEffect(() => {
  //     const getPendingHomeVisit = async () => {
  //         const {data: userHomeVisit} = await viewPendingHomeVisit();
  //         console.log({userHomeVisit});
  //         setUserHomeVisit(userHomeVisit);
  //     }
  //     getPendingHomeVisit();
  // }, [])

  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      <Main open={open}>
        <ViewHomeVisitRequests />
      </Main>
    </>
  );
};

export default ViewHomeVisits;
