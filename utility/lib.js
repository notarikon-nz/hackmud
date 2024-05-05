function(context, args){

	// prevent other users from calling this lib directly
	if (!context.calling_script.includes("notarikon"))
		return;
	
	if(!args) {
		return JSON.stringify(context);
	}

	if (!args) return;

	switch(args.get) {

		case 'l0c': return "".split(',') // l0ck3t & l0ckbox keys
		case 'prj' : return "".split(",") // known project names
		case 'usr' : return "".split(",") // known usernames
		case 'phr' : return "".split(",") // known passphrases

	}
	
	return { ok:false };

}
