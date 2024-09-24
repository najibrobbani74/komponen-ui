    let blocks = document.querySelectorAll('.block-item')
    let res = {

    }
    let globalState = { i: 0, res: res, blocks: blocks };
    blocks[0].click()
    document.querySelectorAll('.copy-the-block')[0].click()
    const increase = localState => {
        if (localState.i >= localState.blocks.length) { clearInterval(interval); return; }
        let counter = localState.i
        let res = localState.res
        let block = localState.blocks[counter]        
        let type = block.getAttribute('block-type')
        let name = block.getAttribute('block-name')
        if (!localState.res.hasOwnProperty(type.toLowerCase())) {
            localState.res[type.toLowerCase()] = {
                "name": type,
                "key": type.toLowerCase(),
                "children": {},
            }
        }
        localState.res[type.toLowerCase()].children[name.toLowerCase()] = {
            "key": name.toLowerCase(),
            "name": name,
            "image": null,
            "type": "html",
            "syntax": document.querySelectorAll('.codes pre code')[1].innerText
        }
        if (!(localState.i + 1 >= localState.blocks.length)) {
            localState.blocks[counter + 1].click()
            document.querySelectorAll('.copy-the-block')[0].click()
        }
        localState.i++;
        console.log(localState.res);
        console.log(localState.i);
        
    }
    var interval = setInterval(increase, 1000, globalState);
