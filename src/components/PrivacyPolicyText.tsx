import React from 'react';
import { Typography, Link, makeStyles } from '@material-ui/core';
import { COLORS } from '../common/styles/CMTheme';

const styles = makeStyles({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    maxWidth: '100%',
    '& h3': {
      color: COLORS.DK_TEXT,
      margin: '0.6em 0',
    },
    '& h4': {
      color: COLORS.DK_TEXT,
      margin: '1em 0 0.4em',
    },
    '& li': {
      color: COLORS.DK_TEXT,
      paddingBottom: '.5em',
    },
  },
});

const PrivacyPolicyText = () => {
  const classes = styles();
  return (
    <div className={classes.root} data-testid="PrivacyPolicyText">
      {/* Add Policy here */}
      <Typography variant="body1">
        Thank you for choosing to be part of our community at Climate Mind
        ("Company", "we", "us", "our"). We are committed to protecting your
        personal information and your right to privacy. If you have any
        questions or concerns about this privacy notice, or our practices with
        regards to your personal information, please contact us at
        hello@climatemind.org. When you visit our website climatemind.org (the
        "Website"), and more generally, use any of our services (the "Services",
        which include the Website), we appreciate that you are trusting us with
        your personal information. We take your privacy very seriously. In this
        privacy notice, we seek to explain to you in the clearest way possible
        what information we collect, how we use it and what rights you have in
        relation to it. We hope you take some time to read through it carefully,
        as it is important. If there are any terms in this privacy notice that
        you do not agree with, please discontinue use of our Services
        immediately. This privacy notice applies to all information collected
        through our Services (which, as described above, includes our Website),
        as well as, any related services, sales, marketing or events. Please
        read this privacy notice carefully as it will help you understand what
        we do with the information that we collect.
      </Typography>
      <Typography variant="h3">TABLE OF CONTENTS</Typography>

      <Typography variant="body1" component="div">
        <ol>
          <Link href="#1">
            <li>HOW DO WE COLLECT INFORMATION?</li>
          </Link>
          <Link href="#2">
            <li>HOW DO WE USE YOUR INFORMATION?</li>
          </Link>
          <Link href="#3">
            <li>WILL YOUR INFORMATION BE SHARED WITH ANYONE?</li>
          </Link>
          <Link href="#4">
            <li>WHO WILL YOUR INFORMATION BE SHARED WITH?</li>
          </Link>
          <Link href="#5">
            <li>DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES? </li>
          </Link>
          <Link href="#6">
            <li>HOW LONG DO WE KEEP YOUR INFORMATION? </li>
          </Link>
          <Link href="#7">
            <li>HOW DO WE KEEP YOUR INFORMATION SAFE? </li>
          </Link>
          <Link href="#8">
            <li>WHAT ARE YOUR PRIVACY RIGHTS? </li>
          </Link>
          <Link href="#9">
            <li>CONTROLS FOR DO-NOT-TRACK FEATURES </li>
          </Link>
          <Link href="#10">
            <li>DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS? </li>
          </Link>
          <Link href="#11">
            <li>DO WE MAKE UPDATES TO THIS NOTICE? </li>
          </Link>
          <Link href="#12">
            <li>HOW CAN YOU CONTACT US ABOUT THIS NOTICE? </li>
          </Link>
          <Link href="#13">
            <li>
              HOW CAN YOU REVIEW, UPDATE OR DELETE THE DATA WE COLLECT FROM YOU?
            </li>
          </Link>
        </ol>
        <Typography variant="h4" id="1">
          1. HOW DO WE COLLECT INFORMATION?
        </Typography>
        We collect, store, and use information you share on our website. This
        includes your e-mail address, comments, messages sent to other members,
        and any other information you choose to enter on the website. If you
        post personal information of another person on our website, you must
        make sure you have that person's consent to both the disclosure and the
        processing of their personal data in accordance with this privacy
        policy. That's your responsibility. We also record certain technical
        information whenever you use our website. This includes information
        about your device and about your visits to and use of our website, such
        as your IP address, browser type and version, page views, etc. We also
        use cookies (small encrypted data files stored and sent by your browser
        whenever you visit our website) to store and retrieve your login status,
        personal value results, and various website settings. Some of the
        cookies are account-specific while others are not. For more information
        about cookies, please see the following section. Cookies Most of the
        functionality on our website (such as viewing your personal values test
        results or logging in) requires cookies. By using our website, you
        consent to our use of cookies as described in this policy. We use
        "persistent" cookies on our website. Persistent cookies will remain
        stored on your device until deleted, or until they reach a specified
        expiry date. We use cookies to enable our website to recognize you (as
        distinct from other users) when you visit and keep track of your
        preferences in relation to your use of our website. We use Google
        Analytics to analyze the use of our website. These third party services
        may use cookies and other technologies to collect technical data on your
        behavior and your device (such as your device's IP address or screen
        size). For further details, please see{' '}
        <a
          href="https://www.google.com/privacypolicy.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google's privacy policy
        </a>
        . You can also opt out of{' '}
        <a
          href="https://support.google.com/analytics/answer/181881?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Analytics
        </a>
        tracking at any time. Our Azure cloud computing server also requires
        persistent cookies to better allocate server resources specifically and
        efficiently to you while you use our website. For further details,
        please see{' '}
        <a
          href="https://privacy.microsoft.com/en-us/privacystatement"
          target="blank"
          rel="noreferrer"
        >
          Microsoft's privacy policy
        </a>
        . Most browsers allow you to reject all cookies, while some browsers
        allow you to reject just third party cookies. Blocking all cookies will,
        however, have a negative impact upon the usability of many websites,
        including ours. Whether Information Has to Be Provided by You and Why
        The provision of contact and other relevant information is required from
        you to enable us to communicate with you and to provide the services
        available on our website. We'll inform you at the point of collecting
        information from you (including via this Privacy Policy), whether you're
        required to provide the information to us. If you don't provide the
        information requested we may not be able to provide the services which
        require the use of this information (e.g., certain features or
        assessments).
        <Typography variant="h4" id="2">
          2. HOW DO WE USE YOUR INFORMATION?
        </Typography>
        In Short: We process your information for purposes based on legitimate
        business interests, the fulfillment of our contract with you, compliance
        with our legal obligations, and/or your consent. We use personal
        information collected via our Website for a variety of business purposes
        described below. We process your personal information for these purposes
        in reliance on our legitimate business interests, in order to enter into
        or perform a contract with you, with your consent, and/or for compliance
        with our legal obligations. We indicate the specific processing grounds
        we rely on next to each purpose listed below. We use the information we
        collect or receive: ■ To facilitate account creation and logon process.
        If you choose to link your account with us to a third-party account
        (such as your Google or Facebook account), we use the information you
        allowed us to collect from those third parties to facilitate account
        creation and logon process for the performance of the contract. ■ To
        post testimonials. We post testimonials on our Website that may contain
        personal information. Prior to posting a testimonial, we will obtain
        your consent to use your name and the content of the testimonial. If you
        wish to update, or delete your testimonial, please contact us at
        hello@climatemind.org and be sure to include your name, testimonial
        location, and contact information. ■ Request feedback. We may use your
        information to request feedback and to contact you about your use of our
        Website. ■ To enable user-to-user communications. We may use your
        information in order to enable user-to-user communications with each
        user's consent. ■ To manage user accounts. We may use your information
        for the purposes of managing our account and keeping it in working
        order. ■ For other business purposes. We may use your information for
        other business purposes, such as data analysis, identifying usage
        trends, determining the effectiveness of our promotional campaigns and
        to evaluate and improve our Website, products, marketing and your
        experience. We may use and store this information in aggregated and
        anonymized form so that it is not associated with individual end users
        and does not include personal information. We will not use identifiable
        personal information without your consent.
        <Typography variant="h4" id="3">
          3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?
        </Typography>
        In Short: We only share information with your consent, to comply with
        laws, to provide you with services, to protect your rights, or to
        fulfill business obligations. We may process or share your data that we
        hold based on the following legal basis: ■ Consent: We may process your
        data if you have given us specific consent to use your personal
        information for a specific purpose. ■ Legitimate Interests: We may
        process your data when it is reasonably necessary to achieve our
        legitimate business interests. ■ Performance of a Contract: Where we
        have entered into a contract with you, we may process your personal
        information to fulfill the terms of our contract. ■ Legal Obligations:
        We may disclose your information where we are legally required to do so
        in order to comply with applicable law, governmental requests, a
        judicial proceeding, court order, or legal process, such as in response
        to a court order or a subpoena (including in response to public
        authorities to meet national security or law enforcement requirements).
        ■ Vital Interests: We may disclose your information where we believe it
        is necessary to investigate, prevent, or take action regarding potential
        violations of our policies, suspected fraud, situations involving
        potential threats to the safety of any person and illegal activities, or
        as evidence in litigation in which we are involved. More specifically,
        we may need to process your data or share your personal information in
        the following situations: ■ Business Transfers. We may share or transfer
        your information in connection with, or during negotiations of, any
        merger, sale of company assets, financing, or acquisition of all or a
        portion of our business to another company. ■ Vendors, Consultants and
        Other Third-Party Service Providers. We may share your data with
        third-party vendors, service providers, contractors or agents who
        perform services for us or on our behalf and require access to such
        information to do that work. Examples include: payment processing, data
        analysis, email delivery, hosting services, customer service and
        marketing efforts. We may allow selected third parties to use tracking
        technology on the Website, which will enable them to collect data on our
        behalf about how you interact with our Website over time. This
        information may be used to, among other things, analyze and track data,
        determine the popularity of certain content, pages or features, and
        better understand online activity. Unless described in this notice, we
        do not share, sell, rent or trade any of your information with third
        parties for their promotional purposes. We have contracts in place with
        our data processors, which are designed to help safeguard your personal
        information. This means that they cannot do anything with your personal
        information unless we have instructed them to do it. They will also not
        share your personal information with any organization apart from us.
        They also commit to protect the data they hold on our behalf and to
        retain it for the period we instruct.
        <Typography variant="h4" id="4">
          4. WHO WILL YOUR INFORMATION BE SHARED WITH?
        </Typography>
        In Short: We only share information with the following third parties. We
        only share and disclose your information with the following third
        parties. We have categorized each party so that you may be easily
        understand the purpose of our data collection and processing practices.
        If we have processed your data based on your consent and you wish to
        revoke your consent, please contact us using the contact details
        provided in the section below titled "HOW CAN YOU CONTACT US ABOUT THIS
        NOTICE?". ■ Web and Mobile Analytics Google Tag Manager and Google
        Analytics
        <Typography variant="h4" id="5">
          5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
        </Typography>
        In Short: We may use cookies and other tracking technologies to collect
        and store your information. We may use cookies and similar tracking
        technologies (like web beacons and pixels) to access or store
        information. Specific information about how we use such technologies and
        how you can refuse certain cookies is set out in our Cookie Notice.
        <Typography variant="h4" id="6">
          6. HOW LONG DO WE KEEP YOUR INFORMATION?
        </Typography>
        In Short: We keep your information for as long as necessary to fulfill
        the purposes outlined in this privacy notice unless otherwise required
        by law. We will only keep your personal information for as long as it is
        necessary for the purposes set out in this privacy notice, unless a
        longer retention period is required or permitted by law (such as tax,
        accounting or other legal requirements). No purpose in this notice will
        require us keeping your personal information for longer than the period
        of time in which users have an account with us. When we have no ongoing
        legitimate business need to process your personal information, we will
        either delete or anonymize such information, or, if this is not possible
        (for example, because your personal information has been stored in
        backup archives), then we will securely store your personal information
        and isolate it from any further processing until deletion is possible.
        <Typography variant="h4" id="7">
          7. HOW DO WE KEEP YOUR INFORMATION SAFE?
        </Typography>
        In Short: We aim to protect your personal information through a system
        of organizational and technical security measures. We have implemented
        appropriate technical and organizational security measures designed to
        protect the security of any personal information we process. However,
        despite our safeguards and efforts to secure your information, no
        electronic transmission over the Internet or information storage
        technology can be guaranteed to be 100% secure, so we cannot promise or
        guarantee that hackers, cybercriminals, or other unauthorized third
        parties will not be able to defeat our security, and improperly collect,
        access, steal, or modify your information. Although we will do our best
        to protect your personal information, transmission of personal
        information to and from our Website is at your own risk. You should only
        access the Website within a secure environment.
        <Typography variant="h4" id="8">
          8. WHAT ARE YOUR PRIVACY RIGHTS?
        </Typography>
        In Short: In some regions, such as the European Economic Area, you have
        rights that allow you greater access to and control over your personal
        information. You may review, change, or terminate your account at any
        time. In some regions (like the European Economic Area), you have
        certain rights under applicable data protection laws. These may include
        the right (i) to request access and obtain a copy of your personal
        information, (ii) to request rectification or erasure; (iii) to restrict
        the processing of your personal information; and (iv) if applicable, to
        data portability. In certain circumstances, you may also have the right
        to object to the processing of your personal information. To make such a
        request, please use the contact details provided below. We will consider
        and act upon any request in accordance with applicable data protection
        laws. If we are relying on your consent to process your personal
        information, you have the right to withdraw your consent at any time.
        Please note however that this will not affect the lawfulness of the
        processing before its withdrawal, nor will it affect the processing of
        your personal information conducted in reliance on lawful processing
        grounds other than consent. If you are a resident in the European
        Economic Area and you believe we are unlawfully processing your personal
        information, you also have the right to complain to your local data
        protection supervisory authority. You can find their contact details
        here:
        http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.
        If you are a resident in Switzerland, the contact details for the data
        protection authorities are available here:
        https://www.edoeb.admin.ch/edoeb/en/home.html. If you have questions or
        comments about your privacy rights, you may email us at
        hello@climatemind.org. Account Information If you would at any time like
        to review or change the information in your account or terminate your
        account, you can: ■ Log in to your account settings and update your user
        account. Upon your request to terminate your account, we will deactivate
        or delete your account and information from our active databases.
        However, we may retain some information in our files to prevent fraud,
        troubleshoot problems, assist with any investigations, enforce our Terms
        of Use and/or comply with applicable legal requirements. Cookies and
        similar technologies: Most Web browsers are set to accept cookies by
        default. If you prefer, you can usually choose to set your browser to
        remove cookies and to reject cookies. If you choose to remove cookies or
        reject cookies, this could affect certain features or services of our
        Website. To opt-out of interest-based advertising by advertisers on our
        Website visit http://www.aboutads.info/choices/. Opting out of email
        marketing: You can unsubscribe from our marketing email list at any time
        by clicking on the unsubscribe link in the emails that we send or by
        contacting us using the details provided below. You will then be removed
        from the marketing email list — however, we may still communicate with
        you, for example to send you service-related emails that are necessary
        for the administration and use of your account, to respond to service
        requests, or for other non-marketing purposes. To otherwise opt-out, you
        may: ■ Contact us using the contact information provided.
        <Typography variant="h4" id="9">
          9. CONTROLS FOR DO-NOT-TRACK FEATURES
        </Typography>
        Most web browsers and some mobile operating systems and mobile
        applications include a Do-Not-Track ("DNT") feature or setting you can
        activate to signal your privacy preference not to have data about your
        online browsing activities monitored and collected. At this stage no
        uniform technology standard for recognizing and implementing DNT signals
        has been finalized. As such, we do not currently respond to DNT browser
        signals or any other mechanism that automatically communicates your
        choice not to be tracked online. If a standard for online tracking is
        adopted that we must follow in the future, we will inform you about that
        practice in a revised version of this privacy notice.
        <Typography variant="h4" id="10">
          10. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
        </Typography>
        In Short: Yes, if you are a resident of California, you are granted
        specific rights regarding access to your personal information.
        California Civil Code Section 1798.83, also known as the "Shine The
        Light" law, permits our users who are California residents to request
        and obtain from us, once a year and free of charge, information about
        categories of personal information (if any) we disclosed to third
        parties for direct marketing purposes and the names and addresses of all
        third parties with which we shared personal information in the
        immediately preceding calendar year. If you are a California resident
        and would like to make such a request, please submit your request in
        writing to us using the contact information provided below. If you are
        under 18 years of age, reside in California, and have a registered
        account with the Website, you have the right to request removal of
        unwanted data that you publicly post on the Website. To request removal
        of such data, please contact us using the contact information provided
        below, and include the email address associated with your account and a
        statement that you reside in California. We will make sure the data is
        not publicly displayed on the Website, but please be aware that the data
        may not be completely or comprehensively removed from all our systems
        (e.g. backups, etc.).
        <Typography variant="h4" id="11">
          11. DO WE MAKE UPDATES TO THIS NOTICE?
        </Typography>
        In Short: Yes, we will update this notice as necessary to stay compliant
        with relevant laws. We may update this privacy notice from time to time.
        The updated version will be indicated by an updated "Revised" date and
        the updated version will be effective as soon as it is accessible. If we
        make material changes to this privacy notice, we may notify you either
        by prominently posting a notice of such changes or by directly sending
        you a notification. We encourage you to review this privacy notice
        frequently to be informed of how we are protecting your information.
        <Typography variant="h4" id="12">
          12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
        </Typography>
        If you have questions or comments about this notice, you may email us at
        hello@climatemind.org 13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA
        WE COLLECT FROM YOU? Based on the applicable laws of your country, you
        may have the right to request access to the personal information we
        collect from you, change that information, or delete it in some
        circumstances. To request to review, update, or delete your personal
        information, please visit: email hello@climatemind.org. We will respond
        to your request within 30 days.
        <Typography variant="h4" id="13">
          13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
          YOU?
        </Typography>
        Based on the applicable laws of your country, you may have the right to
        request access to the personal information we collect from you, change
        that information, or delete it in some circumstances. To request to
        review, update, or delete your personal information, please visit: email
        hello@climatemind.org. We will respond to your request within 30 days.
      </Typography>
    </div>
  );
};

export default PrivacyPolicyText;
