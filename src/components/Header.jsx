import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <AppBar position="static" sx={{ mb: "2rem" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h4">Progresso</Typography>
        <div>
          <Button color="inherit" component={Link} to="/home">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/stat">
            Input Stats
          </Button>
          <Button color="inherit" component={Link} to="/logout">
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
