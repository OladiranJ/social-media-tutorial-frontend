// Imports

import React, { Component }             from 'react'
import PropTypes                        from 'prop-types'
import withStyles                       from '@material-ui/core/styles/withStyles'
import Button                           from '@material-ui/core/Button'
import Grid                             from '@material-ui/core/Grid'
import TextField                        from '@material-ui/core/TextField'
import { connect }                      from 'react-redux'
import { submitComment }                from '../../redux/actions/dataActions'
import { CLEAR_ERRORS } from '../../redux/types';



// ---------------------------------------------------------------------------------------------------------

// Styles

const styles = (theme) => ({
    paper: {
        padding: 20
      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: theme.palette.primary.main
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      },
      submitButton: {
          position:     'relative',
          float:        'right',
          marginTop:    10
      },
      progressSpinner: {
          position: 'absolute'
      },
      closeButton: {
          position: 'absolute',
          left: '90%'
      },
      invisibleSeparator: {
        border: 'none',
        margin: 4
      },
      visibleSeparator: {
          width:        '100%',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          marginBottom: 20
      },
      profileImage: {
          maxWidth:     200,
          height:       200,
          borderRadius: '50%',
          objectFit:    'cover'
      },
      dialogContent: {
        padding: 20
      },
      expandButton: {
          position: 'absolute',
          left:     '90%'
      },
      spinnerDiv: {
        textAlign:    'center',
        marginTop:    50,
        marginBottom: 50
      }
})



// ---------------------------------------------------------------------------------------------------------

// Comment Form

class CommentForm extends Component {

    state = {

        body:   '',
        errors: {}

    }

    componentWillReceiveProps(nextProps){

        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors})
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ body: '' })
        }

    }

    handleChange = (event) => {

        this.setState({ [event.target.name]: event.target.value })

    }

    handleSubmit = (event) => {

        event.preventDefault()
        this.props.submitComment(this.props.screamId, { body: this.state.body })

    }

    render() {

        const { classes, authenticated } = this.props
        const errors = this.state.errors
        const commentFormMarkup = authenticated ? (

            <Grid item sm={12} style={{ textAlign: 'center' }}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name='body'
                        type='text'
                        label='Comment on scream'
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        className={classes.button}
                    >Submit</Button>
                </form>
                <hr className={classes.visibleSeparator}/>
            </Grid>

        ) : null

        return commentFormMarkup

    }

}


CommentForm.propTypes = {

    submitComment:  PropTypes.func.isRequired,
    UI:             PropTypes.object.isRequired,
    classes:        PropTypes.object.isRequired,
    screamId:       PropTypes.string.isRequired,
    authenticated:  PropTypes.bool.isRequired

}


const mapStateToProps = state => ({

    UI:             state.UI,
    authenticated:  state.user.authenticated

})



// ---------------------------------------------------------------------------------------------------------

// Exports

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm))
