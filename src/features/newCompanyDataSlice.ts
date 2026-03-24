import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ICompanyData from 'src/types/ICompanyData'
import IFinancialStatement from 'src/types/IFinancialStatement'
import IStatementElement from 'src/types/IStatementElement'
import { StatementType } from 'src/types/IStatement'

// Define the initial state using that type
const initialState: ICompanyData = {
    Id: null,
    Name: "",
    Ticker: "",
    Country: "",
    WikipediaPage: undefined,
    Isin: undefined,
    Cik: undefined,
    Currency: undefined,
    IsDelisted: false,
    FinancialStatements: {},
    CustomFinancialsStructure: false,
    AnnualReports: {}
}

// export const newCompanyDataSlice = createSlice({
//     name: 'newCompanyData',
//     initialState,
//     reducers: {
//         setCompanyData: (state, action: PayloadAction<ICompanyData>) => {
//             state.Id = action.payload.Id
//             state.Name = action.payload.Name
//             state.Ticker = action.payload.Ticker
//             state.Country = action.payload.Country
//             state.WikipediaPage = action.payload.WikipediaPage
//             state.Isin = action.payload.Isin
//             state.Cik = action.payload.Cik
//             state.Currency = action.payload.Currency
//             state.IsDelisted = action.payload.IsDelisted
//             state.FinancialStatements = action.payload.FinancialStatements ?? {}
//             state.AnnualReports = action.payload.AnnualReports ?? {}
//         },
//         setCompanyName: (state, action: PayloadAction<string>) => {
//             state.Name = action.payload
//         },
//         setCompanyTicker: (state, action: PayloadAction<string>) => {
//             state.Ticker = action.payload
//         },
//         setCompanyCountry: (state, action: PayloadAction<string>) => {
//             state.Country = action.payload
//         },
//         setCompanyWikipediaPage: (state, action: PayloadAction<string>) => {
//             state.WikipediaPage = action.payload
//         },
//         setCompanyIsin: (state, action: PayloadAction<string>) => {
//             state.Isin = action.payload
//         },  
//         setcompanyCik: (state, action: PayloadAction<number>) => {
//             state.Cik = action.payload
//         },      
//         setCompanyCurrency: (state, action: PayloadAction<number>) => {
//             state.Currency = action.payload
//         },
//         setCompanyIsDelisted: (state, action: PayloadAction<boolean>) => {
//             state.IsDelisted = action.payload
//         },
//         addNewYear: (state, action: PayloadAction<number | string>) => {
//             state.FinancialStatements[action.payload] = {
//                 BalanceSheet: {} ,
//                 IncomeStatement: {},
//                 CashFlow: {}
//             }
//         },
//         setAnnualReportHash: (state, action: PayloadAction<{year: number | string, hash: string}>) => {
//             if (action.payload.hash == "") {
//                 const annualReports = state.AnnualReports

//                 delete annualReports[action.payload.year]

//                 state.AnnualReports = annualReports
//             }
//             else {
//                 state.AnnualReports[action.payload.year].Filing = action.payload.hash
//             }            
//         },
//         setStatementElement: (state, action: PayloadAction<{year: number | string, statement: StatementType, element: number, value: IStatementElement}>) => {
            
//             // state.financialStatements[action.payload.year]["fds" as keyof IFinancialStatement][action.payload.element] = action.payload.value
//             state.FinancialStatements[action.payload.year][action.payload.statement as keyof IFinancialStatement][action.payload.element] = action.payload.value
//         },
//         deleteYear: (state, action: PayloadAction<number | string>) => {
//             const financialStatements = state.FinancialStatements
//             const annualReports = state.AnnualReports

//             delete financialStatements[action.payload]
//             delete annualReports[action.payload]

//             state.FinancialStatements = financialStatements
//             state.AnnualReports = annualReports
//         }
//     },
// })

// export const { 
//     setCompanyData, 
//     setCompanyName, 
//     setCompanyCountry, 
//     setCompanyTicker,
//     setCompanyWikipediaPage,
//     setCompanyIsin,
//     setcompanyCik,
//     setCompanyCurrency,
//     setCompanyIsDelisted,
//     addNewYear,
//     setAnnualReportHash,
//     setStatementElement,
//     deleteYear
// } = newCompanyDataSlice.actions

// export {
//     initialState
// }

// export default newCompanyDataSlice.reducer
