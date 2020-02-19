import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { format,  startOfMonth, endOfMonth, isSameDay, 
    subMonths, addMonths, startOfWeek, endOfWeek, addDays, 
    isSameMonth } from 'date-fns'
import CreateModal from './CreateModal'

import {Grid, Paper, IconButton, Dialog} from '@material-ui/core'
import { ArrowForwardIos, ArrowBackIos } from '@material-ui/icons/'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
    color: "#364958 !important",
  },
  button: {
    '&:hover': {
      backgroundColor: 'transparent!important',
    },
  }
}));
  
  

const Calendar = (props) => {
    const classes = useStyles();
    const [month, setMonth] = useState(new Date());
    const [selected, setSelected] = useState(new Date());
    const [showModal, setShowModal] = useState(false)

    const renderMonth = () => {
        const dateFormat = "MMMM yyyy";

        return (
            <div className="header row flex-middle">
              <div className="col col-start">
                <IconButton className={classes.button} aria-label="back" disableRipple={true} onClick={prevMonth}>
                    <ArrowBackIos className="icon" style={{ fontSize: 18}} />
                </IconButton>
              </div>
              <div className="col col-center">
                <span>
                  {format(month, dateFormat)}
                </span>
              </div>
              <div className="col col-end" >
                <IconButton className={classes.button} aria-label="back" disableRipple={true} onClick={nextMonth}>
                        <ArrowForwardIos className="icon" style={{ fontSize: 18}} />
                    </IconButton>
              </div>
            </div>
          );
    }

    const renderWeekDays = () => {
        const dateFormat = "EEEEEE";
        const days = [];
        let startDate = startOfWeek(month);

        for( let i = 0; i < 7; i++){
            days.push(
                <div className="col col-center" key={i}>
                    { format(addDays(startDate, i), dateFormat)}
                </div>
            )
        }

        return <div className="days row">{days}</div>;
    }

    const  renderCells = () => {
        const currentMonth = month;
        const selectedDate = selected;
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);
        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const copyDay = day;

                days.push(
                    <div
                        className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? "disabled"
                            : isSameDay(day, selectedDate) ? "selected" : ""
                        }`}
                        key={day}
                        onClick={() => {onDateClick(copyDay)}}
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;

    }

    const onDateClick = (day) => { 
        setSelected(day)
        setShowModal(true)
        console.log(day)
    };

    const nextMonth = () => { 
        setMonth( addMonths(month, 1) )
    };

    const  prevMonth = () => {
        setMonth( subMonths(month, 1) )
    };

    const cancelCreateDialog = () => setShowModal(false)

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                <Paper className={"calendar " + classes.paper}>
                    {renderMonth()}
                    {renderWeekDays()}
                    {renderCells()}
                </Paper>
                </Grid>
            </Grid>


            <Dialog
                fullWidth={false}
                maxWidth="sm"
                open={showModal}
                onClose={cancelCreateDialog}
                aria-labelledby="event-dialog">
                    <CreateModal
                    handleCreate={cancelCreateDialog}
                    handleCancel={cancelCreateDialog} 
                    date={selected}/>
                </Dialog>
        </div>
    )
}

export default Calendar;
