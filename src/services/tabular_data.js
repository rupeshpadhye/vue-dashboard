import Api from '@/config/endpoints';
import AXIOS_PROVIDER from '@/services/axios_provider';

export default {
  getTabularData() {
    return AXIOS_PROVIDER.getAxiosInstance().get(Api.BASE_URL + Api.TABULAR_DATA);
  },
};
