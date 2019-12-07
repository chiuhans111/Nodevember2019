var info = require('./info.json')
var fs = require('fs')
console.log(info)

function compute(attr, to) {

    var result = {}

    for (var i in info) {
        for (var j in info[i][attr]) {
            if (result[j] == null) result[j] = 0
            result[j] += info[i][attr][j]
        }
    }

    console.log(result)

    result_arr = Object.keys(result).map(x => [x, result[x]])
    result_arr.map(x => {
        x[0] = x[0].replace(/^ShaderNode/, '')
        x[0] = x[0].replace(/([a-z])([A-Z])/g, '$1 $2')
        x[0] = x[0].replace(/_/g, ' ')
    })


    result_arr.sort((a, b) => -a[1] + b[1])

    fs.writeFileSync(to, result_arr.map(x => x.join('\t')).join('\r\n'))
}

compute('nodes', './nodes.json')
compute('operations', './nodes_op.json')
compute('blend_type', './nodes_op_blend.json')



fs.writeFileSync('./count_table.json', Object.keys(info).map(x => Object.assign(info[x], { id: x })).sort((a, b) => a.id - b.id).map(x => x.nodes_count).join('\n'))