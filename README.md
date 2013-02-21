# Style
Create stylesheets dynamically in JavaScript. Ported from [excss](https://github.com/yuanchuan/excss)

### Installation

```bash

component install yuanchuan/style

```


### Usage

```Javascript

var Style = require('style');
var style = new Style;

style.load(
  'body { background:blue; }',
  'p    { color: red; }'
)

```

Defining variables:

```Javascript

var style = new Style;

style.define({
  color1: '#23efab',
  color2: '#ff3233' 
});

style
  .add('img { border: 1px @color1 solid }')
  .add('a:hover { border: 1px @color2 dashed}')
  .load();
      
```

### More examples

Using add() to append new styles and refresh later using load():

    style
      .define({
        color1: '#23efab',
        color2: '#ff3233'
      })
      .add(
        'img { border: 1px @color1 solid }'
      )
      .add('
        a: hover{ border: 1px @color2 dashed }'
      )
      .load();

Re-defining a variable then apply:

```Javascript

style
  .define({
    color1: 'blue'
  })
  .load(); 

```

Clear all the added styles:

```Javascript

style.clear();

```

Remove completely:

```Javascript

style.remove();

```

### License

The MIT license
