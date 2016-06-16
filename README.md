pako bug demo

```bash
npm install

./test.js
```

Output:

```
Deflating 2165414 bytes
=======================
Deflate by pako: 76078 bytes
Deflate by zlib: 76674 bytes
first difference at 76074
----------------------
Inflate by pako(pako): 2150549 bytes
Inflate by zlib(pako): 2150549 bytes
----------------------
Inflate by pako(zlib): 2165414 bytes
Inflate by zlib(zlib): 2165414 bytes
```

__Deflate result is different.__
