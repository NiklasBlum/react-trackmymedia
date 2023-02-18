import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import MediaType from '../types/MediaType';
import { useMediaStore } from '../store';

export default function ColorToggleButton() {

    const { mediaType, setMediaType } = useMediaStore();

    function handleChange(_event: React.MouseEvent<HTMLElement>, newMediaType: MediaType) {
        if (newMediaType) {
            setMediaType(newMediaType);
        }
    }

    return (
        <ToggleButtonGroup
            color="primary"
            size='large'
            value={mediaType}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton value={MediaType.Movie} >Movie</ToggleButton>
            <ToggleButton value={MediaType.Show}>Show</ToggleButton>
        </ToggleButtonGroup>
    );
}