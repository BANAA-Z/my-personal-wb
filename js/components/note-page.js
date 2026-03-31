// 笔记详情页独立逻辑（与原notes.js完全隔离）
document.addEventListener('DOMContentLoaded', () => {
  // ———— 强制同步主题（和主页无缝衔接）————
  const isDark = localStorage.getItem('darkMode') === 'true'
  document.body.classList.toggle('dark', isDark)

  // ———— 解析URL参数，加载对应Markdown————
  const urlParams = new URLSearchParams(location.search)
  const mdFile = urlParams.get('md')
  const noteTitle = urlParams.get('title')

  // 设置笔记标题
  document.getElementById('note-title').textContent = noteTitle || '笔记详情'

  // 加载并解析Markdown文件
  fetch(`md/${mdFile}`)
    .then(response => {
      if (!response.ok) throw new Error('文件加载失败')
      return response.text()
    })
    .then(markdownContent => {
      document.getElementById('note-content').innerHTML = marked.parse(markdownContent)
    })
    .catch(error => {
      document.getElementById('note-content').innerHTML = `<p style="color: #ff4d4f;">加载失败：${error.message}</p>`
    })
})