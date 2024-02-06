import TagsForSEO from "../components/utilities/reactHelmet"

function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-md text-gray-700 flex flex-col gap-4">
      <TagsForSEO
        title={"Privacy Policy"}
        pageURL={"https://green-galaxy.net/privacy-policy"}
        descriptionOfThePage={
          "Our privacy policy outlines how we collect, use, and protect your personal information. Learn about your rights and choices regarding your data on our website."
        }
        urlToImageDescripeThePage={""}
      />
      <h1 className="font-bold text-2xl">Privacy Policy for Green Galaxy</h1>
      <h2 className="font-bold">last update: Feb / 2024</h2>
      {/* introduction */}
      <section className="flex flex-col gap-2">
        <h2 className="font-semibold text-xl">1. Introduction:</h2>
        <p>
          Welcome to <strong>Green Galaxy online store</strong> ("we," "our," or
          "us"). This Privacy Policy explains how we collect, use, disclose, and
          safeguard your personal information when you visit our website
          <strong> https://green-galaxy.net </strong>(the "Site") and when you
          use our services. By accessing or using our services, you consent to
          the terms and practices described in this Privacy Policy.
        </p>
      </section>
      {/* first */}
      <section className="flex flex-col gap-2">
        <h2 className="font-semibold text-xl">2. Information We Collect:</h2>
        <strong>2.1 Personal Information: </strong>
        We may collect personal information that you provide directly, including
        but not limited to:
        <ul className="list-disc">
          <li> Name</li>
          <li> Email</li>
          <li>address</li>
          <li> Phone number</li>
          <li>Shipping and billing address Payment information </li>
        </ul>
        <strong>2.2 Automatically Collected Information: </strong>
        We may also collect certain information automatically when you visit our
        Site, such as:
        <ul className="list-disc">
          <li>IP address</li>
          <li>Browser type Operating system</li>
          <li>Referring URLs</li>
          <li>Pages viewed</li>
          <li> Date and time of access</li>
        </ul>
      </section>
      {/* third */}
      <section className="flex flex-col gap-2">
        <h2 className="font-semibold text-xl">How We Use Your Information</h2>
        <p>
          We use the collected information for various purposes, including but
          not limited to: Processing and fulfilling orders Communicating with
          you about your orders and inquiries Providing customer support Sending
          promotional materials and updates (with your consent) Analyzing and
          improving our services Complying with legal obligations
        </p>
      </section>
      {/* fourth */}
      <section className="flex flex-col gap-2">
        <h2 className="font-semibold text-xl">Sharing Your Information</h2>
        <p>
          We may share your personal information with third parties in the
          following circumstances: Service providers for order fulfillment,
          payment processing, and other essential functions Legal obligations,
          such as complying with applicable laws and regulations With your
          consent for marketing or promotional purposes
        </p>
      </section>
      {/* fifty */}
      <section className="flex flex-col gap-2">
        <h2 className="font-semibold text-xl">
          Cookies and Tracking Technologies
        </h2>
        <p>
          We use cookies and similar tracking technologies to enhance your
          browsing experience and analyze how you use our Site. You can manage
          your cookie preferences through your browser settings.
        </p>
      </section>
      {/* sixth */}
      <section className="flex flex-col gap-2">
        <h2 className="font-semibold text-xl">Your Choices</h2>
        <p>
          You have the right to access, correct, or delete your personal
          information. You can opt out of receiving marketing communications at
          any time by following the instructions in our communications or
          contacting us directly.
        </p>
      </section>
      {/* 7th */}
      <section className="flex flex-col gap-2">
        <h2 className="font-semibold text-xl">Security</h2>
        <p>
          We implement reasonable security measures to protect your personal
          information. However, no method of transmission over the internet or
          electronic storage is entirely secure, and we cannot guarantee
          absolute security.
        </p>
      </section>
      {/* 8th */}
      <section className="flex flex-col gap-2">
        <h2 className="font-semibold text-xl">
          Changes to this Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy periodically to reflect changes in
          our practices or for other operational, legal, or regulatory reasons.
          The updated Privacy Policy will be posted on this page.
        </p>
      </section>
      {/* 9th */}
      <section className="flex flex-col gap-2">
        <h2 className="font-semibold text-xl">Contact Us</h2>
        <p>
          If you have any questions or concerns about our Privacy Policy, please
          contact us at <strong>support@green-galaxy.net</strong>
        </p>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
