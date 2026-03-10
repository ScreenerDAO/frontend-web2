import ICompanyData from "./ICompanyData";

enum AutofillOperation {
    Add,
    Subtract
}

const balanceSheetTypesNames: { [key: number]: string } = {
    1: 'Assets',
    2: 'Current assets',
    3: 'Cash and Equivalents',
    4: 'Short term investments',
    5: 'Receivables',
    6: 'Accounts receivable',
    7: 'Notes receivable',
    8: 'Other receivables',
    9: 'Total receivables',
    10: 'Inventory',
    11: 'Prepaid expenses',
    12: 'Deferred tax assets current',
    13: 'Restricted cash',
    14: 'Other current assets',
    15: 'Total current assets',
    16: 'Non-current assets',
    17: 'Property, plant and equipment',
    18: 'Gross property, plant and equipment',
    19: 'Accumulated depreciation',
    20: 'Net property, plant and equipment',
    21: 'Long term investments',
    22: 'Goodwill',
    23: 'Other intangible assets',
    24: 'Loans receivable',
    25: 'Deferred tax assets non-current',
    26: 'Other non-current assets',
    27: 'Total non-current assets',
    28: 'Total assets',
    29: 'Liabilities',
    30: 'Current liabilities',
    31: 'Accounts payable',
    32: 'Short-term debt',
    33: 'Current maturities of long term debt',
    34: 'Current income taxes payable',
    35: 'Other current liabilities',
    36: 'Total current liabilities',
    37: 'Non-current liabilities',
    38: 'Long-term debt',
    39: 'Capital lease obligations',
    40: 'Deferred tax liabilities non-current',
    41: 'Other non-current liabilities',
    42: 'Total non-current liabilities',
    43: 'Total liabilities',
    44: 'Equity',
    45: 'Common stock',
    46: 'Additional paid-in capital',
    47: 'Retained earnings',
    48: 'Treasury stock',
    49: 'Comprehensive income and other (loss)',
    50: 'Minority interest',
    51: 'Total equity',
    52: 'Total liabilities and equity',
    53: 'Preferred stock',
    54: 'Other equity',
    55: 'Accrued liabilities',
    56: 'Deferred revenue'
}

interface IElement {
    label: number;
    operation: AutofillOperation;
    final?: boolean
}

interface IElementsGroup {
    title: number;
    total: IElement;
    elements: Array<IElement | IElementsGroup>;
}

const balanceSheetStructure: IElementsGroup[] = [
    {
        title: 1,
        elements: [
            {
                title: 2,
                elements: [
                    { label: 3, operation: AutofillOperation.Add }, 
                    { label: 4, operation: AutofillOperation.Add },
                    {
                        title: 5,
                        elements: [
                            { label: 6, operation: AutofillOperation.Add }, 
                            { label: 7, operation: AutofillOperation.Add }, 
                            { label: 8, operation: AutofillOperation.Add }
                        ],
                        total: { label: 9, operation: AutofillOperation.Add }
                    },
                    { label: 10, operation: AutofillOperation.Add }, 
                    { label: 11, operation: AutofillOperation.Add }, 
                    { label: 12, operation: AutofillOperation.Add }, 
                    { label: 13, operation: AutofillOperation.Add }, 
                    { label: 14, operation: AutofillOperation.Add }
                ],
                total: { label: 15, operation: AutofillOperation.Add }
            },
            {
                title: 16,
                elements: [ 
                    {
                        title: 17,
                        elements: [
                            { label: 18, operation: AutofillOperation.Add }, 
                            { label: 19, operation: AutofillOperation.Subtract }
                        ],
                        total: { label: 20, operation: AutofillOperation.Add }
                    },
                    { label: 21, operation: AutofillOperation.Add }, 
                    { label: 22, operation: AutofillOperation.Add }, 
                    { label: 23, operation: AutofillOperation.Add }, 
                    { label: 24, operation: AutofillOperation.Add }, 
                    { label: 25, operation: AutofillOperation.Add }, 
                    { label: 26, operation: AutofillOperation.Add }
                ],
                total: { label: 27, operation: AutofillOperation.Add }
            }
        ],
        total: { label: 28, operation: AutofillOperation.Add, final: true }
    },
    {
        title: 29,
        elements: [
            {
                title: 30,
                elements: [
                    { label: 31, operation: AutofillOperation.Add }, 
                    { label: 32, operation: AutofillOperation.Add }, 
                    { label: 33, operation: AutofillOperation.Add }, 
                    { label: 34, operation: AutofillOperation.Add }, 
                    { label: 55, operation: AutofillOperation.Add },
                    { label: 35, operation: AutofillOperation.Add },
                    { label: 56, operation: AutofillOperation.Add },
                ],
                total: { label: 36, operation: AutofillOperation.Add }
            },
            {
                title: 37,
                elements: [
                    { label: 38, operation: AutofillOperation.Add }, 
                    { label: 39, operation: AutofillOperation.Add }, 
                    { label: 40, operation: AutofillOperation.Add }, 
                    { label: 41, operation: AutofillOperation.Add },
                ],
                total: { label: 42, operation: AutofillOperation.Add }
            }
        ],
        total: { label: 43, operation: AutofillOperation.Add, final: true }
    },
    {
        title: 44,
        elements: [
            { label: 45, operation: AutofillOperation.Add }, 
            { label: 53, operation: AutofillOperation.Add },
            { label: 46, operation: AutofillOperation.Add }, 
            { label: 47, operation: AutofillOperation.Add }, 
            { label: 48, operation: AutofillOperation.Subtract }, 
            { label: 49, operation: AutofillOperation.Add }, 
            { label: 50, operation: AutofillOperation.Subtract },
            { label: 54, operation: AutofillOperation.Add}
        ],
        total: { label: 51, operation: AutofillOperation.Add, final: true }
    }
]

