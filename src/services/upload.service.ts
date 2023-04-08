import httpProductUpload from '@/http/http.productUpload';

export const UploadProductApi = (payload: any) => {
  const formData = new FormData();
  formData.append('photo', payload.photo);
  formData.append('name', payload.name);
  formData.append('buyPrice', payload.buyPrice);
  formData.append('sellPrice', payload.sellPrice);
  formData.append('stockLeft', payload.stockLeft);
  httpProductUpload
    .post('/product/upload', formData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
