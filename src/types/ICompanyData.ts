import { IChartLabel } from "src/layouts/components/FinancialStatements/FinancialStatements"
import { ICustomLabel } from "./FinancialStatementsTypes"
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
    IsDelisted: boolean,
    CustomFinancialsStructure: boolean,
    CustomLabels?: {
        [key: number | string]: ICustomLabel
    },
    CustomRatios?: ICustomRatio[],
    DefaultSelectedLabels?: IChartLabel[],
    FinancialStatements: {
        [key: number | string]: IFinancialStatement
    },
    AnnualReports: AnnualReports
}

export interface AnnualReports{
    [key: number | string]: string[]
}

export interface ICustomRatio {
    Title: string,
    Numerator: number,
    Denominator: number,
    Statement: string,
    Type: string,
    Percentage: boolean
}