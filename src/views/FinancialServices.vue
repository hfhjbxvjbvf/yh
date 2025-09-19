<template>
  <div class="financial-services">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <img src="/logo.svg" alt="情绪e站" class="brand-logo">
          <div class="brand-text">
            <h1>情绪e站</h1>
            <span class="subtitle">Emotion E-Station</span>
          </div>
        </div>
        <div class="nav-links">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/evs-score" class="nav-link">EVS分测评</router-link>
          <router-link to="/ticket-service" class="nav-link">购票服务</router-link>
          <router-link to="/emotion-landmark" class="nav-link">情绪e地标</router-link>
        </div>
      </div>
    </nav>

    <div class="container">
      <!-- 英雄区域 -->
      <section class="hero-section">
        <h1>e智能理财与信贷服务</h1>
        <p class="hero-subtitle">基于EVS分的个性化金融服务，让每一份热爱都有价值</p>
        <div class="hero-stats">
          <div class="stat">
            <div class="stat-number">100万+</div>
            <div class="stat-label">用户信赖</div>
          </div>
          <div class="stat">
            <div class="stat-number">8.5%</div>
            <div class="stat-label">年化收益</div>
          </div>
          <div class="stat">
            <div class="stat-number">24小时</div>
            <div class="stat-label">快速放款</div>
          </div>
        </div>
      </section>

      <!-- 服务介绍 -->
      <section class="services-section">
        <h2>三大核心服务</h2>
        <div class="services-grid">
          <!-- 心愿预言家储蓄 -->
          <div class="service-card" @click="selectService('savings')">
            <div class="service-icon">💰</div>
            <h3>心愿预言家储蓄</h3>
            <p>为您的兴趣爱好量身定制储蓄计划，实现心愿目标</p>
            <div class="service-features">
              <span class="feature">智能规划</span>
              <span class="feature">目标导向</span>
              <span class="feature">灵活存取</span>
            </div>
            <div class="service-rate">年化收益率 5.2%</div>
          </div>

          <!-- 情绪白条 -->
          <div class="service-card" @click="selectService('credit')">
            <div class="service-icon">💳</div>
            <h3>情绪白条</h3>
            <p>基于EVS分的智能信贷服务，满足您的消费需求</p>
            <div class="service-features">
              <span class="feature">秒级审批</span>
              <span class="feature">低息便民</span>
              <span class="feature">随借随还</span>
            </div>
            <div class="service-rate">最低年利率 3.6%</div>
          </div>

          <!-- 心爱之物守护险 -->
          <div class="service-card" @click="selectService('insurance')">
            <div class="service-icon">🛡️</div>
            <h3>心爱之物守护险</h3>
            <p>为您珍贵的收藏品和兴趣物品提供全方位保障</p>
            <div class="service-features">
              <span class="feature">全面保障</span>
              <span class="feature">快速理赔</span>
              <span class="feature">专业评估</span>
            </div>
            <div class="service-rate">保费低至 0.5%</div>
          </div>
        </div>
      </section>

      <!-- 详细信息 -->
      <section v-if="selectedService" class="service-detail">
        <div class="detail-card">
          <h3>{{ serviceDetails[selectedService].title }}</h3>
          <p class="detail-description">{{ serviceDetails[selectedService].description }}</p>
          
          <div class="detail-content">
            <div class="detail-features">
              <h4>产品特色</h4>
              <ul>
                <li v-for="feature in serviceDetails[selectedService].features" :key="feature">
                  {{ feature }}
                </li>
              </ul>
            </div>
            
            <div class="detail-benefits">
              <h4>专属权益</h4>
              <ul>
                <li v-for="benefit in serviceDetails[selectedService].benefits" :key="benefit">
                  {{ benefit }}
                </li>
              </ul>
            </div>
          </div>

          <div class="application-form">
            <h4>立即申请</h4>
            <form @submit.prevent="submitApplication">
              <div class="form-group">
                <label>姓名</label>
                <input type="text" v-model="applicationForm.name" required>
              </div>
              <div class="form-group">
                <label>手机号</label>
                <input type="tel" v-model="applicationForm.phone" required>
              </div>
              <div class="form-group">
                <label>申请金额</label>
                <input type="number" v-model="applicationForm.amount" required>
              </div>
              <div class="form-group">
                <label>用途说明</label>
                <textarea v-model="applicationForm.purpose" rows="3" required></textarea>
              </div>
              <button type="submit" class="submit-btn">提交申请</button>
            </form>
          </div>
        </div>
      </section>

      <!-- EVS分优势 -->
      <section class="evs-advantage">
        <h2>EVS分用户专享优势</h2>
        <div class="advantage-grid">
          <div class="advantage-item">
            <div class="advantage-icon">⚡</div>
            <h4>极速审批</h4>
            <p>基于EVS分的智能风控模型，3分钟完成审批</p>
          </div>
          <div class="advantage-item">
            <div class="advantage-icon">💎</div>
            <h4>专属利率</h4>
            <p>EVS分越高，享受更优惠的利率和更高的额度</p>
          </div>
          <div class="advantage-item">
            <div class="advantage-icon">🎯</div>
            <h4>个性化服务</h4>
            <p>根据您的兴趣领域，提供定制化金融解决方案</p>
          </div>
          <div class="advantage-item">
            <div class="advantage-icon">🔒</div>
            <h4>安全保障</h4>
            <p>银行级安全防护，资金安全有保障</p>
          </div>
        </div>
      </section>

      <!-- 用户案例 -->
      <section class="case-studies">
        <h2>用户成功案例</h2>
        <div class="cases-grid">
          <div class="case-card">
            <div class="case-avatar">👨‍🎨</div>
            <h4>小李 - 动漫收藏家</h4>
            <p class="case-evs">EVS分：856</p>
            <p class="case-story">通过心愿预言家储蓄，成功为限量手办预存资金，还获得了5.2%的年化收益。</p>
            <div class="case-result">成功购买心仪手办，节省利息2000元</div>
          </div>
          <div class="case-card">
            <div class="case-avatar">👩‍🎤</div>
            <h4>小王 - 追星达人</h4>
            <p class="case-evs">EVS分：742</p>
            <p class="case-story">使用情绪白条购买演唱会VIP门票，分期还款无压力，不错过任何精彩演出。</p>
            <div class="case-result">享受3.6%低息，轻松追星</div>
          </div>
          <div class="case-card">
            <div class="case-avatar">👨‍💻</div>
            <h4>小张 - 电竞玩家</h4>
            <p class="case-evs">EVS分：693</p>
            <p class="case-story">为昂贵的游戏设备购买了心爱之物守护险，意外损坏后快速获得理赔。</p>
            <div class="case-result">设备全额理赔，继续电竞梦想</div>
          </div>
        </div>
      </section>

      <!-- CTA区域 -->
      <section class="cta-section">
        <h2>开启您的专属金融服务</h2>
        <p>还没有EVS分？先完成测评，解锁更多专属权益</p>
        <div class="cta-buttons">
          <router-link to="/evs-score" class="cta-btn primary">
            立即测评EVS分
          </router-link>
          <button @click="scrollToServices" class="cta-btn secondary">
            查看服务详情
          </button>
        </div>
      </section>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <h3>情绪e站</h3>
        <p>&copy; 2024 情绪e站 - 中国工商银行创新金融服务平台</p>
        <p>让每一份热爱都有价值</p>
      </div>
    </footer>

    <!-- 申请成功弹窗 -->
    <div v-if="showSuccessModal" class="modal-overlay" @click="closeSuccessModal">
      <div class="modal-content" @click.stop>
        <div class="success-icon">✅</div>
        <h3>申请提交成功！</h3>
        <p>我们将在24小时内联系您，请保持手机畅通。</p>
        <button @click="closeSuccessModal" class="modal-btn">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const selectedService = ref(null)
