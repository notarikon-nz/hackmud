## T2 Scripts

### [web](https://github.com/notarikon-nz/hackmud/blob/main/t2/web.js)

Lists active T2/T3 domains

### [arcane_lock](https://github.com/notarikon-nz/hackmud/blob/main/t2/arcane_lock.js)

T2 Location Scraper

### [knock](https://github.com/notarikon-nz/hackmud/blob/main/t2/knock.js) (coming soon)

T2 NPC Breacher

* Currently a skeleton for users to attempt to implement themselves
* Ensure that before each MIDSEC run, 0GC is in account for Glock mitigation. HIGHSEC does not require this measure.
* You need to have a free upgrade slot for loading & unloading keys to handle l0ckbox
* Ideally, the ability to search for & buy keys from the market should be a feature
* You need a bank script on an alt for sending you GC for glock or macros set up.
   * Mine automatically transfers the correct amount to me within the script, this definitely recommended due to the delay of logging to an alt

 ```
/beast = accts.xfer_gc_to { to:"<user>", amount:"666GC" }
/elite = accts.xfer_gc_to { to:"<user>", amount:1337 }
/hunter = accts.xfer_gc_to { to:"<user>", amount:3006 }
/magician = accts.xfer_gc_to { to:"<user>", amount:"1K89GC" }
/meaning = accts.xfer_gc_to { to:"<user>", amount:"42GC" }
/monolithic = accts.xfer_gc_to { to:"<user>", amount:"2K1GC" }
/secret = accts.xfer_gc_to { to:"<user>", amount:7 }
/secure = accts.xfer_gc_to { to:"<user>", amount:"443GC" }
/special = accts.xfer_gc_to { to:"<user>", amount:38 }
```
