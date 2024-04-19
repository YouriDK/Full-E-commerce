import { FC, useEffect } from 'react';
import { FcViewDetails } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import LoadingBox from '../components/LoadingBox';
import MesssageBox from '../components/MesssageBox';
import { texte } from '../data';
import { listOrderMine } from '../redux/actions/orderActions';
import { AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { signout } from '../redux/actions/userActions';

const OrderHistoryScreen: FC<any> = (): JSX.Element => {
  const orderMineList = useSelector((state: any) => state.orderMineList);
  const { orders, loading, error } = orderMineList;
  const dispatch: AppDispatch = useDispatch();
  const letsGoTo = useNavigate();

  useEffect(() => {
    const signoutHandler = () => {
      dispatch(signout());
      letsGoTo('/#signout');
    };
    dispatch(listOrderMine());
    if (error && error.redirection) {
      signoutHandler();
    }
  }, [dispatch, error, letsGoTo]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MesssageBox variant='danger' error={error} />
  ) : (
    <div className='table-users' style={{ width: '80%' }}>
      <div className='header'>Orders</div>
      <table className='table'>
        <tbody>
          <tr className='table-tr'>
            {texte.Ordre.order_list_mine.en.map((td: string, index: number) => (
              <td className='table-td table-title' key={index}>
                {td}
              </td>
            ))}
          </tr>
          {orders.map((order: any, index: number) => (
            <tr className='table-tr' key={order._id}>
              <td className='table-td font-secondary large xbold'>
                {order._id}
              </td>

              <td className='table-td font-secondary large xbold'>
                {order.createdAt.substring(0, 10)}
              </td>
              <td className='table-td font-secondary large xbold '>
                {order.total_price.toFixed(2)}
              </td>
              <td className='table-td font-secondary large xbold'>
                {order.isPaid
                  ? order.paidAt.substring(0, 10)
                  : texte.Paiement.unpay.en}
              </td>
              <td className='table-td font-secondary large xbold'>
                {order.isDelivered
                  ? order.deliveredAt.substring(1, 10)
                  : texte.Ordre.notdeli.en}
              </td>
              <td className='table-td'>
                <>
                  <Button
                    onClick={() => letsGoTo(`/order/${order._id}`)}
                    className='primary'
                  >
                    <FcViewDetails size={20} />
                  </Button>
                </>
              </td>
            </tr>
          ))}
        </tbody>{' '}
      </table>
    </div>
  );
};

export default OrderHistoryScreen;
