import { RemoveRedEye, CalendarMonth, Delete } from "@mui/icons-material"
import { Badge, Button, ButtonGroup, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Popper } from "@mui/material"
import { Fragment, useState } from "react";
import DateTimePicker from "./shared/DateTimePicker";
export default function WatchStateSplitButton({ watchDates, onAdd, onRemove, isLoading }) {

    const [showPopper, setShowPopper] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [customWatchDate, setCustomWatchDate] = useState<Date | null>(null);

    const handleShowPopper = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setShowPopper(!showPopper);
    };

    function addSpecificDate() {
        onAdd(customWatchDate);
        setCustomWatchDate(null);
        setShowPopper(false);
        setAnchorEl(null);
    }

    return (
        <Fragment>
            <ButtonGroup variant="contained" size="small" disabled={isLoading}>
                <Button startIcon={<RemoveRedEye />}
                    size="small"
                    onClick={() => onAdd(new Date())}>
                    {
                        watchDates?.length > 0
                            ?
                            watchDates[0].toLocaleDateString()
                            :
                            'Add'
                    }
                </Button>

                <IconButton onClick={handleShowPopper} color="info">
                    <Badge badgeContent={watchDates.length} color="success">
                        <CalendarMonth />
                    </Badge>
                </IconButton>
            </ButtonGroup>

            <Popper open={showPopper}
                anchorEl={anchorEl}
                placement="bottom-start">
                <Paper>
                    <List dense>
                        {
                            watchDates.map((x: Date) => (
                                <div key={x.toString()}>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton edge="end" onClick={() => onRemove(x)}>
                                                <Delete />
                                            </IconButton>
                                        }                                    >
                                        <ListItemText
                                            primary={x.toLocaleDateString()} />
                                    </ListItem>
                                </div>
                            ))
                        }
                    </List>

                    <DateTimePicker date={customWatchDate} dateChanged={(x: Date) => setCustomWatchDate(x)} />

                    <Button size="small" disabled={customWatchDate == null}
                        onClick={addSpecificDate}>Add specific date</Button>
                </Paper>
            </Popper>
        </Fragment>
    )
}


