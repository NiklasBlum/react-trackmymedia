import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import MediaType from '../types/MediaType';
import { useMediaStore } from '../store';

export default function MediaFilter({ isDisabled = false }) {

    const { mediaType, setMediaType, setCurrentPage } = useMediaStore();

    function handleChange(_event: React.MouseEvent<HTMLElement>, newMediaType: MediaType) {
        if (newMediaType) {
            setMediaType(newMediaType);
            setCurrentPage(1);
        }
    }

    return (
        <ToggleButtonGroup
            color="primary"
            size='large'
            value={mediaType}
            exclusive
            disabled={isDisabled}
            onChange={handleChange}
        >
            <ToggleButton value={MediaType.Movie}>Movie</ToggleButton>
            <ToggleButton value={MediaType.Show}>Show</ToggleButton>
        </ToggleButtonGroup>
    );
}