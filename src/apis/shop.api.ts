import http from 'src/utils/http'

const SHOPS = 'shops'

const shopApi = {
  getShops(currentPage = 1, searchP = '') {
    return http.get<any>(SHOPS + '/campaign/items' + '?page=' + currentPage + '&search=' + searchP)
  },
  postShop(data: any) {
    return http.post<any>(SHOPS, data)
  },
  putShop(id: string, data: any) {
    return http.put<any>(SHOPS + '/' + id, data)
  },
  getShop(id: string) {
    return http.get<any>(SHOPS + '/' + id)
  },
  deleteShop(id: string) {
    return http.delete<any>(SHOPS + '/' + id)
  }
}

export default shopApi
