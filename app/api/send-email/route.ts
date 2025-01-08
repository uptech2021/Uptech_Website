import sgMail from '@sendgrid/mail';
import { NextResponse } from 'next/server';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  try {
    const { userEmail, emailTemplate, dynamicData } = await req.json();

    if (!userEmail || !emailTemplate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const templateId = getTemplateId(emailTemplate);
    if (!templateId) {
      return NextResponse.json({ error: 'Invalid email template' }, { status: 400 });
    }

    await sendUserEmail({ userEmail, templateId, dynamicData });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

const sendUserEmail = async ({
  userEmail,
  templateId,
  dynamicData,
}: {
  userEmail: string;
  templateId: string;
  dynamicData?: { firstName: string };
}) => {
  const mailOptions = {
    from: { email: process.env.ADMIN_EMAIL!, name: 'Uptech Incorp' },
    to: userEmail,
    templateId,
    dynamic_template_data: dynamicData || {},
  };

  await sgMail.send(mailOptions);
};

const getTemplateId = (template: string): string => {
  switch (template) {
    case 'acceptance':
      return 'd-40dd972478374dbba1543f6c24ebf782';
    case 'rejection':
      return 'd-6dc1e114e902406781b1bc623a64e5ff';
    case 'post_interview_rejection':
      return 'd-97e7f632b72a46b68e00b78bb210434e';
    case 'awaiting_review':
      return 'd-930fd93582b64fdeb8c696b422f77d97';
    default:
      return '';
  }
};
