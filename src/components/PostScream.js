// Imports

import React, { Component, Fragment }   from 'react'
import PropTypes                        from 'prop-types'
import withStyles                       from '@material-ui/core/styles/withStyles'
import MyButton                         from '../util/MyButton'
import Button                           from '@material-ui/core/Button'
import TextField                        from '@material-ui/core/TextField'
import Dialog                           from '@material-ui/core/Dialog'
import DialogContent                    from '@material-ui/core/DialogContent'
import DialogTitle                      from '@material-ui/core/DialogTitle'
import CircularProgress                 from '@material-ui/core/CircularProgress'
import AddIcon                          from '@material-ui/icons/Add'
import CloseIcon                        from '@material-ui/icons/Close'
import EditIcon                         from '@material-ui/icons/Edit'
import { connect }                      from 'react-redux'
import { postScream }                   from '../redux/actions/dataActions'



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
          position: 'relative'
      },
      progressSpinner: {
          position: 'absolute'
      },
      closeButton: {
          position: 'absolute',
          left: '90%',
          top: '10%'
      }
})

// ---------------------------------------------------------------------------------------------------------

// Post Scream

class PostScream extends Component {

    state = {

        open:   false,
        body:   '',
        errors: {}
        
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '' })
            this.handleClose()
        }

    }

    handleOpen = () => {
        
        this.setState({ open:   true })

    }

    handleClose = () => {
        
        this.setState({ 
            open: false, 
            errors: {} 
        })

    }

    handleChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        })

    }

    handleSubmit = (event) => {

        event.preventDefault()
        this.props.postScream({ body: this.state.body })

    }

    render(){

        const { errors } = this.state
        const { classes, UI: { loading } } = this.props
        return (

            <Fragment>
                <MyButton onClick={this.handleOpen} tip='Post a Scream!'>
                    <AddIcon />
                </MyButton>
                <Dialog 
                    open={this.state.open} 
                    onClose={this.handleClose} 
                    fullWidth 
                    maxWidth='sm'>
                    <MyButton tip='Close' onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogTitle>Post a new scream</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name='body'
                                type='text'
                                label='SCREAM!!'
                                multiline
                                rows='3'
                                placeholder="Scream at your fellow friends"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button type='submit' 
                                variant='contained' 
                                color='primary'
                                className={classes.submitButton} 
                                disabled={loading}
                                id='post-sub'>
                                Submit
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner}/>
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>

        )

    }

}

PostScream.propTypes = {

    postScream: PropTypes.func.isRequired,
    UI:         PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({

    UI: state.UI

})



// ---------------------------------------------------------------------------------------------------------

// Exports

export default connect(mapStateToProps, { postScream })(withStyles(styles)(PostScream))