function(context, args) { // t:#s.unknown_jrttl_820zd5.entry_97kjq

  // limit user access to your script (if you want)
  if (! #fs.notarikon.lib({check:context.caller}) ) {
    return 	"`DError 403``1 : Forbidden`\n`1You don't have permission to access this server`"
  }

  // variable list
	let
	response, last_response,
	caller = context.caller,
	colors = "red,orange,yellow,lime,green,cyan,blue,purple".split(','),
	ez = ["open","release","unlock"], 
	l0cket = #fs.notarikon.lib({get:"l0c"}),
	n1 = "is not the",
	primes = [3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,57,59,61,67,71,73,79,83,89,91,97],
	call_count = {
		EZ:0,
		c00:0,
		DATA_CHECK:0,
		l0cket:0,
		magnara:0,
		sn_w_glock:0,
		CON_SPEC:0,
		acct_nt:0,
    l0ckbox:0
	},
	report = {},
	upgrades = #hs.sys.upgrades({full:true}),
	k3ys = [],
	lib = #fs.scripts.lib(),  
	glock = [{magician:1089},{secret:7},{elite:1337},{monolithic:2001},{hunter:3006},{secure:443},{beast:666},{meaning:42},{special:38}],
	keys = {
		EZ_21:"open",
		EZ_35:"open",
		digit:0,
		EZ_40:"open",
		ez_prime:2,
		c001:colors[0],
		color_digit:3,
		c002:colors[1],
		c002_complement:colors[5],
		c003:colors[2],
		c003_triad_1:colors[7],
		c003_triad_2:colors[5],
		DATA_CHECK:"",
		l0cket:"cmppiq",
		magnara:"stav",
		sn_w_glock:0,
		CON_SPEC:"LMN",
		acct_nt:0
	},	
	correct_key = [],
	guessed_key = [],
	transactions,
	skip_response_call = false,
	acct_nt_guesses = [0],
	acct_nt_count = 0,
  last_calls = 0, 
  total_calls = 0,
  valid_target = lib.is_def(args.t)

  key["CON_SPEC"] = {call:a=>a.s.split(a.d).length-1}

  args = args || {}
  if (args.help || !valid_target) {
    return "Provide a target with t:#s.unknown.entry\n\n \
      You will require keys for l0ckbox, so ensure you have one empty upgrade slot\n \
      If your target is not HIGH or FULLSEC, your balance will be transferred to your bank\n \
      If it fails on acct_nt, make small transactions between runs, and try again"
  }

	// clear account for glock
	let sec_level = #fs.scripts.get_level({name:args.t})
	if (sec_level < 3) {
		let balance = #ms.accts.balance() - 7000
		let transfer = #ms.accts.xfer_gc_to( {to:"nokiraton",amount:balance} )
	}  

	// drop keys
	for (let u of upg) {
		if (u.k3y) {
			k3ys.push(u)
			if (u.loaded) #ms.sys.manage({unload:u.i})
		}
	}

	call_get_response() // get our first key

	while (timeout_checker(4250)) {

    // check if call failed
		if (!response) {
			report["msg"] = "no response"
			break
		}

    // check for invalid target or no hardline
    if (response_includes("script doesn't exist") || response_includes("chain your hardline") || response_includes("kernel")) {
		  return response
		}

		total_calls += last_calls
    last_calls = 0

    // check for success, check for stop condition, or call next lock
		if (response_includes("Connection terminated")) {
			report["success"] = true
			break
		} else {
			if (skip_response_call) { 
        skip_response_call = false }
      else {
        call_get_response()
      }
		}

    // check if we've found the correct key
		if (response_includes(`\`NLOCK_UNLOCKED\``)) {
			let temp = response.split("\n")
			for (let i of temp) {
				if (/LOCK_UNLOCKED/.test(i)) {
					let j = i.split(" ")[1]
					if (!correct_key[j]) correct_key[j] = true
				}
			}
		}

    // various locks
		if (response_includes(n1)) {
			if (response_includes("unlock command")) {

        call_count.EZ++

      }
  		else if (/\bdigit\b/.test(response) && !correct_key["EZ_35"]) {

        call_count.EZ++

      } 
      else if (/\bcorrect prime\b/.test(response) && !correct_key["EZ_40"]) {

        call_count.EZ++

      } 
      else if (/correct color/.test(response)) {

        call_count.c00++

      }
      else if (/correct security k3y/.test(response)) {
				
        call_count.l0cket++
				
			}
    }
    else if (/\+{6}/.test(response)) {

      call_count.DATA_CHECK++
      
    }
    else if (/balance/.test(response)) {
      
      call_count.sn_w_glock++
      
    }
    else if (/(spent|earned|What was|withdrawal|deposit)/.test(response)) {

      call_count.acct_nt++
      
    }
    else if (response_includes("next three letters")) {

      call_count.CON_SPEC++

    } 
    else if (response_includes("magnara")) {

      call_count.magnara++
      
    }
    else if (response_includes("To unlock, please load the appropriate k3y:")) {
      
      call_count.l0ckbox++
      
    }
    else {

			report["msg"] = "ERR unrecognised input after " + (last_calls + total_calls) + " calls\n" + JSON.stringify(response)
			break      
      
    }
  }

	// output object
	report["keys"] = keys
	report["rcpt"] = response
	report["time"] = Date.now()-_START
	
	return report
  
  //--------------------[ helper functions ]--------------------

  // unload all keys
	function unload_keys() {
  	for (let u of upg) {
  		if (u.k3y) {
  			k3ys.push(u)
  			if (u.loaded) {
  				#ms.sys.manage({unload:u.i})
  			}
  		}
  	}  
  }
  
	// call wrapper - saves last response, and counts calls
	function call_get_response() {
		last_response = response
		response = args.t.call(keys)
		last_call_count++
		return response
	}

	function response_includes(x) {
		if (typeof response === 'string' || response instanceof String)
			return response.includes(x)
		return false;
	}

	function timeout_checker(x)	{
		x ? 0 : x = 4250
		return Date.now() - _START < x
	}  
  
}
  
