import * as React from 'react';

import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const Login: React.FC = () => (
  <section>
    <Link to="/">
      <Button color="primary">
        Go to Home
      </Button>
    </Link>
  </section>
);

export default Login;