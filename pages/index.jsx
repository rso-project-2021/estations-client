import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from "next/link";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import cookie from 'cookie-cutter'

const quickReserve = async event => {
  event.preventDefault()

  const lat = 46.047951;
  const lng = 14.4724488;

  const userID = parseInt(cookie.get('user_id'));
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
    function success(position) {
      console.log('latitude', position.coords.latitude, 'longitude', position.coords.longitude);
      lat = position.coords.latitude;
      lng = position.coords.longitude;
    },
    function error(error_message) {
     console.log('An error has occured while retrieving location: ', error_message)
    });

    console.log(JSON.stringify({
      id: userID,
      lat: lat,
      lng: lng,
    }));
    const url = process.env.NEXT_PUBLIC_AWS_API + "/orchestra-service/v1/quickreserve";
    const res = await fetch(url, {
      body: JSON.stringify({
        id: userID,
        lat: lat,
        lng: lng,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST'
    })
  }
}

function Home({ stations }) {
  return (
    <>
      <Container maxWidth="lg">
        <Box m={3} pt={3}>

          <Grid container spacing={2} alignItems="center" justifyContent="center" direction="column">
            <Grid item xs={12}>
              <h1 style={{ textAlign: 'center' }}>Stations</h1>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" onClick={quickReserve}>Quick reserve</Button>
            </Grid>
          </Grid>


          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Station Name</TableCell>
                  <TableCell align="right">ID</TableCell>
                  <TableCell align="right">Provider</TableCell>
                  <TableCell align="right">Latitude</TableCell>
                  <TableCell align="right">Longitude</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stations && stations.map((station) => (
                  <Link href={"/station/" + station.station_id}>
                    <TableRow
                      key={station.station_id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{station.name}</TableCell>
                      <TableCell align="right">{station.station_id}</TableCell>
                      <TableCell align="right">{station.provider}</TableCell>
                      <TableCell align="right">{station.lat}</TableCell>
                      <TableCell align="right">{station.lng}</TableCell>
                    </TableRow>
                  </Link>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
}

export async function getStaticProps(context) {
  const url = process.env.NEXT_PUBLIC_AWS_API + "/station-service/v1/stations?offset=0&limit=10";
  const res = await fetch(url);
  const stations = await res.json()

  return {
    props: { stations },
  }
}

export default Home;
