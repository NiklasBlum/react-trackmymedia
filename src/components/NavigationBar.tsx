import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../services/firebase/useAuth';
import { useMediaStore } from '../store';
import { Avatar } from '@mui/material';
export default function ButtonAppBar() {

    const { user } = useMediaStore();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Media App
                </Typography>
                <Button onClick={logout} color="inherit">Logout</Button>
                <Avatar src={user?.photoURL} />
            </Toolbar>
        </AppBar>
    );
}