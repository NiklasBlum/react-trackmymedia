import { RemoveRedEye, CalendarMonth } from "@mui/icons-material"
import { Badge, Button, ButtonGroup, IconButton, Paper, Popper } from "@mui/material"
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

                <IconButton onClick={handleShowPopper} >
                    <Badge badgeContent={watchDates.length} color="success">
                        <CalendarMonth />
                    </Badge>
                </IconButton>
            </ButtonGroup>

            <Popper open={showPopper}
                anchorEl={anchorEl}
                placement="bottom-start">
                <Paper>
                    {
                        watchDates.map((x: Date) => (
                            <div key={x.toString()}>
                                <Button onClick={() => onRemove(x)}>{x.toDateString()}</Button>
                            </div>
                        ))
                    }

                    <DateTimePicker dateChanged={(x: Date) => setCustomWatchDate(x)} />

                    <Button disabled={customWatchDate == null}
                        onClick={() => onAdd(customWatchDate)}>Add specific date</Button>
                </Paper>
            </Popper>
        </Fragment>
    )
}


