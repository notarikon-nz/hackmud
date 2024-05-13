## How to Determine NPC Difficulty and Upgrades
NPC scripts have a specific format:

Name

The name will always be one of the following:

* abandoned
* abndnd
* anon
* anonymous
* derelict
* uknown
* unidentified
* unknown

Keep in mind that it is possible for users to choose usernames designed to look like an NPC account.

### Rating

The next two characters determine the rating of the NPCs system. The higher the rating, the more locks the system has. See System Rating in the README for more information.

* jr: Junkrack
* dd: Diggerdeck
* wb: Wreckbox
* pr: Phreakrig
* ls: Leetstack

The rating of the system is based on how many locks are loaded and their quality. Lock quality is calculated as 2^(lockTier)+LockRarity So a grey EZ_40 lock (tier1, 0 rarity) is worth 2 points towards system rating. Possible system ratings and their points ranges are:

Junkrack (jr): 0-17
Diggerdeck (dd): 18-29
Wreckbox (wb): 30-42
Phreakrig: (pr): 43-69
Leetstack (ls): 70+

### Class

The class of an NPC is determined by what type of upgrades are loaded, and by extension what loot they will drop when breached.

* wvr: Most of your upgrades are architect class
* ttl: Most of your upgrades are locks.
* wlf: Most of your upgrades are infiltrator class.
* rvn: Most of your upgrades are scavenger class.
* stg: Most of your upgrades are executive class.

### Address

This is the unique identifier for the loc. It's always 6 alphanumeric characters.

Example Loc:

`unknown_jrttl_yn0hlo.pubinfo_00bcts`

This NPC has a junkrack rating, and is classed as a turtle.

### How to Determine the Difficulty of a Loc

While there's no way to determine the exact makeup of a loc's defenses, you can get a general idea by running:

`scripts.get_access_level{name: "<loc>"}`

**FULLSEC**
FULLSEC locs have either already been breached or are defended by only Tier 1 locks.

**MIDSEC**
MIDSEC locs are defended by a sn_w_glock (at a minimum).

**LOWSEC/NULLSEC**
NULLSEC locs are defended by locks capable of stealing your upgrades or worse.

