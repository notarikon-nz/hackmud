function(context, args, username){

	username = context.caller;

	if(!args) {
		return JSON.stringify(context);
	}

	if (!authorise())
		return 	"`DError 403``1 : Forbidden`\n`1You don't have permission to access this server`"

	if (!args) return;

	switch(args.get) {

		case 'l0c': return "".split(',') // l0ck3t & l0ckbox keys
		case 'prj' : return "".split(",") // known project names
		case 'usr' : return "".split(",") // known usernames
		case 'phr' : return "".split(",") // known passphrases

	}
	
	return { ok:false };

	function authorise(username) {
		return (username == "notarikon") // this should be a database implementation
	}
}
