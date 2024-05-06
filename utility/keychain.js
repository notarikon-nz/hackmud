function(context, args){// s:#s.sys.upgrades

	if (!args || !args.s) {
		return "usage: keychain { s:#s.sys.upgrades }"
	}

	let s = args.s

	let lib = #fs.scripts.lib()	

	let caller = context.caller,
		l0cket = "sa23uw,tvfkyq,uphlaw,vc2c7q,xwz7ja,i874y3,72umy0,5c7e1r,hc3b69,nfijix,4jitu5,6hh8xw,j1aa4n,eoq6de,vthf6e,d9j270,cy70mo,lq09tg,9p65cu,vzdt6m,nyi5u2,voon2h,ellux0,pmvr1q,cmppiq".split(','),
		upgrades = s.call( { full:true,filter:{type:"tool"} } ),
		msg = "\n\n",
		found = true,
		key_list = new Array()

	// header
	msg += " id   k3y      rarity   tier   market        cost    command\n"
	msg += "---------------------------------------------------------------------------------------\n"

	for (let k3y of l0cket) {
		found = false;
		let index = 0

		for (let u of upgrades) {
			let i = u.i
			if (u.k3y == k3y) {
				if (!found) {
					found = true
					index = key_list.push( {
						i:u.i,
						k:u.k3y,
						r:u.rarity,
						t:u.tier,
						f:found,
						d:0
					})
				}
			}
		}

		if (!found) {
			let lowest = #fs.market.browse({k3y:k3y}),
				cost = "",
				token = ""
			if (lowest) {
				if (lowest[0]) {
					let l = lowest[0]
					cost = lib.to_gc_str(l.cost)
					token = l.i
				}
			}
			key_list.push({
				i:-1,
				k:k3y,
				r:"",
				t:9,
				f:found,
				c:cost,
				m:token,
				d:0
			})
		}
	}

	msg += "\n"

	key_list = sort_results(key_list,'t', 'r')

	for (let key of key_list) {

		if (key.i > -1)
			msg += key.i.toString().padStart(3,"0")
		else
			msg += "   "

		msg += "   "
		msg += (key.f ? "`2" : "`1") + key.k + "`"

		msg += "   " + key.r.padEnd(9," ") + ""

		if (key.t < 9)
			msg += "     `" + key.t + key.t.toString().padEnd(4," ") + "`"
		else 
			msg += "       "

		if (!key.f) {
			if (key.m) {
				msg += key.m + "   " +
				key.c.padStart(9," ") + "    " +
				"market.buy {i:\"" + key.m + "\", count:1, confirm:true}"
			} else {
				msg += " n/a                  none available for purchase"				
			}

		}
		msg += "\n"
	}

	return msg

	function sort_results(arr, key1, key2) {
		return arr.sort((a,b) => {
			if (a[key1] < b[key1]) {
				return -1;
			}
			if (a[key1] > b[key1]) {
				return 1;
			}
			if (key2) {
				if (a[key2] < b[key2]) {
					return -1;
				}
				if (a[key2] > b[key2]) {
					return 1;
				}		
			}	
			return 0;
		})
	}	
}
