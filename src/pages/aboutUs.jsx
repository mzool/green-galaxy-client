function AboutUs() {
  return (
    <div
      className={"flex flex-col gap-5 mt-5 mb-5 p-5 text-md text-gray-700 items-center justify-center w-full h-full bg-white"}
    >
      <div className="md:w-4/6 lg:w-3/6 sm:w-4/6 w-full">
        <div className="title text-4xl">
          <h1 className="SM:text-4xl bold mb-5">About Green Galaxy</h1>
        </div>
        <div className="main flex flex-col gap-10">
          <div>
            <p>
              Welcome to Green Galaxy, your premier destination for sustainable
              and eco-conscious living. We are more than just an e-commerce
              store; we are on a mission to promote a greener and more
              environmentally responsible lifestyle. At Green Galaxy, we believe
              that every choice we make can have a positive impact on our
              planet, and we're here to make those choices easier for you.
            </p>
          </div>
          <div>
            <h2 className="sm:text-3xl underline m-4">
              Our Commitment to Sustainability
            </h2>
            <p>
              At Green Galaxy, sustainability is not just a buzzword; it's the
              core of our existence. We are committed to offering you a curated
              selection of eco-friendly products that are thoughtfully sourced,
              ethically produced, and designed to reduce our collective carbon
              footprint. Our team of experts meticulously handpicks each item,
              ensuring that it meets our strict sustainability criteria.
            </p>
          </div>
          <div>
            <h2 className="sm:text-3xl underline m-4">
              A World of Eco-Friendly Products
            </h2>
            <p>
              Explore a world of eco-friendly possibilities when you shop with
              us. From biodegradable household essentials to stylish, upcycled
              fashion, our range of products is as diverse as it is sustainable.
              Whether you are looking for natural skincare, reusable
              kitchenware, or eco-conscious fashion, Green Galaxy is your
              one-stop destination.
            </p>
          </div>

          <div>
            <h2 className="sm:text-3xl underline m-4">Our Green Values</h2>
            <ul className="list-disc">
              <li>
                Environmental Stewardship: We take our role as caretakers of the
                environment seriously. Our packaging is minimalistic and
                recyclable, and we actively work towards reducing waste in every
                aspect of our business.
              </li>
              <li>
                Transparency: We believe in full transparency. You can trace the
                journey of our products from their source to your doorstep,
                ensuring you know exactly what you're buying and where it comes
                from.
              </li>
              <li>
                Community Engagement: We support and partner with local and
                global environmental organizations, giving back to the
                communities that share our vision of a greener future.
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="sm:text-3xl underline m-4">Why Choose Green Galaxy?</h2>
          <ol className="list-decimal">
            <li>
              Quality Assurance: We stand by the quality of our products. Every
              item is thoroughly tested and approved by our team of experts to
              ensure it meets our high standards.
            </li>
            <li>
              Eco-Friendly Shipping: Our shipping practices are eco-conscious,
              with a focus on minimizing our carbon footprint. We also offer
              carbon-neutral shipping options.
            </li>
            <li>
              Customer-Centric Approach: Your satisfaction is our top priority.
              Our responsive customer support team is here to assist you with
              any queries or concerns you may have.
            </li>
            <li>
              Educational Resources: Green Galaxy is not just a store; it's a
              resource hub for eco-conscious living. Explore our blog for
              informative articles, guides, and tips on sustainable living.
            </li>
            <li>
              Join the Green Movement: By choosing Green Galaxy, you become a
              part of a global movement towards a more sustainable future. Every
              purchase you make with us contributes to a greener planet.
            </li>
          </ol>
        </div>
        <div>
          <h2 className="sm:text-3xl underline m-4">Get in Touch</h2>
          <p>
            We invite you to join us on this exciting journey towards a more
            sustainable and eco-friendly world. Explore our store, learn from
            our resources, and be a part of the Green Galaxy community. If you
            have any questions, suggestions, or feedback, please don't hesitate
            to get in touch with us. Together, we can make a positive impact on
            the planet we call home. Thank you for choosing Green Galaxy, where
            eco-conscious shopping meets a brighter future.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
