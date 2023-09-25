import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Dialog, Box, Button, Typography, TextField, Alert, Tabs, Tab } from '@mui/material';
import {
    DataGrid,
    GridActionsCellItem,
    GridColumns,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridRowParams,
    GridRowsProp,
    GridToolbarContainer,
    GridValueFormatterParams,
    MuiEvent
} from '@mui/x-data-grid';
import EditFinancialStatements from './EditFinancialStatement';
import ICompanyData from 'src/types/ICompanyData';
import IFinancialStatement from 'src/types/IFinancialStatement';
import { StatementType } from 'src/types/IStatement';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addNewYear, deleteYear, setAnnualReportHash, setCompanyData } from 'src/features/newCompanyDataSlice';
import { useStore } from 'react-redux';
import { RootState } from 'src/store';
import { useDropzone } from 'react-dropzone';
import readXlsxFile from 'read-excel-file';

const backendEndpoint = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT

const getYearsArray = (financials: { [key: number]: IFinancialStatement }, annualReports: {[key: number | string]: string}) => {
    let yearsArray: number[] = []
    
    if (financials) {
        const a = Object.keys(financials).map(key => Number(key))
        yearsArray = yearsArray.concat(a)
    }

    if (annualReports) {
        const a = Object.keys(annualReports).map(key => Number(key))
        yearsArray = yearsArray.concat(a)
    }

    return [...new Set(yearsArray)].sort()
}

const FinancialStatementsList = () => {
    const [editFinancialsModalOpen, setEditFinancialsModalOpen] = React.useState<boolean>(false)
    const [selectedYear, setSelectedYear] = React.useState<number>(0)
    const [newYearModalOpen, setNewYearModalOpen] = React.useState(false);
    const [rows, setRows] = React.useState<GridRowsProp>([]);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    const dispatch = useAppDispatch()
    const store = useStore<RootState>()
    const annualReports = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.annualReports)

    React.useEffect(() => {
        const initialRows = []

        const financials = store.getState().newCompanyData.financialStatements
        const yearsArray = getYearsArray(financials, annualReports)

        for (const year of yearsArray) {
            initialRows.push({
                id: year,
                year: year,
                balanceSheet: StatementType.BalanceSheet,
                incomeStatement: StatementType.IncomeStatement,
                cashFlowStatement: StatementType.CashFlowStatement,
                annualReport: annualReports[year] != undefined
            })
        }

        setRows(initialRows)
    }, [])

    const addRecordListener = (newYear: number) => {
        dispatch(addNewYear(newYear))

        setRows((oldRows) => [...oldRows, {
            id: newYear,
            year: newYear,
            balanceSheet: StatementType.BalanceSheet,
            incomeStatement: StatementType.IncomeStatement,
            cashFlowStatement: StatementType.CashFlowStatement,
            annualReport: false
        }])

        setRowModesModel((oldModel) => ({
            ...oldModel,
            [newYear]: { mode: GridRowModes.View, fieldToFocus: 'name' }
        }))

        setNewYearModalOpen(false)
        setSelectedYear(newYear as number)
        setEditFinancialsModalOpen(true)
    }

    return (
        <Box sx={{
            height: 500,
            '& .actions': {
                color: 'text.secondary',
            },
            '& .textPrimary': {
                color: 'text.primary',
            },
        }}>
            <YearsList 
                setSelectedYear={setSelectedYear} 
                setEditFinancialsModal={setEditFinancialsModalOpen}
                rows={rows}
                setRows={setRows}
                rowModesModel={rowModesModel}
                setRowModesModel={setRowModesModel} 
                setNewYearModalOpen={setNewYearModalOpen}
            />

            <UpdateYearFinancialsModal
                selectedYear={selectedYear}
                editFinancialsModalOpen={editFinancialsModalOpen}
                setEditFinancialsModalOpen={setEditFinancialsModalOpen}
            />

            <NewYearModal
                newYearModalOpen={newYearModalOpen}
                setNewYearModalOpen={setNewYearModalOpen}
                addRecordListener={addRecordListener}
            />
        </Box>
    );
}

