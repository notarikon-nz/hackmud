function(context, args){// t:#s.first.second

	if (args == null || (args && typeof args === 'object' && !Object.keys(args).length))
		return {ok:false, msg:"Usage: witch_bolt { t:#s.first.second } "}

	var t = args.t;
    var r = t.call({}) // get response with blank args

	if (r.ok == false)
		return "Incorrect Loc Format"

	if (r && r.includes("kernel.hardline")) {
		return {ok:false, msg:"Hardline required - activate with kernel.hardline"}
	}

	var z = ""

	// call the remote loc with {} as the arguments
	// if we get a response string, check for lock type
	if(typeof r == 'string') {
		// type_of_lock = the type of lock, e.g. DATA_CHECK
		var type_of_lock = r.match(/(EZ_[0-9]+|c00[0-9]|l0cket|DATA_CHECK)` lock/)
	} else 
	{
		for(var fr in r) {
			z = z + fr + ": " + r[fr] + "\n"
		}
		
		return {ok:false, msg:"Invalid response: " +(typeof r)+ "\n" + z}
	}
	

	var c = z, // ""
		i = 0,
		s = 0,
		loop_count = 1, // lock count
		detail = "",
		pc = "`2"

	var payload = {r:r,c:{}}	// create a new struct, where r is our response and c is empty

	var pa = ["derp", "open","unlock","release"],
		lk = {c001:"color_digit", c002:"c002_complement", c003:"c003_triad_", l0cket:"k3y"},
		ln = ["c001", "c002", "c003", "l0cket"],
		col = ["red", "purple", "blue", "cyan", "green", "lime", "yellow", "orange"],
		ez = {EZ_21:"", EZ_35:"digit", EZ_40:"ez_prime"},
		d = [1,2,3,4,5,6,7,8,9,10,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101]

	function ez_21(args) {
		var _r = "not the cor",
			i = 0,
			o = args.p,
			l = args.l
		while ( _r.indexOf('not the cor') > -1 && i < 5 ) {
			o[l] = pa[i]
			_r = t.call(o)
			i++                                  
		}
		return {r:_r, c:o}
	}

	function c00(args) {
		var o = args.p,
		l = args.l,
		x = ""
		i = 0
		while (x.indexOf(lk[l]) === -1 && i < 10 ) {
			o[l] = col[i];
			x = t.call (o) + "\n"
			i++
		}
		i--
		
		// C001
		if(l == ln[0]) {
			o[lk[l]] = col[i].length;

		} else 
		// c002
		if(l == ln[1]) {
			o[lk[l]] = col[(i+4) % 8];

		} else 
		// c003
		if(l == ln[2]) {
			o[lk[l]+"1"] = col[(i+3) % 8];
			o[lk[l]+"2"] = col[(i+5) % 8];
		}
		r =  t.call (o)
		return {r:r, c:o}
	}

	function ez_(args) {
		var _o = args.p,
		l = args.l,
		_ez = ez[l],
		_r = "",
		x = _r,
		u = 0,
		i= 0		

		// EZ_35:"open"
		while (_r.indexOf(_ez) === -1 && i < 5 ) {
			_o[l] = pa[i] 		// o[EZ_35] = derp, etc.
			_r = t.call (_o)
			i++
		}
		
		i--
		_r = "not the cor"
		// digit: 9
		while (_r.indexOf('not the cor') > -1 && u < 120 ) {
			_o[l] = pa[i] 		// o[EZ_35] = derp, etc.
			_o[_ez] = d[u] 		// o[digit] = 
								// o[ez_prime] = 
			_r = t.call (_o)
			u++;                                                
		}

		_o[l] = pa[i]
		return {r:_r, c:_o}
	}

	// loop through locks, grabbing the next one as we go
	// maximum of 12 loops, not breaking and type_of_lock is valid
	while(type_of_lock && loop_count < 13) {
		// get the lock type
		type_of_lock = payload.r.match(/(EZ_[0-9]+|c00[0-9]|l0cket|DATA_CHECK)` lock/)
		
		// if a valid lock
		if(type_of_lock) {
			args['l'] = type_of_lock[1] 	// l: locktype
			args['p'] = payload.c				// p: current arguments (running concat)

			switch(type_of_lock[1]) {
				case 'EZ_21':
					payload = ez_21(args)
					break;
				case 'EZ_35': 
				case 'EZ_40': 
					payload = ez_(args)
					break;
				case 'c001':
				case 'c002':
				case 'c003':
					payload = c00(args)
					break;
				case 'l0cket':
				case 'DATA_CHECK':
					payload = #fs.notarikon.c(args)
					break
				default:
					type_of_lock = z += loop_count + ". Invalid Lock Type\n" + payload.r + ""
				}

			// HIDE DETAIL IF UNLOCKED
			if (payload.r.indexOf("LOCK_UNLOCKED") === -1) {
				detail += "   " + JSON.stringify(payload) + "\n"
				pc = "`5"
			}

			detail += "  " + loop_count + ". " + pc + type_of_lock[1] + "`\n"
			loop_count++

			// all good & calc execution time
			if(payload.r.indexOf('Connection terminated.') > -1) {
				var et = Date.now()-_START
				detail += "  !. `2CONNECTION TERMINATED` after " +et+ "ms"
				type_of_lock = null
			}

		} else {
			z = z + "  " + loop_count + ". `5Invalid Lock Type`5\n" + payload.r
		}
		i++;
	}

	if (loop_count >= 12)
		detail += "  12. Time Out\n"

	// OUTPUT
	var header = "Casting `JWitch Bolt` at `X" + t.name + "`\n\n"
	var output = header + detail + z

	return output
	// will automatically add \n

}

