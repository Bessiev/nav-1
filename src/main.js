
const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)//将字符串重新变为对象

const hashMap = xObject || [//第一次xObject是空的
    {logo: 'A', url: 'https://www.acfun.cn'},
    {logo: 'B', url: 'https://www.bilibili.com'}
]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
      .replace('http://', '')
      .replace('www.', '')
      .replace(/\/.*/, '') // 删除 / 开头的内容，利用正则表达式，.*表示后面的所有内容
  }

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
      const $li = $(`<li>
        <div class="site">
          <div class="logo">${node.logo}</div>
          <div class="link">${simplifyUrl(node.url)}</div>
          <div class="close">
            <svg class="icon">
              <use xlink:href="#icon-close"></use>
            </svg>
          </div>
        </div>
      </li>`).insertBefore($lastLi)
      $li.on('click', () => {
        window.open(node.url)
      })
      $li.on('click', '.close', (e) => {
        e.stopPropagation() // 监听点击阻止冒泡
        hashMap.splice(index, 1)
        render()
      })
    })
}

render()
$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是啥？')
    if (url.indexOf('http') !== 0) {
      url = 'https://' + url
    }//如果用户没有加https，则自己加上
    console.log(url)
    hashMap.push({
      logo: simplifyUrl(url)[0].toUpperCase(),//da大写
      url: url
    })
    render()
})
/*监听用户关闭页面，自动保存新增 */
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)//将对象变成字符串
    localStorage.setItem('x', string)
}
//监听键盘
$(document).on('keypress', (e) => {
    const {key} = e//const key = e.key
    for (let i = 0; i < hashMap.length; i++) {
      if (hashMap[i].logo.toLowerCase() === key) {
        window.open(hashMap[i].url)
      }
    }
})
  /* <li>
                <a href="https://www.acfun.cn">
                <div class="site">
                    <div class="logo">A</div>
                    <div class="link">acfun.cn</div>
                </div>
                </a>
            </li>
            <li>
                <a href="https://www.bilibili.com">
                <div class="site">
                    <div class="logo">
                        <img src="./imgs/bilibili.png" alt="">
                    </div>
                    <div class="link">bilibili.com</div>
                </div>
                </a>
            </li>
            <li>
                <div class="site">
                    <div class="logo">A</div>
                    <div class="link">acfun.cn</div>
                </div>
            </li>*/