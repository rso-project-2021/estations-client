import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Link from "next/link";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Cookies from 'cookies'

const reservations = ({ reservations }) => {
  return (
    <>
      <Container maxWidth="lg">
        <Box m={3} pt={3}>

          <Grid container spacing={2} alignItems="center" justifyContent="center" direction="column">
            <Grid item xs={12}>
              <h1 style={{ textAlign: 'center' }}>Reservations</h1>
            </Grid>
          </Grid>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Station ID</TableCell>
                  <TableCell align="right">ID</TableCell>
                  <TableCell align="right">Start</TableCell>
                  <TableCell align="right">End</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations && reservations.map((reservation) => (
                  <TableRow
                    key={reservation.station_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{reservation.station_id}</TableCell>
                    <TableCell align="right">{reservation.reservation_id}</TableCell>
                    <TableCell align="right">{reservation.start}</TableCell>
                    <TableCell align="right">{reservation.end}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {

  // get user id from cookies
  const cookies = new Cookies(context.req, context.res)
  const userID = cookies.get('user_id')

  const url = process.env.NEXT_PUBLIC_AWS_API + "/reservation-service/v1/reservations/user/" + userID;
  const res = await fetch(url);
  const reservations = await res.json()

  return {
    props: { reservations },
  }
}


export default reservations;
