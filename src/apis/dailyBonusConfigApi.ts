import http from 'src/utils/http'

const DAILY_BONUS = 'daily-bonus-config'

const dailyBonusConfigApi = {
  getDailyBonuses(currentPage = 1, searchP = '') {
    return http.get<any>(DAILY_BONUS + '?page=' + currentPage + '&search=' + searchP)
  },
  postDailyBonus(data: any) {
    return http.post<any>(DAILY_BONUS, data)
  },
  putDailyBonus(id: string, data: any) {
    return http.put<any>(DAILY_BONUS + '/' + id, data)
  },
  getDailyBonus(id: string) {
    console.log(DAILY_BONUS, id);
    return http.get<any>(DAILY_BONUS + '/' + id)
  },
  deleteDailyBonus(id: string) {
    return http.delete<any>(DAILY_BONUS + '/' + id)
  }
}

export default dailyBonusConfigApi
