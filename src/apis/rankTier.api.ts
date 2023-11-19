import http from 'src/utils/http'

export const URL_LOGIN = 'login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'
const RANK_TIERS = 'rank-tiers'

const rankTierApi = {
  getRankSettings(currentPage: number = 1, search?: string) {
    return http.get<any>(
      `${RANK_TIERS}?page=${currentPage}&search=${search ? search : ''}`,
    );
  },
  postRankSettings(data: any) {
    return http.post<any>(RANK_TIERS, data);
  },
  putRankSettings(id: string, data: any) {
    return http.put<any>(RANK_TIERS + '/' + id, data);
  },
  getRankSetting(id: string) {
    return http.get<any>(RANK_TIERS + '/' + id);
  },
  deleteRankSetting(id: string) {
    return http.delete<any>(RANK_TIERS + '/' + id);
  },
};

export default rankTierApi
