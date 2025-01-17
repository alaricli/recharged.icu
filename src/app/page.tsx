export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="carousel-hero">
          {/* Carousel Hero */}
          <div className="carousel">
            <div className="carousel-item">Slide 1</div>
            <div className="carousel-item">Slide 2</div>
            <div className="carousel-item">Slide 3</div>
          </div>
        </div>

        <div className="static-hero">
          {/* Static Hero */}
          <h1>Welcome to Our Store</h1>
          <p>Discover the best products at unbeatable prices.</p>
        </div>

        <div className="three-boxes flex justify-between">
          {/* Row of 3 Boxes */}
          <div className="box">Box 1</div>
          <div className="box">Box 2</div>
          <div className="box">Box 3</div>
        </div>

        <div className="newest-products">
          {/* Area to Fetch Newest 4 Products */}
          <h2>Newest Products</h2>
          <div className="products-grid">
            {/* Products will be fetched and displayed here */}
          </div>
        </div>
      </div>
    </div>
  );
}
