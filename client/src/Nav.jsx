import { AppBar, Typography, Toolbar, Button } from '@mui/material'
import { Link } from 'react-router-dom';

const Nav = () => {

  const styles = { color: 'inherit', textDecoration: 'inherit' };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant="h4" >
          <Link to='/' style={styles}>
            Quiz Whiz
           </Link>
        </Typography>

        <Typography variant='h6' >
          <Link to='/dashboard' style={styles}>Dashboard</Link>
        </Typography>

        <Typography variant='h6' sx={{ flexGrow: 1 }} >
          {/* need to update this when create page is ready  */}
          <Link to='/' style={styles}>Create</Link>
        </Typography>

        <Button color='inherit' >
          <Link to='/register' style={styles}>Sign Up</Link>
        </Button>
        <Button color='inherit' >
        <Link to='/login' style={styles}>Sign In</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;