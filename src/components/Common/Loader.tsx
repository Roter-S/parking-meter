import { Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <Box
        sx={{
          mx: "auto",
          my: "auto",
        }}
      >
        <i className="fas fa-circle-notch fa-spin text-primary fa-3x"></i>
      </Box>
    </Box>
  );
};

export default Loader;
