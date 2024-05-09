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

    switch (type) {

        case 'netGC':
            result = calculateNetGC(filteredTransactions);
            break;
    
        case 'totalEarnedWithoutMemos'):
            result = calculateTotal(filteredTransactions);
            break;
    
        case 'largeTransactionNear':
            result = findLargeTransactionNear(filteredTransactions, query.date);
            break;
    }

    return result;
}
```
### parseQuery(query)
* Type Detection: The function first checks what type of query is being processed. This is done by looking for specific keywords in the query string that match known patterns.
* Date Extraction: For each type of query, the function uses a regular expression (/(\d{6}\.\d{4})/g) to find matches for the date format YYMMDD.HHMM. It checks if the expected number of dates are present and throws an error if not.
* Error Handling: If the query doesn't match any expected patterns or if the necessary dates are missing, the function throws an error. 
```
function parseQuery(query) {
    const result = {
        type: '',
        startDate: '',
        endDate: '',
        date: ''
    };

    // Identify the type of query based on known patterns
    if (query.includes("net GC between")) {
        result.type = 'netGC';
        // Extract dates
        const dates = query.match(/(\d{6}\.\d{4})/g);
        if (dates && dates.length === 2) {
            result.startDate = dates[0];
            result.endDate = dates[1];
        } else {
            throw new Error("Invalid date format or missing dates for net GC calculation.");
        }
    } else if (query.includes("total earned on transactions without memos")) {
        result.type = 'totalEarnedWithoutMemos';
        // Extract dates
        const dates = query.match(/(\d{6}\.\d{4})/g);
        if (dates && dates.length === 2) {
            result.startDate = dates[0];
            result.endDate = dates[1];
        } else {
            throw new Error("Invalid date format or missing dates for transactions without memos.");
        }
    } else if (query.includes("large deposit near") || query.includes("large withdrawal near")) {
        result.type = query.includes("deposit") ? 'largeDepositNear' : 'largeWithdrawalNear';
        // Extract single date
        const date = query.match(/(\d{6}\.\d{4})/);
        if (date) {
            result.date = date[0];
        } else {
            throw new Error("Invalid date format or missing date for large transaction query.");
        }
    } else {
        throw new Error("Query type not recognized.");
    }

    return result;
}
```
### isWithinRange(transactionTime, startDate, endDate)
Determines if a transaction's timestamp is within a specified date range.
```
function isWithinRange(transactionTime, startDate, endDate) {
    const startTimestamp = parseDateToTimestamp(startDate);
    const endTimestamp = parseDateToTimestamp(endDate);
    const transactionTimestamp = parseDateToTimestamp(transactionTime);

    return transactionTimestamp >= startTimestamp && transactionTimestamp <= endTimestamp;
}

function parseDateToTimestamp(date) {
    const year = parseInt(date.substring(0, 2), 10) + 2000; // Convert YY to YYYY
    const month = parseInt(date.substring(2, 4), 10) - 1; // Month index starts from 0
    const day = parseInt(date.substring(4, 6), 10);
    const hour = parseInt(date.substring(7, 9), 10);
    const minute = parseInt(date.substring(9, 11), 10);

    return new Date(year, month, day, hour, minute).getTime();
}
```
### matchesCriteria(transaction, type)
Checks if a transaction matches the specific criteria based on the query type, such as whether it lacks a memo.
```
function matchesCriteria(transaction, type) {
    if (type === 'totalEarnedWithoutMemos') {
        return transaction.script === null;
    }
    // Add other specific criteria checks as necessary
    return true;
}
```
### calculateNetGC(transactions) 
Calculates the net GC by summing deposits and subtracting withdrawals over a range of transactions.
```
function calculateNetGC(transactions) {
    let netGC = 0;
    transactions.forEach(tx => {
        const amount = parseFloat(tx.amount.replace('GC', ''));
        if (tx.recipient === 'yourAccount') { // Assuming 'yourAccount' needs to be dynamic or set
            netGC += amount;
        } else if (tx.sender === 'yourAccount') {
            netGC -= amount;
        }
    });
    return netGC;
}
```
### calculateTotal(transactions)
Calculates the total GC for transactions that meet specific criteria, like not having a memo.
```
function calculateTotal(transactions) {
    return transactions.reduce((total, tx) => {
        const amount = parseFloat(tx.amount.replace('GC', ''));
        return total + amount;
    }, 0);
}
```
### findLargeTransactionNear(transactions, targetDate)
Finds the amount of the largest deposit or withdrawal near a specified date.
```
function findLargeTransactionNear(transactions, targetDate) {
    const targetTimestamp = parseDateToTimestamp(targetDate);
    const range = 5 * 60 * 1000; // 5 minutes in milliseconds

    const closeTransactions = transactions.filter(tx => {
        const txTimestamp = parseDateToTimestamp(tx.time);
        return Math.abs(txTimestamp - targetTimestamp) <= range;
    });

    let largestTransaction = closeTransactions.reduce((largest, tx) => {
        const currentAmount = parseFloat(tx.amount.replace('GC', ''));
        return (currentAmount > largest.amount) ? {amount: currentAmount, tx} : largest;
    }, {amount: 0});

    return largestTransaction.amount;
}
````
