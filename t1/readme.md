## T1 Scripts

I've spaced these out, renamed variables, added comments and generally unminified them for readability.

### [augury](https://github.com/notarikon-nz/hackmud/blob/main/t1/augury.js)

T1 Location Scraper

### [witch_bolt](https://github.com/notarikon-nz/hackmud/blob/main/t1/witch_bolt.js)

T1 NPC Breacher

## do it yourself

If you want to develop your own, here's a rough outline.

1. Find the names of the pages on the site, e.g. `updates` & `our_mission`

2. Find the command to select a page like `open` and the same page will give you the employyee page, e.g. `employees`

3. One of these pages will give you the `password`, save this for later

4. Next find the keyword for entering a password - will be either `p`, `pass`, `password`

5. Pull the `projects` and `usernames` from the long "blog" page

6. Now you can use all of the the above to open the `employee` page, and it will prompt you to choose a `project`.

7. Add this into your arguments, and it will reveal the locs of T1 NPCs to breach :)

Example:

```weyland.public {open:"employees",username:"curtfields0fmay",password:"endtheworld",project:"forgetme_nt"}```

And this will reveal a page containing:

```
<NULL>
<null>
abndnd_jrttl_yl4uct.info_74m2pi
<eÃpty>
<error>
<NULL>
<null>
<¦ull>
```

