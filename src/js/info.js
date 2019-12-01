var cp = require('child_process')
var fs = require('fs')
works = require('./works.json')

let works_arr = [];

for (var i in works) {
    works[i].id = i;
    works[i].name = works[i].name
        .split("_")
        .map(x => {
            return x.slice(0, 1).toUpperCase() + x.slice(1);
        })
        .join(" ");
    works_arr.push(works[i]);
}

works_arr.sort((a, b) => a.id - b.id);


works_arr = works_arr.slice(1)

console.log(works_arr.map(x => x.name))


var p = cp.spawn('blender', ['--python-console'])



function loadfile(id) {
    console.log('load', id)
    id = id.toString()
    if (id.length < 2) id = '0' + id
    name = works[id].name.replace(/\s/g, '_')
    p.stdin.write(`bpy.ops.wm.open_mainfile(filepath="E:/Documents/Blender/projects2.8/nodevember/${id}${name}/nvb${id}${name}.blend")\n`)

}



var tasks = [
    () => p.stdin.write(`import bpy\n`),
]

var sum = 0
var sum_vertices = 0

var result = {}
for (let i = 1; i <= 30; i++) {
    let id = i.toString()
    if (id.length < 2) id = '0' + id
    result[id] = {}

    tasks.push(() => loadfile(i))
    tasks.push(() => p.stdin.write(`sum([len(m.node_tree.nodes) for m in bpy.data.materials])+sum([len(m.nodes)-2 for m in bpy.data.node_groups])\n`))
    tasks.push(x => {

        result[id].nodes_count = +x.trim()

        sum += result[id].nodes_count

        next()
    })
    tasks.push(() => p.stdin.write(`sum([len(o.data.vertices) for o in bpy.context.scene.objects if hasattr(o.data,'vertices')])\n`))
    tasks.push(x => {

        result[id].vertices = +x.trim()

        sum_vertices += result[id].vertices

        next()
    })
}

tasks.push(function () {

    result.sum = sum
    result.ave = sum / 30

    result.sum_verts = sum_vertices
    result.ave_verts = sum_vertices / 30
    fs.writeFileSync(__dirname+'/info.json', JSON.stringify(result))
})

function next(data) {
    if (tasks.length > 0) {

        tasks.shift()(data)
    }
    else p.kill()
}

console.log(p.stdout.on('data', data => {
    var d = data.toString()
    console.log(d)
    var match = d.match(/^([^]*)\n?>>>\s$/)
    if (match) {
        next(match[1])
    }

}))



/*
"max": [
    12,
    325
],
"min": [
    28,
    5
],

fun fact of my nodevember nodes:
total node count: 3226 (average 107.53 nodes per project)



*/