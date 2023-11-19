import http from 'src/utils/http';

const PROMOTION = 'promotion-packages';

const promotionApi = {
  getPromotions (currentPage: number = 1, search: string = '') {
    return http.get<any>(PROMOTION + '?page=' + currentPage + '&search=' + search);
  },
  postPromotion (data: any) {
    return http.post<any>(PROMOTION, data);
  },
  putPromotion (id: string, data: any) {
    return http.put<any>(PROMOTION + '/' + id, data);
  },
  getPromotion(id: string) {
    return http.get<any>(PROMOTION + '/' + id);
  },
  deletePromotion (id: string) {
    return http.delete<any>(PROMOTION + '/' + id);
  },
};

export default promotionApi;
