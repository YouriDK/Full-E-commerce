import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import EmptyCard from '../components/EmptyCard';
import { createNotifications } from '../components/notifications';
import { texte } from '../data';
import { BsTrash } from 'react-icons/bs';
import queryString from 'query-string';

const CartScreen: FC<any> = (props: any): JSX.Element => {
  const cart = useSelector((state: any) => state.cart);
  const { cartItems } = cart;
  const parsed = queryString.parse(props.location.search);
  const productId = parsed.id;
  const qty = parsed.qty ?? 1;
  const dispatch = useDispatch();
  const removeFromCardHandler = (productId: string) => {
    dispatch(removeFromCart(productId));
  };
  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    if (cartItems.length === 0) {
      createNotifications({
        title: "Cart's empty",
        message: "Let's go shopping",
      });
    }
  }, [dispatch, productId, qty, cartItems]);

  return (
    <>
      {cartItems.length === 0 ? (
        <>
          <EmptyCard />
        </>
      ) : (
        <div className='table-users' style={{ width: '80%' }}>
          <div className='header '>{texte.Cart.cart.en}</div>

          <table className='table'>
            <tbody>
              <tr className='table-tr '>
                {texte.Cart.tab.en.map((td: string) => (
                  <td key={td} className='table-td font-secondary xlarge xbold'>
                    {td}
                  </td>
                ))}
              </tr>

              {cartItems.map((item: any, index: number) => (
                <tr className='table-tr' key={index}>
                  <td className='table-td'>
                    <img src={item.image} alt={item.name} className='small' />
                  </td>
                  <td className='table-td'>
                    <Link
                      to={'/product/' + item.product}
                      className='link font-secondary large xbold'
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className='table-td'>
                    <select
                      value={item.qty}
                      className={`font-secondary large xbold ${
                        index % 2 === 0 ? 'lightbg' : 'primary'
                      }`}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...(Array(item.countInStock).keys() as any)].map(
                        (x) => (
                          <option key={x} value={x + 1}>
                            {x + 1}
                          </option>
                        )
                      )}
                    </select>
                  </td>
                  <td className='table-td'>
                    <Button
                      onClick={() => removeFromCardHandler(item.product)}
                      className='secondary'
                    >
                      <BsTrash size={25} color='#ffffff' />
                    </Button>
                  </td>
                  <td className='table-td font-secondary large xbold'>
                    {item.price}
                    {texte.Terms.devise.en}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='header'>{texte.Terms.total}</div>
          <table className='table'>
            <tbody>
              <tr className='table-tr'>
                <td className='table-td font-secondary large xbold'>
                  {cartItems.reduce((a: any, c: any) => a + parseInt(c.qty), 0)}{' '}
                  Items
                </td>
                <td className='table-td font-secondary large xbold'>
                  {cartItems.reduce((a: any, c: any) => a + c.price * c.qty, 0)}
                  {texte.Terms.devise.en}
                </td>
              </tr>
            </tbody>
          </table>
          <button
            type='button'
            onClick={checkoutHandler}
            className='primary block'
            disabled={cartItems.length === 0}
          >
            {texte.Panier.checkout.en}
          </button>
        </div>
      )}
    </>
  );
};
export default CartScreen;
