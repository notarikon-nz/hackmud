# Hackmud MongoDB Guide

Sharing the following until I finish my own reference guide

Source: [https://pastebin.com/J6U8Kn34](https://pastebin.com/J6U8Kn34) by dumbmagic on [Twitch](https:/www.twitch.tv/dumbmagick)

## Inserting items into MongoDB using #db.i

[https://docs.mongodb.com/manual/reference/method/db.collection.insert/#db.collection.insert](https://docs.mongodb.com/manual/reference/method/db.collection.insert/#db.collection.insert)

Items are inserted into MongoDB as BSON objects, https://www.mongodb.com/json-and-bson
A JSON object parser (less verbose BSON) can be found: http://json.parser.online.fr/

The syntax to insert items into MongoDB 
`#db.i ( {stuff:”things”} )`
Or
`#db.i( {BSON_OBJECTS} )`

All inserts are done as key:value pairs, in the same way the game takes key:value pairs. You cannot insert single terms or search by single terms, everything in MongoDB is linked as a key:value pair. Trying to insert a single item (as opposed to a single bson object) will not work.

EX: `#db.i ( {single_item} )`

Correct insertions are in the format of:

```
EX: 	#db.i ( {item_id:”data”} )
	#db.i ( {item_id:variable) }
	#db.i ( {item_id:[“stuff”, “things”, “more stuff”]} )
	#db.i ( {item:{ nested BSON object } } )
```
Storing in a 1:1 relation, that is to say inserting an object with a particular “id” attached to a set of data is possible in the following format:
```
    const store_failed = -1;
	function store(tag, array) {
        try {
            var k = #db.i({_id:tag, stored:array})
        }
        catch (err) {
            return store_failed;
        }
        finally {
            return k;
        }
    }
```

## Finding items in MongoDB using #db.f
https://docs.mongodb.com/manual/reference/method/db.collection.find/#db.collection.find

The find function for MongoDB retrieves key:value pairs and returns all BSON objects containing that key:value pair. Again, singular item lookups will error out:

EX: `#db.f ( {single_item} )`

Correct finds are identical to inserts:
```
EX: 	#db.f ( {item_id:”data”} )
	#db.f ( {item_id:variable) }
	#db.f ( {item_id:[“stuff”, “things”, “more stuff”]} )
	#db.f ( {item:{ nested BSON object } } )
```
Getting 1:1 values out of MongoDB using our above store function can be done using:
```
    const op_failed = -1;
    function get(_tag) {
        try {
            var k = #db.f({_id:_tag}).first().stored
        }
        catch (err) {
            return op_failed
        }
        finally {
            return k;
        }
    }
```
As you can see, gets are a little bit tricky to extract data from. Lets break this code apart and examine the elements:

`#db.f({_id:_tag}).first().stored`

first() is going to return the first object stored as _id:_tag. This is neccesary because _tag could be an array of objects itself. In the case of our store function, it’s a single string. However, MongoDB’s find function returns a “Cursor object” which is essentially an array of BSON objects. 

Now that we have our first element, we can access our

`#db.f({_id:_tag}).first().stored`

This will return the array we stored to begin with, which you can then access using regular array notation.

```
Var p = #db.f({_id:_tag}).first().stored
P[0] =”new stuff”
```
