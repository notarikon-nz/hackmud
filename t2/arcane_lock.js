function(context, args){//t:#s.corpname.hidden

  // TO DO
  // FILTER & SORTING

  if (context.caller.includes("notarikon") == false) return;

  let t = args.t,
      u = args.u,
      r = "",
      o = "T2 Helper 0.1.0\n"

	let safe = t.call({})
	if (safe.ok == false)
		return "Incorrect Loc Format"

	if (safe && safe.includes("kernel.hardline"))
		return {ok:false, msg:"Hardline required - activate with kernel.hardline"}

	let rating_short = "jr,dd,wb,pr,ls".split(","),
	    rating_long = "`0junkrack`,`1diggerdeck`,`2wreckbox`,`3phreakrig`,`4leetstack`".split(","),
        class_short = "wvr,ttl,wlf,rvn,stg".split(","),
        class_long = "`Narchitect`,`Olocks`,`Pinfiltrator`,`Qscavenger`,`Sexecutive`".split(","),
        s = ["NULLSEC","LOWSEC ","MIDSEC ","HIGHSEC","FULLSEC"],
        rst = "unknown",
        // um = "",
        lm = "",
        eo = 0

    // first, find the username type
    var p1 = decorrupt()

    u = p1.indexOf("username") > -1 ? "username" : p1.indexOf("user") > -1 ? "user" : "u"

    o += "\n[1] Keyword: " + u + "\n"
    
    let users = new Set(
        #fs.notarikon.lib({get:"usr"}) // list of known usernames
    ),
        active = new Set(),
        verified = new Set(),
        regex_key = /[a-z]/g,
        a = "",
        key = "",
        first = 1

    users.forEach(handle => {
        const args = {username:handle}
        const r = decorrupt (args)
        if (r.includes("faq")) {
            if (first) {
                key = r.split("\n")[2]
                key = key.substring(2,key.length-1)
                first = 0
            }
            active.add(handle)
        }
    })

    const user_list = [...active].map((handle, index) => {
        const paddedHandle = handle.padEnd(24, " ")
        return (index % 3 === 2) ? `  ${paddedHandle}\n` : `  ${paddedHandle}`
    }).join("");

    o += "\n[2] Keyword: " + key + "\n"
    o += "\n[3] current users  (" + active.size + ")\n"
    o += user_list

    let loc_set = new Set(),
        early = false

    let count = 0

    // for each active user, get the locs from their QRs
    for (const handle of active) {
    
        if ((Date.now() - _START) > 4500) break;

        a = {} // username:handle,key:"faq"}
        a [u] = handle
        a [key] = "faq"
        r = t.call(a)

        var regex = /order_qrs/
        if (r.indexOf("order_qrs") > -1 || regex.test(r)) {
            
            a[key] = "order_qrs"

            r = t.call(a)

            if (r) r = #fs.dtr.qr( {t:t,a:a} ) // r = #fs.notarikon.qr_decode ( {t:t,a:a} ) // dtr is faster for now

            var jsonArray = r
            var idArray = []
            
            jsonArray.forEach(jsonObject => {
                if (jsonObject.id) idArray.push(jsonObject.id)
            });

            for (var i in idArray) {
                a[key] = "cust_service"
                a["order_id"] = idArray[i]

                var locs = decorrupt(a).split(" ")

                const locationRegex = /^[\w]+\.[\w]+$/
                for (const location of locs) {
                    if (!location.match(locationRegex))continue
                    verified.add(location)
                    const sec = s[ #fs.scripts.get_level({ name: location }) ]
                    const rat = get_rating(location)
                    const cls = get_class(location)
                    loc_set.add({ sec, loc: location, rat, cls })
                    lm += `  ${sec}  ${location.padEnd(48, " ")} ${rat} ${cls}\n`
                }
            }
        }
    }

    return get_return_string()

    // -- begin helper functions

    function get_return_string() {
        o += "\n\n[4] verified locations  (" + verified.size + ")   `DWarning: MIDSEC locs will containg Glocks`\n\n"
        o += lm;
        o += "\n[5] next steps\n\n"
        o += "  kernel.hardline\n"
        o += "  knock {t:#s.loc}\n"

        var et = Date.now()-_START
        if (early) o+= "Script terminated early to avoid timeout, more locs available\n"
        o += "\nTotal Execution Time: " + et + "ms\n\n"

        get_help()

        return o
    }
    
    function get_help() {
        return "\n\n\
`1Class (Loot Type)`\n\
Architect     (Weaver)    Used for writing and publishing scripts.\n\
Locks         (Turtle)    Used to defend your system.\n\
Infiltrator   (Wolf)      Used for stealing information from a target.\n\
Scavenger     (Raven)     Used for stealing upgrades from a target.\n\
Executive     (Stag)      Used for managing how many chat channels you can join.\n\
\n\
`1Total Lock Difficulty Rating`\n\
Junkrack     0-17\n\
Diggerdeck   18-29\n\
Wreckbox     30-42\n\
Phreakrig    43-69\n\
Leetstack    70+"           
    }
    
	function decorrupt(b) {
		function at(s, i, r) {
			return s.substr(0, i) + r + s.substr(i + r.length)
		}
	
		let r1 = t.call(b),
			r2 = t.call(b),
			crp = /`.[¡¢Á¤Ã¦§¨©ª]`/g

        r1 = Array.isArray(r1) ? r1.join("\n") : r1;
        r2 = Array.isArray(r2) ? r2.join("\n") : r2;
        r1 = r1.replace(crp, "§");
        r2 = r2.replace(crp, "§");        
	
		while (Date.now() - _START < 500) {
			let corIndex = r1.indexOf("§")
			if (corIndex === -1) {
				return r1
			}
	
			let r2char = r2[corIndex]
			if (r2char === "§") {
                r2 = Array.isArray(r2) ? t.call(b).join("\n") : t.call(b)
				r2 = r2.replace(crp, "§")
				continue
			}
			r1 = at(r1, corIndex, r2char)
		}
		return r1
	}    

    function get_rating(um) {
        for (var x = 0; x < 5; x++) {
            var r = rating_short[x];
            var sp = um.split(".")[0];
            if (!sp.includes("_") && (rst = "`5player`")) continue;
            if (sp.includes(r) && (rst = rating_long[x])) continue;
        }
        return rst.padEnd(16, " ");
    }

    function get_class(um) {
        for (var x = 0; x < 5; x++) {
            var r = class_short[x];
            var sp = um.split(".")[0];
            if (!sp.includes("_") && (rst = "")) continue;
            if (sp.includes(r) && (rst = class_long[x])) continue;
        }
        return rst.padEnd(16, " ");
    }
    
}
