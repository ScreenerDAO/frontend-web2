import IFinancialStatement from "./IFinancialStatement"

export default interface ICompanyData {
    id: string | null
    companyName: string
    ticker: string 
    country: string
    wikipediaPage?: string
    isin?: string
    cik?: number
    currency?: number
    isDelisted: boolean
    financialStatements: {
        [key: number | string]: IFinancialStatement
    },
    annualReports: {
        [key: number | string]: string 
    }
}