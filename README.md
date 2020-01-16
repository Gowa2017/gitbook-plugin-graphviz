# gitbook-plugin-graphviz
Graphviz support for GitBook


Forked from [darvasd](https://github.com/darvasd/gitbook-plugin-graphviz)

Add support of viz.js's support engines.

## Usage

<pre><code>```dot
digraph G {
	A -> B -> C;
}
```
</code></pre> 

Alternative format:
<pre><code>{% graphviz dot %}
digraph G {
	A -> B -> C;
}
{%endgraphviz %}
</code></pre> 



## Configuration

Configure the plugin in `book.json`.

```
"plugins": [
      "graphviz@git+https://github.com/Gowa2017/gitbook-plugin-graphviz.git"
  ],
"pluginsConfig": {
    "graphviz": {
        "format": "svg"
    }
}
``` 

| Variable | Description |
| --- | --- |
| `format` | Output format. Can be: `svg`, `xdot`, `plain`, `json`. |
| `engine` | Graphviz engine to be used. Can be: `dot`, `circo`, `neato`, `osage`, `twopi`. |
