import { Grid } from "@mui/material";

export default function NoResults() {
    return (

        <Grid item textAlign="center" marginBottom={3} sx={{ pl: 0 }}>
            <div>No results found!</div>
        </Grid>
    )
}