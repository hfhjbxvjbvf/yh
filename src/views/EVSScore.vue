<template>
  <div class="evs-score">
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
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/financial-services" class="nav-link">智能理财</router-link>
          <router-link to="/ticket-service" class="nav-link">购票服务</router-link>
          <router-link to="/emotion-landmark" class="nav-link">情绪e地标</router-link>
        </div>
      </div>
    </nav>

    <div class="container">
      <!-- 测评介绍 -->
      <div v-if="currentStep === 'intro'" class="intro-section">
        <h1>EVS情绪价值分测评</h1>
        <p class="subtitle">Emotional Value Score Assessment</p>

        <div class="evs-explanation">
          <h3>什么是EVS分？</h3>
          <p>EVS分是基于三维坐标系统的情绪价值量化模型：</p>

          <div class="dimensions">
            <div class="dimension">
              <div class="axis">X轴 - 消费深度</div>
              <p>衡量你在兴趣领域的资金投入程度</p>
            </div>
            <div class="dimension">
              <div class="axis">Y轴 - 参与热度</div>
              <p>衡量你的时间与精力投入程度</p>
            </div>
            <div class="dimension">
              <div class="axis">Z轴 - 资产潜力</div>
              <p>衡量你所关注领域的市场价值与影响力</p>
            </div>
          </div>
        </div>

        <div class="test-info">
          <h3>测评说明</h3>
          <ul>
            <li>共8道题目，预计用时3-5分钟</li>
            <li>请根据真实情况作答，以获得准确的EVS分</li>
            <li>测评结果将用于为您推荐个性化金融服务</li>
          </ul>
        </div>

        <button @click="startTest" class="start-btn">开始测评</button>
      </div>

      <!-- 测评问题 -->
      <div v-if="currentStep === 'test'" class="assessment-section">
        <h2>EVS分测评</h2>
        <div class="progress-bar">
          <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
        </div>

        <div class="question-card">
          <div class="question-header">
            <span class="question-number"
              >{{ currentQuestionIndex + 1 }} / {{ questions.length }}</span
            >
            <h3>{{ currentQuestion.question }}</h3>
          </div>

          <div class="options">
            <div
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              class="option"
              :class="{ selected: selectedAnswer === index }"
              @click="selectAnswer(index)"
            >
              <input type="radio" :id="`option-${index}`" :value="index" v-model="selectedAnswer" />
              <label :for="`option-${index}`">{{ option.text }}</label>
            </div>
          </div>

          <div class="navigation">
            <button
              @click="previousQuestion"
              :disabled="currentQuestionIndex === 0"
              class="nav-btn prev-btn"
            >
              上一题
            </button>
            <button
              @click="nextQuestion"
              :disabled="selectedAnswer === null"
              class="nav-btn next-btn"
            >
              {{ currentQuestionIndex === questions.length - 1 ? '完成测评' : '下一题' }}
            </button>
          </div>
        </div>
      </div>

      <!-- 结果展示 -->
      <div v-if="currentStep === 'result'" class="result-section">
        <h2>您的EVS分测评结果</h2>

        <div class="score-display">
          <div class="score-number" :class="{ 'animating': isAnimating }">{{ animatedScore }}</div>
          <div class="score-label">EVS总分</div>
        </div>

        <div class="score-breakdown">
          <div class="breakdown-item">
            <h4>消费深度</h4>
            <div class="breakdown-score">{{ scores.consumption }}</div>
            <p class="breakdown-description">资金投入程度</p>
          </div>
          <div class="breakdown-item">
            <h4>参与热度</h4>
            <div class="breakdown-score">{{ scores.participation }}</div>
            <p class="breakdown-description">时间精力投入</p>
          </div>
          <div class="breakdown-item">
            <h4>资产潜力</h4>
            <div class="breakdown-score">{{ scores.potential }}</div>
            <p class="breakdown-description">市场价值影响</p>
          </div>
        </div>

        <div class="recommendations">
          <h3>分析报告</h3>
          <p class="user-type">{{ userTypeAnalysis.type }}</p>
          <p class="analysis-text">{{ userTypeAnalysis.description }}</p>

          <h4>为您推荐的服务：</h4>
          <ul>
            <li v-for="rec in userTypeAnalysis.recommendations" :key="rec">{{ rec }}</li>
          </ul>
        </div>

        <div class="action-buttons">
          <router-link to="/financial-services" class="action-btn primary">
            查看理财服务
          </router-link>
          <button @click="retakeTest" class="action-btn secondary">重新测评</button>
        </div>
      </div>
    </div>

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
import { ref, computed, watch, nextTick } from 'vue'

