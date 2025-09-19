<template>
  <div class="homepage">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <img src="/logo.svg" alt="情绪e站" class="brand-logo" />
          <div class="brand-text">
            <h1>情绪e站</h1>
            <span class="subtitle">Emotion E-Station</span>
          </div>
        </div>
        <div class="nav-links">
          <router-link to="/evs-score" class="nav-link">EVS分测评</router-link>
          <router-link to="/financial-services" class="nav-link">智能理财</router-link>
          <router-link to="/ticket-service" class="nav-link">购票服务</router-link>
          <router-link to="/emotion-landmark" class="nav-link">情绪e地标</router-link>
          <router-link to="/emotion-insurance" class="nav-link">情绪保障</router-link>
        </div>
      </div>
    </nav>

    <!-- 英雄区域 -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>情绪e站</h1>
          <p class="hero-subtitle">专为Z世代打造的情感价值金融服务平台</p>
          <p class="hero-description">将你的热爱转化为金融价值，让每一份情感投入都被认可和量化</p>
          <div class="hero-buttons">
            <router-link to="/evs-score" class="btn btn-primary">开始EVS测评</router-link>
            <router-link to="/financial-services" class="btn btn-secondary">探索服务</router-link>
          </div>
        </div>
        <div class="hero-visual">
          <div class="evs-card">
            <h3>您的EVS分</h3>
            <div class="score" :class="{ rolling: isRolling }">{{ mockEVSScore }}</div>
            <p>情绪价值评分</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心功能 -->
    <section class="features">
      <div class="container">
        <h2>核心功能</h2>
        <div class="features-grid">
          <div class="feature-card" @click="navigateTo('/evs-score')">
            <div class="feature-icon">📊</div>
            <h3>EVS情绪价值分</h3>
            <p>独创的三维评估模型，量化你的情感投入，生成专属的情绪价值分数</p>
          </div>
          <div class="feature-card" @click="navigateTo('/financial-services')">
            <div class="feature-icon">💰</div>
            <h3>智能理财服务</h3>
            <p>心愿预言家储蓄、情绪白条分期、家庭和睦储蓄罐，为热爱而理财</p>
          </div>
          <div class="feature-card" @click="navigateTo('/ticket-service')">
            <div class="feature-icon">🎫</div>
            <h3>购票服务</h3>
            <p>演唱会、漫展、电竞赛事门票，享受专属优惠和分期服务</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🏢</div>
            <h3>情绪e地标</h3>
            <p>线下网点场景化服务，活动现场的专属休息区和增值服务</p>
          </div>
        </div>
      </div>
    </section>

    <!-- EVS量化体系 -->
    <section class="evs-section">
      <div class="container">
        <h2>EVS量化体系</h2>
        <p class="evs-description">
          基于消费深度、参与热度、资产潜力三个维度，为你的情感投入提供科学量化评估
        </p>
        <div class="evs-features">
          <div class="evs-feature">
            <h4>消费深度</h4>
            <p>分析你在兴趣领域的消费行为和投入程度</p>
          </div>
          <div class="evs-feature">
            <h4>参与热度</h4>
            <p>评估你对相关活动和社区的参与积极性</p>
          </div>
          <div class="evs-feature">
            <h4>资产潜力</h4>
            <p>预测你的情感投资转化为经济价值的可能性</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 平台数据 -->
    <section class="stats">
      <div class="container">
        <h2>平台数据</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">50万+</div>
            <div class="stat-label">注册用户</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">1000万+</div>
            <div class="stat-label">累计交易额</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">95%</div>
            <div class="stat-label">用户满意度</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">24/7</div>
            <div class="stat-label">智能服务</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <h3>情绪e站</h3>
        <p>&copy; 2024 情绪e站 - 中国工商银行创新金融服务平台</p>
        <p>让每一份热爱都有价值</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mockEVSScore = ref(0)
const isRolling = ref(false)

