function(context, args)// t:#s.unknown_jrttl_820zd5.entry_97kjq
{
	// REFACTORED KNOCK SCRIPT
	// WIP
	
	// drop keys
	unload_keys(upg)
	
	// precompile regex
	const magnara_pattern = /\b(\w+)$/
	const conspec_pattern = /\w{3}(?=\n)/
	const termination_pattern = /Connection terminated/
	const memo_pattern = /with memos/
	const net_pattern = / net /

	// split outside of loops
	let az = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("") // a to z
	let last_calls = 0, total_calls = 0
	
	call_get_response()
	
	while (timeout_checker(3900)) {
		if (!response) {
			report["err"] = "no target";
			break;
		}
		
		if (terminationPattern.test(response)) {
			report["success"] = true;
			break;
		} else {
			processResponse(response); // Handles all response processing
		}
		
		update_calls();
	}

	// output object
	report["keys"] = keys
	if ((typeof response === 'string' || response instanceof String) && response.includes("Connection terminated.") )
		response = "Connection terminated after SUCCESSFUL breach."
	report["rcpt"] = response
	report["time"] = Date.now()-_START
	report["loot"] = upg.length

	return formatJsonAsTable(report)
  
  // ------------------------------
  function update_calls() {
      total_calls += last_calls;
      last_calls = 0;
      if (!skip_response_call) {
          call_get_response();
      } else {
          skip_response_call = false;
      }
  }

    function processResponse(response) {
        
        switch (true) {

            // handle errors
            case response_includes("script doesn"):
            case response_includes("chain your hardline"):
            case response_includes("kernel"):
                return response;
            
            case response_includes("\`NLOCK_UNLOCKED\`"):
                let lines = response.split("\n");
                let unlockedPattern = /LOCK_UNLOCKED (\w+)/;  
            
                for (let line of lines) {
                    let match = unlockedPattern.exec(line);
                    if (match) {
                        let key = match[1];  // Directly access the captured group
                        correct_key[key] = true;  // Eliminate redundant conditional check
                    }
                }
                break;
            
            //--------------------[ ez_## & c00# ]--------------------
            case response_includes("is not the"):

                switch (true) {
                    case response_includes("unlock command"):
                        calls.EZ++;
                        for (let i in keys) {
                            let ezPattern = /EZ_/;
                            if (ezPattern.test(i) && !correct_key[i]) {
                                keys[i] = ez[(ez.indexOf(keys[i]) + 1) % 3];
                            }
                        }
                        break;
                
                    case /\bdigit\b/.test(response) && !correct_key["EZ_35"]:
                        calls.EZ++;
                        keys.digit = (keys.digit + 1) % 10;
                        guessed_key["EZ_35"] = true;
                        break;
                
                    case /\bcorrect prime\b/.test(response) && !correct_key["EZ_40"]:
                        calls.EZ++;
                        let tempPrime = primes.shift();
                        primes.push(tempPrime);
                        keys["ez_prime"] = tempPrime;
                        guessed_key["EZ_40"] = true;
                        break;
                
                    case /correct color/.test(response):
                        calls.c00++;
                        let colorPatterns = ["c001", "c002", "c003"];

                        colorPatterns.forEach((pattern, index) => {

                            if (!correct_key[pattern]) {

                                let temp = colors.indexOf(keys[pattern]);
                                keys[pattern] = colors[(temp + 1) % 8];

                                if (pattern === "c002") {
                                    keys.c002_complement = colors[(temp + 5) % 8];
                                } else if (pattern === "c003") {
                                    keys.c003_triad_1 = colors[(temp + 6) % 8];
                                    keys.c003_triad_2 = colors[(temp + 4) % 8];
                                }
                            }
                        });
                        break;

                    //--------------------[ l0cket ]--------------------
                    case response_includes("correct security k3y"):
                            calls.l0cket++
                            keys.l0cket = l0cket.shift() // if you're new here, shift is like pop, removes the first entry
                    break;
                }

            break;
            
            //--------------------[ DATA_CHECK ]--------------------
            case response.includes('++++++'):

                let data_check = response.split("\n")
                if (data_check.length != 3) {
                    report["err"] = "DATA_CHECK ERROR < 3"
                    break
                }

                let parts = [];
                for (let i of data_check) {
                    parts.push(#fs.lore.data_check({lookup:i}).answer)    // ideally hard constant to reduce call overhead
                    // parts.push( dataCheckAnswers[i] || "defaultAnswer" )
                }
                let string = parts.join("");

                keys["DATA_CHECK"] = string
                calls["DATA_CHECK"]++

            break;

            //--------------------[ sn_w_glock ]--------------------
            case response.includes("balance"):
            
                calls["sn_w_glock"]++
                sn_w_glock() // see function below

            break;

            //--------------------[ con_spec ]--------------------
            case response_includes("next three letters"):
                const match = conspecPattern.exec(response)
                if (!match) return // Always check for null result from regex execution
    
                const sq = match[0].split("").map(x => az.indexOf(x)); // Index sequence
                const nr = [sq[2] - sq[1], sq[1] - sq[0]]; // Numeric relations
    
                // Simplify array accesses and calculations
                const baseIndex = sq[2];
                const nr1 = nr[1];
                const nr0 = nr[0];
    
                keys["CON_SPEC"] = az[baseIndex + nr1] +
                az[baseIndex + nr1 + nr0] +
                az[baseIndex + 2 * nr1 + nr0];
    
                // Error checking if index goes out of bounds
                if (baseIndex + 2 * nr1 + nr0 >= az.length || baseIndex + nr1 < 0) {
                    report["err"] = "CON_SPEC Index out of bounds";
                    return;
                }
    
                calls["CON_SPEC"]++;
                
                break;

            //--------------------[ magnara ]--------------------
            case response_includes("magnara"):

                // Optimize regex by directly capturing the last word without using boundaries if context allows
                let lastWordMatch = response.match(magnaraPattern);  // Ensure there's a match before accessing
                let letters = lastWordMatch ? lastWordMatch[1] : "";  // Safeguard against null if no match

                // Assuming dictionary lookup is necessary and can't be optimized without more context
                let answers = #fs.dictionary.lookup({letters});

                // Check if answers.msg is valid and non-empty to avoid errors
                if (answers.msg && answers.msg.length) {
                    keys["magnara"] = answers.msg[Math.floor(Math.random() * answers.msg.length)];
                } else {
                    keys["magnara"] = "No valid answers found";  // Default or error handling message
                }

                break;

            //--------------------[ l0ckbox ]--------------------
            case response_includes("To unlock, please load the appropriate k3y:"):
                
                let reqK3y = response.slice(-6);  // Optimized to use string slicing instead of regex
                report["l0ckbox"] = reqK3y;

                // Using a flag to indicate if the key was found
                let keyFound = false;
                
                // Loop through the keys using a for-loop for potential performance improvement
                for (let i = 0; i < k3ys.length; i++) {
                    if (k3ys[i].k3y.includes(reqK3y)) {
                        keyFound = true;
                        // Presuming #ms.sys.manage({load:i.i}) needs correction in context
                        #ms.sys.manage({load: k3ys[i].i});  // Assuming k3ys[i].i is correct
                        break;  // Exit loop as soon as a match is found
                    }
                }

                if (!keyFound) {
                    report["err"] = "l0ckbox missing key: " + reqK3y + " check keychain for market listings";
                    break;  // Presuming this is part of a larger loop, otherwise remove
                }			
                break;

            case (/(spent|earned|What was|withdrawal|deposit)/.test(response)):

                acct_nt()

                break;

            //--------------------[ default ]--------------------
            default:
                if (typeof response === 'string') {
                    report["err"] = "unrecognised input, total calls: " + (last_calls + total_calls);
                }
                break;
        }
    }
  
    // I HATE IT SO MUCH
    function acct_nt() {
      
    }

   // unload keys at start to save time, and prepare for l0ckbox loading
	function unload_keys(upg) {
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
		last_calls++
		return response
	}

  // WRAPPER FOR MAKING SURE NO NULL/EMPTY STRINGS
	function response_includes(x) {
		if (typeof response === 'string' || response instanceof String)
			return response.includes(x)
		return false;
	}

  // MAKE SURE WE EXIT IN TIME OR NO LOOT
	function timeout_checker(x)	{//timeout checker
		x?0:x=3900 //npcs stop paying out after 4s of runtime
		return (Date.now()-_START) < x
	}

  // GLOCK SOLVER
	function sn_w_glock() {
		for (let kv_pair of glock) {
			// {magician:1089}
			for (let keyword in kv_pair) {
				// magician, 1089
				if (response_includes(keyword)) {
					let glock_value = kv_pair[keyword]
					#ms.bank_of_notarikon.bank({withdraw:glock_value})
					keys["acct_nt_1"] = kv_pair.acct_nt
					keys.acct_nt = 0

          // reset acct_nt as glock will mess our saved variables up
					acct_nt_guesses = [0]
					transactions = undefined
				}
			}
		}
	}

  // FORMAT OUR JSON OUTPUT INTO A NICE TABLE
	function formatJsonAsTable(jsonObject) {
		// Determine the longest key for column width (plus some padding)
		let maxKeyLength = 0;
		const entries = [];
	
		// Flatten the object to handle nested objects
		function flattenObject(obj, prefix = '') {
			for (const [key, value] of Object.entries(obj)) {
				const flatKey = prefix ? `${prefix}.${key}` : key;
				if (value && typeof value === 'object' && !Array.isArray(value)) {
					flattenObject(value, flatKey);
				} else {
					entries.push([flatKey, value]);
					maxKeyLength = Math.max(maxKeyLength, flatKey.length);
				}
			}
		}
	
		flattenObject(jsonObject);
	
		// Create rows for each key-value pair
		const rows = entries.map(([key, value]) => {
			return `\`C  ${key.padEnd(maxKeyLength + 2)}\` \`0|\` \`1${value}\``;
		});
	
		// Join all rows into a single string
		return rows.join('\n');
	}	
}
