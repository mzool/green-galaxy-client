import TagsForSEO from "../components/utilities/reactHelmet"


const ReturnRefundPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white text-gray-700 rounded-md mt-8">
      <TagsForSEO
        title={"Refund Policy"}
        pageURL={"https://green-galaxy.net/refund-policy"}
        descriptionOfThePage={
          "Learn about our refund policy: hassle-free returns within [number of days] days of purchase. Read our terms and conditions for detailed information on eligibility and process. Your satisfaction is our priority."
        }
        urlToImageDescripeThePage={""}
      />
      <h1 className="text-3xl font-bold mb-6">Return and Refund Policy</h1>

      <p className="mb-4">Effective Date: January / 2024</p>

      <p className="mb-4">
        Thank you for shopping at Green Galaxy! We value your satisfaction and
        want to ensure a positive shopping experience. Please read our Return
        and Refund Policy carefully.
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Returns</h2>
      <p className="mb-4">
        We gladly accept returns within 15 days of the purchase date. To be
        eligible for a return, your item must be unused, in the same condition
        that you received it, and in the original packaging. Any item not in its
        original condition, damaged, or missing parts for reasons not due to our
        error may not be eligible for a return.
      </p>

      <h2 className="text-xl font-semibold mb-2">2. Initiating a Return</h2>
      <p className="mb-4">To initiate a return, please follow these steps:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Go to Contact Us page</li>
        <li>Fill the form with All order information and the reason for return</li>
        <li>If order contains multible items, specify what you want to return</li>
        <li>Send a pictures for the defects if there are, and the package(s)</li>
        <li>Support Team will conatact you to contiue with return steps </li>
      </ul>
      <p>
        If you made a purchase as a guest, please contact our customer support
        team at <strong>support@green-galaxy.net </strong> for assistance in
        initiating the return.
      </p>

      {/* refund */}
      <h2 className="text-xl font-semibold mb-2">3. Refund</h2>
      <p>
        Once your return is received and inspected, we will send you an email to
        notify you that we have received your returned item. We will also notify
        you of the approval or rejection of your refund. If approved, your
        refund will be processed, and a credit will be automatically applied to
        your original method of payment within a certain number of days,
        depending on your payment provider's policies. If your return is
        rejected, we will provide a detailed explanation, and the item will be
        shipped back to you at your expense.
      </p>
      {/* exchange */}
      <h2 className="text-xl font-semibold mb-2">4. Exchange</h2>
      <p>
        We currently do not offer direct exchanges. If you wish to exchange an
        item, please follow the return process, and then place a new order for
        the desired item.
      </p>
      {/* shipping cost */}
      <h2 className="text-xl font-semibold mb-2">5. Shipping Cost</h2>
      <p>
        Return shipping costs are the responsibility of the customer unless the
        return is a result of our error (e.g., you received an incorrect or
        defective item). In such cases, please contact our customer support team
        for further assistance
      </p>
      <h2 className="text-xl font-semibold mb-2">6. Policy Changes</h2>
      <p className="mb-4">
        We reserve the right to update or modify this Return and Refund Policy
        at any time. Please check this page periodically for changes. Your
        continued use of our website following the posting of any changes
        constitutes acceptance of those changes.
      </p>

      <p className="mb-4">
        Thank you for shopping with us! We appreciate your trust in Green
        Galaxy.
      </p>
    </div>
  );
};

export default ReturnRefundPolicy;
