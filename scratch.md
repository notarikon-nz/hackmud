## T3

Note: Perform actions with upgrades you can afford to lose in the lowest slots. Some actions may result in the upgrades loaded in `000` being destroyed

Over time, you will want to run CRON jobs to retrieve information for you and store in your personal database to save time.

### Steps

1. Scan for T3 sites using your preferred tool - `notarikon.t2` or `zez.t3_view`

2. Scan for the available users on your chosen site `notarikon.t3 {scan:true }`

3. Retrieve the PIN for your first user, brute force if you don't have a CRON job set up to do this while you sleep `notarikon.t3 {s:#s.site.private,u:"username"}` - note: the word pin is never corrupted so you can run a normal `s.call` to test

4. Once you login with the correct username & pin combination, you will see a member panel:

```
work

/-----------| /-----------| 
|  REVIEWS  | | ORG CHART |
|-----------/ |-----------/

/-----------| /-----------| 
|  CALENDAR | |  Á©Ã ©¨Ã  |
|-----------/ |-----------/
```

5. Open the Org Chart with `site.private {username:"username",pin:"pin",work:"org chart"}` and add any usernames to your username list in your database or lib file

6. Open the Calendar with `site.private {username:"username",pin:"pin",work:"calendar"}` and you will see a page like:

```
calendar- 

2061AD
-D099----+D100----+D101----+D102----+
- pkh1oh |        |        | pngabc -
-        |        |        |        -
-        |        |        |        -
-        |        |        |        -
-D103----+D104----+D105----+D106----+
- taza59 |        |        |        -
-        |        |        |        -
-        |        |        |        -
-        |        |        |        -
-D107----+D108----+D109----+D110----+
-        |        | nn5m8s |        -
-        |        | o9qgze |        -
-        |        | a6b4oe |        -
-        |        |        |        -
=====================================
```

There are two parameters: `a_t:"w_ek",d:"1"` whick can control the view as well. More research required

7. View each of the calendar entries using the `i` parameter `site.private {username:"username",pin:"pin",work:"calendar",i:"pkh1oh"}` - inside each of these will be one of three entries:

a. An encoded string that we will use the key from our private store to decode

```
```

b. A list of usernames that have available PINs on this server (not sure yet if the pink asterisk indicates anything important)

```
```

c. A link to a "private store" location

```
```

9. Visit the private store and using your username and pin. Load expendable scripts into your first few upgrade slots.

10. Check each of the files listed, and they will either a) destroy an upgrade or b) reveal encoded information, examples below:

file_7b_27_6i_12.dat

```
At+last+he+dreamt+one+night+that+he+found+a+beautiful+purple+flower+and+that+in+the+middle+of+it+lay+a+costly
+pearl/+and+he+dreamt+that+he+plucked+the+flower+and+went+with+it+in+his+hand+into+the+castle+and+that+everyt
hing+he+touched+with+it+was+disenchanted+and+that+there+he+found+his+Jorinda+again/
```

DATA_26_acc4c2ea.txt

```
HWKrT3MTMHCoMzX1+mMhUyAzslQZzzZPVPoysaGbH8MzUI8TzjEPHCoMmeyAkazWpT0PTmpw0MTPWDuKTFs3vsSGa3AWnmUoUE2Usr0EeGV3T
vVz3H1lTimkBEQUmUHEadWTH3MgGsqAIeRTs9nzYQ33EImXk7wIQToTlVTO8UEWcGsx5sdPMH0PTmdkAQdWaH6lnUs60yMmbyDjPTLHFoQRJH
1vZbGLT0PTmUojPPPQ28sdHswHEQGQx2FsEPyAksPN30ysRJyAkslCaTzWjPLoksPPLHBWdPswHEbKVnT3IUsp4sTTLHFpbWmy9lsiJWDnPim
WxlsRQVm0XiKWxTvcGszDyXQaoUEAdswDjPzJkBEJTGVTkWcGso4KaCQw0LzVPoTzdWTH+msuZk9rMca30pVbQ10ENPTs8vZTmessTzxskyPX
GdoUEiTMkzpVIss9EbWMHB0MeUHwsZTCLHEUPTSoks+mes7TzRQy9lTTskTuMYs6w5sTfz7vZTm49rVdYVTwWlGZ2EIcFs49NdNLHCvzVPoT3
WTTnT0PTsn0lXTU3TtghVMApMhmWpEKgGI34Wcn
```

There will also be a `password.txt` file that will contain an encoded image. Decoding this will reveal your passphrase for use in the `ORG CHART` section on the main T3 site.

11. Once you've decoded these files, return to the main site, and visit `site.private {username:"username",pin:"pin",work:"org chart",passphrase:"passphrase"}`

12. Enjoy your T3 locs, and watch yourself :)


Hints:

ball, cat, bird, house, car, dog
black, yellow, blue, green, white, red, orange, pink


110_146_13<corrupt char>_305.dat
```
His+manner+was+not+effusive/+It+seldom+was/+but+he+was+glad+I+think+to+see+me/+With+hardly+a+word+spoken+but+
with+a+kindly+eye+he+waved+me+to+an+armchair+threw+across+his+case+of+cigars+and+indicated+a+spirit+case+and+
a+gasogene+in+the+corner/+Then+he+stood+before+the+fire+and+looked+me+over+in+his+singular+introspective+fash
ion/
```

