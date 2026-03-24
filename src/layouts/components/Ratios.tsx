import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import * as React from 'react'
import { useAppSelector } from 'src/hooks'
import { calculateGeneralRatio, IRatio, ratios } from 'src/types/FinancialStatementsTypes'
import { ICustomRatio } from 'src/types/ICompanyData'

interface IRatiosProps {
    yearsSelected: number[]
}

const Ratios = (props: IRatiosProps): React.ReactElement => {
    const companyData = useAppSelector(state => state.companyData)

    const TableHeaders = () => {
        return (
            <TableRow>
                <TableCell sx={{ minWidth: '250px', position: 'sticky', left: 0, backgroundColor: 'white' }}></TableCell>

                {
                    props.yearsSelected.map(dataElement => {
                        return (
                            <TableCell align="right" key={dataElement}>{dataElement}</TableCell>
                        )
                    })
                }
            </ TableRow>
        )
    }

    const TableRows = () => (
        <>
            {
                ratios.map((ratio, index) => {
                    return (
                        <Row ratio={ratio} key={index} />
                    )
                })
            }
        </>
    )

    const CustomTableRows = () => (
        <>
            {
                companyData.CustomRatios?.map((ratio, index) => {
                    return (
                        <CustomRatioRow ratio={ratio} key={index} />
                    )
                })
            }
        </>
    )

    const Row = ({ ratio }: {
        ratio: IRatio
    }) => {
        return (
            <TableRow
                hover
            >
                <TableCell component="th" sx={{ position: 'sticky', left: 0, backgroundColor: 'white' }}>
                    {ratio.name}
                </TableCell>

                {
                    props.yearsSelected.map((year, index) => {
                        return (
                            <TableCell align="right" key={index}>
                                {ratio.function(year, companyData)}
                            </TableCell>
                        )
                    })
                }
            </TableRow>
        )
    }

    const CustomRatioRow = ({ ratio }: {
        ratio: ICustomRatio
    }) => {
        return (
            <TableRow
                hover
            >
                <TableCell component="th" sx={{ position: 'sticky', left: 0, backgroundColor: 'white' }}>
                    {ratio.Title}
                </TableCell>

                {
                    props.yearsSelected.map((year, index) => {
                        return (
                            <TableCell align="right" key={index}>
                                {calculateGeneralRatio(year, ratio.Numerator, ratio.Denominator, companyData, ratio.Statement, ratio.Percentage)}
                            </TableCell>
                        )
                    })
                }
            </TableRow>
        )
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableHeaders />
                </TableHead>

                <TableBody>
                    { companyData.CustomRatios && <CustomTableRows /> }
                    { !companyData.CustomLabels && <TableRows /> }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Ratios