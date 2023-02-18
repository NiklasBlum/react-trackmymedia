import TextField from '@mui/material/TextField';
import { useMediaStore } from '../store';

export default function MediaSearchBar() {
    const { searchText, setSearchText, mediaType } = useMediaStore();

    return (
        <TextField id="outlined-basic" value={searchText} label={mediaType} variant="outlined" fullWidth
            onChange={e => setSearchText(e.target.value)}
        />
    );
}