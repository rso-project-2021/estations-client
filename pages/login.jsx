import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Link from "next/link"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const login = () => {
  return (
    <div>
      <Container maxWidth="lg">
        <Box m={3} pt={3}>
          <Item>
            <h1 style={{ textAlign: 'center' }}>Login page</h1>
            <Grid container spacing={2} alignItems="center" justifyContent="center" direction="column">
              <Grid item xs={12}>
                <TextField id="outlined-basic" label="username" variant="standard" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="standard-password-input" label="password" type="password" variant="standard" />
              </Grid>
              <Grid item xs={12}>
                <Link href="/">
                  <Button variant="outlined">Login</Button>
                </Link>
              </Grid>
            </Grid>
          </Item>
        </Box>
      </Container>
    </div>
  )
}

export default login;