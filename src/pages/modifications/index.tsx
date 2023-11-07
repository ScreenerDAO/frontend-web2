import { Avatar, Box, Card, CircularProgress, Divider, Grid, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridColumns } from '@mui/x-data-grid'
import React from 'react'
import { selectCompany } from 'src/lib/generalMethods'
import { useAppDispatch, useAppSelector } from 'src/hooks'
import Link from 'next/link'
import { useTheme } from '@mui/material/styles';
import PageWrapper from 'src/layouts/components/PageWrapper'
import { IGetStaticPropsResult } from 'src/lib/getStaticProps'
import { useQuery } from 'react-query'
import { IGeneral } from 'src/features/general'
import ModificationTypes from 'src/types/ModificationType'
import ModificationStatus from 'src/types/ModificationStatus'
import { MoreVert, Delete, Settings } from '@mui/icons-material';
import { Logout } from 'mdi-material-ui'

const backendEndpoint = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT

const Modifications = ({ companies }: IGetStaticPropsResult) => {
    const bearerToken = useAppSelector((state: { general: IGeneral }) => state.general.googleOauthToken)

    const retrieveModifications = async () => {
        const res = await fetch(`${backendEndpoint}Modifications`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`
            }
        })

        return res.json()
    }

    const {
        data,
        isLoading,
        isError,
        isFetched
    } = useQuery("modifications", retrieveModifications, { 
        enabled: !!bearerToken,
        staleTime: Infinity 
    })

    if (data){
        data.forEach((element: any) => {
            element.id = element.Id
        })
    }

    const columns: GridColumns = [

        // { field: 'Id', headerName: 'Modification Id', flex: 1 },
        { field: 'CompanyTicker', headerName: 'Ticker'},
        { field: 'CompanyName', headerName: 'Company name', flex: 1},

        // { field: 'CompanyId', headerName: 'CompanyId', headerAlign: 'center', align: 'center' },
        {
            field: 'ModificationType', headerName: 'Type', headerAlign: 'center', align: 'center', valueGetter: (params) => {
                if (params.value in ModificationTypes) {
                    return ModificationTypes[params.value]
                }
    
                return "-"
            }
        },
        {
            field: 'ModificationStatus', headerName: 'Status', headerAlign: 'center', align: 'center', valueGetter: params => {
                return ModificationStatus[params.value]
            }
        },
        {
            field: 'CreationTime', type: 'date', width: 150, headerName: 'Creation date', headerAlign: 'center', align: 'center', 
            renderCell: params => {
                if (params.value) {
                    return new Date(params.value).toLocaleDateString()
                }

                return "-"
            }
        },
        {
            field: 'Actions',
            type: 'actions', width: 100, getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<AccountMenu id={id as string} bearerToken={bearerToken ?? ""} />}
                        key={0}
                        label="Show options"
                        onClick={() => console.log('')}
                    />
                ]
            }
        }
    ]

    if (isLoading) {
        return <StepSpinner />
    }

    if (isError) {
        return "There was an error"
    }

    if (data) {
        return (
            <PageWrapper companies={companies}>
                <Grid container spacing={3} sx={{ height: 'calc(100%)' }}>
                    <Grid item xs={12} md={12}>
                        <Card>
                            <DataGrid
                                rows={data}
                                columns={columns}
                                
                                // getRowId={row => data.indexOf(row)}
                                sortModel={[
                                    {
                                        field: 'CreationTime',
                                        sort: 'desc'
                                    }
                                ]}
                                sx={{
                                    minHeight: {
                                        xs: 'calc(100vh - 64px - 56px - 3rem)',
                                        md: 'calc(100vh - 76px - 56px - 3rem)'
                                    }
                                }}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </PageWrapper>
        )
    }

    return <StepSpinner />
}

const AccountMenu = ({id, bearerToken}: {id: string, bearerToken: string}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div onClick={handleClick}>
                <MoreVert />
            </div>
            {/* <MoreVertIcon onClick={handleClick} /> */}
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {/* <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                </MenuItem>
                <Divider /> */}
                <MenuItem onClick={() => {
                    handleClose()
                }}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    View modification
                </MenuItem>
                <MenuItem onClick={() => {
                    fetch(`${backendEndpoint}Modifications/Discard`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${bearerToken}`
                        },
                        body: JSON.stringify({'ModificationId': id})
                    })

                    handleClose()
                }}>
                    <ListItemIcon>
                        <Delete fontSize="small" />
                    </ListItemIcon>
                    Discard modification
                </MenuItem>
                {/* <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem> */}
            </Menu>
        </>
    );
}

const StepSpinner = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '10px'
        }}>
            <CircularProgress />
        </Box>
    )
}

export { getStaticProps } from '../../lib/getStaticProps'

export default Modifications