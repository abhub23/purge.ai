import LegalCard from '@/components/main/LegalCard';

const terms: string[] = [
  'By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.',
  'The use of this website is subject to the following terms of use which you acknowledge and accept by browsing this site.',
  'The content of the pages of this website is for your general information and use only. It is subject to change without notice.',
  'Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website.',
  'Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable.',
  'This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics.',
  'Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.',
  'From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information.',
  'The service is provided without any warranties, express or implied. We are not responsible for any damages, including data loss, service interruptions, or inaccurate results arising from your use of the service.',
  'We aim to maintain a 99.9% uptime but do not guarantee uninterrupted or error-free service. We may perform maintenance or experience outages that affect availability. Additionally, we reserve the right to modify, remove, or discontinue features or services at any time, with or without notice.',
];

const Terms = () => {
  return <LegalCard name="Terms & Conditions" values={terms} />;
};

export default Terms;
