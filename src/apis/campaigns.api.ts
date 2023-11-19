import http from 'src/utils/http';

const CAMPAIGN = 'campaigns';

const campaignsApi = {
  getCampaigns(currentPage: number = 1, search: string = '') {
    return http.get<any>(CAMPAIGN + '?page=' + currentPage + '&search=' + search);
  },
  postCampaigns(data: any) {
    return http.post<any>(CAMPAIGN, data);
  },
  putCampaigns(id: string, data: any) {
    return http.put<any>(CAMPAIGN + '/' + id, data);
  },
  getCampaign(id: string) {
    return http.get<any>(CAMPAIGN + '/' + id);
  },
  deleteCampaigns(id: string) {
    return http.delete<any>(CAMPAIGN + '/' + id);
  },
};

export default campaignsApi;
