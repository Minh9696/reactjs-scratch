import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CodeIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Register from '../../features/Auth/components/Register';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle, Close } from '@mui/icons-material';
import Login from '../../features/Auth/components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/Auth/userSlice';
import LoopIcon from '@mui/icons-material/Loop';
import { axiosMerketClient } from '../../api/schoolApi';
import { enqueueSnackbar } from 'notistack';
import StorageKeys from '../../constants/storage-keys';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: '1rem',
    },
    title: {
        flexGrow: 1,
    },
    link: {
        color: 'white',
        textDecoration: 'none'
    },
    closeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        color: 'grey',
        zIndex: 1
    }
})

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register'
}
export default function Header() {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.user.current);
    const isLoggedIn = !! loggedInUser.id;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [mode, setMode] = React.useState(MODE.LOGIN)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleUserClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        const action = logout();
        dispatch(action);
    };

    const handleGetNewAccessToken = async () => {
        const auth =   {
            email: "testemail@gmail.com",
            password: "AdminTest"
        };
        try {
            const client = axiosMerketClient;
            const response = await client.post('/auth/login', JSON.stringify(auth));
            console.log({response_auth: response})
            const accessToken = response?.data?.object?.tokens?.access?.token;
            localStorage.setItem(StorageKeys.TOKEN, accessToken);
        }
        catch (error) {
            enqueueSnackbar(error.message, {variant: 'error'}) 

        }
    };
    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <CodeIcon className={classes.menuButton}/>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/products" className={classes.link}>Shop</Link >
                </Typography>

                <NavLink to="/products" className={classes.link}>
                    <Button color="inherit">Shop</Button>
                </NavLink>

                <Button color="inherit" onClick={handleGetNewAccessToken}>
                    <LoopIcon/>
                    <Typography>Get Token</Typography>
                </Button>

                <NavLink to="/schools" className={classes.link}>
                    <Button color="inherit">Schools</Button>
                </NavLink>

                <NavLink to="/todo" className={classes.link}>
                    <Button color="inherit">Todos</Button>
                </NavLink>

                <NavLink to="/clock" className={classes.link}>
                    <Button color="inherit">Clock</Button>
                </NavLink>

                <NavLink to="/counter" className={classes.link}>
                    <Button color="inherit">Counter</Button>
                </NavLink>
                {!isLoggedIn && (
                    <Button color="inherit" onClick={handleClickOpen}>Login</Button>
                )}
                {isLoggedIn && (
                    <IconButton color="inherit" onClick={handleUserClick}>
                        <AccountCircle/>
                    </IconButton>
                )}
            </Toolbar>
        </AppBar>
        <Menu
            keepMounted
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            getContentAnchorEl={undefined}
        >
          <MenuItem>My account</MenuItem>
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>

        <Dialog 
            disableEscapeKeyDown
            open={open} 
            onClose={handleClose}
            aria-labelledby="form-dialog-title">
            
            <IconButton onClick={handleClose} className={classes.closeButton}>
                <Close/>
            </IconButton>

            <DialogContent>
                {mode === MODE.REGISTER && (
                    <>

                        <Register closeDialog={handleClose}/>
                        <Box textAlign="center">
                            <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                            Already have an account. Login here!
                            </Button>
                        </Box>
                    </>
                )}

                {mode === MODE.LOGIN && (
                    <>
                        <Login closeDialog={handleClose}/>

                        <Box textAlign="center">
                            <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                            Don't have an account. Register here!
                            </Button>
                        </Box>
                    </>
                )}
            </DialogContent>

      </Dialog>
    </Box>
    );
}