// 老虎机数字滚动效果
const rollScore = () => {
  isRolling.value = true
  let rollCount = 0
  const maxRolls = 20
  const rollInterval = setInterval(() => {
    mockEVSScore.value = Math.floor(Math.random() * 900) + 100 // 100-999随机数
    rollCount++
    if (rollCount >= maxRolls) {
      clearInterval(rollInterval)
      isRolling.value = false
    }
  }, 50) // 快速滚动
}

onMounted(() => {
  rollScore()
})

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.homepage {
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

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-logo {
  width: 32px;
  height: 32px;
}

.brand-text h1 {
  color: #1e40af;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.brand-text .subtitle {
  color: #64748b;
  font-size: 0.9rem;
  display: block;
  margin-top: 0.2rem;
  font-weight: 500;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  color: #475569;
  font-weight: 600;
  transition: all 0.3s ease;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  position: relative;
}

.nav-link:hover {
  color: #1e40af;
  background: #f1f5f9;
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  color: #1e40af;
  background: #eff6ff;
}

.hero {
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.4;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.hero .container {
  display: flex;
  align-items: center;
  gap: 4rem;
}

.hero-content {
  flex: 1;
}

.hero-content h1 {
  font-size: 4rem;
  color: white;
  margin-bottom: 1.5rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -1px;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.hero-description {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;
  line-height: 1.7;
  max-width: 600px;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 1.2rem 2.5rem;
  border: none;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: inline-block;
  cursor: pointer;
  letter-spacing: 0.5px;
}

.btn-primary {
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  color: #1e40af;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 24px rgba(30, 64, 175, 0.2);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #f8fafc, #ffffff);
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(30, 64, 175, 0.3);
}

.btn-secondary {
  background: white;
  color: #2563eb;
  border: 2px solid #2563eb;
}

.btn-secondary:hover {
  background: #2563eb;
  color: white;
  transform: translateY(-2px);
}

.hero-visual {
  flex: 1;
  display: flex;
  justify-content: center;
}

.evs-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 12px 30px rgba(30, 64, 175, 0.15);
  border: 1px solid rgba(30, 64, 175, 0.1);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.evs-card h3 {
  color: #64748b;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.score {
  font-size: 3rem;
  font-weight: 800;
  color: #2563eb;
  margin-bottom: 0.5rem;
  transition: all 0.05s ease;
}

.score.rolling {
  animation: slotRoll 0.05s ease-in-out;
}

@keyframes slotRoll {
  0% { transform: translateY(-10px); opacity: 0.7; }
  50% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(10px); opacity: 0.7; }
}

.evs-card p {
  color: #64748b;
  font-size: 0.9rem;
}

.features {
  padding: 6rem 2rem;
  background: white;
}

.features h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 3rem;
  font-weight: 700;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 16px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(30, 64, 175, 0.1);
  box-shadow: 0 8px 24px rgba(30, 64, 175, 0.1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #1e40af, #3b82f6);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(30, 64, 175, 0.2);
  border-color: rgba(30, 64, 175, 0.2);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #1e293b;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
}

.feature-card p {
  color: #64748b;
  line-height: 1.6;
}

.evs-section {
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.evs-section h2 {
  text-align: center;
  font-size: 3rem;
  color: #1e40af;
  margin-bottom: 2rem;
  font-weight: 800;
  letter-spacing: -1px;
}

.evs-description {
  text-align: center;
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.evs-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.evs-feature {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.evs-feature h4 {
  color: #2563eb;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.evs-feature p {
  color: #64748b;
  font-size: 0.9rem;
}

.stats {
  padding: 4rem 2rem;
  background: white;
}

.stats h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 3rem;
  font-weight: 700;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-card {
  text-align: center;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #2563eb;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #64748b;
  font-weight: 500;
}

.footer {
  background: #1e293b;
  color: white;
  text-align: center;
  padding: 3rem 2rem;
}

.footer h3 {
  margin-bottom: 1rem;
  color: #f1f5f9;
}

.footer p {
  color: #94a3b8;
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .hero .container {
    flex-direction: column;
    text-align: center;
  }

  .hero-content h1 {
    font-size: 2.5rem;
  }

  .hero-buttons {
    justify-content: center;
  }

  .btn {
    width: 100%;
    max-width: 300px;
  }

  .features-grid,
  .evs-features,
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