const currentStep = ref('intro') // 'intro', 'test', 'result'
const currentQuestionIndex = ref(0)
const selectedAnswer = ref(null)
const answers = ref([])
const scores = ref({
  consumption: 0,
  participation: 0,
  potential: 0,
})

// 动画相关变量
const animatedScore = ref(0)
const isAnimating = ref(false)

// 测评问题数据
const questions = ref([
  {
    question: '您平均每月在兴趣爱好上的花费是多少？',
    options: [
      { text: '100元以下', consumption: 1, participation: 0, potential: 0 },
      { text: '100-500元', consumption: 2, participation: 0, potential: 0 },
      { text: '500-1000元', consumption: 3, participation: 0, potential: 0 },
      { text: '1000-3000元', consumption: 4, participation: 0, potential: 0 },
      { text: '3000元以上', consumption: 5, participation: 0, potential: 0 },
    ],
  },
  {
    question: '您每天花费在兴趣相关活动上的时间是？',
    options: [
      { text: '30分钟以下', consumption: 0, participation: 1, potential: 0 },
      { text: '30分钟-1小时', consumption: 0, participation: 2, potential: 0 },
      { text: '1-2小时', consumption: 0, participation: 3, potential: 0 },
      { text: '2-4小时', consumption: 0, participation: 4, potential: 0 },
      { text: '4小时以上', consumption: 0, participation: 5, potential: 0 },
    ],
  },
  {
    question: '您主要关注的兴趣领域是？',
    options: [
      { text: '小众独立音乐/艺术', consumption: 0, participation: 0, potential: 2 },
      { text: '网络游戏/电竞', consumption: 0, participation: 0, potential: 4 },
      { text: '动漫/二次元文化', consumption: 0, participation: 0, potential: 3 },
      { text: '主流明星/娱乐', consumption: 0, participation: 0, potential: 5 },
      { text: '体育赛事', consumption: 0, participation: 0, potential: 4 },
    ],
  },
  {
    question: '您是否购买过演唱会/活动的VIP门票？',
    options: [
      { text: '从未购买', consumption: 1, participation: 0, potential: 0 },
      { text: '偶尔购买', consumption: 2, participation: 0, potential: 0 },
      { text: '经常购买', consumption: 4, participation: 0, potential: 0 },
      { text: '只买VIP/前排', consumption: 5, participation: 0, potential: 0 },
    ],
  },
  {
    question: '您在社交媒体上的活跃程度如何？',
    options: [
      { text: '很少发布相关内容', consumption: 0, participation: 1, potential: 0 },
      { text: '偶尔分享', consumption: 0, participation: 2, potential: 0 },
      { text: '经常发布原创内容', consumption: 0, participation: 4, potential: 0 },
      { text: '是该领域的KOL', consumption: 0, participation: 5, potential: 0 },
    ],
  },
  {
    question: '您参与粉丝群体活动的频率？',
    options: [
      { text: '从不参与', consumption: 0, participation: 1, potential: 0 },
      { text: '偶尔参与', consumption: 0, participation: 2, potential: 0 },
      { text: '经常参与', consumption: 0, participation: 4, potential: 0 },
      { text: '组织活动', consumption: 0, participation: 5, potential: 0 },
    ],
  },
])

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
const progressPercentage = computed(
  () => ((currentQuestionIndex.value + 1) / questions.value.length) * 100,
)
const finalScore = computed(() => {
  const total = scores.value.consumption + scores.value.participation + scores.value.potential
  return Math.round(total * 10.67) // 将总分映射到1000分制
})

// 数字滚动动画函数
const animateScore = (targetScore) => {
  if (isAnimating.value) return
  
  isAnimating.value = true
  animatedScore.value = 0
  
  const duration = 2000 // 动画持续时间（毫秒）
  const startTime = Date.now()
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // 使用缓动函数让动画更自然
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    
    animatedScore.value = Math.round(targetScore * easeOutQuart)
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      animatedScore.value = targetScore
      isAnimating.value = false
    }
  }
  
  requestAnimationFrame(animate)
}

// 监听finalScore变化，触发动画
watch(finalScore, (newScore) => {
  if (currentStep.value === 'result' && newScore > 0) {
    nextTick(() => {
      animateScore(newScore)
    })
  }
})

