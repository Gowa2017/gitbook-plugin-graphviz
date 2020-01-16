var Q = require('q');
var vizjs = require('viz.js');

// var ASSET_PATH = 'assets/images/graphviz/';

function processBlock(blk) {
    var deferred = Q.defer();
    var book = this;
    var code = blk.body;


    var config = book.config.get('pluginsConfig.graphviz', {});
    var format = "svg";
    if (config && config.format)
        format = config.format;

    var result = vizjs(code, { format: format, engine: blk.args[0] })
    deferred.resolve(result);
    return deferred.promise;
}

module.exports = {
    blocks: {
        graphviz: {
            process: processBlock
        }
    },
    hooks: {
        // For all the hooks, this represent the current generator
        // [init", "finish", "finish:before", "page", "page:before"] are working.
        // page:* are marked as deprecated because it's better if plugins start using blocks instead.
        // But page and page:before will probably stay at the end (useful in some cases).

        // This is called before the book is generated
        "init": function () {
            if (!Object.keys(this.book.config.get('pluginsConfig.graphviz', {})).length) {
                this.book.config.set('pluginsConfig.graphviz', {
                    format: 'svg'
                });
            }
        },

        // This is called after the book generation
        "finish": function () {
            // Done
        },

        // Before the end of book generation
        "finish:before": function () {
            // Nothing to do
        },

        // The following hooks are called for each page of the book
        // and can be used to change page content (html, data or markdown)


        // Before parsing documents
        "page:before": function (page) {
            // Get all code texts
            let engines = ['dot', 'circo', 'fdp', 'neato', 'osage', 'twopi']
            for (e of engines) {
                let re = new RegExp('^```' + e + '((.*[\r\n]+)+?)?```$', 'igm')
                codes = re.exec(page.content);
                // Begin replace
                if (codes instanceof Array) {
                    for (var i = 0, len = codes.length; i < len; i++) {
                        let r = new RegExp('^```'+e);
                        page.content = page.content.replace(
                            codes[i],
                            codes[i].replace(r, '{% graphviz "' + e + '" %}').replace(/```$/, '{% endgraphviz %}'));
                    }
                    
                }
            }

            return page;
        }
    }
};
