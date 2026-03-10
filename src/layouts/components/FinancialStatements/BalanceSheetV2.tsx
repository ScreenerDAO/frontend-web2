import * as React from 'react';
import { useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StatementType } from 'src/types/IStatement';
import { IElement, IElementsGroup, balanceSheetStructure, balanceSheetTypesNames, getFinancialStatementStructureFromCustomLabels } from 'src/types/FinancialStatementsTypes';
import IStatementDisplayProps from 'src/types/IStatementDisplayProps';
import CellValue from './CellValue';

const BalanceSheet = (props: IStatementDisplayProps): React.ReactElement => {
    const calculatedBalanceSheetStructure = useMemo(() => {
        if (props.data.CustomFinancialsStructure && props.data.CustomLabels) {
            return getFinancialStatementStructureFromCustomLabels(props.data.CustomLabels);
        }

        return []
    }, [props.data.CustomFinancialsStructure, props.data.CustomLabels]);

    const TableHeaders = () => {
        return (
            <>
                <TableCell sx={{ minWidth: '250px', position: 'sticky', left: 0, backgroundColor: 'white' }}></TableCell>

                {
                    props.yearsSelected.map(dataElement => {
                        return (
                            <TableCell align="right" key={dataElement}>{dataElement}</TableCell>
                        )
                    })
                }
            </>
        )
    }

    const TableRows = (): React.ReactElement => (
        <>
            {
                calculatedBalanceSheetStructure.map((row, rowIndex) => {
                    return (
                        <ElementGroupRows element={row} key={rowIndex} />
                    )
                })
            }
        </>
    )

    const ElementGroupRows = ({ element }: { element: IElementsGroup }): React.ReactElement => {
        return (
            <>
                {
                    element.elements.map((cElement, index) => {
                        if (cElement && (cElement as IElementsGroup).total) {
                            return (
                                <ElementGroupRows element={cElement as IElementsGroup} key={index} />
                            )
                        }

                        return (
                            <Row label={(cElement as IElement).label} key={index} />
                        )
                    })
                }

                <Row label={element.total.label} bold={true} />
            </>
        )
    }

    const Row = ({ label, bold }: { label: number, bold?: boolean }): React.ReactElement => {
        const selected = props.selectedLabels.filter(label => label.statement === StatementType.BalanceSheet).map(label => (label.label)).includes(label)
        const displayName = props.data.CustomLabels?.[label]?.name

        return (
            <TableRow
                hover
                selected={selected}

                onClick={() => {
                    const selectedLabels = [...props.selectedLabels]

                    if (selected) {
                        props.setSelectedLabels(props.selectedLabels.filter(cLabel => cLabel.label !== label))

                        return
                    }

                    selectedLabels.push({
                        statement: StatementType.BalanceSheet,
                        label,
                        type: 'bar'
                    })

                    props.setSelectedLabels(selectedLabels)
                }}
            >
                <TableCell component="th" sx={{ fontWeight: bold ? 900 : 'initial', position: 'sticky', left: 0, backgroundColor: 'white' }}>
                    {displayName}
                </TableCell>

                {
                    props.yearsSelected.map((year, index) => {
                        return (
                            <TableCell align="right" key={index} sx={{ fontWeight: bold ? 900 : 'initial' }}>
                                <CellValue value={props.data.FinancialStatements[year].BalanceSheet[label]?.Value} />
                            </TableCell>
                        )
                    })
                }
            </ TableRow>
        )
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, }}>
                <TableHead>
                    <TableRow>
                        <TableHeaders />
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRows />
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BalanceSheet