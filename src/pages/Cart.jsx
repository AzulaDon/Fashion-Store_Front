import useCart from "../hooks/useCart";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.precio * item.qty, 0);

  return (
    <div className="page">
      <NavBar />

      <div className="cart-page">
        <h2>Tu carrito</h2>

        {cart.length === 0 ? (
          <p>Carrito vacío</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="cart-item">
              <div>
                <h4>{item.sku}</h4>
                <p>${item.precio}</p>
                <span>Cantidad: {item.qty}</span>
              </div>

              <button onClick={() => removeFromCart(item.id)}>
                Eliminar
              </button>

              <div className="cart-total">
                    <span>Total:</span>
                    <strong>${total}</strong>

                    <button className="checkout-btn">
                        Finalizar compra
                    </button>
                </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;