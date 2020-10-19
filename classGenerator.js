const rowClass = () => {
    const row = document.createElement('div');
    row.setAttribute('class', 'row')
    return row
}

const colClass = (col, aria='') => {
    const colElem = document.createElement('div');
    colElem.setAttribute('class', `btn-group ${col}`)
    colElem.setAttribute('role', 'group')
    colElem.setAttribute('aria-label', aria)
    return colElem
}

const buttonClass = (color="") => {
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('class', `btn ${color}`)
    return btn
}