const userTypeAnalysis = computed(() => {
  const { consumption, participation, potential } = scores.value

  if (consumption >= 40 && participation >= 40) {
    return {
      type: '核心投入者',
      description:
        '您在兴趣领域有着深度的资金和时间投入，是该领域的核心用户。您的情感投入具有很高的金融价值。',
      recommendations: [
        '心愿预言家储蓄计划 - 为大型活动提前储蓄',
        '情绪白条高额度服务 - 享受优惠利率',
        'VIP专属理财产品',
      ],
    }
  } else if (consumption >= 35) {
    return {
      type: '高净值收藏家',
      description: '您在消费方面投入较多，偏向于购买高价值商品。适合资产保值增值类服务。',
      recommendations: ['心爱之物守护险 - 保护您的收藏品', '高端储蓄理财计划', '限量商品分期服务'],
    }
  } else if (participation >= 35) {
    return {
      type: '高影响力KOC',
      description: '您在社群中非常活跃，具有很强的影响力。您的价值在于社交网络和内容创作。',
      recommendations: ['创作者专属信贷服务', '社交电商合作计划', '粉丝经济理财产品'],
    }
  } else if (potential >= 35) {
    return {
      type: '潜力投资者',
      description: '您关注的领域具有很高的市场价值，适合进行相关投资和理财规划。',
      recommendations: ['IP投资理财产品', '文娱产业基金', '趋势预测储蓄计划'],
    }
  } else {
    return {
      type: '新兴参与者',
      description: '您刚开始在该领域投入，有很大的成长潜力。我们为您提供入门级服务。',
      recommendations: ['新手储蓄计划', '小额分期服务', '兴趣培养理财产品'],
    }
  }
})

const startTest = () => {
  currentStep.value = 'test'
  // 重置动画状态
  animatedScore.value = 0
  isAnimating.value = false
}

const selectAnswer = (index) => {
  selectedAnswer.value = index
}

const nextQuestion = () => {
  if (selectedAnswer.value !== null) {
    // 记录答案
    answers.value[currentQuestionIndex.value] = selectedAnswer.value

    // 累加分数
    const option = currentQuestion.value.options[selectedAnswer.value]
    scores.value.consumption += option.consumption
    scores.value.participation += option.participation
    scores.value.potential += option.potential

    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value++
      selectedAnswer.value = null
    } else {
      // 测评完成
      currentStep.value = 'result'
    }
  }
}

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    // 减去当前题目的分数
    const currentAnswer = answers.value[currentQuestionIndex.value - 1]
    if (currentAnswer !== undefined) {
      const option = questions.value[currentQuestionIndex.value - 1].options[currentAnswer]
      scores.value.consumption -= option.consumption
      scores.value.participation -= option.participation
      scores.value.potential -= option.potential
    }

    currentQuestionIndex.value--
    selectedAnswer.value = answers.value[currentQuestionIndex.value] || null
  }
}

const retakeTest = () => {
  currentStep.value = 'intro'
  currentQuestionIndex.value = 0
  selectedAnswer.value = null
  answers.value = []
  scores.value = { consumption: 0, participation: 0, potential: 0 }
}
</script>

<style scoped>
.evs-score {
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
  color: #64748b;
  font-weight: 600;
  transition: all 0.3s ease;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
}

.nav-link:hover {
  color: #1e40af;
  background: rgba(30, 64, 175, 0.08);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.intro-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  text-align: center;
}

.intro-section h1 {
  font-size: 3.5rem;
  color: #1e40af;
  margin-bottom: 1rem;
  font-weight: 800;
  letter-spacing: -1px;
}

.intro-section .subtitle {
  font-size: 1.3rem;
  color: #64748b;
  margin-bottom: 3rem;
  font-weight: 600;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.evs-explanation {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 16px;
  padding: 2.5rem;
  margin: 2rem auto;
  max-width: 800px;
  text-align: left;
  border: 1px solid rgba(30, 64, 175, 0.1);
  box-shadow: 0 8px 24px rgba(30, 64, 175, 0.1);
}

.evs-explanation h3 {
  color: #1e40af;
  margin-bottom: 1rem;
  font-weight: 700;
  font-size: 1.5rem;
}

.evs-explanation p {
  color: #64748b;
  margin-bottom: 1.5rem;
}

.dimensions {
  display: grid;
  gap: 1rem;
}

.dimension {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.axis {
  font-weight: 600;
  color: #2563eb;
  margin-bottom: 0.5rem;
}

.dimension p {
  color: #64748b;
  margin: 0;
  font-size: 0.9rem;
}

.test-info {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 800px;
  text-align: left;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.test-info h3 {
  color: #2563eb;
  margin-bottom: 1rem;
  font-weight: 600;
}

.test-info ul {
  list-style: none;
  padding: 0;
}

.test-info li {
  padding: 0.5rem 0;
  color: #64748b;
  position: relative;
  padding-left: 1.5rem;
}

.test-info li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
}

.start-btn {
  background: #2563eb;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
}

.start-btn:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
}

.assessment-section {
  padding: 4rem 0;
  background: white;
}

.assessment-section h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 3rem;
  font-weight: 700;
}

