function(context, args){// s:#s.sys.upgrades

	if (!args || !args.s) {
		return "usage: keychain { s:#s.sys.upgrades }"
	}

	let s = args.s

	let lib = #fs.scripts.lib()	

	let caller = context.caller
	let l0cket = #fs.notarikon.lib({get:"l0c"})

	let upgrades = s.call( { full:true,filter:{type:"tool"} } )

	let msg = ""
	let found = true

	msg = "\n\n"

	// header
	msg += " id    k3y        market        cost     command\n"
	msg += "---------------------------------------------------------------------------------------\n"

	for (var k3y of l0cket) {
		found = false;
		for (var u of upgrades) {
			let i = u.i
			if (u.k3y == k3y) {
				msg += i.toString().padStart(3,"0")
				msg += "    `2" + u.k3y + "`"
				found = true;
				break;
			}
		}
		if (!found) {
			msg += "       `1" + k3y + "`"
			let lowest = #fs.market.browse({k3y:k3y})
			if (lowest) {
				let l = lowest[0]
				if (l) {
					msg += "     " + l.i + "   " +
					lib.to_gc_str(l.cost).padStart(9," ") + "     " +
					"market.buy {i:\"" + l.i + "\", count:1, confirm:true}"
				} else {
					msg += "      n/a                   none available for purchase"
				}
			}
		}

		msg += "\n"
	}
	return msg
}
