import Divider from "@/components/Divider"
import FAQ from "@/components/FAQ"
import Footer from "@/components/Footer"
import Info from "@/components/Info"
import Intro from "@/components/Intro"
function Home() {
    return (
        <div className="">
            <Intro />
            <Divider />
            <Info />
            <Divider />
            <FAQ />
            <Divider />
            <Footer />
        </div>
    )
}

export default Home