const showSuccessModal = ref(false)

const applicationForm = reactive({
  name: '',
  phone: '',
  amount: '',
  purpose: ''
})

const serviceDetails = {
  savings: {
    title: '心愿预言家储蓄',
    description: '基于您的兴趣爱好和消费习惯，智能规划储蓄方案，帮您实现心愿目标。',
    features: [
      '智能目标设定：根据EVS分析您的消费模式',
      '灵活存取：支持随时调整储蓄计划',
      '收益保障：年化收益率5.2%，稳健增值',
      '目标提醒：智能提醒储蓄进度和目标达成'
    ],
    benefits: [
      'EVS分600+用户享受额外0.2%收益加成',
      '达成储蓄目标可获得专属优惠券',
      '免费提供理财规划咨询服务',
      '优先参与限量商品预售活动'
    ]
  },
  credit: {
    title: '情绪白条',
    description: '基于EVS分的智能信贷服务，为您的兴趣消费提供资金支持。',
    features: [
      '秒级审批：基于EVS分快速评估信用',
      '灵活额度：最高可申请50万元',
      '随借随还：支持提前还款，按日计息',
      '多场景支持：演出票务、商品购买、旅行等'
    ],
    benefits: [
      'EVS分700+用户享受最低3.6%年利率',
      '首次申请免手续费',
      '专属客服一对一服务',
      '消费积分可兑换演出门票'
    ]
  },
  insurance: {
    title: '心爱之物守护险',
    description: '为您珍贵的收藏品和兴趣物品提供全方位保险保障。',
    features: [
      '全面保障：意外损坏、盗窃、自然灾害',
      '专业评估：合作权威鉴定机构',
      '快速理赔：7个工作日内完成理赔',
      '全球保障：国内外均可享受保险服务'
    ],
    benefits: [
      'EVS分800+用户享受保费8折优惠',
      '免费提供物品价值评估服务',
      '专属理赔绿色通道',
      '年度免费保养维护服务'
    ]
  }
}

