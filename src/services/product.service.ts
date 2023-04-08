/* eslint-disable import/no-extraneous-dependencies */
import { message } from 'antd';

import httpProduct from '@/http/http.product';
import { GetProduct } from '@/slices/ProductSlices';

export const GetAllProductApi = (dispatch: any) => {
  httpProduct
    .get('/product')
    .then((res) => {
      dispatch(GetProduct(res.data.data.product.rows));
    })
    .catch((_err) => {
      message.error('Can not get data from server');
    });
};

export const DeleteProductApi = (id: number) => {
  httpProduct
    .delete(`/product/${id}`)
    .then(() => {
      message.success('Product deleted');
    })
    .catch((_err: any) => {
      message.error('Unsuccessfully delete data');
    });
};
