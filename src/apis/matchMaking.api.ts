import http from 'src/utils/http'

export const URL_LOGIN = 'login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'
const MATCH_MAKINGS = 'match-makings'

const matchMakingApi = {
  getMatchMakings(currentPage: number = 1) {
    return http.get<any>(MATCH_MAKINGS + '?page=' + currentPage);
  },
  postMatchMakings(data: any) {
    return http.post<any>(MATCH_MAKINGS, data);
  },
  putMatchMakings(id: string, data: any) {
    return http.put<any>(MATCH_MAKINGS + '/' + id, data);
  },
  getMatchMaking(id: string) {
    return http.get<any>(MATCH_MAKINGS + '/' + id);
  },
  deleteMatchMaking(id: string) {
    return http.delete<any>(MATCH_MAKINGS + '/' + id);
  },
};

export default matchMakingApi
