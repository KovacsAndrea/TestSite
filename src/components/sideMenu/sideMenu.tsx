import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import BuildIcon from "@mui/icons-material/Build";
import ReplayIcon from "@mui/icons-material/Replay";
import VerifiedIcon from "@mui/icons-material/Verified";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SecurityIcon from "@mui/icons-material/Security";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useGlobalState } from "../../global/globalState";
import "./sideMenuStyling.css";

export const SideMenu: React.FC = () => {
  const { user } = useGlobalState();

  return (
    <div className="favorites-sidebar">

      {/* Account Banner */}
      <div className="account-banner">
        <div className="account-row">
            <Avatar className="account-avatar">
            {user?.username.charAt(0).toUpperCase()}
            </Avatar>

            <Typography className="account-username">
            {user?.username}
            </Typography>
        </div>
        </div>

      {/* Quick Actions */}
      <div className="quick-actions">

        <div className="quick-item">
        <div className="quick-circle">
            <ShoppingBagIcon />
        </div>
        <span className="quick-label">Comenzi</span>
        </div>

        <div className="quick-item">
        <div className="quick-circle">
            <LocalOfferIcon />
        </div>
        <span className="quick-label">Vouchere</span>
        </div>

        <div className="quick-item">
        <div className="quick-circle">
            <AccountBalanceWalletIcon />
        </div>
        <span className="quick-label">My Wallet</span>
        </div>

        <div className="quick-item">
        <div className="quick-circle">
            <SupportAgentIcon />
        </div>
        <span className="quick-label">Support</span>
        </div>

      </div>

      <Divider className="sidebar-divider" />

      {/* Detailed Menu */}
      <div className="detailed-menu">

        <div className="menu-item">
          <div className="menu-left">
            <CreditCardIcon className="menu-icon" />
            <span>Cardurile mele</span>
          </div>
          <ChevronRightIcon className="menu-arrow" />
        </div>

        <div className="menu-item">
          <div className="menu-left">
            <BuildIcon className="menu-icon" />
            <span>Service</span>
          </div>
          <ChevronRightIcon className="menu-arrow" />
        </div>

        <div className="menu-item">
          <div className="menu-left">
            <ReplayIcon className="menu-icon" />
            <span>Retururile mele</span>
          </div>
          <ChevronRightIcon className="menu-arrow" />
        </div>

        <div className="menu-item">
          <div className="menu-left">
            <VerifiedIcon className="menu-icon" />
            <span>Garantiile mele</span>
          </div>
          <ChevronRightIcon className="menu-arrow" />
        </div>

        <div className="menu-item">
          <div className="menu-left">
            <RateReviewIcon className="menu-icon" />
            <span>Review-urile mele</span>
          </div>
          <ChevronRightIcon className="menu-arrow" />
        </div>

        <div className="menu-item">
          <div className="menu-left">
            <LocationOnIcon className="menu-icon" />
            <span>Adrese de livrare</span>
          </div>
          <ChevronRightIcon className="menu-arrow" />
        </div>

        <div className="menu-item">
          <div className="menu-left">
            <ReceiptLongIcon className="menu-icon" />
            <span>Date facturare</span>
          </div>
          <ChevronRightIcon className="menu-arrow" />
        </div>

        <div className="menu-item">
          <div className="menu-left">
            <SecurityIcon className="menu-icon" />
            <span>Setari siguranta</span>
          </div>
          <ChevronRightIcon className="menu-arrow" />
        </div>

      </div>
    </div>
  );
};
