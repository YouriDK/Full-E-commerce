import { FC, useEffect } from 'react';
import { FcViewDetails } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { listOrderMine } from '../redux/actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MesssageBox from '../components/MesssageBox';
import { texte } from '../data';

const OrderHistoryScreen: FC<any> = (props: any): JSX.Element => {
  const orderMineList = useSelector((state: any) => state.orderMineList);
  const { orders, loading, error } = orderMineList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MesssageBox variant='danger' text={error} />
  ) : (
    <div className='table-users' style={{ width: '80%' }}>
      <div className='header'>Orders</div>
      <table className='table'>
        <tr className='table-tr'>
          {texte.Ordre.order_list_mine.en.map((td: string, index: number) => (
            <td className='table-td table-title' key={index}>
              {td}
            </td>
          ))}
        </tr>
        {orders.map((order: any) => (
          <tr className='table-tr' key={order._id}>
            <td className='table-td font-secondary large xbold'>{order._id}</td>

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
                ? order.isdeliveredAt.substring(1, 10)
                : texte.Ordre.notdeli.en}
            </td>
            <td className='table-td'>
              <>
                <Button
                  onClick={() => props.history.push(`/order/${order._id}`)}
                  className='primary'
                >
                  <FcViewDetails size={20} />
                </Button>
              </>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
export default OrderHistoryScreen;