.progress-bar {
  background: #e2e8f0;
  height: 8px;
  border-radius: 4px;
  margin-bottom: 2rem;
  overflow: hidden;
}

.progress {
  background: #2563eb;
  height: 100%;
  transition: width 0.3s ease;
}

.question-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.question-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #64748b, #475569);
}

.question-header {
  margin-bottom: 2rem;
}

.question-number {
  color: #2563eb;
  font-weight: 600;
  font-size: 0.9rem;
}

.question-card h3 {
  color: #1e293b;
  margin-top: 0.5rem;
  margin-bottom: 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.option {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.option:hover {
  border-color: #2563eb;
  background: #f1f5f9;
}

.option.selected {
  border-color: #2563eb;
  background: #eff6ff;
}

.option input[type='radio'] {
  margin-right: 1rem;
  accent-color: #2563eb;
}

.option label {
  cursor: pointer;
  color: #374151;
  font-weight: 500;
  flex: 1;
}

.navigation {
  display: flex;
  justify-content: space-between;
}

.nav-btn {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.prev-btn {
  background: #f1f5f9;
  color: #64748b;
}

.prev-btn:hover:not(:disabled) {
  background: #e2e8f0;
}

.prev-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.next-btn {
  background: #2563eb;
  color: white;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
}

.next-btn:hover:not(:disabled) {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
}

.next-btn:disabled {
  background: #94a3b8;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.result-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  text-align: center;
}

.result-section h2 {
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 2rem;
  font-weight: 700;
}

.score-display {
  background: white;
  border-radius: 16px;
  padding: 3rem;
  margin: 2rem auto;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.score-number {
  font-size: 4rem;
  font-weight: 800;
  color: #2563eb;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  transform: translateZ(0);
  will-change: contents;
}

.score-number.animating {
  animation: scoreGlow 0.6s ease-in-out;
}

@keyframes scoreGlow {
  0% {
    text-shadow: 0 0 5px rgba(37, 99, 235, 0.3);
    transform: scale(1);
  }
  50% {
    text-shadow: 0 0 20px rgba(37, 99, 235, 0.6);
    transform: scale(1.05);
  }
  100% {
    text-shadow: 0 0 5px rgba(37, 99, 235, 0.3);
    transform: scale(1);
  }
}

.score-label {
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 2rem;
}

.score-breakdown {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.breakdown-item {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.breakdown-item h4 {
  color: #2563eb;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.breakdown-score {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.breakdown-description {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0;
}

.recommendations {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-top: 3rem;
  text-align: left;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.recommendations h3 {
  color: #1e293b;
  margin-bottom: 1rem;
  font-weight: 600;
}

.user-type {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2563eb;
  margin-bottom: 1rem;
}

.analysis-text {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.recommendations h4 {
  color: #2563eb;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.recommendations ul {
  list-style: none;
  padding: 0;
}

.recommendations li {
  padding: 0.5rem 0;
  color: #64748b;
  border-bottom: 1px solid #f1f5f9;
  position: relative;
  padding-left: 1.5rem;
}

.recommendations li:before {
  content: '✓';
  color: #10b981;
  font-weight: bold;
  position: absolute;
  left: 0;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.action-btn {
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  font-size: 1rem;
}

.action-btn.primary {
  background: #2563eb;
  color: white;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
}

.action-btn.primary:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
}

.action-btn.secondary {
  background: #f1f5f9;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.action-btn.secondary:hover {
  background: #e2e8f0;
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

  .intro-section h1 {
    font-size: 2.5rem;
  }

  .assessment-section h2,
  .result-section h2 {
    font-size: 2rem;
  }

  .question-card {
    padding: 1.5rem;
  }

  .score-display {
    padding: 2rem;
  }

  .score-number {
    font-size: 3rem;
  }

  .score-breakdown {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }

  .action-btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>
