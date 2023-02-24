import BiotechIcon from '@mui/icons-material/Biotech';
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { styled } from "@mui/material/styles";
import AddPatientForm from "../../components/AddPatientForm";
import AddTestForm from '../../components/AddTestForm';

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
const AddTest = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      <Main open={open}>
        <AddTestForm />
      </Main>
    </>
  );
};

export default AddTest;
