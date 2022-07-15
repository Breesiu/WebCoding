import React from 'react';
import {
    AppBar, Grid, Toolbar, Typography
} from '@material-ui/core';
import './TopBar.css';

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <AppBar className="cs142-topbar-appBar" position="absolute">
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h5" color="inherit">
                            ShiChengxin.
                        </Typography>
                        <Typography variant="h5" color="inherit">
                            {this.props.change ? `Photos of ${this.props.user.first_name} ${this.props.user.last_name}` :
                                this.props.user.first_name?`${this.props.user.first_name} ${this.props.user.last_name}`:``}

                        </Typography>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}

export default TopBar;
