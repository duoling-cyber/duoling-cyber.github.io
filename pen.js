
//# sourceURL=pen.js
function handleClick(event) {
  event.preventDefault();

  // 创建覆盖层元素
  const overlay2 = document.createElement('div');
  overlay2.classList.add('overlay2');

  // 创建 iframe 元素
  const iframe = document.createElement('iframe');
  iframe.src = this.parentNode.querySelector('a').getAttribute('href');

  // 创建关闭符号元素
  const closeIcon = document.createElement('span');
  closeIcon.innerHTML = '&times;';
  closeIcon.classList.add('overlay-close');
  closeIcon.addEventListener('click', handleClose);

  // 将 iframe 元素和关闭符号元素添加到覆盖层中
  overlay2.appendChild(iframe);
  overlay2.appendChild(closeIcon);

  // 将覆盖层添加到页面
  document.body.appendChild(overlay2);
}

// 关闭事件处理程序
function handleClose(event) {
  event.preventDefault();

  // 移除覆盖层
  const overlay2 = document.querySelector('.overlay2');
  overlay2.remove();
}

// 获取所有需要添加事件的 btn 元素
const h3Elements = document.querySelectorAll('h3');

// 遍历 btn btn-light 元素并添加点击事件处理程序
h3Elements.forEach((h3) => {
  h3.addEventListener('click', handleClick);
});



    