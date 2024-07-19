import Divider from "@/components/Divider"
import FAQ from "@/components/FAQ"
import Info from "@/components/Info"
import Intro from "@/components/Intro"
function Landing() {
    return (
        <div className="dark:bg-black">
            <Intro />
            <Divider />
            <Info />
            <Divider />
            <FAQ />
        </div>
    )
}

export default Landing
