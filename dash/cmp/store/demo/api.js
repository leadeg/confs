import { dummyData } from '../../demo/data';

const fetchDummyData = (param1, param2) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve(dummyData);
    }, 1000)
  );
};

export default {
  fetchDummyData,
};