const incomeStatementTypesNames: { [key: number]: string } = {
    1: "Revenue",
    2: "Cost of revenue",
    3: "Gross profit",
    4: "Operating expenses",
    5: "Research and development",
    6: "Selling, general and administrative",
    7: "Other operating expenses",
    8: "Total operating expenses",
    9: "Operating income",
    10: "Non-operating income and expenses",
    11: "Interest income",
    12: "Interest expense",
    13: "Equity income (loss)",
    14: "Currency exchange gain (loss)",
    15: "Other non-operating income (loss)",
    16: "Total non-operating income and expenses",
    17: "Earnings before taxes",
    18: "Income tax",
    19: "Net income",
    20: "Minority interest",
    21: "Net income to common shareholders",
    22: "Depreciation and amortization",
    23: "Other operating income",
    24: "Number shares outstanding",
    25: "Number shares diluted",
    26: "EPS outstanding",
    27: "EPS diluted"
}

interface IRatio {
    name: string
    function: (year: number, companyData: ICompanyData) => string
}

const ratios: IRatio[] = [
    {name: 'Net margin', function: (year: number, companyData: ICompanyData) => {
        const netIncome = Number(companyData.FinancialStatements[year].IncomeStatement[19]?.Value)
        const revenue = Number(companyData.FinancialStatements[year].IncomeStatement[1]?.Value)

        if (!netIncome || !revenue) {
            return "-"
        }

        const result = parseFloat((netIncome / revenue).toFixed(4))
        
        return result ? `${(result * 100).toFixed(2)}%` : "-"
    }}, 
    {name: 'Gross margin', function: (year: number, companyData: ICompanyData) => {
        const grossProfit = Number(companyData.FinancialStatements[year].IncomeStatement[3]?.Value)
        const revenue = Number(companyData.FinancialStatements[year].IncomeStatement[1]?.Value)

        if (!grossProfit || !revenue) {
            return "-"
        }

        const result = parseFloat((grossProfit / revenue).toFixed(4))

        return result ? `${(result * 100).toFixed(2)}%` : "-"
    }},
    {name: 'ROE', function: (year: number, companyData: ICompanyData) => {
        const netIncome = Number(companyData.FinancialStatements[year].IncomeStatement[19]?.Value)
        const previousEquity = Number(companyData.FinancialStatements[year - 1]?.BalanceSheet[51]?.Value)

        if (!netIncome || !previousEquity) {
            return "-"
        }

        const result = parseFloat((netIncome / previousEquity).toFixed(4))

        return result ? `${(result * 100).toFixed(2)}%` : "-"
    }},
    {name: 'ROA', function: (year: number, companyData: ICompanyData) => {
        const netIncome = Number(companyData.FinancialStatements[year].IncomeStatement[19]?.Value)
        const previousAssets = Number(companyData.FinancialStatements[year - 1]?.BalanceSheet[28]?.Value)

        if (!netIncome || !previousAssets) {
            return "-"
        }

        const result = parseFloat((netIncome / previousAssets).toFixed(4))

        return result ? `${(result * 100).toFixed(2)}%` : "-"
    }},
    {name: 'Current ratio', function: (year: number, companyData: ICompanyData) => {
        const currentAssets = Number(companyData.FinancialStatements[year].BalanceSheet[15]?.Value)
        const currentLiabilities = Number(companyData.FinancialStatements[year].BalanceSheet[36]?.Value)

        if (!currentAssets || !currentLiabilities) {
            return "-"
        }

        const result = parseFloat((currentAssets / currentLiabilities).toFixed(4))

        return result ? `${result.toFixed(2)}x` : "-"
    }},
    {name: 'Liabilities / Assets', function: (year: number, companyData: ICompanyData) => {
        const totalLiabilities = Number(companyData.FinancialStatements[year].BalanceSheet[43]?.Value)
        const totalAssets = Number(companyData.FinancialStatements[year].BalanceSheet[28]?.Value)

        if (!totalLiabilities || !totalAssets) {
            return "-"
        }

        const result = parseFloat((totalLiabilities / totalAssets).toFixed(4))

        return result ? `${result.toFixed(2)}%` : "-"
    }},
    {name: 'EBIT / Interest expense', function: (year: number, companyData: ICompanyData) => {
        const operatingIncome = Number(companyData.FinancialStatements[year].IncomeStatement[9]?.Value)
        const interestExpense = Number(companyData.FinancialStatements[year].IncomeStatement[12]?.Value)

        if (!operatingIncome || !interestExpense) {
            return "-"
        }

        const result = parseFloat((operatingIncome / interestExpense).toFixed(4))

        return result ? `${result.toFixed(2)}x` : "-"
    }}, 
    {name: 'Total debt / EBIT', function: (year: number, companyData: ICompanyData) => {
        const totalLiabilities = Number(companyData.FinancialStatements[year].BalanceSheet[43]?.Value)
        const operatingIncome = Number(companyData.FinancialStatements[year].IncomeStatement[9]?.Value)

        if (!operatingIncome || !totalLiabilities) {
            return "-"
        }

        const result = parseFloat((totalLiabilities / operatingIncome).toFixed(4))

        return result ? `${result.toFixed(2)}x` : "-"
    }},
    {name: 'Tax rate', function: (year: number, companyData: ICompanyData) => {
        const incomeTax = Number(companyData.FinancialStatements[year].IncomeStatement[18]?.Value)
        const earningsBeforeTaxes = Number(companyData.FinancialStatements[year].IncomeStatement[17]?.Value)

        if (!incomeTax ||!earningsBeforeTaxes) {
            return "-"
        }

        const result = parseFloat((100 * incomeTax / earningsBeforeTaxes).toFixed(4))

        return result ? `${result.toFixed(2)}%` : "-"
    }}
]

