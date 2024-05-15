function(context, args){

	let lib = #fs.scripts.lib()	

	let l0cket,
		upgrades = #hs.sys.upgrades( { full:true,filter:{type:"tool"} } ),
		msg = "\n",
		found = true,
		key_list = new Array(),
		key_count = {},
		missing_keys = 0,
		index = 0,
		lowest,
		cost,
		token
		
		l0cket = "cmppiq,xwz7ja,uphlaw,6hh8xw,tvfkyq,vc2c7q,9p65cu,i874y3,sa23uw,ellux0,pmvr1q,hzq???,72umy0,eoq6de,fr8???,xfn???,4jitu5,vthf6e,5c7e1r,hc3b69,nfijix,lq09tg,qvgtnt,d9j270,j1aa4n,nyi5u2,voon2h,8iz???,cy70mo,ooi???,vzdt6m,y11dc5".split(",")

	// header
	msg += "`1SLT` ┃ `1CNT` | `1K3Y`    ┃ `1RAR` ┃ `1TIR` ┃ `1TOKEN`  ┃ `1PRICE`       ┃ `1BUY COMMAND`  \n"
	msg += "━━━━╋━━━━━╋━━━━━━━━╋━━━━━╋━━━━━╋━━━━━━━━╋━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"

	for (let k3y of l0cket) {
		found = false
		index = 0

		// Count and find upgrades for each key
		for (let u of upgrades) {
			if (u.k3y === k3y) {
				key_count[u.k3y] = (key_count[u.k3y] || 0) + 1
				if (!found) {
					index = key_list.push({
						i: u.i,
						k: u.k3y,
						r: u.rarity,
						t: tier(u.k3y),
						f: true,
						d: 0
					})
					found = true
				}
			}
		}

		// If no upgrades found, look up the market for lowest offer
		if (!found) {
			lowest = #fs.market.browse({k3y: k3y})
			cost = ""
			token = ""
			
			if (lowest && lowest[0]) {
				cost = lib.to_gc_str(lowest[0].cost)
				token = lowest[0].i
			}

			key_list.push({
				i: -1,
				k: k3y,
				r: null,
				t: tier(k3y),
				f: false,
				c: cost,
				m: token,
				d: 0
			})

			missing_keys++
		}
	}

	const pad = "   "
	const div = " ┃ "
	const rowDivider = "━━━━╋━━━━━╋━━━━━━━━╋━━━━━╋━━━━━╋━━━━━━━━╋━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
	const noListings = "  `b--`  " + div + "           " + div + "`bno listings`";
	const noUpgrades = "  `b--`  " + div + "           " + div + "`bno upgrades`";
	
	key_list = sort_results(key_list,'t', 'k')

	let row = 1
	for (let key of key_list) {

		if (row === 17 || row === 33 || row === 49) {
			msg += rowDivider;
		}
		row++;

		// id/slot
		msg += (key.i > -1 ? key.i.toString().padStart(3,"0") : pad) + div;

		// k3y count
		let kc = key_count[key.k] || "   ";  // Use default string if key.k is not in key_count
		kc = (typeof kc === 'number' || typeof kc === 'string') ? kc.toString().padStart(3, " ") : kc;
		kc = (kc > 1) ?`\`5${kc}\`` : `\`1${kc}\``
		msg += kc + div;

		// k3y name and rarity
		msg += (key.f ? "`2" : "`1") + key.k + "`" + div + " `" + (key.r || 'z') + (key.r || 'z') + "` " + div;

		// tier
		msg += (key.t < 9 ? " `" + key.t + key.t + "` " : "   ") + div;

		// market or upgrades
		msg += (!key.f ? (key.m ? key.m + div + key.c.padStart(11, " ") + div + "market.buy{i:\"" + key.m + "\",count:1,confirm:1}" : noListings) : noUpgrades) + "\n";

	}

	if (missing_keys > 0)
		msg += "\nMissing `V" + missing_keys + "` keys"

	return msg

	function tier(idx) {
		return (Math.floor(l0cket.indexOf(idx) / 16) + 1).toString()
	}

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
