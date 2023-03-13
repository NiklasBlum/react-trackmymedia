import { Pagination } from '@mui/material';
import { useMediaStore } from '../../store';

export default function Pager(): JSX.Element {

    const { currentPage, setCurrentPage } = useMediaStore();

    return (
        <Pagination count={10}
            defaultValue={1}
            size="large"
            color="primary"
            page={currentPage}
            onChange={(_: React.ChangeEvent<unknown>, newPage: number) => setCurrentPage(newPage)} />
    )
}