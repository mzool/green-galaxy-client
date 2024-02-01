
const FAQ = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-md text-gray-700">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Q1: How can I place an order?
        </h2>
        <p>
          Placing an order is easy! Simply browse our online store, add your
          desired items to the cart, and proceed to checkout. Follow the steps
          to provide shipping information, select payment method, and complete
          your purchase.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Q2: What payment methods do you accept?
        </h2>
        <p>
          Currently, we accept cash on delivery as our primary payment method.
          We understand the importance of providing diverse payment options and
          are actively exploring the introduction of online payment methods to
          enhance your shopping experience. We appreciate your understanding and
          patience as we work towards improving our payment offerings.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Q3: How can I track my order?
        </h2>
        <p>
          Once your order is dispatched, you'll receive a confirmation email
          with a tracking number. Use this tracking number on our website's
          tracking page.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Q4: Can I modify or cancel my order after placing it?
        </h2>
        <p>
          Once an order is placed, modifications may not be
          possible automatically. However, if your order is still in a "Pending"
          status, you can cancel it by visiting your profile,
          navigating to the "Orders" section, and selecting the cancel option if
          available.
        </p>
        <p>You can change varient, add item or change quantity by contacting us as fast as possible.</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Q5: What is your return policy?
        </h2>
        <p>
          We want you to be completely satisfied with your purchase. If you're
          not happy with your order, you can return it within 30 days of
          receiving it. Check our Returns & Refunds page for detailed
          information on the return process and eligibility.
        </p>
      </div>
    </div>
  );
};

export default FAQ;
