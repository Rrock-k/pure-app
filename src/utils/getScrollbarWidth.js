export default function getScrollbarWidth() {
  let div
  // let width = getScrollbarWidth.width
  let width
  if (width === undefined) {
    div = document.createElement('div')
    div.innerHTML =
      '<div style="width:50px;height:50px;overflow:auto;"><div style="height:100px;"></div></div>'
    div = div.firstChild
    document.body.appendChild(div)
    width = div.offsetWidth - div.clientWidth
    console.log('offsetWidth: ' + div.offsetWidth)
    console.log('clientWidth: ' + div.clientWidth)
    document.body.removeChild(div)
  }
  console.log('returned width: ' + width)
  return width
}
