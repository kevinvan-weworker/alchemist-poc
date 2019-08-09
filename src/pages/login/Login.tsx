import * as React from 'react';

import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import oauthClient from '../../utils/auth/googleOAuthClient';
import SpacemanTokenClient from '../../utils/auth/spacemanAuth';

const Login: React.FC = () => {
  const [user, setUser] = React.useState({
    email: "",
    id: "",
    picture: "",
  });

  const [spacemanToken, setToken] = React.useState('');

  let spacemanClient: any;
  return (
    <section>
      <Link to="/">
        <Button color="primary">
          Go to Home
        </Button>
      </Link>
      <Button onClick={handleLogin}>login</Button>
      <Button onClick={setUserData}>set user data</Button>
      <Button onClick={setSpacemanClient}>get spaceman client</Button>
      <Button onClick={setSpacemanToken}>set spaceman response</Button>
      <Button onClick={showAllProducts}>show all products</Button>
    </section>
  );

  async function handleLogin() {
    oauthClient.showPopup();
  }

  async function setUserData() {
    const data = await oauthClient.fetchData();
    const authResponse = await oauthClient.getAuthResponse();
    setUser({ ...data, id: authResponse.id_token});
    console.log('user data set');
  }

  async function setSpacemanClient() {
    spacemanClient = new SpacemanTokenClient(user.id);
    console.log('spaceman client set');
  }

  async function setSpacemanToken() {
    const spacemanResponse = spacemanClient.getMyResponse()
    setToken(spacemanResponse.result.token);
    console.log('spaceman token set');
  }

  async function fetchAllProducts() {
    console.log('token fetched', spacemanToken);
    return fetch("https://product-service-staging.herokuapp.com/v2/products", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token token=${spacemanToken}`
      }
    });
  }

  async function showAllProducts() {
    const res = await fetchAllProducts();
    const json = await res.json();
    console.log('products', json);
  }
};

export default Login;