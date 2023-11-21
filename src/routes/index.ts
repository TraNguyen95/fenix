import { lazy } from 'react'
import Campaigns from 'src/pages/Campaigns'
import DetailCampaign from 'src/pages/Campaigns/Detail'
import DailyBonusConfig from 'src/pages/DailyBonusConfig'
import DetailDailyBoususConfig from 'src/pages/DailyBonusConfig/Detail'
import MatchMakings from 'src/pages/MatchMakings'
import AddMatchMaking from 'src/pages/MatchMakings/Add'
import DeailMatchMaking from 'src/pages/MatchMakings/detail'
import AddMatchSetting from 'src/pages/MatchSettings/AddMatchSetting'
import DetailMatchSetting from 'src/pages/MatchSettings/DetailMatchSetting'
import ListMatchSetting from 'src/pages/MatchSettings/ListMatchSetting'
import ListPromotions from 'src/pages/Promotions'
import AddPromotion from 'src/pages/Promotions/Add'
import AddPromotionRenew from 'src/pages/Promotions/AddReNew'
import DetailPromotion from 'src/pages/Promotions/detail'
import ListQuest from 'src/pages/Quest'
import AddQuest from 'src/pages/Quest/Add'
import DetailQuest from 'src/pages/Quest/detail'
import RankTier from 'src/pages/RankTiers'
import AddRankTier from 'src/pages/RankTiers/Add'
import RankTierDetail from 'src/pages/RankTiers/detail'
import ListShop from 'src/pages/Shop'
import DetailShop from 'src/pages/Shop/Detail'

const FormElements = lazy(() => import('../pages/Form/FormElements'))
const FormLayout = lazy(() => import('../pages/Form/FormLayout'))
const Alerts = lazy(() => import('../pages/UiElements/Alerts'))
const Buttons = lazy(() => import('../pages/UiElements/Buttons'))

function groupRoute(colectionName: string, components: any[]) {
  return [
    {
      path: `/${colectionName}`,
      title: 'colectionName',
      component: components[0]
    },
    {
      path: `/${colectionName}/add`,
      title: 'colectionName',
      component: components[1]
    },
    {
      path: `/${colectionName}/:id`,
      title: 'colectionName',
      component: components[1]
    }
  ]
}

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
  ...groupRoute('campaigns', [Campaigns, DetailCampaign]),
  ...groupRoute('promotions', [ListPromotions, DetailPromotion]),
  ...groupRoute('shops', [ListShop, DetailShop]),
  {
    path: '/promotions/add-renew',
    title: 'Promotions',
    component: AddPromotionRenew
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
  ...groupRoute('daily-bonus-config', [DailyBonusConfig, DetailDailyBoususConfig]),
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
