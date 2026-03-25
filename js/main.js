// 1. 深色模式切换
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeBtn.textContent = document.body.classList.contains('dark') 
        ? '☀️ 浅色模式' 
        : '🌙 深色模式';
});

// 2. 展开/收起
function toggle(el) {
    el.classList.toggle('open');
    el.nextElementSibling.classList.toggle('active');
}

// 3. 滚动显示模块动画
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('show');
    });
}, { threshold: 0.1 });
sections.forEach(s => observer.observe(s));

// 4. 回到顶部
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) backTop.classList.add('show');
    else backTop.classList.remove('show');
});
backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 5. 动态加载 Markdown
async function loadMd(section, filename) {
    try {
        const res = await fetch(filename);
        const text = await res.text();
        const html = marked.parse(text);
        section.querySelector('.content').innerHTML = html;
    } catch (err) {
        console.error('加载 Markdown 失败:', err);
        section.querySelector('.content').innerHTML = '<p>加载失败，请检查文件</p>';
    }
}

// 页面加载完成后加载所有 MD
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section').forEach(section => {
        const mdFile = section.dataset.md;
        if (mdFile) loadMd(section, mdFile);
    });
});