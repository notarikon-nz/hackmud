function (c,a) {

  // automatically checks if T3 corp domains are active, adds anything new, and deletes expired domains
  // Ideally run on a ~10 minute timer, at a cost of 5-6MGC per day
  
    const prefix = "archaic,context,core,futuretech,halperyon,light,nuutec,sn_w".split(","),
    suffix = "private,internal,priv,employees,intern,employee_login,emplogin".split(","),
    t3 = new Array();

    const group = "activeDomains";

    const existingEntries = #db.f({group}).array();

    prefix.forEach(first => {
        suffix.forEach(second => {
            
            const domain = first + "." + second 
            const existing = existingEntries.find(f => f.domain == domain);

            const r = #fs.scripts.get_level({ name: domain })

            if (Number.isInteger(r) && (r == 1 || r == 0)) {
                  t3.push(domain)
                  if (!existing) domainToDatabase(domain);
            } else {

                if (existing) removeDomainFromDatabase(domain);
            }
        })
    });
	
    function domainToDatabase(domain) {
        const timestamp = _START;
        const query = { group, domain };
        const update = { $set: { timestamp } };
        #db.us(
            query,
            update //, { upsert: true }
        );    
    }

    function removeDomainFromDatabase(domain) {
        const query = { group, domain };
        #db.r(query);
    }

}
