# T3 Encryption

Throughout T3 sites you discover encoded text, images and other items. An example is below:

You discover a key: `2iXs7XW`

A fake filename: `file_7n_5i_40_4g.file`

And the encoded text is as follows:

```
e=HSzKV9HSmHR4OzsHRIKBkSTp8nuXXIGISWLpAUSxSzEnvtGIDR9qHHcU90QHIL8DDQlRzsHR4cIuUo4=H3UomJHvqJlKWAEn4=HGDKE8nw
kHRII9xJS4LztnEmGXzooh=H=HotKn90VI6UzgNq5VBEnX=HSsLHoOzDJIyL6kPEycDyNIocW2HonDHvtI2cL=xL45E64ooxKzDMY3WSvXXI
=zxnJtFJkUozFn2HVIDL+yolFGSsDo9nvDTYAF5DDRonAoOIyLSyLKycWunXs9n7HRILKvzo4=HGDPt/KBDOMCHSzRonR7knMyL9DwVp/RxV
o2GR7ooe=HGDHt8nAunlFGSyWSGGSgUS5QyDwVp/9xVonGUvVIIOLBKo4=H3xos5QyyntFnBnHoHRxqHX3n9lnXs93xnapDO2RVycF9DX3dn
dzo75VStR7cTCoWIcO3mKXIL8DWLpc=uRQJ
```

## Key Analysis:

* Key Length and Character Set: The key "2iXs7XW" is 7 characters long and includes both numbers and uppercase/lowercase letters. This suggests a potential character-based manipulation like a Vigenère cipher or other polyalphabetic ciphers, though tests have indicated that Vigenère might not be the right approach.

## Filename Clues:

* Structured Filename: The filename "file_7n_5i_40_4g.file" could be a clue. The structure here includes numbers and letters separated by underscores. This might suggest a pattern or a set of numeric values that could be important (perhaps offsets, key extensions, or indexes).

## Encoded Text Structure:

* Delimiter Usage: The presence of equal signs '=' throughout the encoded text may indicate breaks or separations in data, perhaps signaling different blocks of text or data types. These could be delimiters or padding characters used in the encoding process.
* Repeated Segments: If certain patterns or segments repeat (e.g., "HR"), these could be potential starting points for frequency analysis or determining how the key might be applied.

## Decryption Methods to Consider:

* ase64 Variants: Given the structured nature and use of = as padding, a modified Base64 encoding using a non-standard alphabet or a shuffled alphabet Base64 could be used. Testing common Base64 variants or even creating a custom decoding alphabet based on potential key-derived alphabets could be insightful.
* Advanced Poly-Alphabetic Cipher: You might try extending the key in various ways (repeating, mirroring, etc.) or consider it as a seed for generating a pseudo-random stream used in a stream cipher mode.
* Transposition Cipher: Consider whether the key might be used to reorder segments of the encoded text, especially if the filename's structure suggests a pattern.

## Programmatic Decoding Attempts:

* Automated Key Testing: You could write a script to apply different cipher techniques systematically with variations in key application to see if any meaningful output is produced.
* Frequency Analysis Tool: Use a frequency analysis tool on segments of the encoded text to see if they match any typical frequency distributions of natural languages or encoded data.

## Experimental and Hybrid Approaches:

* Hybrid Methods: Since the key and filename provide specific characters and numbers, consider using them as part of hybrid methods that combine elements of substitution and transposition.
* Brute-force Components: If all else fails, consider a brute-force approach where you systematically modify the key or method of application against a simple cipher until you find a promising lead.

