// Imports

import React, { Component, Fragment }   from 'react'
import PropTypes                        from 'prop-types'
import withStyles                       from '@material-ui/core/styles/withStyles'
import MyButton                         from '../../util/MyButton'
import LikeButton                       from './LikeButton'
import Comments                         from './Comments'
import CommentForm                      from './CommentForm'
import dayjs                            from 'dayjs'
import { Link }                         from 'react-router-dom'
import Dialog                           from '@material-ui/core/Dialog'
import DialogContent                    from '@material-ui/core/DialogContent'
import CircularProgress                 from '@material-ui/core/CircularProgress'
import ChatIcon                         from '@material-ui/icons/Chat'
import CloseIcon                        from '@material-ui/icons/Close'
import UnfoldMore                       from '@material-ui/icons/UnfoldMore'
import Grid                             from '@material-ui/core/Grid'
import Typography                       from '@material-ui/core/Typography'
import { connect }                      from 'react-redux'
import { getScream, clearErrors }       from '../../redux/actions/dataActions'



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

// Scream Dialog

class ScreamDialog extends Component {

    state = {

        open: false

    }

    handleOpen = () => {

        this.setState({ open: true })
        this.props.getScream(this.props.screamId)

    }

    handleClose = () => {

        this.setState({ open: false })
        this.props.clearErrors()

    }

    render(){

        const { 
            classes, 
            scream: {
                screamId,
                body,
                createdAt,
                likeCount,
                commentCount,
                userImage,
                userHandle,
                comments
            },
            UI: { loading }
        } = this.props

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img 
                        src={userImage}
                        alt='Profile'
                        className={classes.profileImage}
                    />
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color='primary'
                        variant='h5'
                        to={`/users/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant='body2' color='textSecondary'>
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant='body1'>
                        {body}
                    </Typography>
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} Likes</span>
                    <MyButton tip ='Comments'>
                        <ChatIcon color='primary'/>
                    </MyButton>
                    <span>{commentCount} Comments</span>
                </Grid>
                <hr className={classes.visibleSeparator}/>
                <CommentForm screamId={screamId}/>
                <Comments comments={comments}/>
            </Grid>
        )

        return(

            <Fragment>
                <MyButton 
                    onClick={this.handleOpen} 
                    tip='Expand Scream' 
                    tipClassName={classes.expandButton}
                >
                    <UnfoldMore color='primary'/>
                </MyButton>
                <Dialog
                    open={this.state.open} 
                    onClose={this.handleClose} 
                    fullWidth 
                    maxWidth='sm'
                >
                    <MyButton 
                        tip='Close' 
                        onClick={this.handleClose} 
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon/>
                    </MyButton>
                    <DialogContent className={classes.DialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>

        )

    }

}


ScreamDialog.propTypes = {

    clearErrors:    PropTypes.func.isRequired,
    getScream:      PropTypes.func.isRequired,
    screamId:       PropTypes.string.isRequired,
    userHandle:     PropTypes.string.isRequired,
    scream:         PropTypes.object.isRequired,
    UI:             PropTypes.object.isRequired

}


const mapStateToProps = (state) => ({

    scream: state.data.scream,
    UI:     state.UI

})

const mapActionsToProps = {

    getScream,
    clearErrors

}


// ---------------------------------------------------------------------------------------------------------

// Exports

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog))