import React, { FC, useEffect, useState } from 'react';
import { MdRestoreFromTrash } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { deleteOrder, listOrders } from '../redux/actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MesssageBox';
import { ORDER_DELETE_RESET } from '../redux/constants/orderConstant';
import { texte } from '../data';
import { ImWrench } from 'react-icons/im';
import { Pagination } from '@mui/material';
import { AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const OrderListScreen: FC<any> = (): JSX.Element => {
  const orderList = useSelector((state: any) => state.orderList);
  const { loading, error, orders } = orderList;
  const letsGoTo = useNavigate();
  const [currentCage, setCurrentCage] = useState(1);
  const isMobile = useSelector((state: any) => state.isMobile.isMobile);
  const ITEMS_MAX = isMobile ? 11 : 21;
  const orderDelete = useSelector((state: any) => state.orderDelete);
  const { error: errorDelete, success: successDelete } = orderDelete;
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders());
  }, [dispatch, successDelete]);
  const deleteHandler = (order: any) => {
    if (window.confirm('Are you sure to delete ?')) {
      dispatch(deleteOrder(order._id));
    }
  };
  const handlePage = (e: any, value: number) => {
    setCurrentCage(value);
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger' error={error} />
  ) : (
    <>
      <div className='table-users' style={{ width: '80%' }}>
        {errorDelete && <MessageBox variant='danger' text={errorDelete} />}
        <div className='header'>Orders</div>
        <table className='table'>
          {!isMobile && (
            <tr className='table-tr'>
              {texte.Ordre.order_list.en.map((td: string, index: number) => (
                <td className='table-td table-title' key={index}>
                  {td}
                </td>
              ))}
            </tr>
          )}
          {orders
            .slice((currentCage - 1) * ITEMS_MAX, currentCage * ITEMS_MAX - 1)
            .map((order: any) => (
              <tr className='table-tr' key={order._id}>
                {!isMobile && (
                  <td className='table-td font-secondary large xbold'>
                    {order._id}
                  </td>
                )}
                <td className='table-td font-secondary large xbold'>
                  {order.user}
                </td>
                {!isMobile && (
                  <td className='table-td font-secondary large xbold'>
                    {order.createdAt.substring(0, 10)}
                  </td>
                )}
                <td className='table-td font-secondary large xbold '>
                  {order.total_price.toFixed(2)}
                </td>
                {!isMobile && (
                  <td className='table-td font-secondary large xbold'>
                    {order.isPaid
                      ? order.paidAt.substring(0, 10)
                      : texte.Paiement.unpay.en}
                  </td>
                )}{' '}
                {!isMobile && (
                  <td className='table-td font-secondary large xbold'>
                    {order.isDelivered
                      ? order.deliveredAt.substring(1, 10)
                      : texte.Ordre.notdeli.en}
                  </td>
                )}
                <td className='table-td'>
                  <>
                    <Button
                      onClick={() => letsGoTo(`/order/${order._id}`)}
                      className='primary'
                    >
                      <ImWrench size={20} />
                    </Button>
                    <Button
                      className='secondary'
                      onClick={() => deleteHandler(order)}
                    >
                      <MdRestoreFromTrash size={20} />
                    </Button>
                  </>
                </td>
              </tr>
            ))}
        </table>
      </div>
      <br />
      <Pagination
        size='large'
        // shape='rounded'
        count={parseInt(
          (orders.length % ITEMS_MAX !== 0
            ? orders.length / ITEMS_MAX + 1
            : orders.length / ITEMS_MAX
          ).toString()
        )}
        page={currentCage}
        defaultPage={1}
        className='pagination'
        color='primary'
        boundaryCount={2}
        onChange={handlePage}
      />
    </>
  );
};
export default OrderListScreen;
