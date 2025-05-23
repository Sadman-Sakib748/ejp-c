import Featured from "../Featured/Featured";
import HeroSlider from "../HeroSlider/HeroSlider";
import HowItWorks from "../HowItWorks/HowItWorks";
import Testimonials from "../Testimonials/Testimonials";





const Home = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <Featured></Featured>
            <HowItWorks></HowItWorks>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;