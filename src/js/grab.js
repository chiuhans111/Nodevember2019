

$$('article').map(x=>{
    let content = x.querySelector('div>div:nth-child(2)>div:nth-child(2)>span')
	let link = x.querySelector('a:nth-child(2)[href]')
	if(content!=null&&link!=null)
	return [content.textContent, link.href]
}).filter(x=>x!=undefined).map(x=>{
    let match = x[0].match(/(\d\d)\. .+/)
    if(match)
    return [match[1], x[1].match(/status\/(\d+)/)[1]]
}).filter(x=>x!=undefined).map(x=>{
  data[x[0]] = x[1]
})