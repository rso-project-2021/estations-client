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

function handleClick() {
  console.log("hendlam clickanje");
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
              <Button variant="outlined" onClick={() => handleClick()}>Quick reserve</Button>
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
                  <TableRow
                    key={station.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{station.name}</TableCell>
                    <TableCell align="right">{station.station_id}</TableCell>
                    <TableCell align="right">{station.provider}</TableCell>
                    <TableCell align="right">{station.lat}</TableCell>
                    <TableCell align="right">{station.lng}</TableCell>
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

export async function getStaticProps(context) {
  const url = process.env.NEXT_PUBLIC_AWS_API + "/station-service/v1/stations?offset=0&limit=10";
  const res = await fetch(url);
  const stations = await res.json()

  return {
    props: { stations },
  }
}

export default Home;