const selectService = (service) => {
  selectedService.value = service
  // 滚动到详情区域
  setTimeout(() => {
    document.querySelector('.service-detail').scrollIntoView({ 
      behavior: 'smooth' 
    })
  }, 100)
}

const submitApplication = () => {
  // 模拟提交申请
  console.log('提交申请:', applicationForm)
  showSuccessModal.value = true
  
  // 重置表单
  Object.keys(applicationForm).forEach(key => {
    applicationForm[key] = ''
  })
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}

const scrollToServices = () => {
  document.querySelector('.services-section').scrollIntoView({ 
    behavior: 'smooth' 
  })
}
</script>

<style scoped>
.financial-services {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
}

.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #cbd5e1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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
  color: #2563eb;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
}

.brand-text .subtitle {
  color: #64748b;
  font-size: 0.9rem;
  display: block;
  margin-top: 0.2rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  transition: color 0.3s;
  padding: 0.5rem 1rem;
  border-radius: 6px;
}

.nav-link:hover {
  color: #2563eb;
  background: #f1f5f9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  text-align: center;
}

.hero-section h1 {
  font-size: 3rem;
  color: #1e293b;
  margin-bottom: 1rem;
  font-weight: 800;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 2rem;
}

.stat {
  text-align: center;
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

.services-section {
  padding: 4rem 0;
  background: white;
}

.services-section h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 3rem;
  font-weight: 700;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.service-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #64748b, #475569);
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(100, 116, 139, 0.15);
  border-color: #64748b;
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.service-card h3 {
  color: #1e293b;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.3rem;
}

.service-card p {
  color: #64748b;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.service-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.feature {
  background: #eff6ff;
  color: #2563eb;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.service-rate {
  font-weight: 600;
  color: #059669;
  font-size: 1.1rem;
}

.service-detail {
  padding: 3rem 0;
  background: #f8fafc;
}

.detail-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.detail-card h3 {
  color: #1e293b;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-weight: 600;
}

.detail-description {
  color: #64748b;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.detail-features h4,
.detail-benefits h4 {
  color: #2563eb;
  margin-bottom: 1rem;
  font-weight: 600;
}

.detail-features ul,
.detail-benefits ul {
  list-style: none;
  padding: 0;
}

.detail-features li,
.detail-benefits li {
  padding: 0.5rem 0;
  color: #64748b;
  position: relative;
  padding-left: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.detail-features li:before,
.detail-benefits li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
}

.application-form {
  background: #f8fafc;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.application-form h4 {
  color: #1e293b;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #374151;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.submit-btn {
  background: #2563eb;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
  font-size: 1.1rem;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
}

.submit-btn:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
}

.evs-advantage {
  padding: 4rem 0;
  background: white;
}

.evs-advantage h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 3rem;
  font-weight: 700;
}

.advantage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.advantage-item {
  text-align: center;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: transform 0.3s;
}

.advantage-item:hover {
  transform: translateY(-4px);
}

.advantage-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.advantage-item h4 {
  color: #1e293b;
  margin-bottom: 1rem;
  font-weight: 600;
}

.advantage-item p {
  color: #64748b;
  line-height: 1.6;
}

.case-studies {
  padding: 4rem 0;
  background: #f8fafc;
}

.case-studies h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 3rem;
  font-weight: 700;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.case-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.case-avatar {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.case-card h4 {
  color: #1e293b;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.case-evs {
  color: #2563eb;
  font-weight: 600;
  margin-bottom: 1rem;
}

.case-story {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.case-result {
  background: #dcfce7;
  color: #166534;
  padding: 0.8rem;
  border-radius: 6px;
  font-weight: 500;
}

.cta-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  text-align: center;
  color: white;
}

.cta-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.cta-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.cta-btn {
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  font-size: 1.1rem;
}

.cta-btn.primary {
  background: white;
  color: #2563eb;
}

.cta-btn.primary:hover {
  background: #f1f5f9;
  transform: translateY(-2px);
}

.cta-btn.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.cta-btn.secondary:hover {
  background: white;
  color: #2563eb;
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.success-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.modal-content h3 {
  color: #1e293b;
  margin-bottom: 1rem;
  font-weight: 600;
}

.modal-content p {
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.modal-btn {
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.modal-btn:hover {
  background: #1d4ed8;
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

  .hero-section h1 {
    font-size: 2.5rem;
  }

  .hero-stats {
    flex-direction: column;
    gap: 2rem;
  }

  .services-section h2,
  .evs-advantage h2,
  .case-studies h2,
  .cta-section h2 {
    font-size: 2rem;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .detail-content {
    grid-template-columns: 1fr;
  }

  .advantage-grid {
    grid-template-columns: 1fr;
  }

  .cases-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .cta-btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>