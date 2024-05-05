function(context,args){// t:#s.weyland.public, help:true

	let projs = #fs.notarikon.lib({get:"prj"}) // pull project names
	let users = #fs.notarikon.lib({get:"usr"}) // pull user names

	let npcs = "abandoned,abndnd,anon,anonymous,derelict,uknown,unidentified,unknown".split(",") // known npc handles
	
	let rating_short = "jr,dd,wb,pr,ls".split(","),
		rating_long = "`0junkrack`,`1diggerdeck`,`2wreckbox`,`3phreakrig`,`4leetstack`".split(",")

	let class_short = "wvr,ttl,wlf,rvn,stg".split(","),
		class_long = "`Narchitect`,`Olocks`,`Pinfiltrator`,`Qscavenger`,`Sexecutive`".split(",")
			
	let rst = "unknown",
		rst2 = ""

	// check if npc from handle
	function is_npc(handle) {
		for (var ih = 0; ih < npcs.length; ih++) {
			if(handle.includes(npcs[ih])) {
				return true
			}
		}
		return false
	}

	// get lock level rating
	function get_rating(um) {
		for (let yy = 0; yy < 5; yy++) {
			rst = "unknown"
			let r = rating_short[yy]
			let sp = um.split(".")[0]
			if (!is_npc(sp)) {
				rst = "`5player`"
				break
			} else if (sp.includes(r)) {
				rst = rating_long[yy];
				break
			}
		}
		return rst.padEnd(20," ")
	}	

	// get class/loot rating
	function get_class(um) {
		for (let x = 0; x < 5; x++) {
			let r = class_short[x]
			let sp = um.split(".")[0]
			if (!sp.includes("_")) {
				rst2 = ""
				break
			} else
			if (sp.includes(r)) {
				rst2 = class_long[x]
				break
			}
		}
		return rst2.padEnd(16," ")
	}	    	
	
	// handle no args
	if (args == null || (args && typeof args === 'object' && !Object.keys(args).length))
		return {ok:false, msg:"Usage: notarikon.augury { t:#s.corp.public, help:true } "}
	
	let t = args.t,
		ok = true

	// handle non fullsec targets
	let get_level = #fs.scripts.get_level({name:t.name})
	if (get_level < 4) 
		return {ok:false, msg:"`XInsecure Script`"}

	// ERROR CHECKING DONE

	let msg = "`HAugury` 0.1.3\n\n"
	let stage = 1
	let r = "",
		pages = "",
		commands = "",
		directory = "",
		password = ""

	// decorrupt text
	function decorrupt (a) {
		let r = new RegExp(`[¡¢Á¤Ã¦§¨©ª]`),
			s = /`\w(.)`/g,
			x = (a) ? JSON.parse(JSON.stringify(a)) : null,
			d = _ => ([].concat(t.call(x))).join("\n").toString().replace(s, "$1").split(""),
			o = d()
	
		while (r.test(o.join("")))
			d().forEach((p, i) => {
				if (r.test(o[i]))
						o[i] = p
			})
		return o.join("")
	}

	// helper function - update return message
	function update_msg(section, arg) {
		msg += "[" + stage++ + "] " + section + ": ["

		if (arg != null && Array.isArray(arg))
				for (let i = 1; i < arg.length; i++) {
					msg += arg[i];
					if (i != arg.length - 1) msg += ","
				}
		else 
			msg += arg
		msg +="]\n"
	}

	// get both pages keyword
	r = decorrupt();
	pages = r.match(/(\w+) \| (\w+)/)

	update_msg("pages    ",pages)

	// get command keyword
	r = decorrupt({})
	commands = r.match(/ith (\w+):"(\w+)"$/)
	directory = "dir"

	update_msg("commands ",commands)

	// parse error, stop now
	if (pages & commands === false)
		return {ok:false, msg:msg} 

	// get password
	let o = {};
	o[commands[1]] = pages[2];
	r = decorrupt(o);
	password = r.match(/tegy (\w+)/);

	update_msg("password ",password)

	if (password === null)
		return {ok:false, msg:msg} 

	// get password key name
	let variants = ["p", "pass", "password"]

	for(var v in variants) {

		o[commands[1]] = commands[2]
		o[variants[v]] = password[1]

		r = t.call(o)

		if(r.indexOf('Authenticated') > -1) {
			break
		}
	}
	update_msg("passkey  ",variants[v])
	
	// get projects
	o[commands[1]] = pages[1]
	r = decorrupt(o) // {command:projects}
	let pm = ""
	let um = ""

	// split the blog page into lines
	let rows = r.split("\n")

	// sets to store only unique values
	let p2 = new Set()  // projects
	let u3 = new Set()  // usernames

	// for each even line (skip odds which are timestamps)
	for (let i = 1; i < rows.length; i+=2) {
		let line = rows[i]
		// get projects		
		for (let c in projs) {
			let cc = projs[c]
			if (line.includes(cc)) {
				p2.add(cc)
			}
		}
		// get users
		for (let un in users) {
			let user = users[un]
			if (line.includes(user)) {
				u3.add(user)
			}
		}
	}

	msg += "[5] employee : [" + directory + "]\n"

	msg += "\n[6] projects  (" + p2.size + "): \n"

	// USER NAMES
	let u2 = new Set()
	p2.forEach(function(project_name) {
		
		
		o[commands[1]] = commands[2] 	// e.g. open:employees
		o['project'] = project_name;

		let vx= decorrupt(o,700).split("\n")

		// 10
		
		

		let c = 0
		for(var fs in vx) {
			let username = vx[fs]
			let m5 = username.match(/^([\w]+\.[\w]+)$/)
			if(m5) {
				u2.add(username)
				let rating = get_rating(username)
				let _class = get_class(username)
				um = um + "  " + username.padEnd(48," ") + rating + _class + "\n"
				c++
			}
		}

		pm += "   " + project_name.padEnd(32," ") + c + "\n"

	})

	// add project names to output
	msg += pm

	// add locs to output
	msg += "\n[7] locs  (" + u2.size + "): \n"
	msg += um
	
	let iu = ""
	
	// add usernames found to output
	msg += "\n[8] usernames  (" + u3.size + "): \n"
	u3.forEach(function(handle) {
		iu += "  " + handle + "\n"
	})
	msg += iu

	// end with time taken to execute script
	let et = Date.now()-_START
	msg += "\nTotal Execution Time: " + et + "ms   "

	// if help:true in arguments, explain the class & rating keywords
	if (args.help) {

	msg += "\n\n\
`1Class (Loot) Rating`\n\
Locks        Used to defend your system.\n\
Architect    Used for writing and publishing scripts.\n\
Infiltrator  Used for stealing information from a target.\n\
Scavenger    Used to stealing upgrades from a target.\n\
Executive    Used for managing how many chat channels you can join.\n\
\n\
`1Total Lock Difficulty Rating`\n\
Junkrack     0-17\n\
Diggerdeck   18-29\n\
Wreckbox     30-42\n\
Phreakrig    43-69\n\
Leetstack    70+"
}

	return msg;

}
