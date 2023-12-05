import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

function App() {
  const phones = {
    iphone15: 1,
    iphone15plus: 2,
    iphone15pro: 3,
    iphone15promax: 4,
    iphone14: 5,
    iphone14plus: 6,
    galaxys23: 7,
    galaxys23plus: 8,
    galaxys23ultra: 9,
    galaxys23fe: 10,
    iphone14pro: 11,
    iphone14promax: 12,
    galaxys22: 13,
    galaxys22plus: 14,
    galaxys22ultra: 15,
  };
  const [isClickedLogin, setIsClickedLogin] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [averageReview, setAverageReview] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [phonePrices, setPhonePrices] = useState();
  const [phoneInfo, setPhoneInfo] = useState();
  const [phoneInfoNotEmpty, setPhoneInfoNotEmpty] = useState(false);
  const [phonePricesNotEmpty, setPhonePricesNotEmpty] = useState(false);
  const [usernameInfo, setUsernameInfo] = useState('');
  const [passwordInfo, setPasswordInfo] = useState('');
  const [isDisableRating, setIsDisableRating] = useState(true);
  // const url = `https://phone-app-backend.onrender.com/phone/`;
  const url = `localhost:1121/phone/`;

  const handleLogin = () => {
    if (!isClickedLogin) {
      setIsClickedLogin(true);
      setIsUserLoggedIn(false);
      setIsDisableRating(true);
      document.querySelector('#loginButton').textContent = 'Go Back';
    } else {
      setIsClickedLogin(false);
      document.querySelector('#loginButton').textContent = 'Login';
    }
  };

  const convertString = (search) => {
    search = search.toString().replace(' ', '');
    return search;
  };

  const phoneExists = (str) => {
    str = str.toLowerCase();
    if (str in phones) {
      return phones[str];
    }
  };

  const handleLoginInfo = async (event) => {
    if (
      document.querySelector('#usernameTextField').value !== '' &&
      document.querySelector('#passwordTextField').value !== ''
    ) {
      const userJSON = JSON.stringify({
        username: document.querySelector('#usernameTextField').value,
        password: document.querySelector('#passwordTextField').value,
      });

      const res = await axios.post(
        // 'https://phone-app-backend.onrender.com/login',
        'localhost:1121/login',
        userJSON,
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,OPTIONS',
            'Access-Control-Allow-Headers':
              'Origin, X-Requested-With, Content-Type, Accept',
          },
        }
      );

      console.log(res.data);
      if (res.data.message === 'username not found') {
        document.querySelector('#loginErrorMessage').textContent =
          'Username not found';
      } else if (res.data.message === 'incorrect password') {
        document.querySelector('#loginErrorMessage').textContent =
          'Incorrect Password';
      } else if (res.data.message === 'logged in') {
        setIsClickedLogin(false);
        setIsUserLoggedIn(true);
        setIsDisableRating(false);
        document.querySelector('#loginButton').textContent = 'Logout';
        document.querySelector('#loginErrorMessage').textContent = '';
        // document.querySelector('#usernameTextField').textContent = '';
        // document.querySelector('#passwordTextField').textContent = '';
      }
    } else {
      document.querySelector('#loginErrorMessage').textContent =
        'Please enter in both username & password.';
    }
  };

  const handleCreateInfo = async (event) => {
    if (
      document.querySelector('#usernameTextField').value !== '' &&
      document.querySelector('#passwordTextField').value !== ''
    ) {
      const userJSON = JSON.stringify({
        username: document.querySelector('#usernameTextField').value,
        password: document.querySelector('#passwordTextField').value,
      });

      const res = await axios.post(
        // 'https://phone-app-backend.onrender.com/register',
        'localhost:1121/register',
        userJSON,
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,OPTIONS',
            'Access-Control-Allow-Headers':
              'Origin, X-Requested-With, Content-Type, Accept',
          },
        }
      );

      console.log(res.data);
      if (res.data.message === 'account already exists') {
        document.querySelector('#loginErrorMessage').textContent =
          'Account already exists';
      } else if (res.data.message === 'account created') {
        setIsClickedLogin(false);
        setIsUserLoggedIn(true);
        setIsDisableRating(false);
        document.querySelector('#loginErrorMessage').textContent = '';
        // document.querySelector('#usernameTextField').textContent = '';
        // document.querySelector('#passwordTextField').textContent = '';
      }
    } else {
      document.querySelector('#loginErrorMessage').textContent =
        'Please enter in both username & password.';
    }
  };

  const handlePostRating = async (event) => {
    const userJSON = JSON.stringify({
      username: usernameInfo,
      rating: document.querySelector('#rateDrop').textContent,
    });

    const res = await axios.post(url + searchTerm + `/review`, userJSON, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
      },
    });

    const averageReviewRes = await axios.get(url + searchTerm + `/review`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
      },
    });

    setAverageReview(averageReviewRes.data[0]);

    console.log(usernameInfo);
    console.log(document.querySelector('#rateDrop').textContent);
  };

  const handleSearchSubmit = async (event) => {
    // Add your search functionality here, e.g., navigate to search results page
    try {
      // let temp = convertString(searchTerm);
      // temp = phoneExists(temp);
      const res = await axios.get(url + searchTerm + `/price`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,OPTIONS',
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
        },
      });
      const noPriceRes = await axios.get(url + searchTerm, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,OPTIONS',
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
        },
      });
      const averageReviewRes = await axios.get(url + searchTerm + `/review`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,OPTIONS',
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
        },
      });

      setPhonePrices(res.data);
      setPhoneInfo(noPriceRes.data[0]);
      setPhoneInfoNotEmpty(true);
      setPhonePricesNotEmpty(true);
      setAverageReview(averageReviewRes.data[0]);
      console.log(res.data);
      console.log(noPriceRes.data);
      console.log(averageReviewRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AppBar position='static' width='100%' style={{ background: '#f44336' }}>
        <Grid columns={2}>
          <Grid item xs={8}>
            <Typography>Phone Price Comparison</Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant='contained'
              color='success'
              onClick={handleLogin}
              id='loginButton'
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </AppBar>

      <Box paddingLeft='15%' paddingRight='15%' paddingTop={'2%'}>
        {!isClickedLogin ? (
          <Grid columns={3} alignContent='right'>
            <Grid
              container
              rows={2}
              columnSpacing={{ xs: 1 }}
              paddingBottom={2}
              flex-wrap='nowrap'
            >
              <Grid item xs={4}>
                <Typography>Search Here</Typography>
              </Grid>
              <Grid item xs={8} justifyContent='flex-end'>
                <FormControl fullWidth>
                  {/* <TextField
                  label='Select a phone from drop menu'
                  value={searchTerm}
                  size='small'
                  variant='filled'
                  onChange={(e) => setSearchTerm(e.target.value)}
                /> */}
                  <InputLabel id='demo-simple-select-label'>
                    Select a phone from drop menu
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={searchTerm}
                    label='Select a phone from drop menu'
                    onChange={(e) => setSearchTerm(e.target.value)}
                  >
                    <MenuItem value={1}>iPhone 15</MenuItem>
                    <MenuItem value={2}>iPhone 15 Plus</MenuItem>
                    <MenuItem value={3}>iPhone 15 Pro</MenuItem>
                    <MenuItem value={4}>iPhone 15 Pro Max</MenuItem>
                    <MenuItem value={5}>iPhone 14</MenuItem>
                    <MenuItem value={6}>iPhone 14 Plus</MenuItem>
                    <MenuItem value={7}>Galaxy S23</MenuItem>
                    <MenuItem value={8}>Galaxy S23 Plus</MenuItem>
                    <MenuItem value={9}>Galaxy S23 Ultra</MenuItem>
                    <MenuItem value={10}>Galaxy S23 FE</MenuItem>
                    <MenuItem value={11}>iPhone 14 Pro</MenuItem>
                    <MenuItem value={12}>iPhone 14 Pro Max</MenuItem>
                    <MenuItem value={13}>Galaxy S22</MenuItem>
                    <MenuItem value={14}>Galaxy S22 Plus</MenuItem>
                    <MenuItem value={15}>Galaxy S22 Ultra</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              rows={1}
              flex-wrap='nowrap'
              justifyContent='flex-end'
            >
              <Grid item>
                <Button variant='contained' onClick={handleSearchSubmit}>
                  Search
                </Button>
              </Grid>
            </Grid>
            <Grid container paddingBottom={2} justifyContent='center'>
              <Grid item>
                {phoneInfoNotEmpty && phonePricesNotEmpty && (
                  <Card sx={{ maxWidth: 350, minWidth: 275 }}>
                    <CardContent>
                      <Typography variant='h5' component='div'>
                        {phoneInfo.brand} {phoneInfo.make} {phoneInfo.model}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                        {phoneInfo.year}
                      </Typography>

                      <Typography variant='body2'>
                        {phonePrices.map((phones) => (
                          <ul key={phones.name}>
                            {phones.name} price: {phones.price}
                          </ul>
                        ))}
                        <ul>
                          Average Rating:{' '}
                          {parseFloat(averageReview.avg).toFixed(2)}
                        </ul>
                        <ul>
                          <FormControl fullWidth>
                            <InputLabel>Rate</InputLabel>
                            <Select
                              label='Rate'
                              disabled={isDisableRating}
                              id='rateDrop'
                            >
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={2}>2</MenuItem>
                              <MenuItem value={3}>3</MenuItem>
                              <MenuItem value={4}>4</MenuItem>
                              <MenuItem value={5}>5</MenuItem>
                            </Select>
                          </FormControl>
                        </ul>
                        <ul>
                          <Grid item>
                            <Button
                              id='rateSubmit'
                              disabled={isDisableRating}
                              variant='contained'
                              onClick={handlePostRating}
                            >
                              Submit
                            </Button>
                          </Grid>
                        </ul>
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid columns={2} alignContent='right'>
            <Grid
              container
              rows={1}
              flex-wrap='nowrap'
              justifyContent='flex-end'
            >
              <Grid item xs={4}>
                <Typography>Username: </Typography>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <TextField
                    id='usernameTextField'
                    required
                    value={usernameInfo}
                    onChange={(e) => setUsernameInfo(e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              rows={1}
              flex-wrap='nowrap'
              justifyContent='flex-end'
            >
              <Grid item xs={4}>
                <Typography>Password: </Typography>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <TextField
                    id='passwordTextField'
                    required
                    value={passwordInfo}
                    onChange={(e) => setPasswordInfo(e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              rows={1}
              flex-wrap='nowrap'
              justifyContent='flex-end'
            >
              <Grid item xs={4}>
                <Button
                  variant='contained'
                  style={{ background: '#0096FF' }}
                  onClick={handleLoginInfo}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant='contained'
                  style={{ background: '#0096FF' }}
                  onClick={handleCreateInfo}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              rows={1}
              flex-wrap='nowrap'
              justifyContent='flex-end'
            >
              <Typography id='loginErrorMessage'></Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </div>
  );
}

export default App;