const YearsList = ({ setSelectedYear, setEditFinancialsModal, rows, setRows, rowModesModel, setRowModesModel, setNewYearModalOpen }: {
    setSelectedYear: (id: number) => void,
    setEditFinancialsModal: (value: boolean) => void,
    rows: GridRowsProp,
    setRows: (value: GridRowsProp) => void,
    rowModesModel: GridRowModesModel,
    setRowModesModel: (value: GridRowModesModel) => void,
    setNewYearModalOpen: (value: boolean) => void
}) => {
    const dispatch = useAppDispatch()

    const handleEditClick = (id: GridRowId) => () => {
        setSelectedYear(id as number)
        setEditFinancialsModal(true)
    };

    const handleRowEditStart = (
        params: GridRowParams,
        event: MuiEvent<React.SyntheticEvent>,
    ) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));

        dispatch(deleteYear(id as number))
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const RenderStatement = (params: GridValueFormatterParams<StatementType>) => {
        const element = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.financialStatements[params.id as number]?.[params.value as StatementType])

        if (element) {
            return Object.keys(element).length > 0
        }

        return false
    }

    const RenderReport = (params: GridValueFormatterParams<StatementType>) => {
        const element = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.annualReports[params.id as number])

        if (element) {
            return true
        }

        return false
    }

    const columns: GridColumns = [
        { field: 'year', headerName: 'Year', editable: true, flex: 1, minWidth: 220 },
        { field: 'balanceSheet', headerName: 'BalanceSheet', type: 'boolean', width: 220, editable: false, valueGetter: RenderStatement },
        { field: 'incomeStatement', headerName: 'IncomeStatement', type: 'boolean', width: 220, editable: false, valueGetter: RenderStatement },
        { field: 'cashFlowStatement', headerName: 'Cash flow statement', type: 'boolean', width: 220, editable: false, valueGetter: RenderStatement },
        { field: 'annualReport', headerName: 'Annual report', type: 'boolean', width: 220, editable: false, valueGetter: RenderReport },
        {
            field: 'actions', type: 'actions', headerName: 'Actions', width: 100, cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                            key={1}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                            key={2}
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                        key={1}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                        key={2}
                    />,
                ];
            },
        },
    ];

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

        return updatedRow;
    };

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            components={{
                Toolbar: () => (
                    <GridToolbarContainer>
                        <Button color="primary" startIcon={<AddIcon />} onClick={() => setNewYearModalOpen(true)}>Add record</Button>
                    </GridToolbarContainer>
                )
            }}
            componentsProps={{
                toolbar: { setRows, setRowModesModel },
            }}
            experimentalFeatures={{ newEditingApi: true }}
            initialState={{
                sorting: {
                    sortModel: [{ field: 'year', sort: 'asc' }]
                }
            }}
        />
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const NewYearModal = ({ newYearModalOpen, setNewYearModalOpen, addRecordListener }: {
    newYearModalOpen: boolean,
    setNewYearModalOpen: (value: boolean) => void
    addRecordListener: (newYear: number) => void
}) => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Dialog
            open={newYearModalOpen}
            onClose={() => setNewYearModalOpen(false)}
        >
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} centered aria-label="Upload method tab selector">
                        <Tab label="Manual GUI upload" {...a11yProps(0)} />
                        <Tab label="Manual bulk upload" {...a11yProps(0)} />
                    </Tabs>
                </Box>

                <CustomTabPanel value={value} index={0}>
                    <ManualGui setNewYearModalOpen={setNewYearModalOpen} newYearModalOpen={newYearModalOpen} addRecordListener={addRecordListener} />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                    <MultipleFilesUploader />
                </CustomTabPanel>
            </Box>
        </Dialog>
    )
}

const ManualGui = ({ newYearModalOpen, setNewYearModalOpen, addRecordListener }: {
    newYearModalOpen: boolean,
    setNewYearModalOpen: (value: boolean) => void
    addRecordListener: (newYear: number) => void
}) => {
    const store = useStore<RootState>()
    const [newYear, setNewYear] = React.useState<number>()
    const [error, setError] = React.useState(false)

    const submit = () => {
        if (newYear) {
            if (Object.keys(store.getState().newCompanyData.financialStatements).map(key => Number(key)).includes(newYear)) {
                setError(true)

                return
            }

            addRecordListener(newYear)
        }
    }

    return (
        <form onSubmit={submit} style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                What year financial data do you want to add?
            </Typography>

            <TextField
                label="Year"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                sx={{
                    width: '200px',
                    marginTop: '20px',
                    alignSelf: 'center'
                }}
                value={newYear}
                onChange={(ev) => setNewYear(Number(ev.target.value))}
                autoFocus
            />

            {error ? <Alert severity="error" sx={{ marginTop: '20px' }}>Selected year already exists</Alert> : null}

            <Button
                variant="contained"
                style={{
                    width: '120px',
                    marginTop: '25px',
                    alignSelf: 'center'
                }}
                onClick={submit}
            >
                Add year
            </Button>
        </form>
    )
}

