import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../global/globalState";

export const NavbarComponent: React.FC = () => {
  const navigate = useNavigate();
  const { user, logoutUser, faveBooks, cartBooks } = useGlobalState();


  const favoriteCount = faveBooks.length;
  const cartCount = cartBooks.reduce((total, item) => total + item.quantity, 0);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    navigate("/login");
    logoutUser();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#a8e6cf",
        boxShadow: "none",
        paddingX: 2,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Logo + App Name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/home")}
        >
          <Box
            component="img"
            src="/TiconBlack.png"
            alt="Logo"
            sx={{ width: 32, height: 32 }}
          />
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: "#ffffff", m: 0, p: 0 }}
          >
            TestSite
          </Typography>
        </div>

        {/* Right: Icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>

          {/* Home */}
          <IconButton onClick={() => navigate("/home")}>
            <HomeIcon sx={{ color: "#054d40" }} />
          </IconButton>

          {/* Favorite */}
          <IconButton onClick={() => navigate("/favorites")}>
          {favoriteCount > 0 ? (
            <Badge badgeContent={favoriteCount} color="secondary">
              <FavoriteIcon sx={{ color: "#054d40" }} />
            </Badge>
          ) : (
            <FavoriteIcon sx={{ color: "#054d40" }} />
          )}
        </IconButton>

          {/* Cart */}
          <IconButton onClick={() => navigate("/cart")}>
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon sx={{ color: "#054d40" }} />
            </Badge>
          </IconButton>

          {/* User Avatar */}
          {user ? (
            <>
              <IconButton onClick={handleAvatarClick}>
                <Avatar sx={{ bgcolor: "#9c27b0", width: 32, height: 32 }}>
                  {user.username.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                disableScrollLock
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/profile");
                  }}
                >
                  Profile
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton onClick={() => navigate("/login")}>
              <Avatar sx={{ bgcolor: "#79d9b2", width: 32, height: 32 }}>
                U
              </Avatar>
            </IconButton>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
