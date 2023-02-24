import TextField from '@mui/material/TextField';
import { useMediaStore } from '../store';

export default function MediaSearchBar() {
    const { searchText, setSearchText, mediaType, isLoading } = useMediaStore();

    return (
        <TextField disabled={isLoading}
            value={searchText}
            label={mediaType}
            variant="outlined"
            fullWidth
            onChange={e => setSearchText(e.target.value)}
        />
    );
}