const MultipleFilesUploader = () => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    const store = useStore<RootState>()
    const dispatch = useAppDispatch()

    const submit = async () => {
        const newCompanyData = JSON.parse(JSON.stringify(store.getState().newCompanyData)) as ICompanyData

        console.log(acceptedFiles)

        for (const file of acceptedFiles) {
            if (file.type === "application/pdf") {
                const formData = new FormData()
                formData.append('file', file)

                const response = await fetch(`${backendEndpoint}UploadFile`, {
                    method: 'POST',
                    body: formData
                })

                const cid = await response.json()
                const year = Number(file.name.split('.')[0])

                if (year) {
                    newCompanyData.annualReports[year] = cid
                }
            }

            if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                const rows = await readXlsxFile(file)
                console.log(rows)

                const valuesAsThousands = rows[1][2] === 'Yes'
                const valuesAsMillions = rows[2][2] === 'Yes'
                const years = rows[6].filter(y => y != null) as number[]

                console.log(valuesAsThousands)

                const parseNumber = (value: number) => {
                    if (valuesAsThousands) {
                        return value * 1000
                    }

                    if (valuesAsMillions){
                        return value * 1000000
                    }

                    return value
                }

                for (let rowIndex = 9; rowIndex <= 62; rowIndex++) {
                    if (rows[rowIndex][0] != null) {
                        for (let yearIndex = 0; yearIndex < years.length; yearIndex++) {
                            const cellValue = rows[rowIndex][yearIndex + 2] ? parseNumber(rows[rowIndex][yearIndex + 2] as number).toString() : ""

                            if (cellValue !== "") {
                                if(!newCompanyData.financialStatements[years[yearIndex]]) {
                                    newCompanyData.financialStatements[years[yearIndex]] = {
                                        balanceSheet: {},
                                        incomeStatement: {},
                                        cashFlow: {}
                                    }
                                }                                

                                if (!newCompanyData.financialStatements[years[yearIndex]].balanceSheet[rows[rowIndex][0] as number]) {
                                    newCompanyData.financialStatements[years[yearIndex]].balanceSheet[rows[rowIndex][0] as number] = {
                                        value: "",
                                        multipleValues: []
                                    }
                                }

                                newCompanyData.financialStatements[years[yearIndex]].balanceSheet[rows[rowIndex][0] as number].value = cellValue
                            }
                        }
                    }
                }

                for (let rowIndex = 66; rowIndex <= 92; rowIndex++){
                    if (rows[rowIndex][0] != null) {
                        for (let yearIndex = 0; yearIndex < years.length; yearIndex++){
                            const cellValue = rows[rowIndex][yearIndex + 2] ? parseNumber(rows[rowIndex][yearIndex + 2] as number).toString() : ""

                            if (cellValue !== ""){
                                if(!newCompanyData.financialStatements[years[yearIndex]]) {
                                    newCompanyData.financialStatements[years[yearIndex]] = {
                                        balanceSheet: {},
                                        incomeStatement: {},
                                        cashFlow: {}
                                    }
                                }  

                                if (!newCompanyData.financialStatements[years[yearIndex]].incomeStatement[rows[rowIndex][0] as number]){
                                    newCompanyData.financialStatements[years[yearIndex]].incomeStatement[rows[rowIndex][0] as number] = {
                                        value: "",
                                        multipleValues: []
                                    }
                                }

                                newCompanyData.financialStatements[years[yearIndex]].incomeStatement[rows[rowIndex][0] as number].value = cellValue
                            }
                        }
                    }
                }
            }

            // if (file.type === "application/vnd.oasis.opendocument.spreadsheet") {
            //     const rows = await readXlsxFile(file)
            //     console.log(rows)
            // }
        }

        dispatch(setCompanyData(newCompanyData))
    }

    const files = acceptedFiles.map((file: any) => {
        return (
            <li key={file.path}>
                {file.path} - {file.size} bytes
            </li>
        )
    })

    return (
        <div>
            <button onClick={() => open('/Template.xlsx')}>Download template</button>
            <form onSubmit={submit} style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <section className="container">
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    <aside>
                        <h4>Files</h4>
                        <ul>{files}</ul>
                    </aside>
                </section>
                <Button onClick={submit}>Upload files</Button>
            </form>
        </div>
    )
}

const UpdateYearFinancialsModal = ({
    selectedYear,
    editFinancialsModalOpen,
    setEditFinancialsModalOpen
}: {
    selectedYear: number,
    editFinancialsModalOpen: boolean,
    setEditFinancialsModalOpen: (value: boolean) => void
}) => {
    return (
        <Dialog
            open={editFinancialsModalOpen}
            onClose={() => setEditFinancialsModalOpen(false)}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '90vh',
                paddingLeft: { xs: '10px', sm: '25px' },
                paddingRight: { xs: '10px', sm: '25px' },
                paddingTop: '25px',
                paddingBottom: '25px',
                overflowY: 'auto'
            }}>
                <EditFinancialStatements year={selectedYear} closeModal={() => setEditFinancialsModalOpen(false)} />
            </Box>
        </Dialog>
    )
}

export default FinancialStatementsList