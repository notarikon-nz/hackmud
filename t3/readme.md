## t3 process

Highsec/Midsec corps never do anything to hurt you until you get to the locs. However, the deeper levels of the lowsec corps WILL activate defenses that destroy your upgrades, amongst other negative effects, if you aren't careful. Run it on your alt, period.

1. Cron your PIN brute force cracker and store the PINs in your local db. 

Note: The 4-digit PIN is not a puzzle. There's no way to find them. You *have* to brute-force them, and run this in the background (unless you want to run the same script 30+ times.

2. [Clairvoyance](https://github.com/notarikon-nz/hackmud/blob/main/t3/clairvoyance.js) pulls the username/PIN combo from your db and scrapes the information from the t3 site - og (store new), c and oss. Ensures that each pass a sacrificial upgrade in 000 slot

4. User reviews decrypted information (manual step) and retrieves passphrase, which is fed into Clairvoyance as an optionl argument to retrieve T3 locs

5. [Fireball](https://github.com/notarikon-nz/hackmud/blob/main/t3/fireball.js) your locs

6. Profit ~10B



### "Connect" puzzle:

1. in t3 corps right after pins there's a fourth corrupted option
2. it's possible to guess this option
3. so far we've discovered perform: "connect" and a_t: "m_g"
4. work: "???" is still unknown
5. whenever you try to use one of these options all you get is: `<command> currently unavailable`
6. despite years of community effort we haven't found the third command or been able to get anything besides "currently unavailable"

**possible leads**

(take all of these with a grain of salt, none of us know anything)

* work: "???" might be two short words instead of one long word
* work: "???" might have to do with some sort of corporate chat server or remote desktop
* maybe certain users on the org chart can access past "currently unavailable" but others can't
* maybe passing other args (for example, we've tried connect: true) as well as perform: "connect" or a_t: "m_g" will unlock it

**resources:**

(as always these could be scams, run at your own risk)

* net.locs
* matr1x.pin will brute pins if you have a user
* ast.decrypt, dtr.deseancrypt, and max.decrypt will all decrypt t3 strings if passed the args {key: "<decryption key>", str: "<string to decrypt>"}

info:
* work-type corps: core, context, futuretech
* a_t-type corps: light, nuutec
* perform-type corps: archaic, halperyon, sn_w
