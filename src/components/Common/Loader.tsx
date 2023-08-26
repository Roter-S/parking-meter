import { Box } from "@mui/material";
import { IconContext } from "react-icons";
import { FaSpinner } from "react-icons/fa6";

const Loader = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        background: "030D22",
      }}
    >
      <Box
        sx={{
          mx: "auto",
          my: "auto",
        }}
      >
        <IconContext.Provider
          value={{ color: "blue", className: "global-class-name", size: "5em" }}
        >
          <FaSpinner />
        </IconContext.Provider>
      </Box>
    </Box>
  );
};

export default Loader;
