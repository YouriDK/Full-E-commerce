import React, { FC, useEffect } from 'react';
import { MdRestoreFromTrash } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MesssageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstant';
import { texte } from '../data';
import { ImWrench } from 'react-icons/im';

const OrderListScreen: FC<any> = (props: any): JSX.Element => {
  const orderList = useSelector((state: any) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state: any) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders());
  }, [dispatch, successDelete]);
  const deleteHandler = (order: any) => {
    if (window.confirm('Are you sure to delete ?')) {
      dispatch(deleteOrder(order._id));
    }
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger' text={error} />
  ) : (
    <div className='table-users' style={{ width: '80%' }}>
      <div className='header'>Orders</div>
      <table className='table'>
        <tr className='table-tr'>
          {texte.Ordre.order_list.en.map((td: string, index: number) => (
            <td className='table-td table-title' key={index}>
              {td}
            </td>
          ))}
        </tr>
        {orders.map((order: any) => (
          <tr className='table-tr' key={order._id}>
            <td className='table-td font-secondary large xbold'>{order._id}</td>
            <td className='table-td font-secondary large xbold'>
              {order.user.name}
            </td>
            <td className='table-td font-secondary large xbold'>
              {order.createdAt.substring(0, 10)}
            </td>
            <td className='table-td font-secondary large xbold '>
              {order.totalPrice.toFixed(2)}
            </td>
            <td className='table-td font-secondary large xbold'>
              {order.isPaid
                ? order.paidAt.substring(0, 10)
                : texte.Paiement.unpay.en}
            </td>
            <td className='table-td font-secondary large xbold'>
              {order.isDelivered
                ? order.isDeliveredAt.substring(1, 10)
                : texte.Ordre.notdeli.en}
            </td>
            <td className='table-td'>
              <>
                <Button
                  onClick={() => props.history.push(`/order/${order._id}`)}
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
  );
};
export default OrderListScreen;
