class WatermarkLoader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = ''
    const c = '#97a4b0'
    const isMobile =
      window.outerWidth < 697 || window.location.href.includes('login')

    const sideNav = document.createElement('div')
    sideNav.classList.add('watermark')
    sideNav.style.height = 'calc(100vh - 40px)'
    sideNav.style.backgroundColor = c
    sideNav.style.position = 'absolute'
    sideNav.style.bottom = '1.25rem'
    sideNav.style.left = '1.25rem'
    sideNav.style.top = '1.25rem'
    sideNav.style.width = '250px'
    sideNav.style.borderRadius = '21px'

    const content = document.createElement('div')
    content.classList.add('watermark')
    content.style.display = 'flex'
    content.style.flexDirection = 'column'
    content.style.color = c
    content.style.gap = '14px'
    content.style.alignItems = 'center'
    content.style.justifyContent = 'center'
    content.style.userSelect = 'none'
    if (!isMobile) {
      content.style.paddingLeft = '250px'
      content.style.marginLeft = '30px'
    }
    content.style.height = '100vh'
    content.style.fontFamily = 'arial'
    const wm = `<svg width="180" height="251" viewBox="0 0 180 251" fill="${c}" xmlns="http://www.w3.org/2000/svg">
    <path d="M64.5616 66.9563C-15.8562 191.474 42.5115 255.535 80.1263 248.545C-37.128 270.335 -5.47975 99.3828 47.6998 47.5003C52.888 57.8768 54.1851 59.1739 64.5616 66.9563Z" fill="inherit"/><path d="M120.335 4.6973C128.636 14.0361 129.847 18.1003 129.415 18.965C137.197 18.965 164.435 4.69731 180 72.1445C177.406 2.10319 116.876 0.806123 120.335 4.6973Z" fill="inherit"/><circle cx="89.2057" cy="30.6385" class="loading-circle" fill="#7591ab" r="23" /></svg>`
    content.innerHTML = `<style>.watermark { animation: skeleton-loading 1s linear infinite alternate;
    } @keyframes skeleton-loading { 0% { opacity: .5 } 100% { opacity: .9 } } .loading-circle { animation: logo-load 1.5s cubic-bezier(0.4, 0, 1, 1) infinite alternate } @keyframes logo-load { 0% { r: 29.8324 } 100%: { r: 23 } }</style>
    ${wm}
    <div>Integrated Monitoring Systems</div>
    <div>Copyright &copy; ${new Date().getFullYear()}</div>`

    if (!isMobile) {
      this.appendChild(sideNav)
    }
    this.appendChild(content)
  }
}

customElements.define('watermark-loader', WatermarkLoader)
