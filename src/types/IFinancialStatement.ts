import IStatement from "./IStatement"

export default interface IFinancialStatement {
    BalanceSheet: IStatement
    IncomeStatement: IStatement
    CashFlow: IStatement
}