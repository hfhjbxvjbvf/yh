<template>
  <div class="emotion-landmark">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="container">
        <div class="nav-brand">
          <img src="/logo.svg" alt="Logo" class="brand-logo" />
          <div class="brand-text">
            <h1>情绪e站</h1>
            <span class="subtitle">Emotion Station</span>
          </div>
        </div>
        <div class="nav-links">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/evs-score" class="nav-link">EVS分测评</router-link>
          <router-link to="/financial-services" class="nav-link">智能理财</router-link>
          <router-link to="/ticket-service" class="nav-link">购票服务</router-link>
          <router-link to="/emotion-insurance" class="nav-link">情绪保障</router-link>
        </div>
      </div>
    </nav>

    <!-- 主要内容 -->
    <div class="main-content">
      <div class="container">
        <!-- 轮播图区域 -->
        <div class="carousel-section">
          <h2>情绪e地标</h2>
          <div class="carousel-container">
            <div
              class="carousel-wrapper"
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
              <div v-for="(image, index) in carouselImages" :key="index" class="carousel-slide">
                <img :src="image.url" :alt="image.title" />
                <div class="slide-caption">
                  <h3>{{ image.title }}</h3>
                  <p>{{ image.description }}</p>
                </div>
              </div>
            </div>
            <button @click="prevSlide" class="carousel-btn prev-btn">‹</button>
            <button @click="nextSlide" class="carousel-btn next-btn">›</button>
            <div class="carousel-indicators">
              <span
                v-for="(image, index) in carouselImages"
                :key="index"
                :class="{ active: index === currentSlide }"
                @click="goToSlide(index)"
              ></span>
            </div>
          </div>
        </div>

        <!-- 评论区 -->
        <div class="comments-section">
          <h3>粉丝留言板</h3>

          <!-- 发表评论 -->
          <div class="comment-form">
            <div class="form-group">
              <input v-model="newComment.nickname" placeholder="请输入昵称" class="form-input" />
            </div>
            <div class="form-group">
              <textarea
                v-model="newComment.content"
                placeholder="分享您的感受..."
                class="form-textarea"
                rows="3"
              ></textarea>
            </div>
            <button @click="submitComment" class="btn-submit" :disabled="!canSubmit">
              发表评论
            </button>
          </div>

          <!-- 评论列表 -->
          <div class="comments-list">
            <div v-for="comment in comments" :key="comment.id" class="comment-item">
              <div class="comment-avatar">
                {{ comment.nickname.charAt(0) }}
              </div>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="comment-nickname">{{ comment.nickname }}</span>
                  <span class="comment-time">{{ formatTime(comment.timestamp) }}</span>
                </div>
                <p class="comment-text">{{ comment.content }}</p>
              </div>
            </div>
            <div v-if="comments.length === 0" class="no-comments">暂无评论，快来抢沙发吧！</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 情绪e站 - 让每一份情感都有价值</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 轮播图相关
const currentSlide = ref(0)
const carouselImages = ref([
  {
    url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZjFmNWY5Ii8+CjxyZWN0IHg9IjIwMCIgeT0iMTAwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzY0NzQ4YiIgcng9IjEyIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMjEwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7kuK3llYbpk7booYznvZHngrkgPC90ZXh0Pgo8L3N2Zz4K',
    title: '中商银行网点',
    description: '您的专属情绪e地标服务网点',
  },
  {
    url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZWZmNmZmIi8+CjxjaXJjbGUgY3g9IjQwMCIgY3k9IjIwMCIgcj0iMTAwIiBmaWxsPSIjOGI1Y2Y2Ii8+Cjx0ZXh0IHg9IjQwMCIgeT0inMusIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM0YzFkOTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPua8lOWHuuWcuummmDwvdGV4dD4KPC9zdmc+Cg==',
    title: '演出场馆',
    description: '即将前往的精彩演出现场',
  },
  {
    url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZmVmM2M3Ii8+CjxwYXRoIGQ9Ik0zMDAgMTUwTDQwMCAyNTBMNTAwIDE1MEg0NTBWMTAwSDM1MFYxNTBIMzAwWiIgZmlsbD0iI2Y1OWUwYiIvPgo8dGV4dCB4PSI0MDAiIHk9IjMyMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZDk3NzA2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7lupTmj7Dpmo7lnLo8L3RleHQ+Cjwvc3ZnPgo=',
    title: '应援现场',
    description: '与志同道合的朋友一起应援',
  },
])

