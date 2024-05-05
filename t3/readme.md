## t3 process

Highsec/Midsec corps never do anything to hurt you until you get to the locs. However, the deeper levels of the lowsec corps WILL activate defenses that destroy your upgrades, amongst other negative effects, if you aren't careful. Run it on your alt, period.

1. Cron your PIN brute force cracker and store the PINs in your local db. 

Note: The 4-digit PIN is not a puzzle. There's no way to find them. You *have* to brute-force them, and run this in the background (unless you want to run the same script 30+ times.

2. [Clairvoyance](https://github.com/notarikon-nz/hackmud/blob/main/t3/clairvoyance.js) pulls the username/PIN combo from your db and scrapes the information from the t3 site - og (store new), c and oss. Ensures that each pass a sacrificial upgrade in 000 slot

4. User reviews decrypted information (manual step) and retrieves passphrase, which is fed into Clairvoyance as an optionl argument to retrieve T3 locs

5. [Fireball](https://github.com/notarikon-nz/hackmud/blob/main/t3/fireball.js) your locs

6. Profit ~10B
