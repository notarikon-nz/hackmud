## Contents

* [Tier 1](#tier-1)
  * [CON_TELL](#con_tell)
  * [w4rn_er and w4rn](#w4rn_er-and-w4rn)
  * [EZ_21](#ez_21)
  * [EZ_35](#ez_35)
  * [EZ_40](#ez_40)
  * [c001](#c001)
  * [c002](#c002)
  * [c003](@c003)
  * [l0cket](#l0cket)
  * [DATA_CHECK](#data_check)
* Tier 2
  * [DATA_CHECK](#)
  * [CON_SPEC](#con_spec)
  * [magnara](#magnara)
  * [l0ckbox](#l0ckbox)
  * [acct_nt](#acct_nt)
  * [sn_w_glock](#sn_w_glock)

## Tier 1

### CON_TELL

The `CON_TELL` lock isn't a lock in the tranditional sense. You can't break a `CON_TELL` lock, you can only move past it.

When you encounter a `CON_TELL` lock, the lock will send a `chats.tell` to the owner of the lock and alert them that a breach is in progress.

In order to get past a `CON_TELL` lock, simply call the system you're trying to breach again.

The main purpose of this lock (and others like it) is to eat up the execution time of any automated scripts that are attempting to breach the system. In this case, `CON_TELL`'s use of `chats.tell` takes up several ms of execution time (depending on server load). The more time the script wastes getting past these locks, the less time it has to attempt to breach the real locks guarding the system.

### w4rn_er and w4rn

The `w4rn_er` and `w4rn` locks aren't a lock in the tranditional sense. You can't break them, you can only move past them.

When you encounter one of these locks, the lock will display a warning message to the attacking system. The content of the message can be changed by loading the `w4rn_message` upgrade.

Originally, the length of a `w4rn_message` wasn't limited, so clever weavers[^1] could send massive amounts of data to the attacking system. This would make it almost impossible to play the game or even crash the client. Now, the message is limited to 100 characters.

The only way you can use `w4rn` as a defense is by displaying a fake denied access message for lock you don't have and hope that whatever script is running against your system reads that line and gives up instead of the actual system message that appears right after it.

If any user does load a `w4rn` on their system, they do it to post memes and insults to their attacker.

**The above are mentioned as any PVP breacher will want to account for these**

### EZ_21

To break an `EZ_21` lock, you need to provide one of three possible unlock commands: 

``` `open`, `release`, or `unlock`. ```

An attempt at breaking an `EZ_21` lock might look something like this:

```abandoned_jrttl_walker.info_xk490x{EZ_21: "unlock"}```

### EZ_35

To break an `EZ_35` lock, you need to provide one of three possible unlock commands:

``` `open`, `release`, or `unlock`.  ```

The lock also requires a digit parameter with a value between 0 and 9 (inclusive).

An attempt at breaking an `EZ_35` lock might look something like this:

```abandoned_jrttl_walker.info_xk490x{EZ_35: "unlock", digit: 5}```

### EZ_40

To break an `EZ_40 lock`, you need to provide one of three possible unlock commands:

``` `open`, `release`, or `unlock` ```

The lock also requires an `ez_prime` parameter with a value being a prime number between 2 and 97 (inclusive).

An attempt at breaking an `EZ_40` lock might look something like this:

``` abandoned_jrttl_walker.info_xk490x{EZ_40: "unlock", ez_prime: 31} ```

Possible prime numbers are:

```2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, and 97. ```

### c001
To break a `c001` lock, you need to provide the correct color from the Hackmud color wheel:

```    
0 red
1 orange
2 yellow
3 lime
4 green
5 cyan
6 blue
7 purple
```

Please note that the order of these colors is important. The lock also requires a `color_digit` parameter with a value equal to the number of characters in the correct color for the lock.

An attempt at breaking an `c001` lock might look something like this:

``` abandoned_jrttl_walker.info_xk490x{c001: "red", color_digit: 3} ```

### c002

To break a `c002` lock, you need to provide the correct color from the Hackmud color wheel:

```    
0 red
1 orange
2 yellow
3 lime
4 green
5 cyan
6 blue
7 purple
```

Please note that the order of these colors is important. The lock also requires a `c002_complement` parameter that equals the complementary color of the `c002` lock.

To calculate the value of `c002_complement`, use the following formula:

```javascript
(colorIndex + 4) % 8;
```

`colorIndex` is the index of the correct color for the `c002` parameter. If `red` has an index of 0, `green` has an index of 4. `(4+4) % 8` equals `0`, which means the complementary color of `green` is `red`.

An attempt at breaking an `c002` lock might look something like this:

``` abandoned_jrttl_walker.info_xk490x{c002: "green", c002_complement: "red"} ```

### c003
To break a `c003` lock, you need to provide the correct color from the Hackmud color wheel:

```    
0 red
1 orange
2 yellow
3 lime
4 green
5 cyan
6 blue
7 purple
```

Please note that the order of these colors is important. The lock also requires a `c003_triad_1` parameter and a `c003_triad_2` parameter. lock.

To calculate the value of `c003_triad_1`, use the following formula.

```javascript
(colorIndex + 5) % 8;
```

To calculate the value of `c003_triad_2`, use the following formula.

```javascript
(colorIndex + 3) % 8;
```    

If `red` has an index of 0, `green` has an index of 4. `(4+5) % 8` equals `1` and `(4+3) % 8` equals `7` which means the complementary colors of `green` are `orange` and `purple`.

An attempt at breaking an `c003` lock might look something like this:

```abandoned_jrttl_walker.info_xk490x{c003: "green", c003_triad_1: "orange", c003_triad_2: "purple"}```

### l0cket

To break a `l0cket` lock, you'll need a list of passwords. These passwords can be obtained by finding or purchasing `k3y_v<number>` upgrades. The number after the v represents the tier of the upgrade. Each key contains a possible password that can be used to unlock a locket lock. To view the password in a security `k3y`, use `full: true` when viewing upgrades:

```sys.upgrades{i: <index of upgrade>, full: true}```

You'll see a `k3y` field in the response. The value of that field is the password. If you're having trouble finding `k3y_v<number>` upgrades, you can find them on the marketplace:

```market.browse{name: "k3y_v1"}```

You don't even need to purchase them to view the passwords they contain:

```market.browse({i: <token or array of tokens>})```

This will show you all the fields stored in the security `k3y` upgrade, including any passwords. You can also use the [utility/keychain.js](https://github.com/notarikon-nz/hackmud/blob/main/utility/keychain.js) script to automate this process for you.

Here are all the possible passwords for a Tier 1 `l0cket` lock:

```
vc2c7q
cmppiq
tvfkyq
uphlaw
6hh8xw
xwz7ja
sa23uw
72umy0
```

An attempt at breaking a l0cket lock might look something like this:

```abandoned_jrttl_walker.info_xk490x{l0cket: "vc2c7q"}```

### DATA_CHECK

When you encounter a `DATA_CHECK` lock, you'll receive the standard "Denied Access" message like any other lock. First, pass in an empty string:

```abandoned_jrttl_walker.info_xk490x{DATA_CHECK: ""}```

This will trigger the lock and cause it to return the three questions it wants you to answer:

```
did you know is a communication pattern common to user ++++++
a ++++++ is a household cleaning device with a rudimentary networked sentience
according to trust, ++++++ is more than just following directives
```

Ignore number of + in each blank: they're the same length regardless of how many characters are in the answer. When answers to a `DATA_CHECK` lock, combine each answer into a single word.

An attempt at breaking a `DATA_CHECK` lock might look something like this:

```abandoned_jrttl_walker.info_xk490x{DATA_CHECK: "fran_leerobovacsentience"}```

You have several options in order to lookup your information, regex, includes, hashcode or public lib.

## Tier 2

### DATA_CHECK (T2)

### CON_SPEC

### magnara

### l0ckbox

The `l0ckbox` lock requires that you have a certain k3y_v[1,2,3,4] upgrade loaded in order to break it. When you encounter a l0ckbox lock, it will generate a message like:

```To unlock, please load the appropriate k3y: i874y3```

In order to unlock the lock, this upgrade will need to be loaded on your system:

```sys.manage{load: 12}```

Unlike most locks, l0ckbox doesn't announce itself with a traditional "Denied access by" message, making it harder to detect using standard regular expressions. Instead, check the lock response for k3y: and attempt to capture what comes after the colon.

Any breaching script you write will have to be lowsec or lower in order to manage what upgrades are available on the caller's system. See [utility/keychain.js](https://github.com/notarikon-nz/hackmud/blob/main/utility/keychain.js) for a script to check which keys you have & need.

### acct_nt

The `acct_nt` lock is by far one of the most difficult T2 locks to crack. It requires you to run `accts.transactions`, review the deposits and withdrawls and then provide whatever amount it's asking for as the answer. This may require multiple runs of the breach script to get the correct answer.

Possible acct_nt puzzles are:

```
What was the net GC between <start> and <end>
Need to know the total earned on transactions without memos between <start> and <end>
Need to know the total earned on transactions without memos between <start> and <end>
Get me the amount of a large deposit near <date>
Get me the amount of a large withdrawal near <date>
```

For example:

```
What was the net GC between 220515.0118 and 220518.0517
Need to know the total earned on transactions without memos between 220515.0118 and 220518.1457
Need to know the total earned on transactions without memos between 220515.0118 and 220518.1457
Get me the amount of a large deposit near 220518.1458
Get me the amount of a large withdrawal near 220519.1910
```

All dates will be in `YYMMDD.HHMM` format. Here's what is known so far:

1. The most transactions that a lock can look at is the last 16
2. If there are duplicate transactions on the same date, it could be referencing any of them to create the answer
3. "near" can mean any transaction +/- 5 from the chosen date
4. The number of transactions it reviews is based on the `acct_nt_min` property of the lock

Research has shown that `acct_nt` uses one of the following formulas to choose the range of indexes it's going to use when building the answer:

```
startDateIndex to endDateIndex
startDateIndex + 1 to endDateIndex
startDateIndex to endDateIndex - 1
startDateIndex + 1 to endDateIndex -1
```

The best way for you to break this lock by hand is to:

1. Keep a 0GC balance on your account
2. Flood your transaction list

To flood your transaction list, transfer 1GC back and forth between your accounts until you have 16 total transactions (8 deposits and 8 withdrawls, one after the other). By doing this, you'll guarantee that the answer for the acct_nt lock will always be either 0GC or 1GC. It'll look a little like this when you're done:

<details> 
  <summary>Reveal Code</summary>
  <code>
{
"time": "220520.2246",
"amount": "1GC",
"sender": "account1",
"recipient": "account2",
"script": null
},
{
"time": "220520.2246",
"amount": "1GC",
"sender": "account2",
"recipient": "acount1",
"script": null
}
{
"time": "220520.2246",
"amount": "1GC",
"sender": "account1",
"recipient": "account2",
"script": null
},
{
"time": "220520.2246",
"amount": "1GC",
"sender": "account2",
"recipient": "acount1",
"script": null
}
{
"time": "220520.2246",
"amount": "1GC",
"sender": "account1",
"recipient": "account2",
"script": null
},
{
"time": "220520.2246",
"amount": "1GC",
"sender": "account2",
"recipient": "acount1",
"script": null
}
  </code>
</details>

### sn_w_glock

All MIDSEC and lower targets will contain a `sn_w_glock`, so before attempting to breach (or automatically doing so in your script) you should set your account balance to 0. If you provide it with an incorrect answer, it will take money from your account. The higher tier versions of the lock will take more money than lower tiers. There is a good chance you could lose everything.

A T2 MIDSEC `sn_w_glock` will usually take several million GC - this is one reason to artificially limit the execution time of T2 breachers, as it will call repeatedly while the script is running.

To set your account balance to zero, first run:

```accts.balance{}```

Then, transfer that balance to your alt account:

```accts.xfer_gc_to{to: "<alt username>", amount: "<amount as number or GC string>"}```

Next, call the lock with an empty string:

```abandoned_jrttl_walker.info_xk490x{sn_w_glock: ""}```

You'll receive a response that contains one of the following key words:

```
beast
elite
hunter
magician
meaning
monolithic
secret
secure
special
```

The lock wants you to have a specific balance in your account. If you have a balance other than the one it wants it will steal GC from your account.

Based on the keyword, here's the balance that's required.

|String	|Amount	|Reference |
| --- | --- | --- |
|beast	|666GC	|Mark of the beast |
|elite	|1337GC	|leet |
|hunter	|3K006GC	|30.06 hunting rifle caliber |
|magician	|1K89GC	|Magic number |
|meaning	|42GC	|Hitch Hiker's Guide to the Galaxy |
|monolithic	|2K1GC	|2001 Space Odyssey |
|secret	|7GC	|007 Secret Agent |
|secure	|443GC	|443 is SSL/HTTPS (which is more secure than HTTP) |
|special	|38GC	|.38 Special |

To make it easier to quickly transfer money between accounts, set up the following macros on your alt. Set <username> to the user that you use to hack:

```
/beast = accts.xfer_gc_to { to:"<username>", amount:"666GC" }
/elite = accts.xfer_gc_to { to:"<username>", amount:1337 }
/hunter = accts.xfer_gc_to { to:"<username>", amount:3006 }
/magician = accts.xfer_gc_to { to:"<username>", amount:"1K89GC" }
/meaning = accts.xfer_gc_to { to:"<username>", amount:"42GC" }
/monolithic = accts.xfer_gc_to { to:"<username>", amount:"2K1GC" }
/secret = accts.xfer_gc_to { to:"<username>", amount:7 }
/secure = accts.xfer_gc_to { to:"<username>", amount:"443GC" }
/special = accts.xfer_gc_to { to:"<username>", amount:38 }
```

[^1]: See [npcs.md](https://github.com/notarikon-nz/hackmud/main/npcs.md) for more information
