import IFinancialStatement from "./IFinancialStatement"

export default interface ICompanyData {
    Id: string | null
    Name: string
    Ticker: string 
    Country: string
    WikipediaPage?: string
    Isin?: string
    Cik?: number
    Currency?: number
    IsDelisted: boolean
    FinancialStatements: {
        [key: number | string]: IFinancialStatement
    },
    AnnualReports: AnnualReports
}

export interface AnnualReports{
        [key: number | string]: {
            Filing?: string,
            Report?: string
        } 
}