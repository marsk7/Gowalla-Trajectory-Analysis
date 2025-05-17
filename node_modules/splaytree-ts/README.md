# splaytree-ts

A splay tree is a self-balancing binary search tree.

```js
const ages = new SplayTreeSet();
for (let age of [33, 45, 25, 35, 59, 18, 62]) {
  ages.add(age)
}
ages.firstAfter(35);  // 45
ages.lastBefore(33);  // 25
ages.delete(59);      // true
ages.has(59);         // false
ages.firstAfter(45);  //  62
```

It has the additional property that recently accessed elements are quick to access again.
It performs basic operations such as insertion, look-up and removal, in O(log(n)) amortized time.

## API Reference

* [SplayTreeMap](#splaytreemap)
* [SplayTreeSet](#splaytreeset)

### SplayTreeMap

Keys of the map are compared using the compare function passed in the constructor, both for ordering and for equality. If the map contains only the key a, then map.has(b) will return true if and only if compare(a, b) == 0, and the value of a == b is not even checked. If the compare function is omitted, the objects are assumed to be comparable, and are compared in natural order. Non-comparable objects (including null) will not work as keys in that case.

To allow calling [*map*.get](#map_get), [*map*.delete](#map_delete) or [*map*.has](#map_has) with objects that are not supported by the compare function, an extra isValidKey predicate function can be supplied. This function is tested before using the compare function on an argument value that may not be a K value. If omitted, the isValidKey function defaults to testing if the value is neither null nor undefined.

new **SplayTreeMap**([*compare*(a, b)[, *isValidKey*(value)]])

<a href="#map_clear" name="map_clear">#</a> *map*.**clear**()

Removes all pairs from the *map*.

After this, the *map* is empty.

<a href="#map_has" name="map_has">#</a> *map*.**has**(*key*)

Returns true if the *map* contains the given *key*.

Returns true if any of the keys in the *map* are equal to *key* according to the equality used by the *map*.

<a href="#map_delete" name="map_delete">#</a> *map*.**delete**(*key*)

Removes *key* and its associated value, if present, from the *map*.

Returns true if *map* contains the specified *key*, or false if *key* was not in the *map*.

<a href="#map_forEach" name="map_forEach">#</a> *map*.**forEach**(*f*(*value*, *key*, *map*))

Applies *f* to each *key*/*value* pair of the *map*.

Calling *f* must not add or remove keys from the *map*.

<a href="#map_get" name="map_get">#</a> *map*.**get**(*key*)

Returns the value for the given *key* or undefined if *key* is not in the map.

Some maps allow keys to have undefined as a value. For those maps, a lookup using this method cannot distinguish between a key not being in the map and the key having a undefined value. Methods like [*map*.hasValue](#map_hasValue) or [*map*.setIfAbsent](#map_setIfAbsent) can be used if the distinction is important.

<a href="#map_hasValue" name="map_hasValue">#</a> *map*.**hasValue**(*value*)

Returns true if the *map* contains the given *value*.

Returns true if any of the values in the *map* are equal to *value* according to the == operator.

<a href="#map_set" name="map_set">#</a> *map*.**set**(*key*, *value*)

Associates the *key* with the given *value*.

If the *key* was already in the *map*, its associated *value* is changed. Otherwise the key/value pair is added to the map.

<a href="#map_setAll" name="map_setAll">#</a> *map*.**setAll**(*other*)

Adds all key/value pairs of *other* to the map.

If a key of *other* is already in the *map*, its value is overwritten.

The operation is equivalent to doing [*map*.set](#map_set) for each key and associated value in *other*. It iterates over *other*, which must therefore not change during the iteration.

<a href="#map_setIfAbsent" name="map_setIfAbsent">#</a> *map*.**setIfAbsent**(*key*, *ifAbsent*)

Look up the value of *key*, or add a new value if it isn't there.

Returns the value associated to *key*, if there is one. Otherwise calls *ifAbsent* to get a new value, associates *key* to that value, and then returns the new value.

```js
const scores = new SplayTreeMap();
scores.set('Bob', 36)
for (let key of ['Bob', 'Rohan', 'Sophena']) {
  scores.setIfAbsent(key, () => key.length);
}
scores.get('Bob');      // 36
scores.get('Rohan');    //  5
scores.get('Sophena');  //  7
```

Calling *ifAbsent* must not add or remove keys from the *map*.

<a href="#map_isEmpty" name="map_isEmpty">#</a> *map*.**isEmpty**()

Returns true if there is no key/value pair in the *map*.

<a href="#map_isNotEmpty" name="map_isNotEmpty">#</a> *map*.**isNotEmpty**()

Returns true if there is at least one key/value pair in the *map*.

<a href="#map_firstKey" name="map_firstKey">#</a> *map*.**firstKey**()

Get the first key in the *map*. Returns null if the *map* is empty.

<a href="#map_lastKey" name="map_lastKey">#</a> *map*.**lastKey**()

Get the last key in the *map*. Returns null if the *map* is empty.

<a href="#map_lastKeyBefore" name="map_lastKeyBefore">#</a> *map*.**lastKeyBefore**(*key*)

Get the last key in the *map* that is strictly smaller than *key*. Returns null if no key was not found.

<a href="#map_firstKeyAfter" name="map_firstKeyAfter">#</a> *map*.**firstKeyAfter**(*key*)

Get the first key in the *map* that is strictly larger than *key*. Returns null if no key was not found.

<a href="#map_update" name="map_update">#</a> *map*.**update**(*key*, *update*(*value*)[, *ifAbsent*])

Updates the *value* for the provided *key*.

Returns the new value of the *key*.

If the *key* is present, invokes *update* with the current *value* and stores the new value in the *map*.

If the *key* is not present and *ifAbsent* is provided, calls *ifAbsent* and adds the *key* with the returned value to the *map*.

It's an error if the *key* is not present and *ifAbsent* is not provided.

<a href="#map_updateAll" name="map_updateAll">#</a> *map*.**updateAll**(*update*(key, value))

Updates all values.

Iterates over all entries in the *map* and updates them with the result of invoking *update*.

<a href="#map_keys" name="map_keys">#</a> *map*.**keys**()

Returns an iterable of keys in the *map*.

Modifying the *map* while iterating the keys breaks the iteration.

<a href="#map_values" name="map_values">#</a> *map*.**values**()

Returns an iterable of values in the *map*.

Modifying the *map* while iterating the values breaks the iteration.

<a href="#map_entries" name="map_entries">#</a> *map*.**entries**()

Returns an iterable of key, value pairs for every entry in the *map*.

Modifying the *map* while iterating the entries breaks the iteration.

### SplayTreeSet

Elements of the set are compared using the compare function passed in the constructor, both for ordering and for equality. If the set contains only an object a, then set.has(b) will return true if and only if compare(a, b) == 0, and the value of a == b is not even checked. If the compare function is omitted, the objects are assumed to be comparable, and are compared in natural order. Non-comparable objects (including null) will not work as keys in that case.

new **SplayTreeSet**([*compare*(a, b)[, *isValidKey*(value)]])

<a href="#set_clear" name="set_clear">#</a> *set*.**clear**()

Removes all elements in the *set*.

<a href="#set_has" name="set_has">#</a> *set*.**has**(*element*)

Returns true if the *set* contains an element equal to *element*.

<a href="#set_delete" name="set_delete">#</a> *set*.**delete**(*element*)

Removes *element* from the *set*. Returns true if *element* was in the *set*. Returns false otherwise. The method has no effect if *element* was not in the *set*.

<a href="#set_deleteAll" name="set_deleteAll">#</a> *set*.**deleteAll**(*elements*)

Removes each element of *elements* from the *set*.

<a href="#set_forEach" name="set_forEach">#</a> *set*.**forEach**(*f*(*element*, element2, *set*))

Applies the function *f* to each *element* of the *set* in iteration order.

<a href="#set_add" name="set_add">#</a> *set*.**add**(*element*)

Adds the *element* to the *set* if it is not already in the *set*.

Returns the *set*.

<a href="#set_addAndreturn" name="set_addAndreturn">#</a> *set*.**addAndReturn**(*element*)

Adds the *element* to the *set* if it is not already in the *set*.

Returns the *element* (or an equal element if there is already one in the *set*).

<a href="#set_addAll" name="set_addAll">#</a> *set*.**addAll**(*elements*)

Adds all *elements* to the *set*.

Equivalent to adding each element in *elements* using [*set*.add](#set_add).

<a href="#set_isEmpty" name="set_isEmpty">#</a> *set*.**isEmpty**()

Returns true if there are no elements in the *set*.

May be computed by checking if iterator.next().done == true

<a href="#set_isNotEmpty" name="set_isNotEmpty">#</a> *set*.**isNotEmpty**()

Returns true if there is at least one element in the *set*.

May be computed by checking if iterator.next().done == false

<a href="#set_single" name="set_single">#</a> *set*.**single**()

Checks that the *set* has only one element, and returns that element.

Throws a StateError if the *set* is empty or has more than one element.

<a href="#set_first" name="set_first">#</a> *set*.**first**()

Returns the first element.

Throws a StateError if the *set* is empty. Otherwise returns the first element in the iteration order.

<a href="#set_last" name="set_last">#</a> *set*.**last**()

Returns the last element.

Throws a StateError if the *set* is empty. Otherwise may iterate through the elements and returns the last one seen.

<a href="#set_lastBefore" name="set_lastBefore">#</a> *set*.**lastBefore**(*element*)

Get the last element in the *set* that is strictly smaller than *element*. Returns null if no element was not found.

<a href="#set_firstAfter" name="set_firstAfter">#</a> *set*.**firstAfter**(*element*)

Get the first element in the *set* that is strictly larger than *element*. Returns null if no element was not found.

<a href="#set_retainAll" name="set_retainAll">#</a> *set*.**retainAll**(*elements*)

Removes all elements of the *set* that are not elements in *elements*.

Checks for each element of *elements* whether there is an element in thes *set* that is equal to it (according to [*set*.has](#set_has)), and if so, the equal element in thes *set* is retained, and elements that are not equal to any element in *elements* are removed.

<a href="#set_lookup" name="set_lookup">#</a> *set*.**lookup**(*object*)

If an object equal to *object* is in the *set*, return it.

Checks whether *object* is in the *set*, like [*set*.has](#set_has), and if so, returns the *object* in the *set*, otherwise returns null.

If the equality relation used by the *set* is not identity, then the returned object may not be identical to *object*.

<a href="#set_intersection" name="set_intersection">#</a> *set*.**intersection**(*other*)

Returns a new set which is the intersection between thes *set* and *other*.

That is, the returned set contains all the elements of the *set* that are also elements of *other* according to [*set*.has](#set_has).

<a href="#set_difference" name="set_difference">#</a> *set*.**difference**(*other*)

Returns a new set with the elements of the *set* that are not in *other*.

That is, the returned set contains all the elements of the *set* that are not elements of *other* according to [*set*.has](#set_has).

<a href="#set_union" name="set_union">#</a> *set*.**union**(*other*)

Returns a new set which contains all the elements of the *set* and *other*.

That is, the returned set contains all the elements of the *set* and all the elements of *other*.

<a href="#set_toSet" name="set_toSet">#</a> *set*.**toSet**()

Creates a set containing the same elements as the *set*.

<a href="#set_keys" name="set_keys">#</a> *set*.**keys**()

Despite its name, returns an iterable of the values in the *set*.

Modifying the *set* while iterating the values breaks the iteration.

<a href="#set_values" name="set_values">#</a> *set*.**values**()

Returns an iterable of values in the *set*.

Modifying the *set* while iterating the values breaks the iteration.

<a href="#set_entries" name="set_entries">#</a> *set*.**entries**()

Returns an iterable of [v,v] pairs for every value v in the *set*.

Modifying the *set* while iterating the entries breaks the iteration.
