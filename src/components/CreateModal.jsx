import * as React from 'react'
import {useState} from 'react'
import axios from 'axios'
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import CloseIcon from '@material-ui/icons/Close'
import {
    Button,
    Grid,
    IconButton,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@material-ui/core'

import {makeStyles} from '@material-ui/core/styles'
import { SketchPicker } from 'react-color';

const useStyles = makeStyles(theme => ({
    button: {
        '&:hover': {
            backgroundColor: 'transparent!important'
        },
        color: '#444851',
        padding: 0
    },
    fullWidth: {
        width: '100%'
    },
    textLabel: {
        color: '#444851',
        textDecoration: 'underline',
        fontSize: '14px'
    },
    helper: {
        color: '#777777',
        fontSize: 13,
        margin: '-5px 0 15px 0'
    }
}))

const CreateModal = props => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState(props.date);
    const [name, setName] = useState('')
    const [errMsg, setErrMsg] = useState({});
    const [error, setError] = useState(false);

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const handleSubmit = () => {
      let data = {
          title: name, 
          day: String(selectedDate),
      }
      props.handleCreate(data);
      props.handleCancel();
  }
    
    const handleTitle = (e) => {
        let maxLenght = 30;
        if(e.target.value.length <= maxLenght){
            setName(e.target.value)
            setError(false)
        } else {
            setError(true)
        }
            
    }

    return (
        <React.Fragment>
            <DialogTitle>
                Reminder
                <IconButton
                    className="closeBtn"
                    disableRipple={true}
                    aria-label="close"
                    onClick={props.handleCancel}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <TextField
                    required
                    label="Title"
                    id="standard-required"
                    fullWidth
                    type="text"
                    value={name}
                    onChange={handleTitle}
                    error={errMsg.title ? true : false}
                    helperText={errMsg.title ? errMsg.title : ""}
                    onBlur={() => {
                        if (!error) {
                            setErrMsg({ ...errMsg, title: "" });
                        } else {
                            setErrMsg({ ...errMsg, title: "Max 30 chars" });
                        }
                    }}
                            />

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        className={classes.fullWidth}
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                        'aria-label': 'change date'
                    }}/>

                    <KeyboardTimePicker
                        className={classes.fullWidth}
                        variant="inline"
                        margin="normal"
                        id="time-picker"
                        label="Time"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                        'aria-label': 'change time'
                    }}/>
                </MuiPickersUtilsProvider>
                

            </DialogContent>
            <DialogActions>
                <Grid
                    container
                    justify="center"
                    spacing={2}
                    style={{
                    marginBottom: '15px',
                    marginTop: '15px'
                }}>
                    <Grid item>
                        <Button onClick={handleSubmit} variant="contained">Save</Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={props.handleCancel} variant="contained">Cancel</Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </React.Fragment>
    )
}
export default CreateModal;
