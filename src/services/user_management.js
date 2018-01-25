import Api from '@/config/endpoints';
import AXIOS_PROVIDER from '@/services/axios_provider';

export default {
  registerUser(formData) {
    return AXIOS_PROVIDER.getAxiosInstance().post(Api.BASE_URL + Api.REGISTER_USER, formData);
  },
  getUsers() {
    return AXIOS_PROVIDER.getAxiosInstance().get(Api.BASE_URL + Api.GET_USERS);
  },
};
