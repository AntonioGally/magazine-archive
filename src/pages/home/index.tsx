import Filter from "./components/filter/filter";
import Header from "./components/header/header";
import MagazineList from "./components/magazine-list/magazine-list";

const Home = () => {
    return (
        <div className="p-4 lg:p-10 max-w-[1400px] mx-auto">
            <Header />
            <Filter />
            <MagazineList />
        </div>
    )
}

export default Home;