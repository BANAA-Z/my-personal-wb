const { createApp } = Vue

const app = createApp({
  template: `
    <div class="loader" v-show="loading"><div class="spinner"></div></div>

    <!-- 左侧导航 -->
    <Sidebar />

    <!-- 中间内容 -->
    <div class="container">
      <About />
      <Skills />
      <Projects />
      <Notes />
      <Contact />
    </div>

    <!-- 右侧个人卡片 -->
    <div class="right-profile">
      <div class="avatar">
        <img src="images/1.jpg" alt="头像">
      </div>
      <h4>BANAA‑Z</h4>
      <p>智能车辆｜意向前端</p>
       <p class="stats">
  总访问：<span id="cloud-pv">0</span> 次<br>
  访客：<span id="cloud-uv">0</span> 人
</p>
    </div>

    <!-- 右侧悬浮按钮 -->
    <div class="right-actions">
      <button @click="toggleDark">{{ isDark ? '☀️' : '🌙' }}</button>
      <button @click="toTop">↑</button>
    </div>
  `,
  data() {
    return {
      isDark: false,
      loading: true
    }
  },
  mounted() {
     this.isDark = localStorage.getItem('darkMode') === 'true'
  document.body.classList.toggle('dark', this.isDark)
    // 加载动画
    setTimeout(() => {
      this.loading = false
    }, 800)

    // 滚动渐入动画监听
    const sections = document.querySelectorAll('.section')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
        }
      })
    }, { threshold: 0.1 })
    sections.forEach(sec => observer.observe(sec))
  },
  methods: {
   toggleDark() {
  this.isDark = !this.isDark
  document.body.classList.toggle('dark', this.isDark)
  // 把主题存到本地，笔记同步
  localStorage.setItem('darkMode', this.isDark ? 'true' : 'false')
},
    toTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
})

// 注册所有组件
app.component('Sidebar', Sidebar)
app.component('About', About)
app.component('Skills', Skills)
app.component('Projects', Projects)
app.component('Notes', Notes)
app.component('Contact', Contact)

app.mount('#app')