// 是否有class
export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
// 添加class
export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
// 移除class
export function removeClass (el, className) {
  if (hasClass(el, className)) {
    let newClass = el.className.split(' ')
    for (var i = 0; i < newClass.length; i++) {
      if (className === newClass[i]) {
        newClass.splice(i, 1)
      }
    }
    el.className = newClass.join(' ')
  }
}
