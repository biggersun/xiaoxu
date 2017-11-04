import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const propTypes = {
    user: PropTypes.object.isRequired,
};

class Post extends PureComponent {
    render() {
        return (
            <section>
                Post
            </section>
        );
    }
}

Post.propTypes = propTypes;

export default Post;
