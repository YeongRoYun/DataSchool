# Blog with bootstrap
```
-----Home--------
|                |
| ---Blog------  |
||             | |
| -------------  |
|                |
 ----------------
```
```
------Blog-------------
|   ----Article------| |
|  |    title, meta  | |
|  |    article      | |
|   -----------------  |
 ----------------------
```
- Server gives `title`, `meta` and `article`
- Post is written by `WYSIWYG` including `HTML`
- In sqlite3, insert multi-line as one-line, use `https://tools.knowledgewalls.com/online-multiline-to-single-line-converter`

# Reactive of Array and Object
- Object or Array defaultly use `reactive`, making itself reactive
- But, they can use `ref`, making wrapper
- With `ref`,
  ```
  arr = ref([]);
  arr.value = arr.value.filter() #possible
  arr.value = arr.value.push(item) # possible
  ```
- With `reactive`
  ```
  arr = reactive([]);
  arr = arr.filter() # Not reactive anymore
  arr.push(item) # possible
  ```
  - Shouldn't change reference of array

# Pagination
- Divide long page to several pages

# Archives
- Collect posts by month