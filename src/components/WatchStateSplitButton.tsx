import { RemoveRedEye, CalendarMonth, Delete } from "@mui/icons-material"
import { Badge, Button, ButtonGroup, IconButton, List, ListItem, ListItemText, Paper, Popper } from "@mui/material"
import { useState } from "react";
import DateTimePicker from "./shared/DateTimePicker";

export default function WatchStateSplitButton({ watchDates, onAdd, onRemove, isLoading }) {

    const [showPopper, setShowPopper] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [customWatchDate, setCustomWatchDate] = useState<Date | null>(null);
    const watchedAtleastOnce = watchDates?.length > 0;

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
        <>
            <ButtonGroup variant="contained"
                color="inherit"
                size="small"
                disabled={isLoading}>
                <Button startIcon={<RemoveRedEye />}
                    sx={{ border: 0 }}
                    color={watchedAtleastOnce ? "secondary" : "info"}
                    onClick={() => onAdd(new Date())}>
                    {
                        watchedAtleastOnce
                            ? watchDates[0].toLocaleDateString()
                            : 'Add'
                    }
                </Button>
                <IconButton onClick={handleShowPopper} color="info" size="small">
                    <Badge badgeContent={watchDates.length} color="secondary">
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

                    <Button size="small"
                        disabled={customWatchDate == null}
                        onClick={addSpecificDate}>
                        Add specific date
                    </Button>
                </Paper>
            </Popper>
        </ >
    )
}


