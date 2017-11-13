import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as router from 'constants/router';

import Post from 'containers/Post';
import AircleList from 'containers/AircleList';
import AirclePost from 'containers/AirclePost';

export default () => (
    <Switch>
        <Route exact path="/aircle-list" component={AircleList} />
        <Route exact path="/aircle-post" component={AirclePost} />
        <Route exact path="/post" component={Post} />
    </Switch>
);
