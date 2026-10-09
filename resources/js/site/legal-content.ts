export interface LegalDocument {
    title: string;
    id: 'terms' | 'privacy';
    updatedLabel: string;
    sections: Array<{
        heading: string;
        paragraphs: string[];
        bullets?: string[];
    }>;
}

export const legalDocuments: Record<'terms' | 'privacy', LegalDocument> = {
    terms: {
        id: 'terms',
        title: 'Terms and Conditions',
        updatedLabel: 'Last updated: July 27, 2026',
        sections: [
            {
                heading: '1. Acceptance of Terms',
                paragraphs: [
                    'By accessing or using the Change A Life Initiative ("CALI") website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use this website.',
                ],
            },
            {
                heading: '2. Donations',
                paragraphs: [
                    'Donations made through this website are voluntary contributions to support CALI\u2019s programmes and cases. Donations are generally non-refundable.',
                    'If a case you supported becomes fully funded, your donation may be redirected to a similar programme or case so that your gift continues to serve those most in need.',
                ],
            },
            {
                heading: '3. Case Submissions',
                paragraphs: [
                    'Submitting a case through the "Post Your Case" form does not guarantee assistance. CALI verifies each submission before deciding whether to publish or act on it.',
                    'All decisions on whether and how to support a case rest with CALI and are final. We may decline a case for any reason, including where we are unable to verify the details provided.',
                ],
            },
            {
                heading: '4. Storytelling and Consent',
                paragraphs: [
                    'Where a case is published, its story may be shared publicly to raise support. We obtain appropriate consent before publishing identifiable information, and we are committed to telling stories with dignity.',
                ],
            },
            {
                heading: '5. Volunteer Conduct',
                paragraphs: [
                    'Volunteers and representatives of CALI are expected to uphold our values, respect confidentiality, and treat all individuals — especially children and vulnerable persons — with care and dignity. CALI reserves the right to decline or end involvement with any volunteer whose conduct falls short of these expectations.',
                ],
            },
            {
                heading: '6. User Responsibilities',
                paragraphs: [
                    'You agree to provide accurate information when using forms on this website and to use the website lawfully and respectfully. You must not attempt to disrupt, overload, or gain unauthorised access to our systems.',
                ],
            },
            {
                heading: '7. Intellectual Property',
                paragraphs: [
                    'Content on this website, including text, images, and branding, belongs to Change A Life Initiative unless otherwise stated. You may share our content for non-commercial, informational purposes with attribution, but may not reproduce it commercially without written permission.',
                ],
            },
            {
                heading: '8. Third-Party Links',
                paragraphs: [
                    'This website may contain links to third-party websites. CALI is not responsible for the content, privacy practices, or availability of those sites.',
                ],
            },
            {
                heading: '9. Limitation of Liability',
                paragraphs: [
                    'To the fullest extent permitted by law, Change A Life Initiative shall not be liable for any direct, indirect, incidental, or consequential loss arising from use of this website or reliance on information found on it.',
                ],
            },
            {
                heading: '10. Safeguarding Commitment',
                paragraphs: [
                    'CALI is committed to safeguarding the children, families, and vulnerable individuals we serve. We operate with clear safeguarding expectations and take reports of harm seriously.',
                ],
            },
            {
                heading: '11. Governing Law',
                paragraphs: [
                    'These Terms and Conditions are governed by the laws of the Republic of Kenya. Any disputes shall be subject to the jurisdiction of Kenyan courts.',
                ],
            },
        ],
    },
    privacy: {
        id: 'privacy',
        title: 'Privacy Policy',
        updatedLabel: 'Effective date: July 27, 2026',
        sections: [
            {
                heading: '1. Who We Are',
                paragraphs: [
                    'Change A Life Initiative ("CALI", "we", "us") is a Kenyan non-profit organisation. This policy explains what personal information we collect, why we collect it, and how we protect it when you use our website or work with us.',
                ],
            },
            {
                heading: '2. Information We Collect',
                paragraphs: [
                    'We collect information you provide directly, including:',
                ],
                bullets: [
                    'Contact information — such as your name, email address, and phone number when you contact us or subscribe to updates.',
                    'Donation information — such as your name, amount, payment preferences, and contact details when you give.',
                    'Case-submission information — including details about a nominated person and, in some cases, sensitive information such as medical or educational information relating to beneficiaries. This is collected only with consent and to the extent needed to assess support.',
                    'Website analytics data — such as pages visited and general browsing patterns, collected in aggregate.',
                ],
            },
            {
                heading: '3. How We Use Information',
                paragraphs: [
                    'We use the information we collect to respond to enquiries, process donations, review case submissions, improve our website, keep our records accurate, and comply with legal obligations. We do not sell personal information.',
                ],
            },
            {
                heading: '4. Consent',
                paragraphs: [
                    'By providing personal information to us, you consent to its use as described in this policy. Where we collect sensitive information (such as a child\u2019s or beneficiary\u2019s story or medical details), we rely on the consent of the individual or their lawful guardian.',
                ],
            },
            {
                heading: '5. Children and Vulnerable Persons',
                paragraphs: [
                    'We treat information about children and vulnerable persons with particular care. We apply special safeguards to limit access, minimise collection, and ensure that no identifiable information about a child is published without written consent from their guardian and, where appropriate, the child.',
                ],
            },
            {
                heading: '6. Storytelling and Media Consent',
                paragraphs: [
                    'We only publish identifiable stories, photographs, or videos with written consent from the individuals involved (or their guardians). You may withdraw consent at any time by contacting us, after which we will stop using the material going forward.',
                ],
            },
            {
                heading: '7. Sharing of Information',
                paragraphs: [
                    'We do not sell or rent personal information. We may share information only with:',
                ],
                bullets: [
                    'Payment processors and banking partners, to complete donations.',
                    'Technology providers who host and maintain our website and systems.',
                    'Auditors and legal or financial advisers, where necessary.',
                    'Government authorities, where required by law.',
                ],
            },
            {
                heading: '8. Data Security',
                paragraphs: [
                    'We apply appropriate technical and organisational measures to protect personal information against loss, misuse, and unauthorised access. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
                ],
            },
            {
                heading: '9. Data Retention',
                paragraphs: [
                    'We keep personal information only for as long as needed for the purposes described in this policy or as required by law. When information is no longer needed, it is securely deleted or anonymised.',
                ],
            },
            {
                heading: '10. Cookies',
                paragraphs: [
                    'Our website may use cookies and similar technologies to remember preferences and understand how the site is used. You can control or delete cookies through your browser settings.',
                ],
            },
            {
                heading: '11. Your Rights',
                paragraphs: [
                    'You may request access to, correction of, or deletion of the personal information we hold about you, and you may object to certain processing. To exercise these rights, contact us using the details on our Contact page.',
                ],
            },
            {
                heading: '12. International Transfers',
                paragraphs: [
                    'Where information is transferred outside Kenya (for example, to a cloud service provider), we use providers that apply adequate safeguards to protect the data.',
                ],
            },
            {
                heading: '13. Third-Party Links',
                paragraphs: [
                    'Our website may link to external sites. This policy applies only to our website, and we are not responsible for the privacy practices of other sites.',
                ],
            },
            {
                heading: '14. Updates to This Policy',
                paragraphs: [
                    'We may update this policy from time to time. Changes take effect when the updated policy is published on this page with a new effective date.',
                ],
            },
            {
                heading: '15. Complaints',
                paragraphs: [
                    'If you have a concern about how we handle your information, please contact us first so we can resolve it. You may also lodge a complaint with the Office of the Data Protection Commissioner (ODPC) in Kenya.',
                ],
            },
        ],
    },
};
