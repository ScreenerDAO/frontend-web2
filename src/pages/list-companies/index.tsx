import { Card, Grid } from '@mui/material'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import React from 'react'
import { selectCompany } from 'src/lib/generalMethods'
import { useAppDispatch } from 'src/hooks'
import Link from 'next/link'
import { useTheme } from '@mui/material/styles';
import PageWrapper from 'src/layouts/components/PageWrapper'
import { IGetStaticPropsResult } from 'src/lib/getStaticProps'
import FavoriteCompanyCheckbox from 'src/layouts/components/FavoriteCompanyCheckbox'

const ListCompanies = ({ Companies: companies }: IGetStaticPropsResult) => {
    return (
        <PageWrapper companies={companies}>
            <Grid container spacing={3} sx={{height: 'calc(100%)'}}>
                <Grid item xs={12} md={12}>
                    <Card>
                        <DataGrid
                            rows={companies}
                            columns={columns}
                            isRowSelectable={() => false}
                            sx={{ minHeight: {
                                xs: 'calc(100vh - 64px - 56px - 3rem)',
                                md: 'calc(100vh - 76px - 56px - 3rem)'
                            } }}
                        />
                    </Card>
                </Grid>
            </Grid>
        </PageWrapper>
    )
}

const RenderTicker = (params: {
    row: {
        Id: string,
        Name: string,
        Ticker: string,
        DataHash: string,
        IsDelisted: boolean
    }
}) => {
    const dispatch = useAppDispatch()
    const theme = useTheme();

    return (
        <Link
            href={`/company-overview?id=${params.row.Id}`}
            onClick={() => selectCompany(params.row, dispatch)}
            style={{ color: theme.palette.primary.main }}
        >
            {params.row.Ticker === '' ? 'DELISTED' : params.row.Ticker}
        </Link>
    )
}

const columns: GridColumns = [
    // { field: 'id', headerName: '#', width: 100, editable: false },
    { field: 'ticker', headerName: 'Ticker', width: 100, editable: false, renderCell: RenderTicker },
    { field: 'name', headerName: 'Name', flex: 1, editable: false },
    {
        field: 'icon',
        headerName: '',
        width: 100,
        align: 'center',
        renderCell: (params) => <FavoriteCompanyCheckbox data={params.row} />
    },
]

export { getStaticProps } from '../../lib/getStaticProps'

export default ListCompanies