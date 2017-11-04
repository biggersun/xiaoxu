import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as router from 'constants/router';

import Post from 'containers/Post';

export default () => (
    <Switch>
        <Route exact path="/post" component={Post} />
    </Switch>
);
