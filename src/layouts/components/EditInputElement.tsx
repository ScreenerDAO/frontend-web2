import { FormControl, InputLabel, OutlinedInput, InputAdornment, Tooltip } from "@mui/material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { AutofillOperation, IElement, balanceSheetTypesNames, incomeStatementTypesNames } from "src/types/FinancialStatementsTypes";
import { useAppDispatch, useAppSelector } from "src/hooks";
import ICompanyData from "src/types/ICompanyData";
import IFinancialStatement from "src/types/IFinancialStatement";
import IStatement from "src/types/IStatement";
import IStatementElement from "src/types/IStatementElement";
import { StatementType } from "src/types/IStatement";

// import { setStatementElement } from 'src/features/newCompanyDataSlice'
// import ClearIcon from '@mui/icons-material/Clear';
// import { useStore } from "react-redux";
// import { RootState } from "src/store";
// import FunctionsIcon from '@mui/icons-material/Functions';
// import MultipleValuesModal from "./MultipleValuesModal";
// import React from "react";

// const getLabelName = (label: number, financialType: StatementType) => {
//     switch (financialType) {
//         case StatementType.BalanceSheet:
//             return balanceSheetTypesNames[label];
//         case StatementType.IncomeStatement:
//             return incomeStatementTypesNames[label];
//         case StatementType.CashFlowStatement:
//             return ""
//     }
// }

// const getValue = (value: string, valuesAsThousands: boolean) => {
//     const number = Number(value)

//     if (isNaN(number) || number === 0) {
//         return ""
//     }

//     if (valuesAsThousands) {
//         return (number / 1000000).toString()
//     }

//     return number.toString()
// }

// const getAutofillValue = (elements: IElement[], statementValues: IStatement) => {
//     let total = 0

//     for (const element of (elements ?? [])) {
//         const number = Number(statementValues[element.label]?.Value)

//         if (!isNaN(number)) {
//             if (element.operation === AutofillOperation.Add) {
//                 total += number
//             }

//             if (element.operation === AutofillOperation.Subtract) {
//                 total -= number
//             }
//         }
//     }

//     return total === 0 ? "" : parseFloat(total.toFixed(2)).toString()
// }

// const setValueFormatter = (value: string, valuesAsThousands: boolean) => {
//     if (valuesAsThousands) {
//         const number = Number(value)

//         if (isNaN(number) || number === 0) {
//             return ""
//         }

//         return (number * 1000000).toString()
//     }

//     return value
// }

// type EditInputElementProps = {
//     label: number;
//     statementType: StatementType;
//     year: number
//     valuesAsThousands: boolean
//     autofillElements?: IElement[]
// };

// const EditInputElement = ({
//     label,
//     statementType,
//     year,
//     valuesAsThousands,
//     autofillElements
// }: EditInputElementProps) => {
//     const store = useStore<RootState>()
//     const dispatch = useAppDispatch()
//     const element = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.FinancialStatements[year]?.[statementType as keyof IFinancialStatement][label])
//     const [multipleValuesModalOpen, setMultipleValuesModalOpen] = React.useState(false)

//     const setElement = (statementElement: IStatementElement) => {
//         dispatch(setStatementElement({
//             year: year,
//             statement: statementType,
//             element: label,
//             value: statementElement
//         }))
//     }

//     const openMultipleValuesModal = () => {
//         if (element && !element?.MultipleValues) {
//             const newElement = {...element}
//             newElement.MultipleValues = [element.Value]

//             setElement(newElement)
//         }

//         setMultipleValuesModalOpen(true)
//     }

//     return (
//         <>
//             <FormControl sx={{ marginTop: '10px', marginLeft: 0, width: '100%', flex: 1 }} variant="outlined">
//                 <InputLabel>{getLabelName(label, statementType)}</InputLabel>
//                 <OutlinedInput
//                     type='number'
//                     label={getLabelName(label, statementType)}
//                     endAdornment={
//                         <InputAdornment position="end">
//                             {(element?.Value ?? "") !== "" ?
//                                 <InputAdornment position="end">
//                                     <Tooltip title="Clear">
//                                         <ClearIcon
//                                             onClick={() => setElement({ Value: "", MultipleValues: null })}
//                                             sx={{ cursor: 'pointer' }}
//                                         />
//                                     </Tooltip>
//                                 </InputAdornment>
//                                 :
//                                 null
//                             }

//                             <InputAdornment position="end">
//                                 <Tooltip title="Add multiple values">
//                                     <FunctionsIcon
//                                         onClick={openMultipleValuesModal}
//                                         sx={{ cursor: 'pointer' }}
//                                     />
//                                 </Tooltip>
//                             </InputAdornment>

//                             {autofillElements ?
//                                 <InputAdornment position="end">
//                                     <Tooltip title="Autofill">
//                                         <AutoAwesomeIcon sx={{ cursor: 'pointer' }} onClick={() => {
//                                             setElement({
//                                                 Value: getAutofillValue(autofillElements, store.getState().newCompanyData.FinancialStatements[year][statementType as keyof IFinancialStatement]),
//                                                 MultipleValues: null
//                                             })
//                                         }} />
//                                     </Tooltip>
//                                 </ InputAdornment>
//                                 :
//                                 null
//                             }
//                         </InputAdornment>
//                     }
//                     value={getValue(element?.Value, valuesAsThousands)}
//                     onChange={(e) => setElement({
//                         Value: setValueFormatter(e.target.value, valuesAsThousands),
//                         MultipleValues: null
//                     })}
                    
//                     // startAdornment={
//                     //   <InputAdornment position="start">$</InputAdornment>
//                     // }
//                 />
//             </FormControl>

//             <MultipleValuesModal
//                 open={multipleValuesModalOpen}
//                 closeModal={() => setMultipleValuesModalOpen(false)}
//                 year={year}
//                 statementType={statementType}
//                 label={label}
//                 setValue={(element: IStatementElement) => {
//                     setElement({
//                         Value: setValueFormatter(element.Value, valuesAsThousands),
//                         MultipleValues: element.MultipleValues
//                     })
//                 }}
//             />
//         </>
//     );
// }

// export {
//     getLabelName,
// }

// export default EditInputElement;
