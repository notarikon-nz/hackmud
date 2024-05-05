function(cxt, arg, first, second) {

  let a = #fs.notarikon.lib({get:"pub"}), // known corp locations, without .public
      b = #fs.notarikon.lib({get:"t2s"}), // known t2/t3 suffixes, e.g. memberz
      s = ["NULLSEC","LOWSEC ","MIDSEC ","HIGHSEC","FULLSEC"],
      o = ""

  let t2 = new Set(),
      t3 = new Set(),
      sec,
      domain,
      r


  for (first of a) {
    for (second of b) {
      domain = first + "." + second
      r = #fs.scripts.get_level({name:domain})
      if (Number.isInteger(r)) {
        if (r <= 1)
          t2.add({r:r,d:domain})
        else
          t3.add({r:r,d:domain})
      }
    }
  }

  o = "Active T2/3 Domains\n\n"
  o += "`1T3`\n"
  
  t3.forEach(function(value) {
    sec = s[value.r]
    o += "  " + sec + " " + value.d + "\n"
  })

  o += "\n`1T2`\n"
  t2.forEach(function(value) {
    sec = s[value.r]
    o += "  " + sec + " " + value.d + "\n"
  })

  return o

}
