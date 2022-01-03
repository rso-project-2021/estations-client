import { useRouter } from "next/router";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Router from 'next/router'
import cookie from 'cookie-cutter'
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Rating from '@mui/material/Rating';
import * as React from 'react';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
}));

const postReview = async (event, id) => {
    event.preventDefault()

    const stationID = id;
    const userID = parseInt(cookie.get('user_id'));
    const rating = parseInt(event.target.rating.value);
    const comment = event.target.comment.value;

    console.log(JSON.stringify({
        station_id: stationID,
        user_id: userID,
        rating: rating,
        comment: comment,
    }));

    const url = process.env.NEXT_PUBLIC_AWS_API + "/rating-service/v1/ratings";
    const res = await fetch(url, {
        body: JSON.stringify({
            station_id: stationID,
            user_id: userID,
            rating: rating,
            comment: comment,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST'
    })

    if (res.status == 200) {

        const result = await res.json();
        console.log(result);

        if (typeof window !== "undefined") {
            cookie.set('user_id', result.user_id);
            Router.push('/');
        }

    } else {
        console.log(res.status);
    }
}

const reserveStation = async (id) => {

    const userID = parseInt(cookie.get('user_id'));
    const start = moment().format();
    const end = moment().add(30, 'minutes').format();

    console.log(JSON.stringify({
        station_id: id,
        user_id: userID,
        start: start,
        end: end,
    }))

    const url = process.env.NEXT_PUBLIC_AWS_API + "/reservation-service/v1/reservations";
    const res = await fetch(url, {
        body: JSON.stringify({
            station_id: id,
            user_id: userID,
            start: start,
            end: end,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST'
    })
}

const station = ({ station, ratings }) => {

    const router = useRouter();
    const { id } = router.query;
    const [value, setValue] = React.useState(3);

    return (
        <div>
            <Container maxWidth="lg">
                <Box m={3} pt={3}>
                    <Item>
                        <h1 style={{ textAlign: 'center' }}>Station {station.name}</h1>
                        <Grid container spacing={2} alignItems="center" justifyContent="center" direction="column">
                            <Grid item xs={12}>
                                <p> ID: {station.station_id}</p>
                            </Grid>
                            <Grid item xs={12}>
                                <p> Latitude: {station.lat}</p>
                            </Grid>
                            <Grid item xs={12}>
                                <p> Longitude: {station.lng}</p>
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={() => reserveStation(station.station_id)} variant="outlined">Reserve</Button>
                            </Grid>
                        </Grid>
                    </Item>
                </Box>
            </Container>

            <Container maxWidth="lg">
                <Box m={3} pt={3}>
                    <Item>
                        <h3 style={{ textAlign: 'center' }}>Leave a review</h3>
                        <form onSubmit={(e) => postReview(e, parseInt(id))}>
                            <Grid container spacing={2} alignItems="center" justifyContent="center" direction="column">
                                <Grid item xs={12}>
                                    <Rating
                                        id="rating"
                                        label="rating"
                                        name="rating"
                                        value={value}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="comment" label="comment" variant="standard" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type='submit' variant="outlined">Post review</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Item>
                </Box>
            </Container>

            <Container maxWidth="lg">
                <Box m={3} pt={3}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="right">Station ID</TableCell>
                                    <TableCell align="right">User ID</TableCell>
                                    <TableCell align="right">Rating</TableCell>
                                    <TableCell align="right">Comment</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ratings && ratings.map((rating) => (
                                    <TableRow
                                        key={rating.rating_id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{rating.rating_id}</TableCell>
                                        <TableCell align="right">{rating.station_id}</TableCell>
                                        <TableCell align="right">{rating.user_id}</TableCell>
                                        <TableCell align="right">{rating.rating}</TableCell>
                                        <TableCell align="right">{rating.comment}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </div>
    );
}

export async function getServerSideProps(context) {

    const { id } = context.query;

    // station data
    const url1 = process.env.NEXT_PUBLIC_AWS_API + "/station-service/v1/stations/" + id;
    const res1 = await fetch(url1);
    const station = await res1.json()

    // raing data
    const url2 = process.env.NEXT_PUBLIC_AWS_API + "/rating-service/v1/ratings/station/" + id;
    const res2 = await fetch(url2);
    const ratings = await res2.json()

    return {
        props: { station, ratings },
    }
}

export default station;
