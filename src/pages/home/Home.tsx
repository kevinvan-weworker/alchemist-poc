import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import './home.scss';

const Home: React.FC = () => (
  <section>
    <Link to="/login">
      <Button color="primary">
        Go to Login
      </Button>
    </Link>
  </section>
);

export default Home;