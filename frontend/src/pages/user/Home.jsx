import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/home/Hero";
import ProductSection from "../../components/product/ProductSection";
import OurStory from "../../components/home/OurStory";

function Home() {
  return (
    <>
      <Navbar />

      <main
        style={{
          width: "100%",
          margin: 0,
          padding: 0,
        }}
      >
        <Hero />

        <ProductSection />
        <OurStory />
      </main>
    </>
  );
}

export default Home;