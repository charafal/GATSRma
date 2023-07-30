import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PolicyIcon from "@mui/icons-material/Policy";
import { Link } from "react-router-dom";
import { CardTravel, DesignServices, FileCopyOutlined, IceSkating, LineAxis, Phone } from "@mui/icons-material";


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
        <ListItemText primary="Beneficiaires" />
      </ListItemButton>
    </Link>
    <Link to="/forfaits" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <PolicyIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="Forfaits" />
      </ListItemButton>
    </Link>
    <Link to="/terminals" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <Phone style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="Terminaux" />
      </ListItemButton>
    </Link>
    <Link to="/lignes" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <LineAxis style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="Lignes" />
      </ListItemButton>
    </Link>
    <Link to="/services" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <DesignServices style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="Services" />
      </ListItemButton>
    </Link>
    <Link to="/factures" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon sx={{color:"white"}}>
          <FileCopyOutlined />
        </ListItemIcon>
        <ListItemText primary="Factures" />
      </ListItemButton>
    </Link>
  </div>
);