const cashFlowStatementTypesNames: { [key: number]: string } = {
    1: "Operating cash flow",
    2: "Net income",
    3: "Depreciation and amortization",
    4: "Deferred income tax",
    5: "Stock based compensation",
    6: "Change in working capital",
    7: "Accounts receivable",
    8: "Inventory",
    9: "Accounts payable",
    10: "Other working capital",
    11: "Other non cash items",
    12: "Cash from operating activities",
    13: "Investing cash flow",
    14: "Investments in property plant and equipment",
    15: "Acquisitions net",
    16: "Purchases of investments",
    17: "Sales maturities of investments",
    18: "Other investing activities",
    19: "Cash from investing activities",
    20: "Financing cash flow",
    21: "Debt repayment",
    22: "Common stock issued",
    23: "Common stock repurchased",
    24: "Dividends paid",
    25: "Other financing activities",
    26: "Cash from financing activities",
    27: "Effect of forex changes on cash",
    28: "Net change in cash",
    29: "Cash, beggining of the period",
    30: "Cash, end of the period",
}

interface ICustomLabel {
    name: string
    title: boolean
    parentId: number | null,
    order: number
}

const getFinancialStatementStructureFromCustomLabels = (labels: { [key: number]: ICustomLabel }): IElementsGroup[] => {
    const elementsGroups: IElementsGroup[] = []

    const labelsList = Object.keys(labels)

    for (const label of labelsList) {
        if (labels[Number(label)].title){
            elementsGroups.push({
                title: Number(label),
                elements: [],
                total: {
                    label: Number(label),
                    operation: AutofillOperation.Add
                }
            })
        }
    }

    for (const label of labelsList) {
        const labelElement = labels[Number(label)]

        if (!labels[Number(label)].title){
            const parentGroup = elementsGroups.find(group => group.title === labelElement.parentId)

            if (parentGroup) {
                parentGroup.elements.push({
                    label: Number(label),
                    operation: AutofillOperation.Add
                })
            }
        }
    }

    return elementsGroups
}

const getFinancialStatementStructureFromCustomLabelsV2 = (labels: { [key: number]: ICustomLabel }): string[] => {
    const elementsGroups: IElementsGroup[] = []

    // const labelsList = Object.values(labels)
    // labelsList.sort((a, b) => a.order - b.order)

    const labelsSorted = Object.keys(labels).sort((a, b) => labels[Number(a)].order - labels[Number(b)].order)

    return labelsSorted
}

const currencies: { [key: number]: {
    code: string
    name: string
}} = {
    1: {code: "USD", name: "United states dollar"}
}

const countries: { [key: number]: {
    name: string
}} = {
    1: {name: "United States"},
    2: {name: "Spain"}
}

export {
    balanceSheetTypesNames,
    balanceSheetStructure,
    incomeStatementTypesNames,
    cashFlowStatementTypesNames,
    currencies,
    countries,
    ratios,
    AutofillOperation,
    getFinancialStatementStructureFromCustomLabels,
    getFinancialStatementStructureFromCustomLabelsV2
}

export type {
    IElement,
    IElementsGroup,
    IRatio,
    ICustomLabel
}