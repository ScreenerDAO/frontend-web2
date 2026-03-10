// BALANCE SHEET
const balanceSheetTypes: { [key: number]: string } = {

    // --- ASSETS ---
    // --- Current Assets ---
    1: 'Cash and Equivalents',        // Cash, bank deposits, short-term liquid assets
    2: 'Receivables',                 // All receivables combined (accounts, notes, other)
    3: 'Inventory',
    4: 'Other Current Assets',        // Prepaid expenses, deferred tax, restricted cash, etc.
    5: 'Total Current Assets',

    // --- Non-Current Assets ---
    6:  'Net Property Plant Equipment', // Use net value; gross/depreciation rarely available in old reports
    7:  'Investments',                  // All long-term investments, loans receivable
    8:  'Intangible Assets',            // Goodwill, patents, other intangibles combined
    9:  'Other Non-Current Assets',
    10: 'Total Non-Current Assets',

    11: 'Total Assets',

    // --- LIABILITIES ---
    // --- Current Liabilities ---
    12: 'Accounts Payable',
    13: 'Short-Term Debt',              // Short-term debt + current maturities of long-term debt
    14: 'Other Current Liabilities',    // Accrued liabilities, taxes payable, deferred revenue, etc.
    15: 'Total Current Liabilities',

    // --- Non-Current Liabilities ---
    16: 'Long-Term Debt',               // Long-term debt + capital lease obligations combined
    17: 'Other Non-Current Liabilities',// Deferred tax, pension obligations, etc.
    18: 'Total Non-Current Liabilities',

    19: 'Total Liabilities',

    // --- EQUITY ---
    20: 'Paid-In Capital',              // Common stock + additional paid-in capital combined
    21: 'Retained Earnings',
    22: 'Other Equity',                 // Treasury stock, comprehensive income, minority interest, preferred stock
    23: 'Total Equity',

    24: 'Total Liabilities and Equity', // Should equal Total Assets — useful validation check
}

// INCOME STATEMENT
const incomeStatementTypes: { [key: number]: string } = {

    // --- Revenue & Profit ---
    1: 'Revenue',                       // Total revenue / net sales / turnover
    2: 'Cost of Revenue',               // Cost of goods sold, cost of sales
    3: 'Gross Profit',                  // Revenue - Cost of Revenue. Can be derived if not stated.

    // --- Operating ---
    4: 'Operating Expenses',            // All opex combined: SG&A, R&D, D&A, other
    5: 'Operating Income',              // Gross Profit - Operating Expenses. Also: EBIT if no non-op items.

    // --- Non-Operating ---
    6: 'Interest Expense',              // Net interest if income and expense not separated
    7: 'Other Non-Operating',           // FX gains/losses, equity income, one-off items
    8: 'Earnings Before Tax',           // Pre-tax profit

    9:  'Income Tax',
    10: 'Net Income',                   // Bottom line profit attributable to the company

    // --- Per Share ---
    11: 'Shares Outstanding',
    12: 'EPS',                          // Basic EPS; skip diluted for simplicity
}