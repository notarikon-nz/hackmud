function(context, args)
{
	const caller = context.caller
	const auth = authorise()

	if (!auth) {
		return 	"`DError 403``1 : Forbidden`\n`1You don't have permission to access this server`"
	}

	function authorise() {
		return (caller == "<username1>" 
			|| caller=="<username2>" 
			|| calling_script == "<username>.t2_breach"
		) // this should be a database implementation
	}

	let L = #fs.scripts.lib()	

	if (args && args.request && auth) {
		let upgrade_i,
			upgrade_key,
			requested_key = args.request
		if (typeof requested_key !== 'string') return

		upgrade_key = #hs.sys.upgrades_of_owner( { filter:{k3y:requested_key} } )

		if (Array.isArray(upgrade_key) && upgrade_key.length > 0) {
			upgrade_i = upgrade_key[0].i
			return #ls.sys.xfer_upgrade_to_caller( {i: upgrade_i } )
		}
		return null
	}

  // OTHERWISE SHOW DUPLICATE KEYS AND HOW MUCH TO SELL FOR
  
	let upgrades = #hs.sys.upgrades( { full:true,filter:{type:"tool"} } )

	let output = ""

	function fetchEntries() {
		// Fetch all documents where the 'key' field exists and is not null or an empty string
		let entries = #db.f({ key: { $ne: null }, key: { $ne: "" } }).array();
		return entries;
	}
	
	function displaySortedKeysWithValues(items) {
		const keyMap = new Map();
	
		// Group items by 'k3y' and collect their 'i' values
		items.forEach(item => {
			if (keyMap.has(item.k3y)) {
				keyMap.get(item.k3y).push(item.i);
			} else {
				keyMap.set(item.k3y, [item.i]);
			}
		});
	
		// Convert the map to an array to sort by 'k3y'
		const sortedKeys = Array.from(keyMap).sort((a, b) => a[0].localeCompare(b[0]));
			
		// Display each key and its associated 'i' values in columnsmar
		output += ("┃ `1K3Y`       ┃     `1PRICE`     ┃ `1I VALUES`\n");
		output += ("┣━━━━━━━━━━━╋━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
		sortedKeys.forEach(([key, values]) => {

			let lowest = #fs.market.browse({k3y:key})
			let price = ""
			let zero = ""
			if (Array.isArray(lowest) && lowest != undefined) {
				zero = lowest[0]
				if (typeof zero == 'undefined')
					price = "-"
				else
					price = L.to_gc_str(zero.cost || -1)
				 // lowest = lowest[0].cost
			} else price = "┃" + "?".padEnd(9) + " ┃ "

			output += "┃ "
			output += (`${key.padEnd(9)} ┃ `)
			output += price.padStart(13," ") + " ┃ "
			output += (`${values.join(', ')}`);
			output += "\n"
		});
		return output
	}
	
	output += "\n\n"
	displaySortedKeysWithValues(upgrades)
	output += "\n\n"

	return output
	// listEntriesByKeyAndRarity() + "\n\n" + 
	
}
