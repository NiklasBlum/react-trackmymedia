import TextField from '@mui/material/TextField';
import { useMediaStore } from '../store';

export default function MediaSearchBar() {
    const { searchText, setSearchText, mediaType, isLoading } = useMediaStore();



    function keyEntered(): import("react").KeyboardEventHandler<HTMLDivElement> {
        throw new Error('Function not implemented.');
    }

    return (
        <TextField disabled={isLoading}
            onKeyDown={keyEntered() }
            value={searchText}
            label={mediaType}
            variant="outlined"
            fullWidth
            onChange={e => setSearchText(e.target.value)}
        />
    );
}