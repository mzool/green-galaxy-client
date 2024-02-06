import TagsForSEO from "../components/utilities/reactHelmet";

function AboutUs() {
  return (
    <div className="flex flex-col gap-2 mt-5 mb-5 p-5 text-md text-gray-700 items-center justify-center w-full h-full bg-white">
      <TagsForSEO
        title={"about us"}
        pageURL={"https://green-galaxy.net/about-us"}
        descriptionOfThePage={
          "about us page, tell you the story about Green Galaxy online store"
        }
        urlToImageDescripeThePage={""}
      />
      <div className="md:w-4/6 lg:w-3/6 sm:w-4/6 w-full">
        <div className="title text-4xl">
          <h1 className="sm:text-4xl font-bold mb-5">About Green Galaxy</h1>
        </div>
        <div className="main flex flex-col gap-10">
          <div>
            <p>
              At Green Galaxy, we believe in making your shopping experience
              more than just a transaction. It's an exploration of curated
              collections, a journey through the latest trends, and a
              celebration of individuality. Our commitment is to provide you
              with a seamless and enjoyable experience that goes beyond the
              ordinary.
            </p>
          </div>
          <div>
            <h2 className="sm:text-3xl underline m-4">Our Story</h2>
            <p>
              Green Galaxy was born out of a desire to create an online haven
              for those who seek more than just products – they seek
              inspiration. Founded by a team of enthusiasts who share a deep
              love for fashion, technology, and customer-centricity, our store
              reflects a blend of creativity and functionality. From the outset,
              our mission has been clear: to offer a carefully curated selection
              of products that resonate with your lifestyle. Whether you're a
              fashion-forward trendsetter, a tech enthusiast, or someone seeking
              unique lifestyle products, we've got you covered. Every item in
              our store is handpicked, ensuring that it meets our standards of
              quality, style, and innovation.
            </p>
          </div>
          <div>
            <h2 className="sm:text-3xl underline m-4"> What Sets Us Apart:</h2>
            <ol className="list-decimal">
              <li>
                Curated Collections: Our team of experts curates collections
                that reflect the latest trends, ensuring that you stay ahead of
                the curve.
              </li>
              <li>
                Discover a diverse range of products that cater to your unique
                tastes.
              </li>
              <li>
                Quality Assurance: We prioritize quality in every product we
                offer. Each item undergoes a rigorous selection process to
                guarantee durability, functionality, and a touch of excellence.
              </li>
              <li>
                Exceptional Service: Your satisfaction is our priority. Our
                dedicated customer support team is always ready to assist you,
                whether you have questions about products, need help with the
                ordering process, or require post-purchase support.
              </li>
              <li>
                Innovation Hub: Green Galaxy is not just a shopping destination;
                it's an innovation hub. Stay informed about the latest tech
                innovations, fashion trends, and lifestyle updates through our
                engaging blog and community forums.
              </li>
            </ol>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="sm:text-3xl underline m-4">Our Commitment to You: </h2>
          <p>
            When you shop at Green Galaxy, you're not just making a purchase;
            you're joining a community. A community that values diversity,
            creativity, and the joy of discovering new things. We are committed
            to fostering a space where everyone feels welcome, represented, and
            inspired. As we continue to grow, our commitment to providing you
            with an unparalleled shopping experience remains steadfast. Expect
            more exciting products, exclusive deals, and a platform that evolves
            with your needs. Thank you for choosing Green Galaxy as your
            preferred online shopping destination. Explore, shop, and join us in
            creating a world where style meets innovation, and every purchase is
            a memorable experience.
          </p>
          <strong> Happy shopping!</strong>
          <strong> Mohammad Basem</strong>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
