import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ICompanyData from 'src/types/ICompanyData'

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
    AnnualReports: {}
}

export const companyDataSlice = createSlice({
    name: 'companyData',
    initialState,
    reducers: {
        setCompanyData: (state, action: PayloadAction<ICompanyData>) => {
            state.Id = action.payload.Id
            state.Name = action.payload.Name
            state.Ticker = action.payload.Ticker
            state.Country = action.payload.Country
            state.WikipediaPage = action.payload.WikipediaPage
            state.Isin = action.payload.Isin
            state.Cik = action.payload.Cik
            state.Currency = action.payload.Currency
            state.IsDelisted = action.payload.IsDelisted
            state.FinancialStatements = action.payload.FinancialStatements
            state.AnnualReports = action.payload.AnnualReports 
        },
    },
})

export const { 
    setCompanyData, 
} = companyDataSlice.actions

export {
    initialState
}

export default companyDataSlice.reducer