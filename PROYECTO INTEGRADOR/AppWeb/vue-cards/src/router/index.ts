import { createRouter, createWebHashHistory } from 'vue-router'
import CardsList from '../components/CardsList.vue'
import CardForm from '../components/CardForm.vue'
import StudyMode from '../components/StudyMode.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CardsList
    },
    {
      path: '/new',
      name: 'new',
      component: CardForm
    },
    {
      path: '/study',
      name: 'study',
      component: StudyMode
    }
  ]
})

export default router
