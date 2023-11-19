import http from 'src/utils/http';

const QUEST = 'quests';

const QUESTApi = {
  getQuests(currentPage: number = 1, search: string = '') {
    return http.get<any>(QUEST + '?page=' + currentPage + '&search=' + search);
  },
  postQuest(data: any) {
    return http.post<any>(QUEST, data);
  },
  putQuest(id: string, data: any) {
    return http.put<any>(QUEST + '/' + id, data);
  },
  getQuest(id: string) {
    return http.get<any>(QUEST + '/' + id);
  },
  deleteQuest(id: string) {
    return http.delete<any>(QUEST + '/' + id);
  },
};

export default QUESTApi;
