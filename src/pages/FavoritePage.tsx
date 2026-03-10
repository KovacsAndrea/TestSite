import { CardGrid } from "../components/card/cardGrid";
import { LoggedOutComponent } from "../components/loggedOutComponent/loggedOutComponent";
import { FavesMessages } from "../components/messages/faveMessage";
import { NavbarComponent } from "../components/navBar/navBar"
import { SideMenu } from "../components/sideMenu/sideMenu";
import { useGlobalState } from "../global/globalState";
import "./pageStyle.css";
export const FavoritePage: React.FC = () => {
    const{faveBooks, user} = useGlobalState();
    return(
        <>
        <NavbarComponent />
        <div className="flex-page-layout">
            <div className="twenty-panel">
                {user ? (<SideMenu />) : (<LoggedOutComponent/>) }
                
            </div>
    
            <div className="eighty-panel">
                {faveBooks.length === 0 ? (
                    <FavesMessages />
                    ) : (
                    <CardGrid books={faveBooks} />
                )}
            </div>

        </div>
        </>
    )
}