import axios from 'axios';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_AI;

const madicalApis = {
  getDashboardStat: async () => {
    return axios({
      url: `${baseUrl}/`,
      method: 'get',
    });
  }
};
export default madicalApis;