// 评论相关
const comments = ref([])
const newComment = ref({
  nickname: '',
  content: '',
})

const canSubmit = computed(() => {
  return newComment.value.nickname.trim() && newComment.value.content.trim()
})

const prevSlide = () => {
  currentSlide.value =
    currentSlide.value === 0 ? carouselImages.value.length - 1 : currentSlide.value - 1
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselImages.value.length
}

const goToSlide = (index) => {
  currentSlide.value = index
}

const submitComment = () => {
  if (!canSubmit.value) return

  try {
    const comment = {
      id: Date.now(),
      nickname: newComment.value.nickname.trim(),
      content: newComment.value.content.trim(),
      timestamp: new Date().toISOString(),
    }

    comments.value.unshift(comment)
    saveCommentsToStorage()

    // 清空表单
    newComment.value = {
      nickname: '',
      content: '',
    }

    // 显示成功提示
    alert('评论发表成功！')
  } catch (error) {
    console.error('提交评论失败:', error)
    alert('评论发表失败，请重试')
  }
}

const formatTime = (timestamp) => {
  try {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date

    if (diff < 60000) return '刚刚'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
    return date.toLocaleDateString('zh-CN')
  } catch (error) {
    console.error('时间格式化失败:', error)
    return '未知时间'
  }
}

const saveCommentsToStorage = () => {
  try {
    localStorage.setItem('emotionLandmarkComments', JSON.stringify(comments.value))
  } catch (error) {
    console.error('保存评论失败:', error)
  }
}

const loadCommentsFromStorage = () => {
  try {
    const saved = localStorage.getItem('emotionLandmarkComments')
    if (saved) {
      comments.value = JSON.parse(saved)
    }
  } catch (error) {
    console.error('加载评论失败:', error)
    comments.value = []
  }
}

// 自动轮播
let autoSlideInterval = null

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    nextSlide()
  }, 5000)
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
}

onMounted(() => {
  loadCommentsFromStorage()
  startAutoSlide()
})
</script>

<style scoped>
.emotion-landmark {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
}

.navbar {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(15px);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-logo {
  width: 40px;
  height: 40px;
}

.brand-text h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #1e40af;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.brand-text .subtitle {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}

/* 主要内容 */
.main-content {
  padding: 2rem 0;
}

.carousel-section {
  margin-bottom: 3rem;
}

.carousel-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #1e293b;
  font-size: 2rem;
}

.carousel-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.carousel-wrapper {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-slide {
  min-width: 100%;
  position: relative;
}

.carousel-slide img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.slide-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  padding: 2rem;
}

.slide-caption h3 {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
}

.slide-caption p {
  margin: 0;
  opacity: 0.9;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.carousel-btn:hover {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.prev-btn {
  left: 1rem;
}

.next-btn {
  right: 1rem;
}

.carousel-indicators {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.carousel-indicators span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-indicators span.active {
  background: white;
  transform: scale(1.2);
}

/* 评论区样式 */
.comments-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.comments-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #64748b, #475569);
}

.comments-section h3 {
  margin: 0 0 2rem;
  color: #1e293b;
  font-size: 1.5rem;
}

.comment-form {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.form-group {
  margin-bottom: 1rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #64748b;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.btn-submit {
  background: linear-gradient(135deg, #64748b, #475569);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(100, 116, 139, 0.3);
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.comments-list {
  max-height: 500px;
  overflow-y: auto;
}

.comment-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.comment-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #64748b, #475569);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.comment-nickname {
  font-weight: 600;
  color: #1e293b;
}

.comment-time {
  font-size: 0.875rem;
  color: #64748b;
}

.comment-text {
  margin: 0;
  line-height: 1.6;
  color: #374151;
}

.no-comments {
  text-align: center;
  color: #64748b;
  font-style: italic;
  padding: 2rem;
}

.footer {
  background: #1e293b;
  color: white;
  text-align: center;
  padding: 2rem 0;
  margin-top: 3rem;
}

.footer p {
  margin: 0;
  opacity: 0.8;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #3b82f6;
}

.nav-link.router-link-active {
  color: #3b82f6;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .modal-content {
    margin: 1rem;
    width: calc(100% - 2rem);
  }

  .carousel-slide img {
    height: 250px;
  }

  .slide-caption {
    padding: 1rem;
  }

  .carousel-btn {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .comment-item {
    flex-direction: column;
    gap: 0.5rem;
  }

  .comment-avatar {
    align-self: flex-start;
  }
}
</style>
