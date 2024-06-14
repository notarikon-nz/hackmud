function(context, args)
{
	// PRELOAD CONSTANTS
	const COLUMNS = ['t','k3y','qty','token','cost','indices'];

	let lib = #fs.scripts.lib()	

	let l0cket = "vc2c7q,tvfkyq,xwz7ja,uphlaw,sa23uw,72umy0,cmppiq,i874y3,eoq6de,6hh8xw,9p65cu,fr8ibu,pmvr1q,ellux0,xfnkqe,y111qa,hc3b69,5c7e1r,4jitu5,nfijix,vthf6e,lq09tg,voon2h,nyi5u2,j1aa4n,d9j270,vzdt6m,cy70mo,8izsag,qvgtnt,ooi???,hzqgw6,afgny5,54r1cg,pxoh0v,7oxb1b,pzqsa0,0wm???,dww???,2od???,sg8???,n4v???,gnm???,fpw???,f5p???,56q???,xhc???,w23???".split(","), // ,0wm???,dww???,sg8???,xhc???,gnm???,2od???
		upgrades = #hs.sys.upgrades( { full:true,filter:{type:"tool"} } ),
		msg = "\n",
		found = true,
		key_list = new Array(),
		key_count = {},
		missing_keys = 0,
		index = 0,
		lowest,
		cost,
		token,
		keyMap = new Map(),
		timedOut = false,
		foundKeys = 0

	let arrKeys = [];
	let offset = 0;

	// market search key = market.browse {key:{$in:missingKeyArray}}

	// key counting loop
	for (let u of upgrades) {
		if (keyMap.has(u.k3y)) {
			// if there's already a listing, add another index
			keyMap.get(u.k3y).push(u.i);
		} else {
			// if this is the first occurence, create it
			keyMap.set(u.k3y, [u.i]);
		}
	}

	// table building loop
	for (let k3y of l0cket) {
		found = false
		index = 0

		// Count and find upgrades for each key
		for (let u of upgrades) {
			// if matching key
			if (u.k3y === k3y) {

				// no longer need
				key_count[u.k3y] = (key_count[u.k3y] || 0) + 1
				
				// if first time
				if (!found) {
					
					index = key_list.push({ 
						qty: String(keyMap.get(u.k3y).length).padStart(3," "),
						k3y: '`1'+u.k3y+'`',
						t: String(u.tier),
						token: '      ',
						cost: '',
						indices: String(keyMap.get(u.k3y)).replaceAll(',',', ')
					})
					found = true
					foundKeys++
				}
			}
		}

		// If no upgrades found, look up the market for lowest offer
		if (!found) {

			let ks = k3y.split('?')[0]
			if (ks.length < 6) {
				const regexPattern = `^${ks}`;
				let queryObject = { k3y: { "$regex": regexPattern } }
				lowest = #fs.market.browse(queryObject)
			} else {
				lowest = #fs.market.browse({k3y: k3y})
			}

			cost = ""
			token = ""
			
			if (lowest && lowest[0]) {
				cost = lib.to_gc_str(lowest[0].cost)
				token = lowest[0].i
			}

			key_list.push({
				k3y: k3y,
				qty: String("").padStart(3," "),
				t: String(Math.floor(offset / 16)+1),
				cost: cost.padStart(12," "),
				token: token.padStart(6," "),
			})

			missing_keys++
		}
		offset++;

		if (check_timeout()) {
			timedOut = true;
			break;
		}
	}



	// RETURN OUTPUT
	return createTable(key_list,COLUMNS) +
		(timedOut ? '\n\n[ERR] Script timed out, acquire more keys and try again.' : '') + 
		"\n\nMissing `1" + (l0cket.length - foundKeys) + "` known keys. Results now listed by tier, and then by drop rate."


	// BEGIN UTILITY FUNCTIONS

	function check_timeout(x = 4200) {
		return (Date.now() - _START) > x;
	}

	function createTable(data, columns) {
		if (!data.length) return '[ERR] No identifiable keys found on user';
	
		let debug = ""

		function decolor (val) {
			if (typeof val != 'string') return '';
			// return String(val).replaceAll(/`0*([0-9]+)`/g, '$1');
			return String(val).replaceAll(/\`\w(.*?)\`/g, '$1')
		}

		// Use the provided columns or get all keys from the first object
		columns = columns || Object.keys(data[0]);
	
		// Calculate the width for each column
		const colWidths = columns.map(key => Math.max(key.length, ...data.map(row => decolor(String(row[key])).length)));
		
		// Padding function
		const pad = (str, length) => str.padEnd(length, ' ');
	
		// Function to create the border
		const border = (left, mid, right, horizontal) => 
			left + colWidths.map(width => horizontal.repeat(width + 2)).join(mid) + right;
	
		// Create the header row
		const header = "┃" + columns.map((key, i) => `\`1 ${pad(key.toUpperCase(), colWidths[i])} \``).join('┃') + "┃";
	
		let rowCount = 0;

		// Create the data rows
		const rows = data.map(row => {
			rowCount++;

			let r = "┃" + columns.map((key, i) => ` ${String(row[key] || '').padEnd(colWidths[i], ' ')} `).join('┃') + "┃"
			if (rowCount % 16 == 0)

				r += "\n┣" + columns.map((key, i) => `━${String().padStart(colWidths[i],'━')}━`).join('╋') + "┫"

			return r;

			}
		);
	
		// Create the borders
        const topBorder = border('┏', '┳', '┓', '━');
        const midBorder = border('┣', '╋', '┫', '━');
        const bottomBorder = border('┗', '┻', '┛', '━');
	
		// Combine all parts to create the table
		return [
			topBorder,
			header,
			midBorder,
			...rows,
			bottomBorder
		].join('\n');
	}
}
