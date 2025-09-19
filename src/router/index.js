import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import EVSScore from '../views/EVSScore.vue'
import FinancialServices from '../views/FinancialServices.vue'
import TicketService from '../views/TicketService.vue'
import EmotionLandmark from '../views/EmotionLandmark.vue'
import EmotionInsurance from '../views/EmotionInsurance.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/evs-score',
      name: 'evs-score',
      component: EVSScore,
    },
    {
      path: '/financial-services',
      name: 'financial-services',
      component: FinancialServices,
    },
    {
      path: '/ticket-service',
      name: 'ticket-service',
      component: TicketService,
    },
    {
      path: '/emotion-landmark',
      name: 'emotion-landmark',
      component: EmotionLandmark,
    },
    {
      path: '/emotion-insurance',
      name: 'emotion-insurance',
      component: EmotionInsurance,
    },
  ],
})

export default router
