import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { addOrder, getCartUser } from "../redux/actions";
import { ADD_ORDER } from "../redux/actionTypes";
import { useNavigate } from "react-router";
import Title from "../components/Title";
import IconCategory from "../components/IconCategory";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const userCarts = useSelector((state) => state.customer?.userCarts);
  const user = JSON.parse(localStorage.getItem("user"));

  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  });
  const [cartProductState, setCartProductState] = useState([]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCarts?.length; index++) {
      sum =
        sum +
        Number(userCarts[index].quantity) * userCarts[index]?.product.price;
    }
    setTotalAmount(sum);
  }, [userCarts]);

  useEffect(() => {
    let items = [];
    for (let index = 0; index < userCarts?.length; index++) {
      items.push({
        product_id: userCarts[index].product_id,
        quantity: userCarts[index].quantity,
        price: userCarts[index]?.product.price,
      });
    }
    setCartProductState(items);
  }, [userCarts]);

  const validateInput = () => {
    const nameRegex = /^[a-zA-ZÀ-ỹà-ỹ\s]+$/u;
    const phoneRegex = /^[0-9]{10}$/;

    if (!shippingInfo.firstName || !shippingInfo.lastName || !shippingInfo.address || !shippingInfo.phone) {
      alert("Vui lòng điền đầy đủ tất cả các thông tin.");
      return false;
    }

    if (!nameRegex.test(shippingInfo.firstName) || !nameRegex.test(shippingInfo.lastName)) {
      alert("Họ và tên không được chứa ký tự đặc biệt hoặc số.");
      return false;
    }

    if (shippingInfo.firstName.length > 255 || shippingInfo.lastName.length > 255) {
      alert("Họ và tên không được vượt quá 255 ký tự.");
      return false;
    }

    if (shippingInfo.address.length > 255) {
      alert("Địa chỉ không được vượt quá 255 ký tự.");
      return false;
    }

    if (!phoneRegex.test(shippingInfo.phone)) {
      alert("Số điện thoại phải đúng 10 chữ số và không có ký tự đặc biệt.");
      return false;
    }

    return true;
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    const orderData = {
      userId: user?.userData?.id,
      productItems: cartProductState,
      shippingAddress: JSON.stringify(shippingInfo),
      total_price: totalAmount,
    };

    dispatch(addOrder(orderData));
  };

  useEffect(() => {
    if (store.errors || store.customer.orderAdded) {
      if (store.customer.orderAdded) {
        dispatch(getCartUser(user?.userData?.id));
        dispatch({ type: ADD_ORDER, payload: false });
        navigate("/success");
      }
    }
  }, [store.errors, store.customer.orderAdded]);

  return (
    <>
      <Header />
      <Title />
      <IconCategory />
      <div className="text-xl font-semibold text-center">
        Thông tin giao hàng
      </div>

      <div className="items-center justify-center w-full m-10 mx-auto">
        <form
          onSubmit={handleSubmitForm}
          className="w-full max-w-md p-6 mx-auto space-y-6 bg-white rounded-lg shadow-md"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-text2 dark:text-text3">
                Họ *
              </label>
              <input
                onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                value={shippingInfo.firstName}
                name="firstName"
                id="firstName"
                type="text"
                required
                className="w-full px-4 py-2 text-sm font-medium bg-transparent border border-[#157572] rounded-xl"
                placeholder="Vũ Thị Hồng"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-text2 dark:text-text3">
                Tên *
              </label>
              <input
                onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                value={shippingInfo.lastName}
                name="lastName"
                id="lastName"
                type="text"
                required
                className="w-full px-4 py-2 text-sm font-medium bg-transparent border border-[#157572] rounded-xl"
                placeholder="Oanh"
              />
            </div>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-text2 dark:text-text3">
              Địa chỉ giao hàng *
            </label>
            <input
              onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
              value={shippingInfo.address}
              name="address"
              id="address"
              type="text"
              required
              className="w-full px-4 py-2 text-sm font-medium bg-transparent border border-[#157572] rounded-xl"
              placeholder="97 Man Thiện"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text2 dark:text-text3">
              Số điện thoại *
            </label>
            <input
              onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
              value={shippingInfo.phone}
              name="phone"
               id="phone"
              type="text"
              required
              className="w-full px-4 py-2 text-sm font-medium bg-transparent border border-[#157572] rounded-xl"
              placeholder="0987654321"
            />
          </div>
          <div className="text-text1 dark:text-darkStroke">
            Tổng tiền đơn hàng: {totalAmount}
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white rounded-xl bg-secondary min-h-[56px]"
          >
            Đặt hàng
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;