# Tier 3 (T3)

Below are brief descriptions of t3-related scripts. At the bottom of the page is an overview on how to scrape t3 corps for NPC locs.

### bot_brain.js
A cron job script to automate verification and age of T3 corps

### clairvoyance.js
A skeleton for a T3 scraper - once T4 scripting is complete, will release full source code.

### password.txt
An example of the encrypted plaintext from T3 locations.

### status.js
The sister script to bot_brain.js that shows the age of T3 corps to allow targeting of fresh corps for T3 locs. In addition, uses the createTable and timeSince functions, as well as example #db usage.

---

## Scraping Process

T3 corp locs will utilise a variation on words like private, internal or employee, and will be LOWSEC, compared to T2s HIGHSEC or MIDSEC.

There will be four distinct flavours of console inside T3 corps, and these will dictate the keywords you will use to navigate the corp.

1. shell
2. archaic
3. futuretech
4. sn_w

Running an active corp location without arguments will give the following:
```
>> nuutec.1internal
NuuTec Corporation
sn_w inc employee cons_le
enter in your username and 4 digit pin to continue.
```

Our first step will be identifying a valid username. Loop through our list of usernames, and find one that asks you to provide a PIN, e.g.

```
>> nuutec.internal {username:"bobranator"}
NuuTec Corporation
sn_w inc employee cons_le
please provide pin as text.
```

At this point we start bruting the PIN - there are no clues that tell you the answer, it's a case of start at 0000 and keep checking all the way to 9999.

1. Automate this step
2. Avoid timeouts, it'll slow you down
3. Practice best code practices, garbage collections slow you down
4. Corruption is a thing, but calling decorrupt is a waste of time
5. /auto is your friend

Once you find a valid pin, you will see a screen similar to the following - the keywords inside the boxes will depend on the console flavour mentioned above:

```
>> nuutec.internal {username:"bobranator",pin:"2306"}

NuuTec Corporation

perform

+~~~~~~~~~~~+ +~~~~~~~~~~~+
+  Enhance  + + Synergize +
'~~~~~~~~~~~' '~~~~~~~~~~~'

+~~~~~~~~~~~+ +~~~~~~~~~~~+
+   Flow    + +  Á§¨¡¡ª¤  +
'~~~~~~~~~~~' '~~~~~~~~~~~'
```

Different corps will have different keywords and values, ensure that any scripting you produce can handle all scenarios. Tip: you can add all variants to the same set of arguments, and the invalid ones will be ignored.

```
perform       work          a_t
enhance       reviews       t_st
synergize     org chart     
flow          calendar      w_ek
connect       ???           m_g
```

### synergize | org chart | |
The corruption here is fixed, and cannot be removed. Take note of any usernames you have not encountered yet, and add to your master username list.

```
purple1
  frank_einstein
  ÁÃ§§¤
  carrie_on_
   ª¡¦¡¦
    ¦¡¢Á¢ 
  ¤© Á¦
  ÁÁ¤¢ª¤¨
 d4ft
  ¨¡¡¨ª
  §¦§¡ ¦ÁÃ
  pick4rluc
  ¤ ©¢¨
  wiley_curry
  Ã¤ª Á
  rey_tr4cer
   ¨Á¢ÃÃ§
  ¢§Ãª¡©©ªÁ
  ¦Á ÃÁ
  ad4m4
  ©¢¢§ÃÃª¢
  ©¦¡¡ ¢¤Á§¨
  jim_c_kirk
  ©§¢§ 
  ÃÃ§Ã Ã
  ¦Ã¢¦
  Á © 
  m_poppins
```

### flow | calendar | w_ek
The calendar accepts two arguments: d in order to move the date forward or back, e.g. d:1 (or even better d:12 - try it out) and i to view information about specific entries, e.g. i:"w01xnk"

```
>> nuutec.internal{username:"bobranator",pin:"2306",perform:"flow",date:1}
flow- 

2061AD
-D081----+D082----+D083----+D084----+
-        |        | w01xnk | th3sgh -
-        |        |        | c8kz59 -
-        |        |        |        -
-        |        |        |        -
-D085----+D086----+D087----+D088----+
- hx5h29 | ddvi8e | tha2ep | abwfzn -
- zwewgt |        |        | apl1vt -
-        |        |        | q197or -
-        |        |        |        -
-D089----+D090----+D091----+D092----+
-        | 20iiow | gurkik | ffoof5 -
-        |        |        |        -
-        |        |        |        -
-        |        |        |        -
=====================================

>> nuutec.internal{username:"bobranator",pin:"2306",perform:"flow",i:"w01xnk"}
flow- 

HNy0bcApFHWpJchkXWUvgoufIvamxpuzdGtWevGEURLYcKrahe615RHbLK4L58CDQd6uas1l1oeWusqbfstm53JeC8miwMQUiHRkepuhqNzIdFDdSvO6SSXVOc=Xfcm15RqbLK4m57a+Hs+ndcAnFL2fGsFlxcxtg3NWuIEA
```

