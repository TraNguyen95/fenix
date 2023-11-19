import http from 'src/utils/http';

export const URL_LOGIN = 'login';
export const URL_REGISTER = 'register';
export const URL_LOGOUT = 'logout';
export const URL_REFRESH_TOKEN = 'refresh-access-token';
const MATCH_SETTINGS = 'match-settings';

const matchSettingApi = {
  getMatchSettings(currentPage: number = 1, search: string) {
    return http.get<any>(MATCH_SETTINGS + '?page=' + currentPage + '&search=' + search);
  },
  postRankSettings(data: any) {
    return http.post<any>(MATCH_SETTINGS, data);
  },
  putRankSettings(id: string, data: any) {
    return http.put<any>(MATCH_SETTINGS + '/' + id, data);
  },
  getMatchSetting(id: string) {
    return http.get<any>(MATCH_SETTINGS + '/' + id);
  },
  deleteRankSetting(id: string) {
    return http.delete<any>(MATCH_SETTINGS + '/' + id);
  },
};

export default matchSettingApi;
