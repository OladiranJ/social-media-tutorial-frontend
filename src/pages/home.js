// Imports

import React, { Component } from 'react'
import Grid                 from '@material-ui/core/Grid'



// ---------------------------------------------------------------------------------------------------------

// Home Page

class home extends Component {

    componentDidMount () {

        

    }

    render () {

        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    <p>Content...</p>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile...</p>
                </Grid>
            </Grid>
        )

    }

}



// ---------------------------------------------------------------------------------------------------------

// Exports

export default home