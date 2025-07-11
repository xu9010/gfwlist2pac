/**
 * genpac 3.0.1 https://github.com/JinnLynn/genpac
 * Generated: 2025-07-11 13:22:04
 * GFWList Last-Modified: -
 * GFWList From: -
 */

var proxy = 'SOCKS5 127.0.0.1:7890';
var rules = [
    [
        [],
        [
            "arxiv.org",
            "ascii2d.net",
            "cnbeta.com.tw",
            "files.pythonhosted.org",
            "github.com",
            "gitlab.com",
            "oaiusercontent.com",
            "repo.anaconda.com",
            "sourceforge.net",
            "translate.google.com",
            "translate.googleapis.com"
        ]
    ],
    [
        [],
        []
    ]
];

var lastRule = '';

function FindProxyForURL(url, host) {
    for (var i = 0; i < rules.length; i++) {
        ret = testHost(host, i);
        if (ret != undefined)
            return ret;
    }
    return 'DIRECT';
}

function testHost(host, index) {
    for (var i = 0; i < rules[index].length; i++) {
        for (var j = 0; j < rules[index][i].length; j++) {
            lastRule = rules[index][i][j];
            if (host == lastRule || host.endsWith('.' + lastRule))
                return i % 2 == 0 ? 'DIRECT' : proxy;
        }
    }
    lastRule = '';
}

// REF: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
  };
}
