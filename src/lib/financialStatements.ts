import { AnnualReports } from "src/types/ICompanyData"
import IFinancialStatement from "src/types/IFinancialStatement"

const getYearsArray = (financials: { [key: number]: IFinancialStatement }) => {
    if (financials) {
        return Object.keys(financials).map(key => Number(key)).sort()
    }

    return []
}

const getYearsArrayWithAnnualReports = (financials: { [key: number]: IFinancialStatement }, annualReports: AnnualReports) => {
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

export {
    getYearsArray,
    getYearsArrayWithAnnualReports
}