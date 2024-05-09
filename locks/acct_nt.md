# acct_nt

To tackle the acct_nt lock in HackMUD, you'll need to carefully process transaction data based on the specific requirements outlined in each puzzle prompt. 
The key will be parsing the transaction log, calculating the required values, and handling the specifics of date ranges and potential duplications.
Here's a strategy breakdown:

## 1. Calculating Net GC Between Dates
Objective: Calculate the net amount of GC (Gold Coins) over a specified period.

Approach: Sum all deposits and subtract all withdrawals between the given start and end dates. Ensure to convert transaction timestamps and amounts properly for accurate calculations.

## 2. Total Earned on Transactions Without Memos
Objective: Sum the GC for transactions that do not have memos within a specified date range.

Approach: Filter transactions to those without a 'script' field (or where it's null) and within the specified date range. Sum the amounts of these filtered transactions.

## 3. Amount of a Large Deposit/Withdrawal Near a Date
Objective: Identify a significant deposit or withdrawal near a specified date.

Approach: Identify transactions that are within +/- 5 minutes of the given timestamp. For large transactions, you might need to determine a threshold that qualifies as "large" based on the context or previous transactions.

## Handling Date and Transaction Variability
Date Parsing: Convert the YYMMDD.HHMM format into a comparable timestamp format to facilitate date range comparisons.

Transaction Selection: Use the formulas for startDateIndex and endDateIndex to determine which transactions to consider. Adjust based on the 'offset' and 'range' provided, if available.

Dynamic Updates: Since transaction logs can update and affect outcomes, your script should handle changes dynamically, possibly re-running calculations as needed when a transaction happens during your session.

## Scripting Tips
Test your scripts with various scenarios to ensure they handle edge cases, especially around the start and end of date ranges and handling transactions that may or may not count based on memos and other criteria.

## Example Code
```
function solveAcctNt(transactions, query) {
    let result = 0;
    const {type, startDate, endDate} = parseQuery(query);
    const filteredTransactions = transactions.filter(tx => 
        isWithinRange(tx.time, startDate, endDate) && matchesCriteria(tx, type)
    );

    if (type === 'netGC') {
        result = calculateNetGC(filteredTransactions);
    } else if (type === 'totalEarnedWithoutMemos') {
        result = calculateTotal(filteredTransactions);
    } else if (type === 'largeTransactionNear') {
        result = findLargeTransactionNear(filteredTransactions, query.date);
    }

    return result;
}

function parseQuery(query) {
    // Parse the query to extract type, dates, and other parameters
}

function isWithinRange(transactionTime, startDate, endDate) {
    // Convert transactionTime to a comparable format and check if it's within the range
}

function matchesCriteria(transaction, type) {
    // Check if the transaction matches the specific criteria based on the query type
}

function calculateNetGC(transactions) {
    // Calculate net GC by summing deposits and subtracting withdrawals
}

function calculateTotal(transactions) {
    // Calculate total for transactions that meet the specific criteria
}

function findLargeTransactionNear(transactions, targetDate) {
    // Find and return the amount of the largest transaction near the target date
}
```
