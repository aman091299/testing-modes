
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';

const Home = () => {
    console.log("inside home")
    return (
        <div>
            <nav>
                <h1>
                    Welcome to GFG
                    E-commerce Dashboard
                </h1>
            </nav>

            {/* SIDEBAR */}
            <Sidebar />
            {/* SIDEBAR */}

            {/* CONTENT */}
            <section id="content">
                {/* NAVBAR */}
                <Navbar />
                {/* NAVBAR */}

                {/* MAIN */}
                <MainContent />
                {/* MAIN */}
            </section>
            {/* CONTENT */}
        </div>
    );
};

export default Home;