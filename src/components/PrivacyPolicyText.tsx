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

  let getLink = (path: string, text: string) => (
    <a href={path} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );

  const LINKS = {
    CM_EMAIL: 'mailto:hello@climatemind.org',

    GOOGLE_PRIVACY_POLICY: 'https://www.google.com/privacypolicy.html',
    GOOGLE_PRIVACY: 'https://policies.google.com/privacy',
    GOOGLE_ANALYTICS:
      'https://support.google.com/analytics/answer/181881?hl=en',

    MICROSOFT_PRIVACY_POLICY:
      'https://privacy.microsoft.com/en-us/privacystatement',

    ZOHO_PRIVACY_POLICY: 'https://www.zoho.com/privacy.html',

    SLACK_PRIVACY_POLICY: 'https://slack.com/privacy-policy',

    MAILCHIMP_PRIVACY_POLICY: 'https://mailchimp.com/legal/privacy/',

    ICO_GUIDANCE:
      'https://ico.org.uk/for-organisations/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/',
  };

  return (
    <div className={classes.root} data-testid="PrivacyPolicyText">
      {/* Add Policy here */}
      <Typography variant="body1">
        We tried to keep this policy as simple and legalese-free as possible to
        help you understand what information we collect, how we use it, and what
        choices you have about it. You should read this policy in full, but
        here's a very brief summary with the key points we hope you take away
        from it: - We don't sell your personal data to anyone. Never have, never
        will. - All we know about you is what you share by visiting and
        exploring our website. We don't collect any of your personal information
        from any third parties, so it's completely up to you to decide what you
        want to share. You can use our website under a pseudonym, for instance.
        - When you use our website, even if you aren't logged in, we receive
        some personal information from you like the type of device you're using
        and your IP address. You can choose to share additional information with
        us by creating an account. We use this information for improving our
        services and for keeping our website functional and secure. - You are
        free to opt in and out of our newsletters, update your account details,
        or delete it entirely at any time. You can also ask us to give you a
        copy of the information you've submitted. - We use your answers to our
        surveys, tests, and other tools to determine what content is relevant to
        you and to improve our understanding of personal values. You're
        completely free to decide which surveys to take and which tools to
        explore. - If you have any questions or comments regarding this policy,
        please don't hesitate to {getLink(LINKS.CM_EMAIL, 'get in touch!')}
      </Typography>
      <Typography variant="h3">TABLE OF CONTENTS</Typography>

      <Typography variant="body1" component="div">
        <ol>
          <Link href="#1">
            <li>HOW DO WE COLLECT INFORMATION?</li>
          </Link>
          <Link href="#2">
            <li>HOW DO WE USE THE INFORMATION WE COLLECT?</li>
          </Link>
          <Link href="#3">
            <li>DO WE TRANSFER YOUR INFORMATION ELSEWHERE?</li>
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
        {getLink(LINKS.GOOGLE_PRIVACY_POLICY, "Google's privacy policy")}. You
        can also opt out of{' '}
        {getLink(LINKS.GOOGLE_ANALYTICS, 'Google Analytics')}
        &nbsp; tracking at any time. Our Azure cloud computing server also
        requires persistent cookies to better allocate server resources
        specifically and efficiently to you while you use our website. For
        further details, please see{' '}
        {getLink(LINKS.MICROSOFT_PRIVACY_POLICY, "Microsoft's privacy policy")}.
        Most browsers allow you to reject all cookies, while some browsers allow
        you to reject just third party cookies. Blocking all cookies will,
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
          2. HOW DO WE USE THE INFORMATION WE COLLECT?
        </Typography>
        We use the information we collect to provide you with our services as
        well as content that's relevant and personal to you. Consequently, it's
        necessary for us to use your information to: - show or send you your
        personal values questionnaire results;
        <br /> - show or send you information about how climate change could
        personally impact you or someone in your area based on your postal code;
        <br /> - send you account-related messages, such as password recovery
        e-mails;
        <br /> - identify you and ensure the security of your account -- e.g.,
        by verifying that you own the e-mail address linked to your account;{' '}
        <br /> - provide you with content and services relevant to you -- e.g.,
        information for people with your personal values hierarchy; <br /> -
        help you connect with other members -- e.g., by creating a friend
        request automatically if someone tries to send you an e-mail invite;
        <br /> - respond to your questions or complaints, or to complaints made
        about your use of our website. We have a legitimate interest in using
        your information in these ways. It's necessary for us to do that to make
        our services and content as relevant to you as possible, and that's in
        both of our interests. In addition, we have a legitimate interest in
        maintaining our relationship with you, improving our website and
        services, and protecting both you and other users. Consequently, we use
        your information to: - conduct analytics on how you use our website in
        order to better understand your needs and to optimize our service and
        experience. For instance, by measuring the time you spend on a certain
        page before and after a design change, we can understand whether there's
        anything we need to tweak. In order to do that, we use a third party
        service, Google Analytics, to collect standard internet log information
        and details of visitor behavior patterns (for example, how much time you
        spent reading your personal value results or information about specific
        climate change impacts or solutions). We've already mentioned these
        services in the Cookies section above.\ *This information is only
        processed in a way which does not identify anyone. For example, we don't
        make, and don't allow Google to make, any attempt to match such
        information with personal data we hold about you.* - improve our website
        and develop new functionality. For example, if the majority of
        respondents in one of our surveys say they'd like to learn more about
        talking about climate change with a family member, we'll certainly take
        that into account. - conduct internal analysis and scientific /
        statistical research to improve our services and understanding of
        personal values and relationship to communication and understanding
        climate change concepts. For instance, your responses to our surveys
        could help us figure out whether individuals high in Universalism or
        Benevolence are more likely to have climate conversations. The raw
        research data you supply is anonymized or pseudonymized, and access to
        it is strictly limited. Even our own researchers only see data that
        cannot be connected back to any individually identifying information,
        and we only publish aggregate statistical data. - keep the website
        secure and prevent fraud -- e.g., by logging authentication attempts or
        activities related to your account;
        <br /> - keep both you and other users safe, including working with law
        enforcement where necessary. For instance, we may inform the police if
        we receive emails that make us believe that it's highly likely you or
        someone else is in immediate physical danger.
        <br /> - verify compliance with the terms and conditions governing the
        use of the website, e.g. by reviewing your account use history if we
        suspect malicious use of the website that puts other users at risk.
        While our legitimate interests cover a lot of what we do, in the
        following circumstances other legal grounds apply to how we process your
        personal data:
        <br /> - where we expressly require consent from you for the processing
        in question;
        <br /> - where we provide services to you as a member -- in which case
        we'll have your consent through radio buttons on the website. In
        particular, the data use outlined in this policy allows us to retain and
        delete data as needed to provide optimal service.
        <br /> - where another legal ground applies (which will be rare) --
        e.g., to protect your or another person's vital interests, or where
        we're required to process the information by law. Finally, in addition
        to what we discussed above, we'll only use your information with your
        consent: - to send you e-mail newsletters, if you've specifically agreed
        to receive them and confirmed that by clicking a link in the
        verification e-mail. You can unsubscribe from our newsletters at any
        time by clicking a link at the bottom of any message.
        <br /> - where the assessment for which you're supplying us with
        personal data includes questions about "special category" personal data
        (e.g., your religious beliefs or political views), and which we then
        process to provide assessment results and then subsequently for research
        purposes (where the data will be anonymized or pseudonymized). Here we
        rely first on our legitimate interests, and second on your explicit
        consent to this. Please note you may withdraw your consent at any time.
        Where you supply us with special category personal data we may also
        further process this data for research purposes -- typically it will be
        anonymized so that it ceases to be personal data. In this case we'll
        also rely on Article 9.2(j) of the General Data Protection Regulation
        (GDPR) to the extent the processing of personal data is involved. We
        won't provide your personal information to any third parties.
        <Typography variant="h4" id="3">
          3. DO WE TRANSFER YOUR INFORMATION ELSEWHERE?
        </Typography>
        As a worldwide digital service, we need to work with a number of
        providers, some of which are located outside the UK and the European
        Economic Area (EEA), e.g. in the U.S., in order to be able to operate
        our website and to make our services available online. Some of our team
        also operate outside the EEA. Consequently, some of your personal data
        may be transferred outside the EEA. Some of the countries in question
        may not have data protection laws equivalent to those in force in the
        EEA. We'll ensure that any transfer of your personal information outside
        the EEA where the GDPR applies to such transfer will be subject to the
        appropriate or suitable relevant safeguards (e.g. European Commission
        approved contract), as permitted under the GDPR, with those measures
        designed to help safeguard your privacy rights and give you remedies in
        the unlikely event of a misuse of your personal information. In general,
        we use contract clauses for such transfers (as per the Article 46.2 of
        the GDPR), unless the country in question is judged adequate under the
        Article 45 of the GDPR (including in the case of the U.S., Privacy
        Shield). We also limit access to your personal information to those
        members of our team who have a specific relevant and purposeful reason
        for knowing such information. If you'd like further information on this,
        please {getLink(LINKS.CM_EMAIL, 'contact us')}. Here's a list of third
        party providers we'll share your information with, if necessary: -
        MailChimp, to deliver our newsletters. We also gather statistics around
        e-mail opening and clicks to help us monitor and improve our
        newsletters. MailChimp's privacy policy is
        {getLink(LINKS.MAILCHIMP_PRIVACY_POLICY, 'here')}. - Zoho and Microsoft,
        to deliver our non-newsletter e-mails, e.g., have assessment results
        sent to your email or when we respond to your messages. Again, we may
        collect information regarding e-mail delivery and opening rates to
        improve deliverability and help with troubleshooting. You can find
        Zoho's privacy policy {getLink(LINKS.ZOHO_PRIVACY_POLICY, 'here')} and
        Microsoft's privacy policy
        {getLink(LINKS.MICROSOFT_PRIVACY_POLICY, 'here')}. <br /> - Google, to
        analyze the behaviour of our visitors as well as to host our website,
        databases, and related assets and services. Google's privacy policy is{' '}
        {getLink(LINKS.GOOGLE_PRIVACY, 'here')}. - Slack and Jira, for our
        everyday communication and planning. Their respective privacy policies
        are
        {getLink(LINKS.SLACK_PRIVACY_POLICY, 'here')}, and{' '}
        {getLink('https://www.atlassian.com/legal/privacy-policy', 'here')}.
        *We've listed all our third party providers here to be as transparent as
        possible. In practice, "sharing" is a very generous term when it comes
        to us transferring your information outside our company. We always
        transfer as little data as we can, also encrypting it where possible.
        For instance, our e-mail service provider would need to know your e-mail
        address to deliver a password recovery link, but we won't tell them your
        personal values.* *Similarly, we may discuss an issue you're having on
        Slack, which technically counts as us transferring your information
        (such as the e-mail address linked to your account) to Slack servers --
        however, Slack wouldn't be permitted to use that information for
        anything beyond what's necessary to provide their service to us.* We use
        all reasonable security and access control measures to secure our
        accounts on third party websites and the data stored therein. Keep in
        mind that information you choose to share with others, such as inviting
        a friend to view your personal values results, could become available
        around the world if that other person publicly shares that information.
        We can't prevent the use or misuse of such information by others.
        <Typography variant="h4" id="4">
          4. HOW CAN YOU MANAGE YOUR INFORMATION?
        </Typography>
        If you have an account on our website, you can use the Preferences
        section to change most of your personal details. For instance, it allows
        you to: - update your e-mail address;
        <br /> - edit your profile name;
        <br /> - delete your profile. If you delete your profile, we'll
        anonymize your user record, removing your e-mail address, name, etc. We
        won't, however, delete your messages you sent to other members, your
        responses to our tests and surveys, log records, and other similar data.
        We need to keep that data for a number of reasons, such as protecting
        other users' right of freedom of expression, preserving the integrity of
        our research, or ensuring the security of our website, and the retention
        of this data is necessary for us to provide our services to you and
        others. *If you decide to delete your profile, please make sure you
        first save any information you'd like to keep. Once the profile is gone,
        it's gone -- for instance, if you then realize that you haven't saved
        that result another member sent you, we'll have no way of recovering
        your account.* You can also ask us to correct any personal data you have
        provided to us, or to remove specific personally identifying information
        from our website. E.g., if you send us an email to change your account
        and accidentally include unnecessary personal information and later ask
        us to remove personal information from our email records, we'll do that.
        We'll need to verify the authenticity of any data correction or removal
        request -- so please make sure your account is always linked to an
        active e-mail address. We don't ask you for data such as your full name,
        address, or date of birth -- your e-mail address is the only real
        identifier -- so if you lose access to the address linked to your
        account, we'll have no way of verifying you own the account.
        <Typography variant="h4" id="5">
          5. HOW AND WHEN DO WE SHARE YOUR INFORMATION?
        </Typography>
        To begin with, your profile which shows information such as your name
        and personal values test results, is not public. Your information will
        only be shared with other users where you choose to do so. These cases
        will be clear that access to such information will be given, such as
        when you share content with other users by connecting through a 'friend
        request'. Specific team members may also need to have access to your
        information where that's necessary. This applies to any member of our
        team. *For example, if you ask us to fix a misbehaving subscription,
        someone from our team will need to access your account to do that.
        However, access to your personal data is strictly limited and monitored,
        with sensitive details (such as your password) securely encrypted.*
        Besides that, there are also certain other circumstances where we may
        disclose your personal information: - where we're required to do so by
        law or in connection with any ongoing, prospective, or reasonably likely
        (in our opinion) legal proceedings;
        <br /> - where we need to establish, exercise, or defend our legal
        rights (e.g., providing information to others for the purposes of fraud
        prevention);
        <br /> - if we're engaged in a merger, reorganisation, or any similar
        proceeding requiring the transfer of your information -- we'd then share
        your information with a party involved in such a process (for example, a
        potential non-profit or university academic group);
        <br /> - if we have strong reason to believe that you or someone else is
        in immediate physical danger (e.g., there's a reasonably credible threat
        of self-harm posted to our email), we'll try to get in touch with local
        authorities and provide them with information that may help them prevent
        that. We don't serve ads on our website, and we don't share your data
        with online advertisers. As a general rule, except as discussed above,
        we don't share your personal information with any third parties.
        <Typography variant="h4" id="6">
          6. HOW LONG DO WE KEEP YOUR INFORMATION?
        </Typography>
        We keep your information only for as long as we need it to provide
        services to you and to fulfil the purposes described in this policy or
        as otherwise described in our website. This also applies to any other
        parties that we share your information with. Here are some examples of
        categories of data along with their approximate periods of retention: -
        activity logs -- up to 2 years; - transient activity records, such as
        e-mail invites or password reset requests -- 3 months; - account details
        -- unlimited;\ *We'll regularly delete accounts that aren't linked to
        any meaningful activity and have been inactive for more than two years.*
        - content submitted to our website, such as comments or forum posts (if
        available) -- unlimited. We'll depersonalize your information or remove
        it entirely from our systems once we no longer need it to comply with
        our legal or regulatory obligations, or for other purposes described in
        this policy.
        <Typography variant="h4" id="7">
          7. HOW DO WE HANDLE CHILDREN'S INFORMATION?
        </Typography>
        You may only use our website if you're over the age at which you can
        provide consent to data processing under the laws of your country.
        Regardless of local laws, children under 13 aren't allowed to use our
        website. If you're a parent and you learn that your child is using our
        website, and you don't want them to, please{' '}
        {getLink(LINKS.CM_EMAIL, 'get in touch')} with us. As a small
        organization, we don't have the resources to verify and track parental
        consent -- so unfortunately, if you're below the age at which you can
        provide consent in your country, you aren't entitled to use our website.
        <Typography variant="h4" id="8">
          8. WHAT CAN YOU ASK US TO DO WITH YOUR INFORMATION?
        </Typography>
        Under the GDPR you have a number of important rights free of charge. In
        summary, those include rights to: - fair processing of information and
        transparency over how we use your personal information that this Privacy
        Policy is already designed to address; - access to your personal
        information and to certain other supplementary information; - require us
        to correct any mistakes in your information which we hold; - require the
        erasure of personal information concerning you in certain situations; -
        receive the personal information concerning you which you have provided
        to us, in a structured, commonly used and machine-readable format, and
        have the right to transmit that data to a third party in certain
        situations; - object at any time to processing of personal information
        concerning you for direct marketing; - object to decisions being taken
        by automated means which produce legal effects concerning you or
        similarly significantly affect you; - object in certain other situations
        to our continued processing of your personal information; - otherwise
        restrict our processing of your personal information in certain
        circumstances; - withdraw your consent to our processing where we are
        relying on consent as the lawful basis for the processing in question; -
        right to lodge a complaint with a supervisory authority. For further
        information on each of those rights, including the circumstances in
        which they apply, see {getLink(LINKS.ICO_GUIDANCE, 'guidance')}
        from the UK Information Commissioner's Office (ICO). ICO is the
        supervisory authority in the UK. If you'd like to exercise any of those
        rights, please {getLink(LINKS.CM_EMAIL, 'e-mail us')}. Keep in mind
        you'll need to send the request from the e-mail address associated with
        your account in order for us to process it. We won't be able to confirm
        you're the account owner otherwise. As already mentioned above, if you'd
        like to unsubscribe from our newsletter, you can also click on the
        unsubscribe link at the bottom of the e-mail. That's usually immediate,
        but in rare cases it may take a few days for this to take place.
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
