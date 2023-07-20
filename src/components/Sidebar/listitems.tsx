import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PolicyIcon from "@mui/icons-material/Policy";
import { Link } from "react-router-dom";
import { Phone } from "@mui/icons-material";
export const mainListItems = (
  <div>
    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary={"Dashboard"} />
      </ListItemButton>
    </Link>

    <Link to="/beneficiaires" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <PolicyIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="Consulter Beneficiaires" />
      </ListItemButton>
    </Link>
    <Link to="/forfaits" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <PolicyIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="Consulter Forfaits" />
      </ListItemButton>
    </Link>
    <Link to="/terminals" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <Phone style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="Consulter Terminaux" />
      </ListItemButton>
    </Link>
  </div>
);