Calendar entries (and others) are decryped using a custom (but not horrible) encryption algorithm that requires a key. In order to retrieve the key, you will need to search for an unencrypted loc within the calendar.

What we're looking for is a reference to a private storage location. Not all users will have one, but make sure you check the calendar thoroughly. Once you find it, leave the current corp for a moment, and head over there.

### reviews | enhance | t_st

Now that we have our passphrase in hand, let's return to the `reviews`. Take note of the `page` keyword at the top.

```
>>sn_w.employee_login{username:"zap_moon",pin:"2306",perform:"enhance",passphrase:"largewhitecat"}
enhance- <span color="cyan">page</span>: 0

oeTbSfCPd/hAUx9PpcZia1oudAMw§G9zyAdKV1A8gc8HXlo=vrL9XxttlKzLVVkglLPKDFMairH=VR4SV384ot0disfh1R4KiK2bzhQXjhea
Ft+4eX4nDr+IQy+3JbDaf351RRbNacCLhvBISdHXej4Sj/qltB/LeTMWhvqsuItcdXFhFc+od+91xHZWI8+xw5gnBLqrH96qaXt5CL+6Boql
RGrNBbyAOAC4eK8ZepAU
DPKlg7qZxID6drEOMYHRlARaBoG7D/mifblLBXr2¡bohaMalxh+vS8qIF=afjM5LFI=nfrkRccizdwAi/YJ207FXOXWL5zr=dstHcMC0wRpA
tQIJVVcTnMWiUvEgKNtxwLK4wRIuIha1SRkbWWAOkXWxzOEqHyb5wgO¤TSLLGAm9TvhuKhtvls8mzygkE+L4wwMEYV4Ui=auTvHbchQ+vX8G
1BgkHsL+VgpkYlQPnram0JzfXwW3zQ3MWhcfI=R=Sv9b
broken staff. LAZY. appears uninterested in new duties. FFFFF! NOHIRE. -rockyK¢`b`
FMNsbHFv0NLddXF+PRrNBH51P9orE79oy5tehvamdXuLiNy0e76aEd1Id3RkTyrWib+JSdtpD7Gkv9Q0fa9htZCYjvJqa7zoGcuxdYeqFCTc
dBAU
DdBNhnG8PItrh=Gxc¢6bE++IB7+1d98Nh9+5NHaH/yg¡AelheKzÁF4HMg766d9xeOvl5bHqoSdÃmE7Buun4PFd2Je4K6PMgrhPW4JcyfIymI
D8SpuN=eRoq1dYiHBhEnC/17Jc4XH9SWNLCYgMQZg/F0ZDVemVZIQxPiEMCU
mMIPKQ81pT/KOwRxQeOc0ncgSBIgxeU8CCtGz1bvTimAcwOp0c1umgoedfcvVBb111vuVuWGcQbgH8ktSA9vgvIvXhoA1WbjWhMPLNbb
tRxgbRPxuMPbYho+dAdda2A+dAduDFg/tw44Y1o8vs88W1kvdb=KDFo+kbPJX§jLmK3EURA¦ksH5UyIQjrv9ziQeScXj1BfLlLmixSIeVsWd
jNAL88JqzxkzFgqsvuD2DMViHBGBV2j8qBO¦Vmf9Eo7/
FMNsbbnv0Nu6ZrFfEsNqaDMW+ahHY21WBq+7YzW5AaiIblqI/d+IV1aCJ¨H+YlmaKNH5ZlWoKgÃ7WX51G+yTxXC4OCP4CbWH/Á9uBXCLQ9oy
BXC4wt120nChlog2FbityND6FPOh
```

Cycle through each of the pages, and if you're lucky (i.e. someone hasn't beaten you to it), you'll discover one or more unencrypted T3 NPC locations.

```derelict_ddttl_n47haw.pubinfo_a8jwh6```

### connect | ??? | m_g
In the initial screen there is a fourth corrupted option - it's possible to guess this option, so far we've discovered perform: "connect" and a_t: "m_g". work: "???" is still unknown.

Whenever you try to use one of these options, the only response you get is: `<command> currently unavailable`

Despite years of community effort we haven't found the third command or been able to get anything besides "currently unavailable". Several users have offered bounties in the trillions of GC for the discovery, if you discover a solution let them know in the HackMUD discord!
