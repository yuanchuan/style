# Style
Create stylesheets dynamically in JavaScript. 

### Installation

```bash
component install yuanchuan/style
```


### Usage

```Javascript
var Style = require('style');
var style = new Style();

style.load(
  'body { background:blue; }',
  'p    { color: red; }'
)
```

Defining variables:

```Javascript
var style = new Style()

style.define({
  color1: '#23efab',
  color2: '#ff3233' 
})

style.load(
  'img { border: 1px @color1 solid }',
  'a:hover { border: 1px @color2 dashed }'
)
```

### More examples

Using add() to append new styles and refresh later using load():

```Javascript
style
  .define({
    color1: '#23efab',
    color2: '#ff3233'
  })
  .add(
    'img { border: 1px @color1 solid }'
  )
  .add(
    'a: hover{ border: 1px @color2 dashed }'
  )
  .load()
```

Re-defining a variable then apply:

```Javascript
style
  .define({
    color1: 'blue',
    color2: 'red'
  })
  .load() 
```

Clear all the added styles:

```Javascript
style.clear()
```

Unload the content from the stye element but keep rules and map

```Javascript
style.unload()
```

Remove completely:

```Javascript
style.remove()
```

### API Reference
`.define(Object variables)`  
`.add(String style, ...)`      
`.load([String style, ...])`  
`.unload()`  
`.clear()`  
`.remove()`   
 

### License

The MIT license.
