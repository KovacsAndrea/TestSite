import React from "react";
import { NavbarComponent } from "../components/navBar/navBar";
import { SideMenu } from "../components/sideMenu/sideMenu";
import { useGlobalState } from "../global/globalState";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const ProfilePage: React.FC = () => {
  const { user } = useGlobalState();

  return (
    <>
      <NavbarComponent />
      <div className="flex-page-layout">
        <div className="twenty-panel">
          <SideMenu />
        </div>

        <div className="eighty-panel" style={{ padding: "24px" }}>
          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="profile-content"
              id="profile-header"
            >
              <Typography sx={{ fontWeight: 600, color: "#054d40" }}>Debug Menu</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Typography variant="body2"><strong>UID:</strong> {user?.uid}</Typography>
                <Typography variant="body2"><strong>Email:</strong> {user?.email}</Typography>
                <Typography variant="body2"><strong>Username:</strong> {user?.username}</Typography>
                <Typography variant="body2"><strong>Password:</strong> {user?.password}</Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
};
