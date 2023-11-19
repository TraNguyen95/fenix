import { lazy } from 'react'
import Campaigns from 'src/pages/Campaigns'
import AddCampaign from 'src/pages/Campaigns/Add'
import DetailCampaign from 'src/pages/Campaigns/detail'
import MatchMakings from 'src/pages/MatchMakings'
import AddMatchMaking from 'src/pages/MatchMakings/Add'
import DeailMatchMaking from 'src/pages/MatchMakings/detail'
import AddMatchSetting from 'src/pages/MatchSettings/AddMatchSetting'
import DetailMatchSetting from 'src/pages/MatchSettings/DetailMatchSetting'
import ListMatchSetting from 'src/pages/MatchSettings/ListMatchSetting'
import ListPromotions from 'src/pages/Promotions'
import AddPromotion from 'src/pages/Promotions/Add'
import DetailPromotion from 'src/pages/Promotions/detail'
import ListQuest from 'src/pages/Quest'
import AddQuest from 'src/pages/Quest/Add'
import DetailQuest from 'src/pages/Quest/detail'
import RankTier from 'src/pages/RankTiers'
import AddRankTier from 'src/pages/RankTiers/Add'
import RankTierDetail from 'src/pages/RankTiers/detail'

const FormElements = lazy(() => import('../pages/Form/FormElements'))
const FormLayout = lazy(() => import('../pages/Form/FormLayout'))
const Alerts = lazy(() => import('../pages/UiElements/Alerts'))
const Buttons = lazy(() => import('../pages/UiElements/Buttons'))

const coreRoutes: any[] = [
  {
    path: '/rank-tiers',
    title: 'rank-tiers',
    component: RankTier
  },
  {
    path: '/rank-tiers/:id',
    title: 'RankTierDetail',
    component: RankTierDetail
  },
  {
    path: '/rank-tiers/add',
    title: 'RankTierAdd',
    component: AddRankTier
  },
  {
    path: '/match-settings',
    title: 'MatchSetting',
    component: ListMatchSetting
  },
  {
    path: '/match-settings/add',
    title: 'MatchSetting',
    component: AddMatchSetting
  },
  {
    path: '/match-settings/:id',
    title: 'MatchSetting',
    component: DetailMatchSetting
  },
  {
    path: '/match-makings',
    title: 'MatchMakings',
    component: MatchMakings
  },
  {
    path: '/match-makings/:id',
    title: 'DetailMatchMaking',
    component: DeailMatchMaking
  },
  {
    path: '/match-makings/add',
    title: 'AddMatchMaking',
    component: AddMatchMaking
  },
  {
    path: '/campaigns',
    title: 'Campaigns',
    component: Campaigns
  },
  {
    path: '/campaigns/add',
    title: 'AddCampaigns',
    component: AddCampaign
  },
  {
    path: '/campaigns/:id',
    title: 'DetailCampaign',
    component: DetailCampaign
  },
  {
    path: '/promotions/add',
    title: 'Promotions',
    component: AddPromotion
  },
  {
    path: '/promotions/:id',
    title: 'Promotions',
    component: DetailPromotion
  },
  {
    path: '/promotions',
    title: 'Promotions',
    component: ListPromotions
  },
  {
    path: '/quest',
    title: 'list-quests',
    component: ListQuest
  },
  {
    path: '/quest/add',
    title: 'add-quests',
    component: AddQuest
  },
  {
    path: '/quest/:id',
    title: 'detail-quests',
    component: DetailQuest
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons
  }
]

const routes = [...coreRoutes]
export default routes
