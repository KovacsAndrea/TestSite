import { CartGrid } from "../components/card/cart/cartGrid";
import { NavbarComponent } from "../components/navBar/navBar";
import { CartSummary } from "../components/orderSummary/summary";
import { SideMenu } from "../components/sideMenu/sideMenu";
import { useGlobalState } from "../global/globalState";

export const CartPage: React.FC = () => {
    const {cartBooks} = useGlobalState();
  return (
    <>
      <NavbarComponent />
      <div className="flex-page-layout">
        {/* Left Side Menu */}
        <div className="twenty-panel">
          <SideMenu />
        </div>

        {/* Middle Cart Grid */}
        <div className="sixty-panel">
          <CartGrid cartItems={cartBooks}/>
        </div>

        {/* Right empty panel */}
        <div className="twenty-panel">
            <CartSummary />
        </div>
      </div>
    </>
  );
};
